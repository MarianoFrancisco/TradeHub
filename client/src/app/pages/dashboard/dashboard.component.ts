import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { PublicationService } from '../../services/publication/publication.service';
import { User } from '../../models/user';
import { Publication } from '../../models/publication';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  login = computed(() => this.loginService.getLoginOn());
  userData?: User;
  publications: Publication[][] = [];
  constructor(private loginService: LoginService, private publicationService: PublicationService) { this.getPublications() }
  user(): any {
    const userDataString = localStorage.getItem("user");
    return userDataString ? JSON.parse(userDataString) : null;
  }
  ngOnDestroy(): void {
    /*       this.loginService.currentUserData.unsubscribe();
          this.loginService.currentLogin.unsubscribe(); */
  }
  getPublications() {
    this.publicationService.getPublications().subscribe(
      (publications: Publication[]) => {
        // Asignar los datos de las publicaciones a la propiedad del componente
        for (let i = 0; i < publications.length; i += 5) {
          this.publications.push(publications.slice(i, i + 5));
        }
      })
  }
  ngOnInit(): void {/* 
    this.loginService.currentLogin.subscribe({
            next: (login) => {
              this.login = login;
            }
    });

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      }
    }) */
  }
}
