import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';

@NgModule({
  imports: [
    SidebarModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    RatingModule,
    TagModule,
    DialogModule,
    RadioButtonModule,
    DropdownModule,
    InputNumberModule,
    SidebarModule,
    CalendarModule,
    InputTextModule,
    MenuModule
  ],
  exports: [
    SidebarModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    RatingModule,
    TagModule,
    DialogModule,
    RadioButtonModule,
    DropdownModule,
    InputNumberModule,
    SidebarModule,
    CalendarModule,
    InputTextModule,
    MenuModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class PrimeNgModule { }
