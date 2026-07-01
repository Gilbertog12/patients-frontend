import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientService } from '../../services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';

describe('PatientDetailComponent', () => {
  let component: PatientDetailComponent;
  let fixture: ComponentFixture<PatientDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDetailComponent],
      providers: [
        {
          provide: PatientService,
          useValue: jasmine.createSpyObj('PatientService', ['getPatientById'])
        },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PatientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
