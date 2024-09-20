import { Component, ViewChild } from '@angular/core';
import { MessageController } from '../../../../MessageController';
import { LugarSelectorService } from '../../services/lugar-selector.service';
import { FilterLugar } from '../../models/FilterLugar';
import { DtoLugarSelector } from '../../models/DtoLugarSelector';
import { BaseVariables } from '../../../../BaseVariables';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-lugar-selector-view',
  templateUrl: './lugar-selector-view.component.html',
  styleUrl: './lugar-selector-view.component.scss'
})
export class LugarSelectorViewComponent extends BaseVariables  {
  visible: boolean = false;

  boolLoadData: boolean = false;
  constructor(
    private lugarSelectorService: LugarSelectorService,
  ) {
    super()
  }

  coreInitSelector(message: MessageController) {
    this.messageController = message;
    this.visible = true;
    this.loadLugar();
  }



  coreSelect(dto: any) {
    console.log("DTO", dto);

    this.messageController.selected = dto;
    this.messageController.currentComponent.coreMessage(this.messageController);
    this.coreCloseSelector();
  }

  coreCloseSelector() {
    
    this.visible = false;
  }

  listFilter: DtoLugarSelector[] = []
  loadLugar() {
    this.boolLoadData = true;
    const filter = new FilterLugar()
    this.listFilter = [];
    this.lugarSelectorService.search(filter).subscribe(
      (data: FilterLugar[]) => {
        this.boolLoadData = false;
        this.listFilter = data;
      }
    );
  }



}
