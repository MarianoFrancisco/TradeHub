import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginData } from '../../services/auth/loginData';
import Swal from 'sweetalert2';

declare function initializeLogin(): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    initializeLogin();
  }

  ngOnInit(): void {
  }

  loginError: string = "";
  loginForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.pattern(/^[a-z][a-zA-Z0-9]*$/)]],
    password: ['', Validators.required],
  })

  isAdmin = 0;

  get userName() {
    return this.loginForm.controls.userName;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.value as LoginData).subscribe({
        next: (userData) => {
          if (userData.rol_id === 1) {
            this.isAdmin = 1;
          }else{
            this.isAdmin = 0;
          }
        },
        error: (errorData) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario con la contraseña ingresada no existe! Verifica si escribiste bien tu usuario y tu contraseña',
            confirmButtonText: 'Entendido'
          })
          console.error(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: '¡Bienvenido de nuevo ' + this.userName.value + '!',
            timer: 1500,
            showConfirmButton: false
          });
          if(this.isAdmin!=0){
            this.router.navigateByUrl('/review_publication');
          }else{
            this.router.navigateByUrl('/');
          }
          this.loginForm.reset();
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al ingresar los datos! Por favor sigue el formato valido y llena todas las casillas',
        confirmButtonText: 'Entendido'
      })
    }
  }
}
