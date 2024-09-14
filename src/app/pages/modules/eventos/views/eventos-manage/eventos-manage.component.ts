import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DtoEvento, DtoSubEvento } from '../../models/DtoEventos';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { EventoService } from '../../services/eventosService';
import { response } from 'express';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-eventos-manage',
  templateUrl: './eventos-manage.component.html',
  styleUrl: './eventos-manage.component.scss'
})
export class EventosManageComponent implements OnInit {
  action: string;

  dtoSelected: DtoEvento = new DtoEvento();


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventoService: EventoService
  ) {

  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.action = this.getInfoDtoSelected()[0];
      this.dtoSelected = this.getInfoDtoSelected()[1];

      if (this.action == 'NEW') {
        this.dtoRegister = new DtoEvento()
      } else {

        this.getAllInfo()
      }

    }


  }


  dtoRegister: DtoEvento = new DtoEvento();

  getInfoDtoSelected(): [string, any] {
    const localData = JSON.parse(localStorage.getItem('dtoSelected'));
    return [localData.action, localData.data]
  }

  coreSave() {
    if (this.action == 'NEW') {
      this.coreNew()
    }
    if (this.action == 'EDIT') {
      this.coreEdit()
    }
  }

  coreNew() {
    console.log("NEW", this.dtoRegister);

  }

  coreEdit() {
    console.log("EDIT", this.dtoRegister);

  }




  getAllInfo() {

    this.eventoService.getEventoByID(this.dtoSelected.id).subscribe(
      data => {
        console.log("INFORMACION OBTENIDA");
        this.dtoRegister = data;
      }, err => {
        console.log("error");

      })

  }
  convertToDate(dateString: string): any {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day);
  }

  ngOnDestroy(): void {
    BaseComponents.removeLocalStorageToManage('dtoSelected');
  }
}
