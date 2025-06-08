import { PaginationResultDto } from "../../../shared/global-components/dto/PaginationResultDto";

export class FilterSubEventoDetalle {

    id: string;

    organizador: string;

    horaInicio: string;

    horaFin: string;

    subEventoId: string;

    paginationresult: PaginationResultDto = new PaginationResultDto();

}

