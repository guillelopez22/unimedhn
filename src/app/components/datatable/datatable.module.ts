import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {DatatableComponent} from "./datatable.component";
@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DatatableComponent
  ],
})

export class DatatableModule {}
