import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private path: any;
  private pathListNoticias: any = '';
  private pathListAddNoticias: any = '';

  constructor(private http: HttpClient) {
    this.path = environment.API_URL;
    this.pathListNoticias = `${this.path}/noticias`
    this.pathListAddNoticias = `${this.path}/noticias`
  }

  getNoticia(): Observable<any> {
    return this.http.get<any>(this.pathListNoticias);
  }

  getNoticiasID(id: any): Observable<any> {
    return this.http.get<any>(`${this.pathListNoticias}/${id}`);
  }

  addNoticias(noticiaDTO: any, imagemDivulgacao: File): Observable<any> {

    let formdata: FormData = new FormData();
    const json = JSON.stringify(noticiaDTO)

    console.log(json)

    const blob = new Blob([json], {
      type: 'application/json'
    });

    formdata.append('imagemDivulgacao', imagemDivulgacao);
    formdata.append('noticiaDTO', blob);

    return this.http.post<any>(`${this.pathListAddNoticias}`, formdata);
  }

  editNoticias(noticiaDTO: any, imagemDivulgacao: File): Observable<any> {

    let formdata: FormData = new FormData();
    const json = JSON.stringify(noticiaDTO)

    console.log(json)

    const blob = new Blob([json], {
      type: 'application/json'
    });

    formdata.append('imagemDivulgacao', imagemDivulgacao);
    formdata.append('noticiaDTO', blob);

    return this.http.put<any>(`${this.pathListAddNoticias}`, formdata);
  }

}
