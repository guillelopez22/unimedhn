import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { AlertService } from '../components/alert_service/alert.service';
import { FormRendererComponent } from '../components/form_renderer/form_renderer.component';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'inventario',
  templateUrl: 'inventario.component.html'
})

export class InventarioComponent implements OnInit {
  @ViewChild('active_principle_form') active_principle_form: FormRendererComponent;
  @ViewChild('nombre_comercial_form') nombre_comercial_form: FormRendererComponent;
  @ViewChild('concentration_form') concentration_form: FormRendererComponent;
  @ViewChild('active_principle_modal') active_principle_modal: ModalDirective;
  @ViewChild('nombre_comercial_modal') nombre_comercial_modal: ModalDirective;
  @ViewChild('concentration_modal') concentration_modal: ModalDirective;
  @ViewChild('medicamentos_form') medicamentos_form: FormRendererComponent;
  @ViewChild('insumos_form') insumos_form: FormRendererComponent;
  medicamentos_datatable_loading: boolean;
  insumos_datatable: any;
  insumos_datatable_loading: boolean;
  medicamentos_datatable = {};
  inventory_datatable: any;
  inner_view = 1;
  main_view = false;
  create_med_view = false;
  unimed_inventory: any;
  create_insumo_view = false;
  inventory_main_view = true;
  inventory_datatable_loading: boolean;
  insumo_inputs = [];
  medicamento_inputs = [];
  nombre_comercial_inputs = [];
  principal_activo_inputs = [];
  concentration_inputs = [];
  total_active_principles = [];
  measurement_units = [];
  concentration_list = [];
  filtered_units: any;
  presentations = [];
  selected_active_desc = '';
  commercial_names = [];
  selected_trade_name_desc = '';
  selected_measure_unit = '';
  selected_institution: any;
  inventory_overview_data: any;
  insumos = [];
  medicamentos = [];
  page_header = 'Administrar inventario';
  constructor(private appService: AppService, public endpoint: AppEndpoints, private alertService: AlertService, ) {
    this.appService.pageTitle = 'Inventario';
    this.inventory_datatable_loading = true;
    this.medicamentos_datatable_loading = true;
    this.insumos_datatable_loading = true;
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
            class: 'col-md-2',
            inputs: [
              {
                type: 'text',
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
            class: 'col-md-2',
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
                  this.selected_measure_unit = event;
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
            class: 'col-md-4',
            inputs: [
              {
                type: 'decimal',
                extra: '',
                name: 'aus',
                label: 'AUS (Average Unit Served)',
                icon: '',
                class: 'form-control',
                placeholder: this.selected_measure_unit,
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
            class: 'col-md-4',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'numero_inventario',
                label: 'Numero de Inventario',
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
            class: 'col-md-3',
            inputs: [
              {
                type: 'decimal',
                extra: '',
                name: 'cantidad',
                label: 'Cantidad',
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
        ]
      },
    ];
    this.medicamento_inputs = [
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
                type: 'integer',
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
        ]
      },
    ];
    this.inventory_datatable = {
      // title: 'Listado de medicamentos',
      icon: 'user-md',
      object_description: 'inventory',
      empty_text: 'No se encontro inventario en instituciones',
      columns: [
        {
          column: 'nombre',
          wrap_column: false,
          header: 'Institucion',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'total_worth',
          wrap_column: true,
          header: 'Capital Disponible (Lempiras)',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'ciudad',
          wrap_column: true,
          header: 'Ciudad',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'total_alertas',
          wrap_column: true,
          header: 'Alertas',
          wrap_header: true,
          type: 'number'
        },
      ],
      events: [
        {
          name: 'Detalle de la Institucion',
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

  ngOnInit() {
    this.get_active_principle_total_list();
    this.get_concentration_list();
    this.get_measure_unit_list();
    this.get_presentation_list();
    this.get_overview_data();
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
          column: 'per_presentation',
          wrap_column: false,
          header: 'Unidades por Presentación',
          wrap_header: true,
          type: 'number'
        },
        {
          column: 'concentracion',
          wrap_column: true,
          header: 'Concentracion',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'in_stock',
          wrap_column: true,
          header: 'Stock',
          wrap_header: true,
          type: 'number'
        },
        {
          column: 'worth',
          wrap_column: true,
          header: 'Capital Invertido (Lemiras)',
          wrap_header: true,
          type: 'number'
        },
        {
          column: 'status',
          wrap_column: true,
          header: 'Estado',
          wrap_header: true,
          type: 'text'
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
          column: 'per_presentation',
          wrap_column: false,
          header: 'Unidades por Presentación',
          wrap_header: true,
          type: 'number'
        },
        {
          column: 'in_stock',
          wrap_column: true,
          header: 'Stock',
          wrap_header: true,
          type: 'number'
        },
        {
          column: 'worth',
          wrap_column: true,
          header: 'Capital Invertido (Lemiras)',
          wrap_header: true,
          type: 'number'
        },
        {
          column: 'status',
          wrap_column: true,
          header: 'Estado',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
      ],
      navigation_starting_offset_index: 0,
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right',
    };
   }

  open_medicamentos() {
    this.inner_view = 1;
  }

  open_insumos() {
    this.inner_view = 2;
  }

  add_medicamento() {
    this.create_med_view = true;
    this.create_insumo_view = false;
    this.main_view = false;
    this.inventory_main_view = false;
  }

  add_insumo() {
    this.create_insumo_view = true;
    this.create_med_view = false;
    this.main_view = false;
    this.inventory_main_view = false;
  }

  open_main_view(event) {
    if (event !== undefined) {
      console.log('====================================');
      console.log(event.data);
      console.log('====================================');
      this.selected_institution = event.data;
      if (event.data.id === 0) {
        this.medicamentos = event.data.medicamentos;
        this.insumos = event.data.insumos;
      } else {
        this.endpoint.get_institution_cartera(this.selected_institution.id).subscribe(data => {
          this.insumos = data.insumos;
          this.medicamentos = data.medicamentos;
        });
      }

      this.page_header = 'Administrar inventario/' + event.data.nombre;
      this.main_view = true;
      this.create_insumo_view = false;
      this.create_med_view = false;
      this.inventory_main_view = false;

    } else {
      this.main_view = true;
      this.create_insumo_view = false;
      this.create_med_view = false;
      this.inventory_main_view = false;
    }
  }

  open_inventory_main_view() {
    this.page_header = 'Administrar inventario';
    this.main_view = false;
    this.create_insumo_view = false;
    this.create_med_view = false;
    this.inventory_main_view = true;
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

  get_overview_data() {
    this.endpoint.get_all_cartera_info().subscribe(data => {
      this.inventory_overview_data = data;
    });
    this.endpoint.get_available_inventory().subscribe(data => {
      this.unimed_inventory = data;
      this.inventory_overview_data.push({
        id: 0,
        nombre: 'UNIMED',
        total_worth: this.unimed_inventory.total_worth,
        ciudad: 'HQ',
        medicamentos: this.unimed_inventory.medicamentos_inventory,
        insumos: this.unimed_inventory.insumos_inventory,
        total_alertas: 0
      });
    });
  }

  insert_medicamento_product() {
    if (this.medicamentos_form.valid()) {
      const form_values = this.medicamentos_form.get_values();

      const tradename = this.commercial_names.find(el => el.nombre = form_values.commercial_name);
      console.log(tradename);

      const measure_unit = this.measurement_units.find(el => el.name === form_values.measure_unit);
      const presentation = this.presentations.find(el => el.name === form_values.presentation);
      const concentration = this.concentration_list.find(el => el.description === form_values.concentration);
      const tradename_id = tradename.tradename_id;
      const presentation_id = presentation.presentation_id;
      const presentation_quantity = form_values.cantidad_presentacion;
      const presentation_measure_unit_id = measure_unit.measure_unit_id;
      const aus_measure_unit_id = measure_unit.measure_unit_id;
      const aus_quantity = form_values.aus;

      this.endpoint.insert_producto({
        tradename_id,
        presentation_id,
        presentation_quantity,
        presentation_measure_unit_id,
        aus_measure_unit_id,
        aus_quantity,
        concentration_id: concentration.concentration_id,
        description: ''
      }).subscribe(data => {
        // this.created_product_id = data.result.insertId;
          this.endpoint.insert_medicamento({
            nombre: form_values.active_principle,
            nombre_comercial: tradename.name,
            presentacion: presentation.name,
            concentracion: form_values.concentration,
            product_id: data.result.insertId,
          }).subscribe();
      },
      err => {
        this.alertService.alert_error(err.title, err.message);
      },
      () => {
        this.medicamentos_form.clean_form();
        this.alertService.alert_success('Exito', 'Operacion realizada de manera satisfactoria');
      });
    }
  }

  insert_insumo_product() {
    if (this.medicamentos_form.valid()) {
      const form_values = this.medicamentos_form.get_values();

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
      const aus_quantity = form_values.aus;

      this.endpoint.insert_producto({
        tradename_id,
        presentation_id,
        presentation_quantity,
        presentation_measure_unit_id,
        aus_measure_unit_id,
        aus_quantity,
        concentration_id: concentration,
        description: ''
      }).subscribe(data => {
        console.log(data);
        // this.created_product_id = data.result.insertId;
        this.endpoint.insert_insumo({
          tipo_insumo: form_values.tipo_insumo,
          nombre_comercial: tradename.name,
          presentacion: presentation.name,
          product_id: data.result.insertId,
        }).subscribe();
      },
        err => {
          this.alertService.alert_error(err.title, err.message);
        },
        () => {
          this.medicamentos_form.clean_form();
          this.alertService.alert_success('Exito', 'Operacion realizada de manera satisfactoria');
        });
    }
  }

}
