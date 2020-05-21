import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { SesionModel } from '../models/sesion.model';
import { ParticipanteModel } from '../models/participante.model';

@Injectable({
    providedIn: 'root'
})

export class SesionService {
    private url = "https://cardvoting.firebaseio.com"

    constructor(
        private http: HttpClient,
        private firebaseDatabase: AngularFireDatabase
    ){}

    crearSesion( sesion: SesionModel ){
        return this.http.post(`${this.url}/sesion.json`, sesion)
        .pipe(
            map(
                (res: any) => {
                    sesion.id = res.name
                    return sesion
                }
            )
        )
    }

    actualizarSesion( sesion: SesionModel ){
        const sesionTmp = {
            ...sesion
        }
        delete sesionTmp.id
        return this.http.put(`${this.url}/sesion/${sesion.id}.json`, sesionTmp)
    }

    getSesion( id: string ){
        return this.firebaseDatabase.list(`sesion/${id}`).snapshotChanges()
        .pipe(
            map(
                res => {
                    let sesion: SesionModel = new SesionModel
                    // sesion.participante = []
                    res.forEach(dato => {
                        let reg = dato.payload.toJSON()
                        sesion.id=id
                        // if(dato.key=='participante'){
                        //     let participantes:[] = reg as [];
                        //     for(var i in participantes) {
                        //         let participante = participantes[i] as ParticipanteModel
                        //         participante.id = i
                        //         sesion.participante.push(participante)
                        //     }
                        // }else{
                        //     sesion[dato.key] = reg
                        // }
                        sesion[dato.key] = reg

                    })
                    return sesion
                }
            )
        )
    }

    eliminarSesion( id: string ){
        return this.http.delete(`${this.url}/sesion/${id}.json`)
    }

    listarSesiones() {
        return this.firebaseDatabase.list('sesion').snapshotChanges()
        .pipe(
            map(
                res => {
                    let sesiones: SesionModel[] = [];
                    res.forEach(fila => {
                        let reg = fila.payload.toJSON(); 
                        reg['id'] = fila.key;
                        sesiones.push(reg as SesionModel);
                    })
                    return sesiones
                }
            )
        )
    }
    
}