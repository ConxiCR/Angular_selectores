import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { switchMap, tap } from 'rxjs/operators';

import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    region: ['', Validators.required ],
    pais: ['', Validators.required ],

  })
  //llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];

  constructor( private formBuilder: FormBuilder,
               private paisesService: PaisesService ) { }
  
  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    //cuando cambie la región
   /* this.miFormulario.get('region')?.valueChanges
      .subscribe( region => {
        console.log(region)

        this.paisesService.getPaisesPorRegion( region )
         .subscribe( paises => {
           console.log(paises)
           this.paises = paises;
         })
      })*/
    //utilización de operadores RXJS. código más limpio
    this.miFormulario.get('region')?.valueChanges
      
      .pipe(
        //_ no nos importa que hay, pero necesitamos que de paises y resetear paises que daba error
        tap( (_) => {
          this.miFormulario.get('pais')?.reset('');
        }),
        //devuelve paises de cada región
        switchMap( region => this.paisesService.getPaisesPorRegion( region ))
      )
      .subscribe( paises => {
        //console.log(paises);
        this.paises = paises;
      })

  }

  guardar(){
    console.log(this.miFormulario.value);
  }

}
