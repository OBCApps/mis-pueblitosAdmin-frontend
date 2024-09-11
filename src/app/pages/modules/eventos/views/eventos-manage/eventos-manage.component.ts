import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DtoEvento, DtoSubEvento } from '../../models/DtoEventos';

@Component({
  selector: 'app-eventos-manage',
  templateUrl: './eventos-manage.component.html',
  styleUrl: './eventos-manage.component.scss'
})
export class EventosManageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    const accionExterna = this.route.snapshot.params["accion"];
    console.log("accion", accionExterna);

  }


  dtoRegister: DtoEvento = new DtoEvento();

  coreNew() {
    console.log("dtoRegiter", this.dtoRegister);

  }

  addItemSubEvento(){

    this.dtoRegister.subeventos.push(new DtoSubEvento())
  }
}
