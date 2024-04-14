import { Component, Inject, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit, OnDestroy {
  login = computed(() => this.loginService.getLoginOn());
  user = computed(() => this.loginService.getLoginUser());
  constructor(private loginService: LoginService) { }
  private router: Router = inject(Router);
  ngOnDestroy(): void {
    /*     this.loginService.currentLogin.unsubscribe(); */
  }
  logout() {
    this.loginService.logout();
    this.router.navigateByUrl("/");
    Swal.fire({
      icon: 'success',
      title: 'Cierre de sesión exitoso',
      text: '¡Nos vemos!',
      timer: 1500,
      showConfirmButton: false
    });
  };
  ngOnInit(): void {
    /*     this.loginService.currentLogin.subscribe(
          {
            next: (login) => {
              this.login = this.login;
            }
          }
        ) */
  }
}
