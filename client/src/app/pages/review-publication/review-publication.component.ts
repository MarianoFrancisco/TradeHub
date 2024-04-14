import { Component} from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication/publication.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-publication',
  templateUrl: './review-publication.component.html',
  styleUrl: './review-publication.component.css'
})
export class ReviewPublicationComponent {
  publications: Publication[] = []
  categories: { [id: number]: string } = {};
  states: { [id: number]: string } = {};
  types: { [id: number]: string } = {};

  constructor(private publicationService: PublicationService, private router: Router, private loginService: LoginService) { }
  ngOnInit() {
    this.getPublications();
  }

  getPublications() {
    this.publicationService.getReviewPublication().subscribe(
      (publications: Publication[]) => {
        this.publications = publications;
        for (const publication of this.publications) {
          this.getCategory(publication.category_id, publication.id);
          this.getPublicationState(publication.publication_state_id, publication.id);
          this.getPublicationType(publication.publication_type_id, publication.id);
        }
      }
    )
  }

  accept(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres aceptar esta publicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.publicationService.reviewPublication(id, 2).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Publicacion acepta',
              text: '¡La publicacion ha sido acepta!',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.getPublications();
            });
          },
          error: (errorData) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error al intentar aceptar la publicacion',
              confirmButtonText: 'Entendido'
            });
            console.error(errorData);
          }
        });
      }
    });
  }

  reject(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres rechazar esta publicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó la eliminación
        this.publicationService.reviewPublication(id, 5).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Publicacion rechazada',
              text: '¡Su publicación ha sido rechazada!',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.getPublications();
            });
          },
          error: (errorData) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error al intentar rechazar la publicacion',
              confirmButtonText: 'Entendido'
            });
            console.error(errorData);
          }
        });
      }
    });
  }

  getCategory(id: number, publication: number) {
    this.publicationService.getCategory(id).subscribe(
      (category: string) => {
        this.categories[publication] = category;
      }
    )
  }

  getPublicationState(id: number, publication: number) {
    this.publicationService.getPublicationState(id).subscribe(
      (publicationState: string) => {
        this.states[publication] = publicationState;
      }
    )
  }

  getPublicationType(id: number, publication: number) {
    this.publicationService.getPublicateType(id).subscribe(
      (publicationType: string) => {
        this.types[publication] = publicationType;
      }
    )
  }
}
