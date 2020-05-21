import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { SesionComponent } from 'src/app/pages/sesion/sesion.component'
import { BienvenidoComponent } from 'src/app/pages/bienvenido/bienvenido.component'
import { ParticipanteComponent } from 'src/app/pages/participante/participante.component'

const routes: Routes = [
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'sesion/:id', component: SesionComponent },
  { path: 'sesion/:sesionid/participante/:participanteid', component: ParticipanteComponent },
  // { path: 'participante/:id', component: SesionComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'bienvenido' }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
