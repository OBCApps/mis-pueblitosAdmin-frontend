export class PaginationResultDto {
    result: any[] = [];
    page: number;
    size: number;
    totalRegistros: number;
    paginacioninicio: number;
    formularioOninit: boolean = false;
}