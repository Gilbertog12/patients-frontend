import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { MessageService } from 'primeng/api';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit{

  form! : FormGroup;
  isEditMode : boolean= false ;
  patientId? : number
  loading : boolean = false

  documentTypes = [
     {'label' : ' Cedula de Ciudadania', value : 'CC'},
     {'label' : 'Tarjeta de Identidad', value : 'TI'},
     {'label' : 'Cedula de Extranjeria', value : 'CE'},
     {'label' : 'pasaporte', value : 'PA'},
  ]

  today : Date = new Date()

  constructor(
    private fb : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private _patienteService : PatientService,
    private _messageService : MessageService
  ){

  }

  ngOnInit(): void {

    this.buildForm()
    const id= this.route.snapshot.paramMap.get('id');
    if(id){
      this.isEditMode = true
      this.patientId = +id;
      this.loadPatient(this.patientId)
    }

  }

  buildForm():void{
    this.form = this.fb.group({
      documentType : ['CC', Validators.required],
      documentNumber : ['' , [Validators.required ,Validators.minLength(5), Validators.maxLength(10)]],
      firstName : ['' , Validators.required],
      lastName : ['' , Validators.required],
      birthDate : ['' , Validators.required],
      phoneNumber : [''],
      email : ['' , Validators.email]
    })
  }

  loadPatient(id:number):void{
    this.loading = true
    this._patienteService.getPatientById(id).subscribe({
      next:( patient : Patient) => {
        this.form.patchValue({
          ...patient,
          birthDate : new Date(patient.birthDate)
        })

        this.form.get('documentType')?.disable()
        this.form.get('documentNumber')?.disable()
        this.loading = false
      },
      error: ()=> { this.loading = false}
    })

  }

  submit():void{
    if(this.form.invalid) return this.form.markAllAsTouched()

    const payload = {
      ...this.form.getRawValue(),
      patientId : this.patientId ?? 0,
      birthDate : this.form.value.birthDate instanceof Date
      ? this.form.value.birthDate.toISOString().split('T')[0]
      : this.form.value.birthDate
    }

    this.loading = true

    if(this.isEditMode && this.patientId){
      this._patienteService.updatePatient(this.patientId , payload).subscribe({
        next: ()=> {
          this._messageService.add({
            severity :'success',
            summary : 'Actualizado',
            detail : 'Paciente Actualizado correctamente'
          })
          this.router.navigate(['/patients'])
        }, error : ()=> { this.loading = false}
      })

    }else{
      this._patienteService.createPatient(payload).subscribe({
        next: ()=>{
          this._messageService.add({
            severity : 'success',
            summary : 'Creado',
            detail :'Paciente creado Correctamente'
          })
          this.router.navigate(['/patients'])
        }, error : () => {this.loading = false}
      })
    }
  }

  cancel():void{
    this.router.navigate(['/patients'])
  }

  isInvalid(field:string) : boolean{
     const control = this.form.get(field)
     return !!(control?.invalid && control?.touched)
  }
}
