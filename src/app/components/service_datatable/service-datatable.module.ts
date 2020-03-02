import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {ServiceDatatableComponent} from "./service-datatable.component";
@NgModule({
  declarations: [
    ServiceDatatableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ServiceDatatableComponent
  ],
})

export class ServiceDatatableModule {}
