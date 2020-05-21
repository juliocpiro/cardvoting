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

  constructor(
    private sesionService: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarSesiones()
  }

  guardarSesion( form: NgForm){
    Swal.fire({
      title: 'Procesando',
      text: 'Creando Sala para sesión',
      allowOutsideClick: false,
      icon: 'info'
    })
    Swal.showLoading();
    
    let peticion: Observable<any>;
    peticion = this.sesionService.crearSesion(this.sesion)
    
    peticion.subscribe(
      res=>{
        Swal.fire({
          title: 'Creado',
          text: 'Sala creada: '+this.sesion.nombre,
          allowOutsideClick: false,
          icon: 'success',
          onClose: () => {
            this.router.navigate([`/sesion/${res.id}`])
          }
        })
        Swal.hideLoading();
      }  
    )
  }

  listarSesiones(){
    this.sesionService.listarSesiones().subscribe(
      res => this.sesiones = res
    )
  }

}
