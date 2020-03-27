import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';

// *******************************************************************************
// Modules

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalModule }          from 'ngx-bootstrap';

// *******************************************************************************
// App

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AppEndpoints } from './app.endpoints';
import { LoginGuard } from './app.loginguard';
import { AuthInterceptor } from './app.httpinterceptor';
import { LayoutModule } from './layout/layout.module';
import { DatatableModule } from './components/datatable/datatable.module';
import { ServiceDatatableModule } from './components/service_datatable/service-datatable.module';
import { FormRendererModule } from './components/form_renderer/form_renderer.module';
import { AlertService } from './components/alert_service/alert.service';
import { ExcelService } from './components/excel_service/excel.service';

// *******************************************************************************
// Pages

import { LoginComponent } from './login/login.component';
import { FirstLoginComponent } from './first_login/first_login.component';
import { RecoverPasswordComponent } from './recover_password/recover_password.component';
import { NotFoundComponent } from './not_found/not_found.component';
import { HomeComponent } from './home/home.component';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { MedicosComponent } from './medicos/medicos.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { PresentacionComponent } from './presentaciones/presentacion.component';
import { ConsultaComponent } from './consultas/consulta.component';
import { CarterasComponent } from './carteras/carteras.component';
// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverPasswordComponent,
    NotFoundComponent,
    FirstLoginComponent,
    HomeComponent,
    InstitucionesComponent,
    MedicamentosComponent,
    InsumosComponent,
    AlumnosComponent,
    MedicosComponent,
    PresentacionComponent,
    ConsultaComponent,
    CarterasComponent,
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    ChartsModule,
    TextMaskModule,
    DatatableModule,
    ServiceDatatableModule,
    FormRendererModule,
    ModalModule.forRoot()
  ],

  providers: [
    Title,
    AppService,
    AppEndpoints,
    AlertService,
    ExcelService,
    LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
