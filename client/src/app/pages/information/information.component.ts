import { Component, OnInit } from '@angular/core';
import { PublicationType } from '../../services/publication/publicationType';
import { Category } from '../../services/publication/category';
import { LoginService } from '../../services/auth/login.service';
import { PublicationService } from '../../services/publication/publication.service';
import { PublicationState } from '../../services/publication/publicationState';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent  implements OnInit{
  constructor(private publicationService: PublicationService, private loginService: LoginService) {
  }
  publicationTypes: PublicationType[] = []
  publicationStates: PublicationState[] = []
  categories: Category[] = []
  ngOnInit(): void {
    this.category();
    this.publicationType();
    this.publicationState();
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
  publicationState() {
    this.publicationService.getAllPublicationState().subscribe({
      next: (publicationState: PublicationState[]) => {
        this.publicationStates = publicationState;
      }
    })
  }
}
