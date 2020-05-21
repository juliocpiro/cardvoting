import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

import { ParticipanteModel } from '../models/participante.model';

@Injectable({
    providedIn: 'root'
})

export class ParticipanteService {
    private url = "https://cardvoting.firebaseio.com"

    constructor(
        private http: HttpClient,
        private firebaseDatabase: AngularFireDatabase
    ){}

    getParticipante( sesionId:string, participanteId: string ){
        return this.http.get(`${this.url}/sesion/${sesionId}/participante/${participanteId}.json`)
    }

    actualizarVoto( sesionId:string, participante: ParticipanteModel ){
        const participanteTmp = {
            ...participante
        }
        delete participanteTmp.id
        return this.http.put(`${this.url}/sesion/${sesionId}/participante/${participante.id}.json`, participanteTmp)
    }

    agregarParticipante( sesionId: string, participante: ParticipanteModel ){
        return this.http.post(`${this.url}/sesion/${sesionId}/participante.json`, participante)
    }
}