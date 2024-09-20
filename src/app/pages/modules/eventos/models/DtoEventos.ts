export class DtoEvento {
  nombre: string
  descripcion: string
  foto: DtoFotoEvento = new DtoFotoEvento()
  ubicacionExacta: string
  fechaInicio: string
  fechaFin: string
  type: string
  id: string
  lugarId: string
  lugarDesc: string
  name_route: string
  subEventos: DtoSubEvento[] = []
}


export class DtoFotoEvento {
  url: string
  lugar: string
  titulo: string
  proveedorId: string
  proveedorDesc: string
}

export class DtoSubEvento {
  nombre: string
  descripcion: string
  foto: DtoFotoEvento = new DtoFotoEvento()
  dia: string
  horaInicio: string
  horaFin: string
  eventoId: string
  subEventoDetalles: DtoSubEventoDetalle[] = []
}
export class DtoSubEventoDetalle {
  detalle: string
  organizador: string
  foto: DtoFotoEvento = new DtoFotoEvento()
  recomendaciones: string
  horaInicio: string
  horaFin: string
  subEventoId: null
}