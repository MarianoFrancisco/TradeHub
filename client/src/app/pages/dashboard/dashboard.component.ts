import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { PublicationService } from '../../services/publication/publication.service';
import { User } from '../../models/user';
import { Publication } from '../../models/publication';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { PublicationType } from '../../services/publication/publicationType';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  img = environment.urlImg;
  login = computed(() => this.loginService.getLoginOn());
  userData?: User;
  publications: Publication[][] = [];
  publicationTypes: PublicationType[] = []
  constructor(private loginService: LoginService, private publicationService: PublicationService, private router: Router) {
  }
  user = computed(() => this.loginService.getLoginUser());

  ngOnInit(): void {
    this.publicationType();
    this.getPublications();
  }

  getPublications() {
    this.publications = [];
    this.publicationService.getPublications(this.user().id).subscribe(
      (publications: Publication[]) => {
        // Asignar los datos de las publicaciones a la propiedad del componente
        for (let i = 0; i < publications.length; i += 5) {
          this.publications.push(publications.slice(i, i + 5));
        }
      })
  }

  getPublicationsFilter(type:number) {
    this.publications = [];
    this.publicationService.getPublicationsFilter(this.user().id, type).subscribe(
      (publications: Publication[]) => {
        // Asignar los datos de las publicaciones a la propiedad del componente
        for (let i = 0; i < publications.length; i += 5) {
          this.publications.push(publications.slice(i, i + 5));
        }
      })
  }

  publicationType() {
    this.publicationService.getAllPublicationType().subscribe({
      next: (publicationTypes: PublicationType[]) => {
        this.publicationTypes = publicationTypes;
      }
    })
  }

  goToPublication(publication: Publication) {
    this.publicationService.setPublication(publication);
    this.router.navigateByUrl('/publication');
  }


}
