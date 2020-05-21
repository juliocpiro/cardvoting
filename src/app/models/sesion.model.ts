import { ParticipanteModel } from './participante.model';

export class SesionModel {
    id: string;
    admin: string;
    nombre: string;
    pregunta: string;
    participante: ParticipanteModel[]
}