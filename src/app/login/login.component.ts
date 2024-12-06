import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.authService.setSession(response.token, response.role);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error de autenticación', error);
        alert('Credenciales inválidas');
      }
    );
  }
}
