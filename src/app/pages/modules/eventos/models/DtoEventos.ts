
import { DtoFoto } from "./DtoPhoto"
import { DtoSubEvento } from "./DtoSubEvento"

export class DtoEvento {
  nombre: string
  descripcion: string
  foto: DtoFoto = new DtoFoto()
  ubicacionExacta: string
  fechaInicio: Date
  fechaFin: Date
  type: string
  id: string
  lugarId: string
  lugarDesc: string
  name_route: string
  subEventos: DtoSubEvento[] = []
}


