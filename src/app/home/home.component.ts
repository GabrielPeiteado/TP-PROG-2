// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  menus = [
    { name: 'Artículos', route: '/articulos' },
    { name: 'Clientes', route: '/clientes' },
    { name: 'Sucursales', route: '/sucursales' },
    { name: 'Ventas', route: '/ventas' },
  ];
}
