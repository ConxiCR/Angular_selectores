import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  
  //En REST Countries no hay un endpoint para cargar. Lo hacemos manual
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  //regiones de tipo publico. Con un arreglo desestructurado
  get regiones(): string[] {
    return [ ...this._regiones ];
  }

  constructor() { }
}
