import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PagedResult, Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) { }

  private url = environment.apiUrl


  getPatients(filtros : {page:number , pageSize:number, name?:string , documentNumber?:string}) : Observable<PagedResult<Patient>>{

    let params = new HttpParams()

    if(filtros.name) params = params.set('name' , filtros.name)
    if(filtros.documentNumber) params = params.set('documentNumber' , filtros.documentNumber)

      params = params.set('page', filtros.page)
params = params.set('pageSize', filtros.pageSize)

    return this.http.get<PagedResult<Patient>>(`${this.url}/patients`,{params})
  }

  getPatientById(id : number):Observable<Patient>{

    return this.http.get<Patient>(`${this.url}/patients/${id}`)

  }

  createPatient(patient: Patient):Observable<Patient>{

    return this.http.post<Patient>(`${this.url}/patients` , patient)
  }

  updatePatient(id: number, patient: Patient):Observable<Patient>{
    return this.http.put<Patient>(`${this.url}/patients/${id}` ,  patient)

  }

  deletePatient(id: number){
    return this.http.delete(`${this.url}/patients/${id}` , )

  }
}
