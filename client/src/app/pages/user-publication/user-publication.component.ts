import { Component, computed } from '@angular/core';
import { PublicationService } from '../../services/publication/publication.service';
import { Publication } from '../../models/publication';
import { LoginService } from '../../services/auth/login.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-user-publication',
  templateUrl: './user-publication.component.html',
  styleUrl: './user-publication.component.css'
})
export class UserPublicationComponent {
  img = environment.urlImg;
  data = "";
  publications: Publication[] = [];
  categories: { [id: number]: string } = {};
  states: { [id: number]: string } = {};
  types: { [id: number]: string } = {};

  constructor(private publicationService: PublicationService, private loginService: LoginService) { }
  user = computed(() => this.loginService.getLoginUser());
  ngOnInit() {
    this.getPublicationUser(this.user().id);
  }

  getPublicationUserFilter(id: number, state: number) {
    this.publicationService.getPublicationUserFilter(id, state).subscribe(
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

  getPublicationUser(id: number) {
    this.publicationService.getPublicationUser(id).subscribe(
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

  review(id: number, state: number, text: string, text2: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres ' + text + ' esta publicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ' + text,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.publicationService.reviewPublication(id, state).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Publicacion ' + text2,
              text: '¡La publicacion ha sido ' + text2,
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.getPublicationUser(this.user().id);
            });
          },
          error: (errorData) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error al intentar ' + text,
              confirmButtonText: 'Entendido'
            });
            console.error(errorData);
          }
        });
      }
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta publicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó la eliminación
        this.publicationService.deletePublication(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Elemento eliminado',
              text: '¡Su publicación ha sido completamente eliminada!',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.getPublicationUser(this.user().id);
            });
          },
          error: (errorData) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error al intentar eliminar',
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
