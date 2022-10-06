import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private path: any;
  private pathProfessor: any;
  private pathProfessorUpload: any;


  constructor(private http: HttpClient) {
    this.path = environment.API_URL;
    this.pathProfessor = `${this.path}/professores`
    this.pathProfessorUpload = `${this.path}/professores`
  }

  getCursos(): Observable<any> {
    return this.http.get<any>(this.pathProfessor);
  }

  getProfessor(): Observable<any> {
    return this.http.get<any>(this.pathProfessor)
  }

  getCursosId(id: any): Observable<any> {
    return this.http.get<any>(`${this.pathProfessor}/${id}`);
  }

  addProfessor(professorDTO: any, foto: File): Observable<any> {

    let formdata: FormData = new FormData();
    const json = JSON.stringify(professorDTO)

    console.log(json)

    const blob = new Blob([json], {
      type: 'application/json'
    });

    formdata.append('foto', foto);
    formdata.append('professorDTO', blob);

    return this.http.post<any>(`${this.pathProfessorUpload}`, formdata);
  }

  editProfessor(professorDTO: any, foto: File): Observable<any> {

    let formdata: FormData = new FormData();
    const json = JSON.stringify(professorDTO)

    console.log(json)

    const blob = new Blob([json], {
      type: 'application/json'
    });

    formdata.append('foto', foto);
    formdata.append('professorDTO', blob);

    return this.http.put<any>(`${this.pathProfessorUpload}`, formdata);
  }

}
