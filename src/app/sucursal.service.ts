// sucursal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private apiUrl = 'http://localhost/sucursales/backend/server.php/api';

  constructor(private http: HttpClient) {}

  getSucursales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sucursales`);
  }

  getMeses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/meses`);
  }

  getVentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ventas`);
  }
}


