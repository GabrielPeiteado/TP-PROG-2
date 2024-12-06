import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

interface Venta {
  mes: string;
  nombre_suc: string;
  monto: number;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: Venta[] = [];
  sucursales: string[] = [];
  meses: string[] = [];
  userRole: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarVentas();
    this.obtenerRolUsuario();
  }

  cargarVentas(): void {
    this.http.get<Venta[]>('http://localhost/sucursales/backend/server.php/api/ventas-mensuales').subscribe(
      (data) => {
        this.ventas = data;
        this.sucursales = Array.from(new Set(data.map(v => v.nombre_suc)));
        this.meses = Array.from(new Set(data.map(v => v.mes)));
      },
      (error) => {
        console.error('Error al cargar las ventas:', error);
      }
    );
  }

  obtenerMonto(mes: string, sucursal: string): number {
    const venta = this.ventas.find(v => v.mes === mes && v.nombre_suc === sucursal);
    return venta ? venta.monto : 0;
  }

  obtenerRolUsuario(): void {
    this.userRole = this.authService.getUserRole();
  }

  eliminarSucursal(sucursal: string): void {
    this.sucursales = this.sucursales.filter(suc => suc !== sucursal);
    this.ventas = this.ventas.filter(venta => venta.nombre_suc !== sucursal);
  }
  
}
