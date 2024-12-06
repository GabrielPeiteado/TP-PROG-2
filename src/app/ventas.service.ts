import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'http://localhost/sucursales/backend/server.php/api/ventas-mensuales';

  constructor(private http: HttpClient) {}

  getVentasMensuales(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
