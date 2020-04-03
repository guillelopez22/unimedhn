import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceDatatableComponent } from '../components/service_datatable/service-datatable.component';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { AlertService } from '../components/alert_service/alert.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormRendererComponent } from '../components/form_renderer/form_renderer.component';

@Component({
  selector: 'lotes',
  templateUrl: 'lotes.component.html',
  styleUrls: [
    '../../vendor/libs/spinkit/spinkit.scss'
  ]
})

export class LotesComponent implements OnInit {
  @ViewChild('medicamentos_datatable_ref') medicamentos_datatable_ref: ServiceDatatableComponent;
  @ViewChild('insumos_datatable_ref') insumos_datatable_ref: ServiceDatatableComponent;
  @ViewChild('confirmation_modal') confirmation_modal: ModalDirective;
  @ViewChild('confirmation_form') confirmation_form: FormRendererComponent;
  public confirmation_inputs = [];
  public selected_medicamento: any;
  public selected_insumo: any;
  public selected_id: any;
  public lotes_datatable: any;
  public lotes_datatable_loading: boolean;
  public main_view = true;
  public lotes = [];
  public medicamentos = [];
  public insumos = [];
  public medicamentos_datatable_loading: boolean;
  public insumos_datatable: any;
  public insumos_datatable_loading: boolean;
  public medicamentos_datatable = {};
  public inner_view = 1;
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
  @ViewChild('lotes_datatable_ref') lotes_datatable_ref: ServiceDatatableComponent;
  constructor(private appService: AppService, public endpoint: AppEndpoints, private alertService: AlertService) {
    this.lotes_datatable_loading = false;
    this.medicamentos_datatable_loading = true;
    this.insumos_datatable_loading = true;
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
    this.get_medicamentos();
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
  }

  open_medicamentos() {
    this.get_medicamentos();
    this.inner_view = 1;
  }

  open_insumos() {
    this.get_insumos();
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
    if (event.event === 'Crear lote para medicamento') {
      this.selected_medicamento = event.data;
      this.selected_id = this.selected_medicamento.medicamento_id;
      this.confirmation_modal.show();
    }
  }

  insumos_datatable_events(event) {
    if (event.event === 'Crear lote para insumo') {
      this.selected_insumo = event.data;
      this.selected_id = this.selected_insumo.insumo_id;
      this.confirmation_modal.show();
    }
  }

  insert_batch() {
    if (this.confirmation_form.valid()) {
      const form_values = this.confirmation_form.get_values();
       this.endpoint.insert_batch({
         product_id: this.selected_id,
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
         this.confirmation_form.clean_form();
         this.confirmation_modal.hide();
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
