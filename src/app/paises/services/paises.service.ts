import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PaisSmall } from '../interfaces/paises.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  
  private baseUrl: string = 'https://restcountries.eu/rest/v2'
  //En REST Countries no hay un endpoint para cargar. Lo hacemos manual
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  //regiones de tipo publico. Con un arreglo desestructurado
  get regiones(): string[] {
    return [ ...this._regiones ];
  }

  constructor( private http: HttpClient) { }

  getPaisesPorRegion( region:string ): Observable<PaisSmall[]> {
  
  const url: string = `${ this.baseUrl}/region/${ region }?fields=alpha3Code;name`
  return this.http.get<PaisSmall[]> ( url );
  }
}
