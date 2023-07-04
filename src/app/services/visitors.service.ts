import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VisitorsService {

  constructor(
    private _http: HttpClient
  ) { }


  api: string = 'visitors'
  url: string = environment.baseUrl + this.api


  addVisitor(data: any): Observable<any> {
    const headerDict = {

      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this._http.post(this.url, data, requestOptions)
  }

  getVisitorList(params: string = null): Observable<any> {
    const headerDict = { 'Accept': 'application/json', 'Access-Control-Allow-Headers': '*', }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    let request = ''
    if (params != null) {
      request += `?status=${params}`
    }
    return this._http.get(this.url + request, requestOptions)
  }

  deleteVisitor(id: number): Observable<any> {
    return this._http.delete(this.url + '/' + id)
  }

  updateVisitor(id: number, data: any) {
    return this._http.put(this.url + '/' + id, data)
  }

  findById(id: number) {
    return this._http.get(this.url + '/' + id)
  }

}
