import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  articulos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos() {
    this.http.get<any[]>('http://localhost/sucursales/backend/server.php/api/articulos').subscribe(
      (data) => {
        this.articulos = data;
      },
      (error) => {
        console.error('Error al cargar los artículos:', error);
      }
    );
  }
}
