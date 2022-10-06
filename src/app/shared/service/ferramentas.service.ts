import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FerramentasService {
  private path: any;
  private pathCursos: any;
  private pathCursosUpload: any;


  constructor(private http: HttpClient) {
    this.path = environment.API_URL;
    this.pathCursos = `${this.path}/ferramentas`
    this.pathCursosUpload = `${this.path}/ferramentas`
  }

  getCursos(): Observable<any> {
    return this.http.get<any>(this.pathCursos);
  }

  getCursosId(id: any): Observable<any> {
    return this.http.get<any>(`${this.pathCursos}/${id}`);
  }

  addCurso(ferramentaDTO: any, arquivo: File, foto: File): Observable<any> {

    let formdata: FormData = new FormData();
    const json = JSON.stringify(ferramentaDTO)

    const blob = new Blob([json], {
      type: 'application/json'
    });

    formdata.append('arquivo', arquivo);
    formdata.append('foto', foto);
    formdata.append('ferramentaDTO', blob);

    return this.http.post<any>(`${this.pathCursosUpload}`, formdata);
  }

  editCurso(ferramentaDTO: any, arquivo: File, foto: File): Observable<any> {

    let formdata: FormData = new FormData();
    const json = JSON.stringify(ferramentaDTO)

    const blob = new Blob([json], {
      type: 'application/json'
    });

    formdata.append('arquivo', arquivo);
    formdata.append('foto', foto);
    formdata.append('ferramentaDTO', blob);

    return this.http.put<any>(`${this.pathCursosUpload}`, formdata);
  }
}
