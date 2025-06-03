import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from './toast/toast.service';
import { LoadingService } from './loadings/loading-service.service';



@Injectable({
    providedIn: 'root'
})
export class BaseServices {

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastService: ToastService,
        private loadingService: LoadingService

    ) { }

    getListStatus() {
        return [{ name: 'Inactivo', code: 'IN' }, { name: 'Activo', code: 'AC' },];
    }




    showMessageSucces(message: string) { this.toastService.addToast({ type: 'success', message: message }); }

    showMessageError(message: string) { this.toastService.addToast({ type: 'danger', message: message }); }

    showMessageWarning(message: string) { this.toastService.addToast({ type: 'warning', message: message }); }

    showLoading() { this.loadingService.show(); }

    hideLoading() { this.loadingService.hide(); }

}
