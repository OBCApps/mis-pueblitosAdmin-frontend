import { DtoFoto } from "./DtoPhoto"

export class DtoSubEvento {
    id: string
    nombre: string
    descripcion: string
    foto: DtoFoto = new DtoFoto()
    dia: string
    horaInicio: string
    horaFin: string
    eventoId: string
    subEventoDetalles: DtoSubEventoDetalle[] = []
}
export class DtoSubEventoDetalle {
    detalle: string
    organizador: string
    foto: DtoFoto = new DtoFoto()
    recomendaciones: string
    horaInicio: string
    horaFin: string
    subEventoId: null
}