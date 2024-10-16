import { Component, Renderer2 } from '@angular/core';
import { ToastService } from '../toast.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-alerts-toast',
  standalone: true,
  imports: [NgFor],
  templateUrl: './alerts-toast.component.html',
  styleUrl: './alerts-toast.component.scss'
})
export class AlertsToastComponent {

  constructor(private toastService: ToastService) { }

  // Funciones para agregar y eliminar toasts usando el servicio ToastService
  deleteToast(index: number) {
    this.toastService.deleteToast(index);
  }

  addToast(data: any) {


    this.toastService.addToast(data);


  }
  // Esta función puede ser útil para obtener la lista de mensajes de toasts
  getListMessages() {
    return this.toastService.getListMessages();
  }

  getColorByType(type: any): string {
    switch (type) {

      case ('success'): {
        return 'text-[#476A48] bg-[#CDE8CE] border-[#559E58]';
      }
      case ('warning'): {
        return 'text-[#7C631B] bg-[#FEEDBA] border-[#DCAB19]';
      }
      case ('danger'): {
        return 'text-[#E31429] bg-[#FFD2D6] border-[#E8192E]';
      }
      default: {
        return 'text-[#476A48] bg-[#CDE8CE] border-[#559E58]';
      }
    }


  }
}
