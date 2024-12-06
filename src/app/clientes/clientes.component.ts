import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.http.get<any[]>('http://localhost/sucursales/backend/server.php/api/clientes').subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al cargar los clientes:', error);
      }
    );
  }
}
