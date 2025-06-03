import { PaginationResultDto } from "../../../shared/global-components/dto/PaginationResultDto"

export class FilterEvento {
    id: string

    nombre: string

    ubicacionExacta: string

    fechaInicio: string

    fechaFin: string

    lugarId: string

    type: string

    name_route: string

    paginationresult: PaginationResultDto = new PaginationResultDto()
}

