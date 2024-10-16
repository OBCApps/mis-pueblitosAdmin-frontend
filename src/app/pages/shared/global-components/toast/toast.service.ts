import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private list_messages: any[] = [];

  constructor() {}

  deleteToast(index: number) {    
    this.list_messages.splice(index, 1);
    
  }
  
  addToast(data: any) {
    //console.log("Addd", data);
    this.list_messages.push(data);
    setTimeout(() => {
      this.deleteToast(this.getListMessages().length - 1); // Corregir el índice
    }, 2000);
    
  }

  getListMessages() {
    return this.list_messages;
  }
}
