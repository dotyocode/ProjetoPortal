import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aulas } from '../model/aulas';

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  private path: any;
  private pathCursos: any;
  private pathAddAulas: any;
  private pathCursosId: any;

  constructor(private http: HttpClient) {
    this.path = environment.API_URL;
    this.pathCursos = `${this.path}/aulas/curso`
    this.pathAddAulas = `${this.path}/aulas`
    this.pathCursosId = `${this.path}/cursos`
  }

  getCursosId(id: any): Observable<any> {
    return this.http.get<any>(`${this.pathCursosId}/${id}`);
  }

  getAulaId(id: any): Observable<any> {
    return this.http.get<any>(`${this.pathCursos}/${id}`);
  }

  addAula(aula: any): Observable<any> {
    return this.http.post<any>(`${this.pathAddAulas}`, aula);
  }

  editAula(aula: any): Observable<any> {
    return this.http.put<any>(`${this.pathAddAulas}`, aula);
  }


}
