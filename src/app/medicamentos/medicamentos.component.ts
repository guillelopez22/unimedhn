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
  @ViewChild('insumos_modal') insumos_modal: ModalDirective;
  @ViewChild('medicamentos_form') medicamentos_form: FormRendererComponent;
  @ViewChild('insumos_form') insumos_form: FormRendererComponent;
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
  public insumos = [];
  public medicamentos = [];
  public med = true;
  public ins = false;
  public medicamento_inputs = [];
  public tradenames = [];
  public presentations = [];
  public measurement_units = [];
  public concentration_list = [];
  public total_active_principles = [];
  public commercial_names = [];
  public selected_active_desc = '';
  public selected_trade_name_desc = '';
  public main_view = true;
  public detail_view = false;
  constructor(private appService: AppService, public endpoint: AppEndpoints, private alertService: AlertService,) {
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
            class: 'col-md-4',
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
                maxlength: 9,
                pattern: '^[0-9]{9}$',
                error_required: 'Requerido',
                error_pattern: 'Formato Inválido',
                error_minlength: '',
                list_data: {
                  value: '',
                  text: ''
                },
                list: () => {
                  return []
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
                label: '',
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
          header: 'Nombre',
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



  get_all_inventory() {
    this.endpoint.get_all_medicamentos().subscribe(data => {
      this.tradenames = [...this.tradenames, ...data];
      this.tradenames_datatable_loading = false;
    }, err => {
      this.tradenames_datatable_loading = true;
      this.alertService.alert_message('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde')
    }, () => {
      this.endpoint.get_all_insumos().subscribe(data => {
        this.tradenames = [...this.tradenames, ...data];
        this.tradenames_datatable_loading = false;
      }, err => {
        this.tradenames_datatable_loading = true;
        this.alertService.alert_message('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde')
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
    this.main_view = false;
    this.detail_view = false;
    this.create_med_view = true;
  }

  open_detail_view() {
    this.main_view = false;
    this.detail_view = true;
    this.create_med_view = false;
  }

  open_main_view() {
    this.main_view = true;
    this.detail_view = false;
    this.create_med_view = false;
  }

  add_insumos() {

  }
}
