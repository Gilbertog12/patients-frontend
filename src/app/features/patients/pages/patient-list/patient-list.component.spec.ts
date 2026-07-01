import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PatientListComponent } from './patient-list.component';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;
  let patientServiceSpy: jasmine.SpyObj<PatientService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PatientService', ['getPatients', 'deletePatient']);
    spy.getPatients.and.returnValue(of({
      data: [],
      totalRecords: 0,
      currentPage: 1,
      pageSize: 10
    }));

    TestBed.configureTestingModule({
      declarations: [PatientListComponent],
      providers: [
        { provide: PatientService, useValue: spy },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        ConfirmationService,
        MessageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    patientServiceSpy = TestBed.inject(PatientService) as jasmine.SpyObj<PatientService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPatients on init', () => {
    expect(patientServiceSpy.getPatients).toHaveBeenCalled();
  });
});
