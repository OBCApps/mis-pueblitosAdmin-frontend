import { PaginationResultDto } from "../../../shared/global-components/dto/PaginationResultDto";

export class FilterSubEvento {

    id: string;

    nombre: string;

    dia: string;

    horaInicio: string;

    horaFin: string;

    eventoId: string;

    paginationresult: PaginationResultDto = new PaginationResultDto()

}

