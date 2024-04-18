import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPublicationComponent } from './report-publication.component';

describe('ReportPublicationComponent', () => {
  let component: ReportPublicationComponent;
  let fixture: ComponentFixture<ReportPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportPublicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
