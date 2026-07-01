import { Component, OnInit } from '@angular/core';
import { PagedResult, Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients :Patient[] =[]

  totalRecords :number = 0
  page : number = 1
  pageSize: number = 10

  filterName : string  = ''
  filterDocument : string  = ''

  loading: boolean = false

  constructor(private _patienteService :PatientService ,
    private router : Router ,
    private _confirmationService: ConfirmationService ,
   private _messageService:MessageService){

  }
  ngOnInit(): void {
    this.loadPatients()
  }

  loadPatients():void{
    this.loading = true
    this._patienteService.getPatients({page: this.page , pageSize:this.pageSize ,
       name:this.filterName || undefined , documentNumber:this.filterDocument||undefined})
       .subscribe({
        next : (result:PagedResult<Patient>)=>{
          this.patients = result.data;
          this.totalRecords = result.totalRecords
          this.loading = false
        },
        error: ()=> { this.loading = false}
       })
  }

  onPageChange(event:any) : void {
     this.page = event.first /event.rows +1;
     this.pageSize = event.rows;
     this.loadPatients()
  }

  applyFilters():void{
    this.page = 1
    this.loadPatients()
  }

   clearFilters(): void {
    this.filterName = '';
    this.filterDocument = '';
    this.page = 1;
    this.loadPatients();
  }

  goToNew(): void {
    this.router.navigate(['/patients/new']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/patients', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/patients', id, 'edit']);
  }


  confirmDelete(patient : Patient):void{

    this._confirmationService.confirm({
      message : `¿ Esta seguro de eliminar a ${patient.firstName} ${patient.lastName} ? `,
      header :'Confirmar eliminacion',
      icon :'pi pi-exclamation-triangle',
      accept:()=>{
        this._patienteService.deletePatient(patient.patientId).subscribe({
          next:()=>{
            this._messageService.add({
              severity : 'success',
              summary : 'Eliminado',
              detail : 'Paciente Eliminado'
            });
            this.loadPatients()
          }
        })
      }
    })

  }

}
