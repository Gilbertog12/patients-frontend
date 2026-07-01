import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {


  patient? : Patient
  loading : boolean = false

  constructor(private _patientService : PatientService ,
     private router:Router ,
      private route : ActivatedRoute){  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.loading = true
      this._patientService.getPatientById(+id).subscribe({
        next : (data:Patient) =>{
          this.patient = data
          this.loading = false
        },error : () => { this.loading = false}
      })
    }
  }

  goToEdit():void {
    this.router.navigate(['/patients', this.patient?.patientId , 'edit'])
  }

  goBack():void{
    this.router.navigate(['/patients'])
  }
}
