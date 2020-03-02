import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { FormRendererComponent } from "./form_renderer.component";
import { TextMaskModule } from 'angular2-text-mask';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { AmazingTimePickerModule } from 'amazing-time-picker';

export class DefaultIntl extends OwlDateTimeIntl {
  cancelBtnLabel= 'Cancelar';
  setBtnLabel= 'Aceptar';
};

@NgModule({
  declarations: [
    FormRendererComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AmazingTimePickerModule
  ],
  exports: [
    FormRendererComponent
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es-HN'},
    {provide: OwlDateTimeIntl, useClass: DefaultIntl}
  ]
})

export class FormRendererModule {}
