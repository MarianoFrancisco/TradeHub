import { Component, computed } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { RegisterData } from '../../services/user/registerData';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = computed(() => this.loginService.getLoginUser());
  login = computed(() => this.loginService.getLoginOn());
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private loginService: LoginService) {

  }
  registerError: string = "";
  registerForm = this.formBuilder.group({
    user_name: ['', [Validators.required, Validators.pattern(/^[a-z][a-zA-Z0-9]*$/)]],
    name: ['', Validators.required],
    pwd: ['', Validators.required],
    birthdate: [new Date, Validators.required],
    phone: ['', Validators.required],
    rol_id: 2,
  })
  //, /^(?:\+\d{1,3}-)?\d{10}$/

  register() {
    if (this.registerForm.valid) {
      this.registerError = "";
      this.userService.createUser(this.registerForm.value as RegisterData).subscribe({
        error: (errorData) => {
          console.log(this.registerForm.value);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario puede que ya exista, intenta con otro nuevo!',
            confirmButtonText: 'Entendido'
          })
          console.error(errorData);
          this.registerError = errorData;
        },
        complete: () => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado exitosamente',
            text: '¡El usuario ' + this.userName.value + ' fue creado!',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigateByUrl('/');
          this.registerForm.reset();
        }
      })
    }
    else {
      this.registerForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al ingresar los datos! Por favor sigue el formato valido y llena todas las casillas',
        confirmButtonText: 'Entendido'
      })
    }
  }

  get userName() {
    return this.registerForm.controls.user_name;
  }

  get name() {
    return this.registerForm.controls.name;
  }

  get birthdate() {
    return this.registerForm.controls.birthdate;
  }

  get phone() {
    return this.registerForm.controls.phone;
  }

  get password() {
    return this.registerForm.controls.pwd;
  }
}
