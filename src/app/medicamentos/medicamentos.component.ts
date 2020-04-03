import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceDatatableComponent } from '../components/service_datatable/service-datatable.component';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { AlertService } from '../components/alert_service/alert.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormRendererComponent } from '../components/form_renderer/form_renderer.component';

@Component({
  selector: 'medicamentos',
  templateUrl: 'medicamentos.component.html',
  styleUrls: [
    '../../vendor/libs/spinkit/spinkit.scss'
  ]
})

export class MedicamentosComponent implements OnInit {
  @ViewChild('medicamentos_datatable_ref') medicamentos_datatable_ref: ServiceDatatableComponent;
  @ViewChild('insumos_datatable_ref') insumos_datatable_ref: ServiceDatatableComponent;
  @ViewChild('medicamentos_modal') medicamentos_modal: ModalDirective;
  @ViewChild('concentration_modal') concentration_modal: ModalDirective;
  @ViewChild('confirmation_modal') confirmation_modal: ModalDirective;
  @ViewChild('nombre_comercial_modal') nombre_comercial_modal: ModalDirective;
  @ViewChild('active_principle_modal') active_principle_modal: ModalDirective;
  @ViewChild('insumos_modal') insumos_modal: ModalDirective;
  @ViewChild('nombre_comercial_form') nombre_comercial_form: FormRendererComponent;
  @ViewChild('active_principle_form') active_principle_form: FormRendererComponent;
  @ViewChild('concentration_form') concentration_form: FormRendererComponent;
  @ViewChild('medicamentos_form') medicamentos_form: FormRendererComponent;
  @ViewChild('insumos_form') insumos_form: FormRendererComponent;
  @ViewChild('confirmation_form') confirmation_form: FormRendererComponent;
  public create_med_view = false;
  public medicamentos_datatable: any;
  public tradenames_datatable: any;
  public insumos_datatable: any;
  public medicamentos_datatable_loading: boolean;
  public tradenames_datatable_loading: boolean;
  public insumos_datatable_loading: boolean;
  public medicamentos_filters = {
    current_offset: 1,
    view_length: 10,
    sort_order: '',
    sort_ascendent: false
  };
  public insumo_id = -1;
  public medicamento_id = -1;
  public inventory_type = 0;
  public created_product_id = '';
  public insumos = [];
  public medicamentos = [];
  public med = true;
  public ins = false;
  public nombre_comercial_inputs = [];
  public principal_activo_inputs = [];
  public concentration_inputs = [];
  public medicamento_inputs = [];
  public tradenames = [];
  public selected_measure_unit = '';
  public presentations = [];
  public measurement_units = [];
  public concentration_list = [];
  public total_active_principles = [];
  public confirmation_inputs = [];
  public commercial_names = [];
  public selected_active_desc = '';
  public selected_trade_name_desc = '';
  public main_view = true;
  public detail_view = false;
  constructor(private appService: AppService, public endpoint: AppEndpoints, private alertService: AlertService, ) {
    this.appService.pageTitle = 'Inventario';
    this.medicamentos_datatable_loading = true;
    this.tradenames_datatable_loading = true;
    this.medicamento_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-4',
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
            class: 'col-md-8',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'active_principle_desc',
                label: 'Descripcion',
                icon: '',
                class: 'form-control',
                placeholder: this.selected_active_desc,
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
                  return true;
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
          {
            class: 'col-md-8',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'nombre_comercial_desc',
                label: 'Descripcion',
                icon: '',
                class: 'form-control',
                placeholder: this.selected_trade_name_desc,
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'value',
                  text: 'text'
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
                  return true;
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
                type: 'text',
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
            class: 'col-md-3',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'cantidad_dosis',
                label: 'Dosis',
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
    this.confirmation_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-3',
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
            class: 'col-md-3',
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
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'batch_price',
                label: 'Precio',
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
                type: 'text',
                extra: '',
                name: 'batch_quantity',
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
  }

  ngOnInit() {
    this.get_insumos();
    this.get_medicamentos();
    this.get_active_principle_total_list();
    this.get_concentration_list();
    this.get_measure_unit_list();
    this.get_all_inventory();
    this.get_presentation_list();
    this.tradenames_datatable = {
      // title: 'Listado de medicamentos',
      icon: 'user-md',
      object_description: 'inventario',
      empty_text: 'No se encontro inventario',
      columns: [
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
          header: 'Presentación del Fármaco',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Eliminar Medicamento',
          style: 'color:#FB5D5D',
          hover_style: 'cursor:pointer; color:#FB5D5D; background-color:#FEDCDC !important;',
          icon: 'trash-alt'
        }
      ],
      navigation_starting_offset_index: 0,
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right',
    };
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
          name: 'Detalle del Medicamento',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        {
          name: 'Eliminar Medicamento',
          style: 'color:#FB5D5D',
          hover_style: 'cursor:pointer; color:#FB5D5D; background-color:#FEDCDC !important;',
          icon: 'trash-alt'
        }
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
          wrap_column: false,
          header: 'Presentación del Fármaco',
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
          name: 'Detalle del Insumo',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        {
          name: 'Eliminar Insumo',
          style: 'color:#FB5D5D',
          hover_style: 'cursor:pointer; color:#FB5D5D; background-color:#FEDCDC !important;',
          icon: 'trash-alt'
        }
      ],
      navigation_starting_offset_index: 0,
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right',
    };
  }

  cancel_med() {
    this.medicamentos_form.clean_form();
  }

  open_nombre_comercial() {
    this.nombre_comercial_modal.show();
  }

  open_concentration() {
    this.concentration_modal.show();
  }

  open_active_principle() {
    this.active_principle_modal.show();
  }

  insert_product() {
    if (this.medicamentos_form.valid()) {
      const form_values = this.medicamentos_form.get_values();
      console.log(this.tradenames);

      const tradename = this.commercial_names.find(el => el.nombre = form_values.commercial_name);
      console.log(tradename);

      const measure_unit = this.measurement_units.find(el => el.name === form_values.measure_unit);
      const presentation = this.presentations.find(el => el.name === form_values.presentation);
      const concentration = this.inventory_type === 0 ? this.concentration_list.find(el => el.description === form_values.concentration) : 0;
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
        concentration_id: this.inventory_type === 0 ? concentration.concentration_id : 999,
        description: ''
      }).subscribe(data => {
        this.created_product_id = data.result.insertId;
          this.endpoint.insert_medicamento({
            nombre: form_values.active_principle,
            nombre_comercial: tradename.name,
            presentacion: presentation.name,
            concentracion: form_values.concentration,
            product_id: this.created_product_id,
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
      }).subscribe(() => { },
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

  insert_batch() {
    if (this.confirmation_form.valid()) {
      const form_values = this.confirmation_form.get_values();
       this.endpoint.insert_batch({
         product_id: this.created_product_id,
         expiration_date: form_values.expiration_date.split('/').reverse().join('-'),
         purchase_date: form_values.purchase_date.split('/').reverse().join('-'),
         batch_price: form_values.batch_price,
         batch_quantity: form_values.batch_quantity,
         observation: ''
       }).subscribe(() => {},
       err => {
         this.alertService.alert_error(err.title, err.message);
       },
       () => {
         this.alertService.alert_success('Exito', 'Operacion realizada de manera satisfactoria');
         this.concentration_form.clean_form();
         this.concentration_modal.hide();
       });
    }
  }

  insert_nombre_comercial() {
    if (this.nombre_comercial_form.valid()) {
      const form_values = this.nombre_comercial_form.get_values();
      const found = this.total_active_principles.find(el => el.name === form_values.nombre);
      this.endpoint.insert_tradename({
        active_principle_id: found.active_principle_id,
        name: form_values.n_nombre_comercial,
        description: form_values.n_description
      }).subscribe(() => { },
        err => {
          this.alertService.alert_error(err.title, err.message);
        },
        () => {
          this.alertService.alert_success('Exito', 'se ha agregado el nombre comercial con exito');
          this.nombre_comercial_form.clean_form();
        });
    }
  }

  insert_active_principle() {
    if (this.active_principle_form.valid()) {
      const form_values = this.active_principle_form.get_values();
      this.endpoint.insert_active_principle({
        name: form_values.p_nombre,
        description: form_values.p_description
      }).subscribe(() => { },
        err => {
          this.alertService.alert_error(err.title, err.message);
        }, () => {
          this.alertService.alert_success('Exito', 'Se ha agregado el principal activo con exito');
          this.active_principle_form.clean_form();
          this.get_active_principle_total_list();
        });
    }
  }


  get_all_inventory() {
    this.endpoint.get_all_medicamentos().subscribe(data => {
      this.tradenames = [...this.tradenames, ...data];
      this.tradenames_datatable_loading = false;
    }, err => {
      this.tradenames_datatable_loading = true;
      this.alertService.alert_message('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
    }, () => {
      this.endpoint.get_all_insumos().subscribe(data => {
        this.tradenames = [...this.tradenames, ...data];
        this.tradenames_datatable_loading = false;
      }, err => {
        this.tradenames_datatable_loading = true;
        this.alertService.alert_message('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
      });
    });
  }
  get_presentation_list() {
    this.endpoint.get_presentation_list().subscribe(data => {
      this.presentations = data;
    });
  }
  get_measure_unit_list() {
    this.endpoint.get_measure_units_list().subscribe(data => {
      this.measurement_units = data;
    });
  }
  get_concentration_list() {
    this.endpoint.get_concentrations_list().subscribe(data => {
      this.concentration_list = data;
    });
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
  get_medicamentos() {
    this.endpoint.get_all_medicamentos().subscribe(data => {
      this.medicamentos = data;
    });
  }
  get_insumos() {
    this.endpoint.get_all_insumos().subscribe(data => {
      this.insumos = data;
    });
  }
  open_meds() {
    this.med = true;
    this.ins = false;
  }

  open_ins() {
    this.ins = true;
    this.med = false;
  }

  add_medicamentos() {
    // this.medicamentos_modal.show();
    this.get_insumos();
    this.get_medicamentos();
    this.get_active_principle_total_list();
    this.get_concentration_list();
    this.get_measure_unit_list();
    this.get_all_inventory();
    this.get_presentation_list();
    this.inventory_type = 0;
    this.main_view = false;
    this.detail_view = false;
    this.create_med_view = true;
    this.medicamento_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-4',
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
            class: 'col-md-8',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'active_principle_desc',
                label: 'Descripcion',
                icon: '',
                class: 'form-control',
                placeholder: this.selected_active_desc,
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
                  return true;
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
          {
            class: 'col-md-8',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'nombre_comercial_desc',
                label: 'Descripcion',
                icon: '',
                class: 'form-control',
                placeholder: this.selected_trade_name_desc,
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'value',
                  text: 'text'
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
                  return true;
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
                name: 'cantidad_dosis',
                label: 'Dosis',
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
  }

  open_detail_view() {
    this.get_insumos();
    this.get_medicamentos();
    this.get_active_principle_total_list();
    this.get_concentration_list();
    this.get_measure_unit_list();
    this.get_all_inventory();
    this.get_presentation_list();
    this.main_view = false;
    this.detail_view = true;
    this.create_med_view = false;
  }

  open_main_view() {
    this.get_medicamentos();
    this.main_view = true;
    this.detail_view = false;
    this.create_med_view = false;
  }

  add_insumos() {
    this.get_insumos();
    this.get_medicamentos();
    this.get_active_principle_total_list();
    this.get_concentration_list();
    this.get_measure_unit_list();
    this.get_all_inventory();
    this.get_presentation_list();
    this.inventory_type = 1;
    this.main_view = false;
    this.detail_view = false;
    this.create_med_view = true;
    this.medicamento_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-4',
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
            class: 'col-md-8',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'active_principle_desc',
                label: 'Descripcion',
                icon: '',
                class: 'form-control',
                placeholder: this.selected_active_desc,
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
                  return true;
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
          {
            class: 'col-md-8',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'nombre_comercial_desc',
                label: 'Descripcion',
                icon: '',
                class: 'form-control',
                placeholder: this.selected_trade_name_desc,
                minlength: null,
                maxlength: null,
                pattern: null,
                error_required: 'Requerido',
                error_pattern: '',
                error_minlength: '',
                list_data: {
                  value: 'value',
                  text: 'text'
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
                  return true;
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
  }
}
