import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './pages/shared/navigations/auths/login/views/login/login.component';
//import { EventosModule } from './pages/modules/eventos/eventos.module';
import { NavbarViewComponent } from './pages/shared/navigations/navbar/views/navbar-view/navbar-view.component';
import { EventosListComponent } from './pages/modules/eventos/views/eventos-list/eventos-list.component';
import { EventosManageComponent } from './pages/modules/eventos/views/eventos-manage/eventos-manage.component';
import { LugarSelectorViewComponent } from './pages/shared/global-components/selectors/lugar-selector/views/lugar-selector-view/lugar-selector-view.component';
import { ProveedorSelectorViewComponent } from './pages/shared/global-components/selectors/proveedor-selector/views/proveedor-selector-view/proveedor-selector-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarViewComponent,
    EventosListComponent,
    EventosManageComponent,
    LugarSelectorViewComponent,
    ProveedorSelectorViewComponent
  ],
  imports: [
    PrimeNgModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,

    // ----- MODULES IMPLEMENTATION ------ \\
    //EventosModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
