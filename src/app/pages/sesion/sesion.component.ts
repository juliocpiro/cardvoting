import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'

import { SesionModel } from 'src/app/models/sesion.model'
import { SesionService } from 'src/app/services/sesion.service'
import { ParticipanteService } from 'src/app/services/participante.service'
import { ParticipanteModel } from 'src/app/models/participante.model';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html'
})
export class SesionComponent implements OnInit {
  objectKeys = Object.keys;
  sesionId: string
  sesion: SesionModel = new SesionModel
  nuevoParticipante: string
  preguntaSesion: string
  
  constructor(
    private sesionService: SesionService,
    private participanteService: ParticipanteService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.sesionId = this.route.snapshot.paramMap.get('id')
    this.getSesion()
  }

  actualizarPregunta( pregunta: string ){
    if(pregunta==undefined || pregunta.trim()==''){
      Swal.fire({
        title: 'Ingrese pregunta',
        text: 'Se mantendra la pregunta anterior',
        allowOutsideClick: false,
        icon: 'warning'
      })
      this.preguntaSesion = this.sesion.pregunta
    }else{
      this.sesion.pregunta = pregunta
      this.sesionService.actualizarSesion(this.sesion).subscribe(
        res => {}
      )
    }
  }

  getSesion(){
    this.sesionService.getSesion(this.sesionId).subscribe(
      res => {
        this.sesion = res
        this.preguntaSesion = this.sesion.pregunta
      }
    )
  }

  agregarParticipante(nombre: string){
    if(nombre==undefined || nombre.trim()==''){
      Swal.fire({
        text: 'Ingrese nombre de participante',
        allowOutsideClick: false,
        icon: 'warning'
      })
    }else{
      let part = new ParticipanteModel
      part.nombre = nombre
      this.participanteService.agregarParticipante(this.sesionId, part).subscribe(
        res=>{
          this.nuevoParticipante=''
        }
      )
    }
  }

  verLinkParticipante(participanteId: string){
    Swal.fire({
      title: `Link de acceso de ${this.sesion.participante[participanteId].nombre}`,
      text: `${location.href}/participante/${participanteId}`,
      icon: 'info'
    })
  }

}
