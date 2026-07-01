import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientFormComponent } from './patient-form.component';
import { PatientService } from '../../services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

describe('PatientFormComponent', () => {
  let component: PatientFormComponent;
  let fixture: ComponentFixture<PatientFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: PatientService,
          useValue: jasmine.createSpyObj('PatientService',
            ['createPatient', 'updatePatient', 'getPatientById'])
        },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
        MessageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    TestBed.overrideTemplate(PatientFormComponent, '<form [formGroup]="form"></form>');
    fixture = TestBed.createComponent(PatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when required fields are empty', () => {
    component.form.patchValue({
      documentType: '',
      documentNumber: '',
      firstName: '',
      lastName: '',
      birthDate: ''
    });
    expect(component.form.invalid).toBeTrue();
  });

  it('form should be valid when all required fields are filled', () => {
    component.form.patchValue({
      documentType: 'CC',
      documentNumber: '1234567890',
      firstName: 'Juan',
      lastName: 'Perez',
      birthDate: new Date('1990-01-01')
    });
    expect(component.form.valid).toBeTrue();
  });
});
