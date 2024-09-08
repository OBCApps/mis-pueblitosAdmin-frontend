import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FlowbiteService } from './flowbite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private flowbiteService : FlowbiteService) { }

  title = 'mis-pueblitos-admin-frontend';
  sidebarVisible: boolean = false;
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
  
}
