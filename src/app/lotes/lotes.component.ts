import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceDatatableComponent } from '../components/service_datatable/service-datatable.component';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { AlertService } from '../components/alert_service/alert.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormRendererComponent } from '../components/form_renderer/form_renderer.component';
import { FormControlDirective } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
@Component({
  selector: 'lotes',
  templateUrl: 'lotes.component.html',
  styles: [`
.calendar-button{
	border-top-right-radius: 0.25rem !important;
	border-bottom-right-radius: 0.25rem !important;
	background-color: #17b3a3;
	color:#fff;
}

.calendar-white{
	cursor: pointer;
	background-color: #fff !important;
}

.calendar-grey{

}

.owl-dt-trigger-disabled{
	opacity: 1 !important;
}
    `]

})

export class LotesComponent implements OnInit {
  @ViewChild('inventory_in_form') inventory_in_form: FormControlDirective;
  @ViewChild('medicamentos_datatable_ref') medicamentos_datatable_ref: ServiceDatatableComponent;
  @ViewChild('insumos_datatable_ref') insumos_datatable_ref: ServiceDatatableComponent;
  @ViewChild('confirmation_modal') confirmation_modal: ModalDirective;
  @ViewChild('medicamentos_modal') medicamentos_modal: ModalDirective;
  @ViewChild('insumos_modal') insumos_modal: ModalDirective;
  @ViewChild('confirmation_form') confirmation_form: FormRendererComponent;
  @ViewChild('lotes_datatable_ref') lotes_datatable_ref: ServiceDatatableComponent;
  @ViewChild('active_principle_form') active_principle_form: FormRendererComponent;
  @ViewChild('nombre_comercial_form') nombre_comercial_form: FormRendererComponent;
  @ViewChild('concentration_form') concentration_form: FormRendererComponent;
  @ViewChild('active_principle_modal') active_principle_modal: ModalDirective;
  @ViewChild('nombre_comercial_modal') nombre_comercial_modal: ModalDirective;
  @ViewChild('concentration_modal') concentration_modal: ModalDirective;
  @ViewChild('medicamentos_form') medicamentos_form: FormRendererComponent;
  @ViewChild('insumos_form') insumos_form: FormRendererComponent;
  @ViewChild('batch_product_form') batch_product_form: FormRendererComponent;
  @ViewChild('batch_form') batch_form: FormRendererComponent;
  public integer_mask = createNumberMask({ allowNegative: true, allowDecimal: false, integerLimit: 25, prefix: '', includeThousandsSeparator: true });
  public decimal_mask = createNumberMask({ allowNegative: true, allowDecimal: true, integerLimit: 25, decimalLimit: 25, prefix: '', includeThousandsSeparator: true });
  public header = 'Administrar Lotes';
  public small_text = 'Administra los lotes de medicamentos e insumos';
  public total = 0;
  public confirmation_inputs = [];
  public no_edit = false;
  public submitted: any;
  public selected_medicamento: any;
  public selected_insumo: any;
  public selected_id: any;
  public lotes_datatable: any;
  public lotes_datatable_loading: boolean;
  public unit_price = 0;
  public quantity = 0;
  public main_view = false;
  public lote_main_view = true;
  public lotes = [];
  public medicamentos = [];
  public insumos = [];
  public medicamento_inputs = [];
  public nombre_comercial_inputs = [];
  public principal_activo_inputs = [];
  public concentration_inputs = [];
  public insumo_inputs = [];
  public lote_inputs = [];
  public total_active_principles = [];
  public measurement_units = [];
  public concentration_list = [];
  public presentations = [];
  public selected_active_desc = '';
  public commercial_names = [];
  public selected_trade_name_desc = '';
  public selected_measure_unit = '';
  public fecha_caducidad = '';
  public medicamentos_datatable_loading: boolean;
  public insumos_datatable: any;
  public filtered_units = [];
  public insumos_datatable_loading: boolean;
  public medicamentos_datatable = {};
  public selected_products = [];
  public inner_view = 1;
  public created_batch = false;
  public lotes_filters = {
    current_offset: 1,
    view_length: 10,
    sort_order: '',
    sort_ascendent: false
  };
  public lotes_search_data = {
    nombre: '',
    ciudad: '',
    departamento: '',
    calendario: '',
    tipo: ''
  };
  constructor(private appService: AppService, public endpoint: AppEndpoints, private alertService: AlertService) {
    this.submitted = false;
    this.lotes_datatable_loading = false;
    this.medicamentos_datatable_loading = true;
    this.insumos_datatable_loading = true;
    this.confirmation_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'calendar',
                extra: 'popup',
                name: 'expiration_date',
                label: 'Fecha de Caducidad',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'decimal',
                extra: 'popup',
                name: 'unit_price',
                label: 'Precio Unitario',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'decimal',
                extra: '',
                name: 'quantity',
                label: 'Cantidad',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
        ]
      },
    ];
    this.nombre_comercial_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-12',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'nombre',
                label: 'Principal Activo',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.total_active_principles;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-12',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'n_nombre_comercial',
                label: 'Nombre',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: '',
                  text: ''
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-12',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'n_description',
                label: 'Descripcion',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: '',
                  text: ''
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return false;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
        ]
      },
    ];
    this.principal_activo_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-12',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'p_nombre',
                label: 'Nombre',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-12',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'p_description',
                label: 'Descripcion',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: '',
                  text: ''
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
        ]
      },
    ];
    this.concentration_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'quantity1',
                label: 'Cantidad de Activo',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'measure_unit1',
                label: 'Unidades',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.measurement_units;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'quantity2',
                label: 'Cantidad de Activo',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'measure_unit2',
                label: 'Unidades',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.measurement_units;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
        ]
      },
    ];
    this.insumo_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'active_principle',
                label: 'Principal Activo',
                icon: '',
                class: 'form-control',
                placeholder: ' - Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.total_active_principles;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                  const found = this.total_active_principles.find(el => el.name === event);
                  this.selected_active_desc = found.description;
                  this.endpoint.get_tradename_list(found.active_principle_id).subscribe(data => {
                    this.commercial_names = data;
                  });
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'commercial_name',
                label: 'Nombre Comercial',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.commercial_names;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {

                  const found = this.commercial_names.find(el => el.name === event);

                  this.selected_trade_name_desc = found.description;

                },
                input: () => {
                }
              }
            ]
          },
        ]
      },
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'presentation',
                label: 'Presentación del Fármaco',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.presentations;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'integer',
                extra: '',
                name: 'cantidad_presentacion',
                label: 'Cantidad por Presentación',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: 0,
                maxlength: 3,
                pattern: '',
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: '',
                  text: ''
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'measure_unit',
                label: 'Unidades',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.measurement_units;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                  this.selected_measure_unit = event;
                  this.filtered_units = this.measurement_units.filter(el => el.name === event);
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'tipo_insumo',
                label: 'Tipo de Insumo',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: '',
                  text: ''
                },
                list: () => {
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'integer',
                extra: '',
                name: 'aus',
                label: 'AUS (Average Unit Served)',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: '',
                  text: ''
                },
                list: () => {
                  return false;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'measure_unit',
                label: 'AUS unidades',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.filtered_units;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'integer',
                extra: '',
                name: 'pum',
                label: 'PUM',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'measure_unit',
                label: 'PUM unidades',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.measurement_units;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
        ]
      },
    ];
    this.medicamento_inputs =  [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'active_principle',
                label: 'Principal Activo',
                icon: '',
                class: 'form-control',
                placeholder: ' - Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.total_active_principles;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                  const found = this.total_active_principles.find(el => el.name === event);
                  this.selected_active_desc = found.description;
                  this.endpoint.get_tradename_list(found.active_principle_id).subscribe(data => {
                    this.commercial_names = data;
                  });
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'commercial_name',
                label: 'Nombre Comercial',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.commercial_names;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {

                  const found = this.commercial_names.find(el => el.name === event);

                  this.selected_trade_name_desc = found.description;

                },
                input: () => {
                }
              }
            ]
          },
        ]
      },
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'presentation',
                label: 'Presentación del Fármaco',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.presentations;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'integer',
                extra: '',
                name: 'cantidad_presentacion',
                label: 'Cantidad por Presentación',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: 0,
                maxlength: 3,
                pattern: '',
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: '',
                  text: ''
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'measure_unit',
                label: 'Unidades',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.measurement_units;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                  this.selected_measure_unit = event;
                  this.filtered_units = this.measurement_units.filter(el => el.name === event);
                  console.log(this.filtered_units);

                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'concentration',
                label: 'Concentración',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'description',
                  text: 'description'
                },
                list: () => {
                  return this.concentration_list;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          }
        ]
      },
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'decimal',
                extra: '',
                name: 'aus',
                label: 'AUS (Average Unit Served)',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'measure_unit',
                label: 'AUS unidades',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.measurement_units;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'decimal',
                extra: '',
                name: 'pum',
                label: 'PUM',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'select',
                extra: '',
                name: 'measure_unit',
                label: 'PUM unidades',
                icon: '',
                class: 'form-control',
                placeholder: '- Seleccione -',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return this.measurement_units;
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
        ]
      },
    ];
    this.lote_inputs = [
      {
        class: 'd-flex align-items-center',
        columns: [
          {
            class: 'col-md-12',
            inputs: [
              {
                type: 'calendar',
                extra: 'popup',
                name: 'purchase_date',
                label: 'Fecha de Compra',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: '100',
                pattern: null,
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: 'name',
                  text: 'name'
                },
                list: () => {
                  return [];
                },
                textmask: () => {
                  return false;
                },
                required: () => {
                  return true;
                },
                disabled: () => {
                  return false;
                },
                change: (event) => {
                },
                input: () => {
                }
              }
            ]
          },
        ]
      },
    ];
  }

  ngOnInit() {
    this.set_values();
    this.medicamentos_datatable = {
      // title: 'Listado de medicamentos',
      icon: 'user-md',
      object_description: 'doctors',
      empty_text: 'No se encontraron medicamentos',
      columns: [
        {
          column: 'nombre',
          wrap_column: false,
          header: 'Quimico',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'nombre_comercial',
          wrap_column: true,
          header: 'Nombre Comercial',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'presentacion',
          wrap_column: false,
          header: 'Presentación del Fármaco',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'concentracion',
          wrap_column: true,
          header: 'Concentracion',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Ver lotes para medicamento',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        {
          name: 'Crear lote para medicamento',
          style: 'color:#3CB371',
          hover_style: 'cursor:pointer; color:#3CB371; background-color:#98FB98 !important;',
          icon: 'check'
        },
      ],
      navigation_starting_offset_index: 0,
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right',
    };
    this.insumos_datatable = {
      // title: 'Listado de medicamentos',
      icon: 'user-md',
      object_description: 'insumos',
      empty_text: 'No se encontraron insumos',
      columns: [
        {
          column: 'tipo_insumo',
          wrap_column: false,
          header: 'Tipo de Insumo',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'nombre_comercial',
          wrap_column: true,
          header: 'Nombre Comercial',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'presentacion',
          wrap_column: true,
          header: 'Presentacion',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Ver lotes para insumo',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        {
          name: 'Crear lote para insumo',
          style: 'color:#3CB371',
          hover_style: 'cursor:pointer; color:#3CB371; background-color:#98FB98 !important;',
          icon: 'check'
        },
      ],
      navigation_starting_offset_index: 0,
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right',
    };
    this.lotes_datatable = {
      // title: 'Listado de medicamentos',
      icon: 'user-md',
      object_description: 'lotes',
      empty_text: 'No se encontraron lotes',
      columns: [
        {
          column: 'batch_id',
          wrap_column: false,
          header: 'Numero de Lote',
          wrap_header: true,
          type: 'number'
        },
        {
          column: 'purchase_date',
          wrap_column: true,
          header: 'Fecha de Compra',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'batch_total',
          wrap_column: true,
          header: 'Capital Invertido (Lempiras)',
          wrap_header: true,
          type: 'number'
        },
      ],
      events: [
        {
          name: 'Ver lote',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
      ],
      navigation_starting_offset_index: 0,
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right',
    };
  }

  set_values() {
    this.get_medicamentos();
    this.get_insumos();
    this.get_all_batchs();
    this.get_active_principle_total_list();
    this.get_concentration_list();
    this.get_measure_unit_list();
    this.get_presentation_list();
  }

  valid() {
    if (this.inventory_in_form.valid) {
      this.submitted = false;
      return true;
    } else {
      this.submitted = true;
      return false;
    }
  }

  open_main_view(event) {
    if (event === undefined) {
      this.set_values();
      this.lote_main_view = false;
      this.main_view = true;
    } else if (event.event === 'Ver lote') {
      console.log(event.data);
      this.header = 'Lote No. ' + event.data.batch_id;
      this.small_text = 'Adquirido ' + event.data.purchase_date + ' por un total de ' + event.data.batch_total + ' Lempiras';
      this.endpoint.get_batch(event.data.batch_id).subscribe(data => {
        this.medicamentos = data.medicamentos;
        this.medicamentos.forEach(el => {
          const date = new Date(el.expiration_date).toLocaleDateString('es-HN');
          el.expiration_date = date;
        });
        this.insumos = data.insumos;
        this.insumos.forEach(el => {
          const date = new Date(el.expiration_date).toLocaleDateString('es-HN');
          el.expiration_date = date;
        });
        this.lote_main_view = false;
        this.main_view = true;
        this.medicamentos_datatable = {
          // title: 'Listado de medicamentos',
          icon: 'user-md',
          object_description: 'medicamentos',
          empty_text: 'No se encontraron medicamentos',
          columns: [
            {
              column: 'nombre',
              wrap_column: false,
              header: 'Quimico',
              wrap_header: true,
              type: 'text'
            },
            {
              column: 'nombre_comercial',
              wrap_column: true,
              header: 'Nombre Comercial',
              wrap_header: true,
              type: 'text'
            },
            {
              column: 'presentacion',
              wrap_column: false,
              header: 'Presentación del Fármaco',
              wrap_header: true,
              type: 'text'
            },
            {
              column: 'concentracion',
              wrap_column: true,
              header: 'Concentracion',
              wrap_header: true,
              type: 'text'
            },
            {
              column: 'quantity',
              wrap_column: true,
              header: 'Unidades en Lote',
              wrap_header: true,
              type: 'text'
            },
            {
              column: 'unit_price',
              wrap_column: true,
              header: 'Precio (Lempiras)',
              wrap_header: true,
              type: 'number'
            },
            {
              column: 'expiration_date',
              wrap_column: true,
              header: 'Fecha de Caducidad',
              wrap_header: true,
              type: 'date'
            },
          ],
          events: [
          ],
          navigation_starting_offset_index: 0,
          navigation_offsets: [5, 10, 15, 20, 25, 50],
          show_search_field: true,
          table_icon: 'caret-right',
        };
        this.insumos_datatable = {
          // title: 'Listado de medicamentos',
          icon: 'user-md',
          object_description: 'insumos',
          empty_text: 'No se encontraron insumos',
          columns: [
            {
              column: 'tipo_insumo',
              wrap_column: false,
              header: 'Tipo de Insumo',
              wrap_header: true,
              type: 'text'
            },
            {
              column: 'nombre_comercial',
              wrap_column: true,
              header: 'Nombre Comercial',
              wrap_header: true,
              type: 'text'
            },
            {
              column: 'presentacion',
              wrap_column: true,
              header: 'Presentacion',
              wrap_header: true,
              type: 'text'
            },
            {
              column: 'quantity',
              wrap_column: true,
              header: 'Unidades en Lote',
              wrap_header: true,
              type: 'text'
            },
            {
              column: 'unit_price',
              wrap_column: true,
              header: 'Precio (Lempiras)',
              wrap_header: true,
              type: 'number'
            },
            {
              column: 'expiration_date',
              wrap_column: true,
              header: 'Fecha de Caducidad',
              wrap_header: true,
              type: 'date'
            },
          ],
          events: [
          ],
          navigation_starting_offset_index: 0,
          navigation_offsets: [5, 10, 15, 20, 25, 50],
          show_search_field: true,
          table_icon: 'caret-right',
        };
        this.no_edit = true;
      });
    }
  }

  open_lote_main_view() {
    this.lote_main_view = true;
    this.main_view = false;
    this.no_edit = false;
    this.medicamentos_datatable = {
      // title: 'Listado de medicamentos',
      icon: 'user-md',
      object_description: 'medicamentos',
      empty_text: 'No se encontraron medicamentos',
      columns: [
        {
          column: 'nombre',
          wrap_column: false,
          header: 'Quimico',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'nombre_comercial',
          wrap_column: true,
          header: 'Nombre Comercial',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'presentacion',
          wrap_column: false,
          header: 'Presentación del Fármaco',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'presentation_quantity',
          wrap_column: false,
          header: 'Cantidad de Presentación',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'concentracion',
          wrap_column: true,
          header: 'Concentracion',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Ver lotes para medicamento',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        {
          name: 'Crear lote para medicamento',
          style: 'color:#3CB371',
          hover_style: 'cursor:pointer; color:#3CB371; background-color:#98FB98 !important;',
          icon: 'check'
        },
      ],
      navigation_starting_offset_index: 0,
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right',
    };
    this.insumos_datatable = {
      // title: 'Listado de medicamentos',
      icon: 'user-md',
      object_description: 'insumos',
      empty_text: 'No se encontraron insumos',
      columns: [
        {
          column: 'tipo_insumo',
          wrap_column: false,
          header: 'Tipo de Insumo',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'nombre_comercial',
          wrap_column: true,
          header: 'Nombre Comercial',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'presentacion',
          wrap_column: true,
          header: 'Presentacion',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Ver lotes para insumo',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        {
          name: 'Crear lote para insumo',
          style: 'color:#3CB371',
          hover_style: 'cursor:pointer; color:#3CB371; background-color:#98FB98 !important;',
          icon: 'check'
        },
      ],
      navigation_starting_offset_index: 0,
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right',
    };
    this.header = 'Administrar Lotes';
    this.small_text = 'Administra los lotes de medicamentos e insumos';
    this.selected_products = [];
  }

  change(event) {
    console.log(event);

    this.fecha_caducidad = event;
  }

  open_medicamentos() {
    this.inner_view = 1;
  }

  open_insumos() {
    this.inner_view = 2;
  }

  get_medicamentos() {
    this.endpoint.get_all_medicamentos().subscribe(data => {
      this.medicamentos = data;
      this.medicamentos_datatable_loading = false;
    });
  }

  get_insumos() {
    this.endpoint.get_all_insumos().subscribe(data => {
      this.insumos = data;
      this.insumos_datatable_loading = false;
    });
  }

  medicamentos_datatable_events(event) {
    console.log(event.data);
    if (event.event === 'Crear lote para medicamento') {
      this.selected_medicamento = event.data;
      this.selected_id = this.selected_medicamento.medicamento_id;
      // this.confirmation_modal.show();
      this.selected_products.push({
        product_id: event.data.product_id,
        nombre: event.data.nombre,
        nombre_comercial: event.data.nombre_comercial,
        presentacion: event.data.presentacion,
        presentation_quantity: event.data.presentation_quantity,
        aus: event.data.aus_quantity,
        desc: event.data.concentracion,
        type: 'medicamento'
      });
      console.log(this.selected_products);

    }
  }

  get_all_batchs() {
    this.endpoint.get_all_batchs().subscribe(data => {
      this.lotes = data;
      this.lotes.forEach(el => {
        const date = new Date(el.purchase_date);
        el.purchase_date = date.toDateString();
      });
    });
  }

  insumos_datatable_events(event) {
    if (event.event === 'Crear lote para insumo') {
      this.selected_insumo = event.data;
      this.selected_id = this.selected_insumo.insumo_id;
      // this.confirmation_modal.show();
      this.selected_products.push({
        product_id: event.data.product_id,
        nombre: event.data.tipo_insumo,
        nombre_comercial: event.data.nombre_comercial,
        presentacion: event.data.presentacion,
        presentation_quantity: event.data.presentation_quantity,
        aus: event.data.aus_quantity,
        type: 'insumo'
      });
      console.log(this.selected_products);

    }
  }

  insert_batch() {

    if (this.batch_form.valid() && this.valid()) {
      this.selected_products.forEach(el => {
        const date = new Date(el.fecha_caducidad).toLocaleDateString('en-GB');
        el.fecha_caducidad = date.split('/').reverse().join('-');
      });
      const form_values = this.batch_form.get_values();
      this.endpoint.insert_batch({
        purchase_date: form_values.purchase_date.split('/').reverse().join('-'),
      }).subscribe(data => {
        this.created_batch = true;
        this.get_all_batchs();
        this.selected_products.forEach(product => {
          this.endpoint.insert_batch_product({
            expiration_date: product.fecha_caducidad,
            unit_price: product.unit_price.replace(/[^\d\.\-]/g, ''),
            quantity: product.quantity.replace(/[^\d\.\-]/g, ''),
            product_id: product.product_id,
            batch_id: data.batch_id,
            presentation_quantity: product.presentation_quantity,
            aus: product.aus
          }).subscribe(() => {
            this.get_all_batchs();
            this.selected_products = [];
            this.open_lote_main_view();
          });
        });
      },
        err => {
          this.alertService.alert_error('Error', err.message);
        },
        () => {
          this.alertService.alert_success('Exito', 'El lote ha sido creado de manera satisfactoria.');
          this.batch_form.clean_form();
        });
    }
  }

  get_concentration_list() {
    this.endpoint.get_concentrations_list().subscribe(data => {
      this.concentration_list = data;
    });
  }

  get_measure_unit_list() {
    this.endpoint.get_measure_units_list().subscribe(data => {
      this.measurement_units = data;
    });
  }

  get_presentation_list() {
    this.endpoint.get_presentation_list().subscribe(data => {
      this.presentations = data;
    });
  }

  insert_nombre_comercial() {
    if (this.nombre_comercial_form.valid()) {
      const form_values = this.nombre_comercial_form.get_values();
      const found = this.total_active_principles.find(el => el.name === form_values.nombre);
      this.endpoint.insert_tradename({
        active_principle_id: found.active_principle_id,
        name: form_values.n_nombre_comercial,
        description: form_values.n_description
      }).subscribe(() => {
        this.get_presentation_list();
      },
        err => {
          this.alertService.alert_error(err.title, err.message);
        },
        () => {
          this.alertService.alert_success('Exito', 'se ha agregado el nombre comercial con exito');
          this.nombre_comercial_form.clean_form();
        });
    }
  }

  open_nombre_comercial() {
    this.nombre_comercial_modal.show();
  }

  get_active_principle_total_list() {
    this.endpoint.get_active_principle_total_list().subscribe(data => {
      this.total_active_principles = data;
      this.total_active_principles.forEach(el => {
        el.text = el.name;
        el.value = el.name;
      });
    });
  }

  value_change(event) {
    if (event.unit_price !== undefined && event.quantity !== undefined  && event.unit_price !== '' && event.quantity !== '') {
      event.total = parseFloat(event.unit_price.replace(',', '')) * parseFloat(event.quantity.replace(',', ''));
      this.total = 0;
      this.selected_products.forEach(el => {
        this.total += parseFloat(el.total);
      });
    } else {
      event.total = 0;
    }
  }

  insert_concentration() {
    if (this.concentration_form.valid()) {
      const form_values = this.concentration_form.get_values();
      const found1 = this.measurement_units.find(el => el.name = form_values.measure_unit1);
      const found2 = this.measurement_units.find(el => el.name = form_values.measure_unit2);
      this.endpoint.insert_concentrations({
        quantity1: form_values.quantity1,
        measure_unit_id1: found1.measure_unit_id,
        quantity2: form_values.quantity2,
        measure_unit_id2: found2.measure_unit_id,
        description: `${form_values.quantity1}${form_values.measure_unit1}/${form_values.quantity2}${form_values.measure_unit2}`
      }).subscribe(() => {
        this.get_concentration_list();
      },
        err => {
          this.alertService.alert_error(err.title, err.message);
        },
        () => {
          this.concentration_form.clean_form();
          this.alertService.alert_success('Exito', 'La operacion se ha realizado de manera satisfactoria');
          this.concentration_modal.hide();
        });
    }
  }

  insert_active_principle() {
    if (this.active_principle_form.valid()) {
      const form_values = this.active_principle_form.get_values();
      this.endpoint.insert_active_principle({
        name: form_values.p_nombre,
        description: form_values.p_description
      }).subscribe(() => {
        this.get_active_principle_total_list();
      },
        err => {
          this.alertService.alert_error(err.title, err.message);
        }, () => {
          this.alertService.alert_success('Exito', 'Se ha agregado el principal activo con exito');
          this.active_principle_form.clean_form();
        });
    }
  }

  open_active_principle() {
    this.active_principle_modal.show();
  }

  open_concentration() {
    this.concentration_modal.show();
  }

  cancel_med() {
    this.medicamentos_form.clean_form();
  }

  cancel_insumo() {
    this.insumos_form.clean_form();
  }

  insert_medicamento_product() {
    if (this.medicamentos_form.valid()) {
      const form_values = this.medicamentos_form.get_values();

      const tradename = this.commercial_names.find(el => el.nombre = form_values.commercial_name);
      const measure_unit = this.measurement_units.find(el => el.name === form_values.measure_unit);
      const presentation = this.presentations.find(el => el.name === form_values.presentation);
      const concentration = this.concentration_list.find(el => el.description === form_values.concentration);
      const tradename_id = tradename.tradename_id;
      const presentation_id = presentation.presentation_id;
      const presentation_quantity = form_values.cantidad_presentacion;
      const presentation_measure_unit_id = measure_unit.measure_unit_id;
      const aus_measure_unit_id = measure_unit.measure_unit_id;
      const aus_quantity = parseFloat(form_values.aus.replace(',', ''));
      const pum = parseFloat(form_values.pum.replace(',', ''));
      const pum_measure_unit_id = measure_unit.measure_unit_id;
      this.endpoint.insert_producto({
        tradename_id,
        presentation_id,
        presentation_quantity,
        presentation_measure_unit_id,
        aus_measure_unit_id,
        aus_quantity,
        concentration_id: concentration.concentration_id,
        pum,
        pum_measure_unit_id
      }).subscribe(data => {
        // this.created_product_id = data.result.insertId;
        this.endpoint.insert_medicamento({
          nombre: form_values.active_principle,
          nombre_comercial: tradename.name,
          presentacion: presentation.name,
          concentracion: form_values.concentration,
          product_id: data.result.insertId,
        }).subscribe(() => {
          this.set_values();
        });
      },
        err => {
          this.alertService.alert_error(err.title, err.message);
        },
        () => {
          this.medicamentos_form.clean_form();
          this.alertService.alert_success('Exito', 'Operacion realizada de manera satisfactoria');
          this.medicamentos_modal.hide();
        });
    }
  }

  insert_insumo_product() {
    if (this.insumos_form.valid()) {
      const form_values = this.insumos_form.get_values();

      const tradename = this.commercial_names.find(el => el.nombre = form_values.commercial_name);
      console.log(tradename);

      const measure_unit = this.measurement_units.find(el => el.name === form_values.measure_unit);
      const presentation = this.presentations.find(el => el.name === form_values.presentation);
      const concentration = 0;
      const tradename_id = tradename.tradename_id;
      const presentation_id = presentation.presentation_id;
      const presentation_quantity = form_values.cantidad_presentacion;
      const presentation_measure_unit_id = measure_unit.measure_unit_id;
      const aus_measure_unit_id = measure_unit.measure_unit_id;
      const aus_quantity = parseFloat(form_values.aus.replace(',', ''));
      const pum = parseFloat(form_values.pum.replace(',', ''));
      const pum_measure_unit_id = measure_unit.measure_unit_id;
      this.endpoint.insert_producto({
        tradename_id,
        presentation_id,
        presentation_quantity,
        presentation_measure_unit_id,
        aus_measure_unit_id,
        aus_quantity,
        concentration_id: concentration,
        pum,
        pum_measure_unit_id
      }).subscribe(data => {
        console.log(data);
        // this.created_product_id = data.result.insertId;
        this.endpoint.insert_insumo({
          tipo_insumo: form_values.tipo_insumo,
          nombre_comercial: tradename.name,
          presentacion: presentation.name,
          product_id: data.result.insertId,
        }).subscribe(() => {
          this.set_values();
        });
      },
        err => {
          this.alertService.alert_error(err.title, err.message);
        },
        () => {
          this.insumos_form.clean_form();
          this.alertService.alert_success('Exito', 'Operacion realizada de manera satisfactoria');
          this.insumos_modal.hide();
        });
    }
  }

  // lotes_datatable_events(event) {
  //   console.log(event.data);

  //   if (event.event === 'Detalle del Lote') {
  //     // this.open_institucion(event.data);
  //     // } else if (event.event == "Editar Institución") {
  //     //     this.open_update_institucion(event.data);
  //   } else if (event.event === 'Eliminar Lote') {
  //     // this.open_delete_institucion(event.data);
  //   }
  // }

  // lotes_datatable_get_results_offset_change(data) {
  //   this.lotes_filters = {
  //     current_offset: data.current_offset,
  //     view_length: data.view_length,
  //     sort_order: data.sort_order,
  //     sort_ascendent: data.sort_ascendent
  //   }
  //   let response;
  //   let load = {
  //     current_offset: this.lotes_filters.current_offset,
  //     sort_ascendent: this.lotes_filters.sort_ascendent,
  //     sort_order: this.lotes_filters.sort_order,
  //     view_length: this.lotes_filters.view_length,
  //     nombre: this.lotes_search_data.nombre,
  //     ciudad: this.lotes_search_data.ciudad,
  //     departamento: this.lotes_search_data.departamento,
  //     calendario: this.lotes_search_data.calendario,
  //     tipo: this.lotes_search_data.tipo
  //   }
  //   this.endpoint.get_instituciones(load).subscribe(
  //     data => response = data,
  //     err => {
  //       this.lotes_datatable_ref.set_loading(false);
  //       if (err.status && err.error) {
  //         this.alertService.alert_message(err.status, err.error);
  //       } else {
  //         this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
  //       }
  //     },
  //     () => {
  //       try {
  //         console.log(response);
  //         for (let i = 0; i < response.list.length; i++) {
  //           response.list[i].contactos = JSON.parse(response.list[i].contactos);
  //           response.list[i].inicio_clases = response.list[i].inicio_clases.split('-').reverse().join('/');
  //         }
  //         this.lotes_datatable_ref.set_results_offset_change(response.list);
  //       } catch (error) {
  //         console.log(error);

  //         this.lotes_datatable_ref.set_loading(false);
  //         this.alertService.alert_aplication_error('Error Interno del Aplicativo');
  //       }

  //     }
  //   );
  // }

  // lotes_datatable_get_results_filter_change(data) {
  //   this.lotes_filters = {
  //     current_offset: data.current_offset,
  //     view_length: data.view_length,
  //     sort_order: data.sort_order,
  //     sort_ascendent: data.sort_ascendent
  //   }
  //   let response;
  //   let load = {
  //     current_offset: this.lotes_filters.current_offset,
  //     sort_ascendent: this.lotes_filters.sort_ascendent,
  //     sort_order: this.lotes_filters.sort_order,
  //     view_length: this.lotes_filters.view_length,
  //     nombre: this.lotes_search_data.nombre,
  //     ciudad: this.lotes_search_data.ciudad,
  //     departamento: this.lotes_search_data.departamento,
  //     calendario: this.lotes_search_data.calendario,
  //     tipo: this.lotes_search_data.tipo
  //   }
  //   this.endpoint.get_instituciones(load).subscribe(
  //     data => response = data,
  //     err => {
  //       this.lotes_datatable_ref.set_loading(false);
  //       if (err.status && err.error) {
  //         this.alertService.alert_message(err.status, err.error);
  //       } else {
  //         this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
  //       }
  //     },
  //     () => {
  //       try {
  //         console.log(response, 'asdasdas');
  //         for (let i = 0; i < response.list.length; i++) {
  //           response.list[i].contactos = JSON.parse(response.list[i].contactos);
  //           response.list[i].inicio_clases = response.list[i].inicio_clases.split('-').reverse().join('/');
  //         }
  //         this.lotes_datatable_ref.set_results_filter_change(response.list, response.count);
  //       } catch (error) {
  //         console.log(error);

  //         this.lotes_datatable_ref.set_loading(false);
  //         this.alertService.alert_aplication_error('Error Interno del Aplicativo');
  //       }
  //     }
  //   );
  // }

  // lotes_datatable_get_results_update_list(data) {
  //   this.lotes_filters = {
  //     current_offset: data.current_offset,
  //     view_length: data.view_length,
  //     sort_order: data.sort_order,
  //     sort_ascendent: data.sort_ascendent
  //   }
  //   let response;
  //   let load = {
  //     current_offset: this.lotes_filters.current_offset,
  //     sort_ascendent: this.lotes_filters.sort_ascendent,
  //     sort_order: this.lotes_filters.sort_order,
  //     view_length: this.lotes_filters.view_length,
  //     nombre: this.lotes_search_data.nombre,
  //     ciudad: this.lotes_search_data.ciudad,
  //     departamento: this.lotes_search_data.departamento,
  //     calendario: this.lotes_search_data.calendario,
  //     tipo: this.lotes_search_data.tipo
  //   }
  //   this.endpoint.get_instituciones(load).subscribe(
  //     data => response = data,
  //     err => {
  //       this.lotes_datatable_ref.set_loading(false);
  //       if (err.status && err.error) {
  //         this.alertService.alert_message(err.status, err.error);
  //       } else {
  //         this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
  //       }
  //     },
  //     () => {
  //       try {
  //         console.log(response);
  //         for (let i = 0; i < response.list.length; i++) {
  //             response.list[i].contactos = JSON.parse(response.list[i].contactos);
  //             response.list[i].inicio_clases = response.list[i].inicio_clases.split('-').reverse().join('/');
  //         }
  //         this.lotes_datatable_ref.set_results_update_list(response.list, response.count);
  //       } catch (error) {
  //         console.log(error);

  //         this.lotes_datatable_ref.set_loading(false);
  //         this.alertService.alert_aplication_error('Error Interno del Aplicativo');
  //       }
  //     }
  //   );
  // }

  // ngAfterViewInit() {
  //   setTimeout(() => { this.lotes_datatable_ref.set_show_length(10); }, 500);

  // }
}
