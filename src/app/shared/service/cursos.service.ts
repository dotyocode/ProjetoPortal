import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private path: any;
  private pathCursos: any;
  private pathCursosUpload: any;
  private pathProfessor: any;


  constructor(private http: HttpClient) {
    this.path = environment.API_URL;
    this.pathCursos = `${this.path}/cursos`
    this.pathCursosUpload = `${this.path}/cursos`
    this.pathProfessor = `${this.path}/professores`
  }

  getCursos(): Observable<any> {
    return this.http.get<any>(this.pathCursos);
  }

  getProfessor(): Observable<any> {
    return this.http.get<any>(this.pathProfessor)
  }

  getCursosId(id: any): Observable<any> {
    return this.http.get<any>(`${this.pathCursos}/${id}`);
  }

  addCurso(cursoDTO: any, imagemDivulgacao: File, imagemCapa: File): Observable<any> {

    let formdata: FormData = new FormData();
    const json = JSON.stringify(cursoDTO)

    console.log(json)

    const blob = new Blob([json], {
      type: 'application/json'
    });

    formdata.append('imagemDivulgacao', imagemDivulgacao);
    formdata.append('imagemCapa', imagemCapa);
    formdata.append('cursoDTO', blob);

    return this.http.post<any>(`${this.pathCursosUpload}`, formdata);
  }

  editCurso(cursoDTO: any, imagemDivulgacao: File, imagemCapa: File, ultimaAtualizacao: any, dataCadastro: any): Observable<any> {

    let formdata: FormData = new FormData();
    const json = JSON.stringify(cursoDTO)

    console.log(json)

    const blob = new Blob([json], {
      type: 'application/json'
    });

    formdata.append('imagemDivulgacao', imagemDivulgacao);
    formdata.append('imagemCapa', imagemCapa);
    formdata.append('cursoDTO', blob);
    formdata.append('ultimaAtualizacao', ultimaAtualizacao);
    formdata.append('dataCadastro', dataCadastro);

    return this.http.put<any>(`${this.pathCursosUpload}`, formdata);
  }

}
