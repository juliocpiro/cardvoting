import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParticipanteModel } from 'src/app/models/participante.model'
import { SesionModel } from 'src/app/models/sesion.model'
import { ParticipanteService } from 'src/app/services/participante.service'
import { SesionService } from 'src/app/services/sesion.service'

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html'
})
export class ParticipanteComponent implements OnInit {
  sesionId: string
  participanteId: string

  sesion: SesionModel = new SesionModel
  participante: ParticipanteModel = new ParticipanteModel

  opciones = [
    {valor:"I"},
    {valor:"II"},
    {valor:"III"},
    {valor:"IV"},
    {valor:"V"},
    {valor:"VI"},
    {valor:"VII"},
    {valor:"VIII"},
    {valor:"IX"},
    {valor:"X"},
    {valor:"XII"},
    {valor:"XIII"},
    {valor:"XIV"},
    {valor:"XV"}
  ]

  constructor(
    private participanteService: ParticipanteService,
    private sesionService: SesionService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.sesionId = this.route.snapshot.paramMap.get('sesionid')
    this.participanteId = this.route.snapshot.paramMap.get('participanteid')
    this.getSesion()
  }

  getSesion(){
    this.sesionService.getSesion(this.sesionId).subscribe(
      res => {
        this.sesion = res
        for(var i in res.participante){
          if(i==this.participanteId){
            this.participante = res.participante[i]
            this.participante.id=i
            break
          }
        };
      }
    )
  }

  actualizarVoto( voto: string){
    this.participante.voto = voto
    this.participanteService.actualizarVoto(this.sesionId, this.participante).subscribe(
      res => {}
    )
  }

}
