import { Component, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from '../../services/publication/publication.service';
import { Publication } from '../../models/publication';
import { LoginService } from '../../services/auth/login.service';

declare function dataPublication(): void;

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  login = computed(() => this.loginService.getLoginOn());
  category: string = "";
  publicationTypes: string = "";
  publication: Publication = {
    id: 0,
    users_id: 0,
    publication_type_id: 0,
    publication_state_id: 0,
    category_id: 0,
    title: "",
    description: "",
    image: "",
    quantity: 0,
    unity_price: 0,
    date: new Date()
  };

  constructor(private route: ActivatedRoute, private publicationService: PublicationService, private loginService: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPublication(params['id']);
    });
    dataPublication();
  }

  getPublication(id: string) {
    this.publicationService.getPublication(id).subscribe(
      (publication: Publication) => {
        this.publication = publication;
        this.getPublicationType(this.publication.publication_type_id);
        this.getCategory(this.publication.category_id);
      }
    )
  }

  getPublicationType(id: number) {
    this.publicationService.getPublicateType(id).subscribe({
      next: (publicationType: string) => {
        this.publicationTypes = publicationType;
      }
    })
  }

  getCategory(id: number) {
    this.publicationService.getCategory(id).subscribe(
      (category: string) => {
        this.category = category;
      }
    )
  }

  createChat() {
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
}
