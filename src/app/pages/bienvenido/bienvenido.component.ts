import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Observable } from 'rxjs'

import { SesionModel } from 'src/app/models/sesion.model'
import { SesionService } from 'src/app/services/sesion.service'

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html'
})
export class BienvenidoComponent implements OnInit {

  sesion: SesionModel = new SesionModel
  sesiones: SesionModel[];

  loading = {
    sesion: false
  }

  constructor(
    private sesionService: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarSesiones()
  }

  guardarSesion( form: NgForm){
    if( form.invalid ){
      Swal.fire({
        text: 'Ingrese todos los datos',
        icon: 'warning'
      })
      return
    }

    let peticion: Observable<any>;
    peticion = this.sesionService.crearSesion(this.sesion)
    this.loading.sesion=true

    peticion.subscribe(
      res=>{
        this.loading.sesion=false
        this.router.navigate([`/sesion/${res.id}`])
      }  
    )
  }

  listarSesiones(){
    this.sesionService.listarSesiones().subscribe(
      res => this.sesiones = res
    )
  }

}
