import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPublicationComponent } from './user-publication.component';

describe('UserPublicationComponent', () => {
  let component: UserPublicationComponent;
  let fixture: ComponentFixture<UserPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPublicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
