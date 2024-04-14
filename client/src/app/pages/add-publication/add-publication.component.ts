import { Component, OnInit, computed } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PublicationService } from '../../services/publication/publication.service';
import { PublicationType } from '../../services/publication/publicationType';
import { Category } from '../../services/publication/category';
import Swal from 'sweetalert2';
import { PostPublication } from '../../models/post-publication';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrl: './add-publication.component.css'
})
export class AddPublicationComponent implements OnInit {
  private file: File | null = null;
  user = computed(() => this.loginService.getLoginUser());
  publicationTypes: PublicationType[] = []
  categories: Category[] = []
  registerError: string = "";
  registerForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    unity_price: [1, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    publication_type_id: [0, Validators.required],
    category_id: [0, Validators.required],
    image: [this.file, Validators.required],
    users_id: this.user().id,
  })

  constructor(private formBuilder: FormBuilder, private publicationService: PublicationService,
    private loginService: LoginService, private router: Router) {

  }

  ngOnInit(): void {
    this.category();
    this.publicationType();
  }

  savePublication() {
    if (this.registerForm.valid) {
      this.registerError = "";
      this.publicationService.postPublication(this.registerForm.value as PostPublication).subscribe({
        error: (errorData) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un fallo al crear la publicacion, intenta de nuevo!',
            confirmButtonText: 'Entendido'
          })
          console.error(errorData);
          this.registerError = errorData;
        },
        complete: () => {
          Swal.fire({
            icon: 'success',
            title: 'Publicacion creada exitosamente',
            text: '¡La publicacion fue creada, puedes visualizarla en Mis Publicaciones!',
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

  category() {
    this.publicationService.getAllCategory().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
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

  get title() {
    return this.registerForm.controls.title;
  }

  get quantity() {
    return this.registerForm.controls.quantity;
  }

  get price() {
    return this.registerForm.controls.unity_price;
  }

  get description() {
    return this.registerForm.controls.description;
  }

  get publication_type_id() {
    return this.registerForm.controls.publication_type_id;
  }

  get category_id() {
    return this.registerForm.controls.category_id;
  }

  get image() {
    return this.registerForm.controls.image;
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement)?.files?.[0];
    if(files){
      this.registerForm.value.image = files;
    }
  }
}
