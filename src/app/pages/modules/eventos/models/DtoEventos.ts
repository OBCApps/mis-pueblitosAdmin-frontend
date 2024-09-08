export class DtoSubEventoCreate {
  nombre: string;
  descripcion: string;
  foto: any;
  dia: string;
  horaInicio: string;
  horaFin: string;
  eventoId: string;
}

export class DtoSubEvento {
  id: string;
  nombre: string;
  descripcion: string;
  foto: Foto;
  dia: string;
  horaInicio: string;
  horaFin: string;
  eventoId: string;
  evento: {
    id: string;
    nombre: string;
    descripcion: string;
    foto: any;
    ubicacionExacta: string;
    fechaInicio: string;
    fechaFin: string;
    lugarId: string;
    lugar: {
      id: string;
      nombre: string;
      descripcion: string;
      foto: any;
      video: string;
      masDestacado: boolean;
      departamentoId: string;
    };
  };
  subEventoDetalles: DtoSubEventoDetalle[];
}

export class DtoSubEventoDetalle {
  id: string;
  detalle: string;
  organizador: string;
  foto: any;
  recomendaciones: string;
  horaInicio: string;
  horaFin: string;
  subEventoId: string;
  subEventoNombre: string;
}

export class DtoEventos {
  id: string;
  nombre: string;
  descripcion: string;
  foto: Foto;
  ubicacionExacta: string;
  fechaInicio: string;
  fechaFin: string;
  lugarId: string;
  lugar: {
    id: string;
    nombre: string;
    descripcion: string;
    foto: any;
    video: string;
    masDestacado: boolean;
    departamentoId: string;
  };
  subEventos: [
    {
      id: string;
      nombre: string;
      descripcion: string;
      foto: any;
      dia: string;
      horaInicio: string;
      horaFin: string;
      eventoId: string;
    }
  ];
}
export class DtoEvento {
  id: string;
  nombre: string;
  descripcion: string;
  foto: Foto;
  ubicacionExacta: string;
  fechaInicio: string;
  fechaFin: string;
  lugarId: string;
  lugarNombre: string;
  subEventosPorDia: {
    fecha: [
      {
        id: string;
        detalle: string;
        organizador: string;
        foto: any;
        recomendaciones: string;
        horaInicio: string;
        horaFin: string;
        subEventoId: string;
      }
    ];
  };
}

export class Foto {
  url: string;
  lugar: string;
  titulo: string;
  proveedorId: string;
}

export class Proveedor {
  id?: string;
  nombre?: string;
  redesSociales?: {
    listRedes: { link: string; nombre: string }[];
  };
}
