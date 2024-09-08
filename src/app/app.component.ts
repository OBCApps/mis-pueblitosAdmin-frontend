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
  confirm() {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }
  sidebarVisible1: boolean = false;

  sidebarVisible2: boolean = false;

  sidebarVisible3: boolean = false;

  sidebarVisible4: boolean = false;
}
