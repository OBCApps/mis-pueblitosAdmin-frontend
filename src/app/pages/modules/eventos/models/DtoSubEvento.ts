import { DtoFoto } from "./DtoPhoto"

export class DtoSubEvento {
    id: string
    nombre: string
    descripcion: string
    foto: DtoFoto = new DtoFoto()
    dia: Date
    horaInicio: Date
    horaFin: Date
    eventoId: string
    estado: string;
    subEventoDetalles: DtoSubEventoDetalle[] = []
}
export class DtoSubEventoDetalle {
    detalle: string
    organizador: string
    foto: DtoFoto = new DtoFoto()
    recomendaciones: string
    horaInicio: Date
    horaFin: Date
    subEventoId: null
    editing: boolean = false;
}