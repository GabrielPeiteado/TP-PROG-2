import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  sucursales: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarSucursales();
  }

  cargarSucursales(): void {
    this.http.get<any[]>('http://localhost/sucursales/backend/server.php/api/sucursales').subscribe(
      (data) => {
        this.sucursales = data;
      },
      (error) => {
        console.error('Error al cargar las sucursales:', error);
      }
    );
  }
}
