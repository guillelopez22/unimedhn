import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceDatatableComponent } from '../components/service_datatable/service-datatable.component';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { AlertService } from '../components/alert_service/alert.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormControlDirective } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FormRendererComponent } from '../components/form_renderer/form_renderer.component';

@Component({
  selector: 'consultas',
  templateUrl: 'consulta.component.html',
  styleUrls: [
    '../../vendor/libs/spinkit/spinkit.scss'
  ]
})

export class ConsultaComponent implements OnInit {
  @ViewChild('consulta_modal') consulta_modal: ModalDirective;
  @ViewChild('inventory_in_form') inventory_in_form: FormControlDirective;
  @ViewChild('consultas_form') consultas_form: FormRendererComponent;
  @ViewChild('cosultas_datatable_ref') consultas_datatable_ref: ServiceDatatableComponent;
  @ViewChild('instituciones_datatable_ref') instituciones_datatable_ref: ServiceDatatableComponent;
  public integer_mask = createNumberMask({ allowNegative: true, allowDecimal: false, integerLimit: 25, prefix: '', includeThousandsSeparator: true });
  public decimal_mask = createNumberMask({ allowNegative: true, allowDecimal: true, integerLimit: 25, decimalLimit: 25, prefix: '', includeThousandsSeparator: true });
  public instituciones_datatable: any;
  public consultas_datatable: any;
  public consultas_loading_datatable = true;
  public instituciones_datatable_loading: boolean;
  public medicamentos_datatable_loading: boolean;
  public insumos_datatable_loading: boolean;
  public doctors_datatable_loading: boolean;
  public patients_datatable_loading: boolean;
  public medicamentos_datatable: any;
  public insumos_datatable: any;
  public medicos_datatable: any;
  public patients_datatable: any;
  public submitted: boolean;
  public form_values: any;
  public consulta_inputs = [];
  public consultas = [];
  public inventory = [];
  public instituciones = [];
  public selected_products = [];
  public doctors = [];
  public patients = [];
  public medicamentos = [];
  public insumos = [];
  public main_view = true;
  public show_meds = true;
  public step = 1;
  public selected_institution: any;
  public selected_doctor: any;
  public selected_patient: any;
  public motivo_consulta = '';
  public diagnostico = '';
  public recomendaciones = '';
  public inventory_medicamento_datatable = {};
  public inventory_insumo_datatable = {};
  public creating_consult_view = false;
  public instituciones_filters = {
    current_offset: 1,
    view_length: 10,
    sort_order: '',
    sort_ascendent: false
  };
  public instituciones_search_data = {
    nombre: '',
    ciudad: '',
    departamento: '',
    calendario: '',
    tipo: ''
  }


  constructor(private appService: AppService, public endpoint: AppEndpoints, private alertService: AlertService) {
    this.appService.pageTitle = 'Consultas';
    this.instituciones_datatable_loading = false;
    this.medicamentos_datatable_loading = false;
    this.insumos_datatable_loading = false;
    this.doctors_datatable_loading = false;
    this.patients_datatable_loading = false;
    this.submitted = false;
    this.consulta_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-12',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'motivo_consulta',
                label: 'Motivo de la consulta',
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
                name: 'diagnostico',
                label: 'Diagnostico',
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
                name: 'recomendaciones',
                label: 'Recomendaciones',
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
    this.get_institutions();
    this.get_consultas();
    this.consultas_datatable = {
      // title: 'Listado de Medicos',
      icon: 'user-md',
      object_description: 'consultas',
      empty_text: 'No se encontraron consultas',
      columns: [
        {
          column: 'institucion',
          wrap_column: false,
          header: 'Institucion',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'doctor_name',
          wrap_column: true,
          header: 'Doctor',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'patient_name',
          wrap_column: false,
          header: 'Paciente',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Detalle de la Consulta',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        {
          name: 'Eliminar Consulta',
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
    this.instituciones_datatable = {
      // title: 'Listado de Medicos',
      icon: 'user-md',
      object_description: 'instituciones',
      empty_text: 'No se encontraron instituciones',
      columns: [
        {
          column: 'nombre',
          wrap_column: false,
          header: 'Nombre',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'telefono',
          wrap_column: true,
          header: 'Telefono',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'departamento',
          wrap_column: false,
          header: 'Departamento',
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
      ],
      events: [
        {
          name: 'Seleccionar Institucion',
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
    this.inventory_medicamento_datatable = {
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
          column: 'expiration_date',
          wrap_column: true,
          header: 'Fecha de Caducidad',
          wrap_header: true,
          type: 'date'
        },
        {
          column: 'nombre_comercial',
          wrap_column: true,
          header: 'Nombre Comercial',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'saldo_inventario',
          wrap_column: true,
          header: 'Unidades Disponibles',
          wrap_header: true,
          type: 'number'
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
          name: 'Seleccionar Medicamento',
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
    this.inventory_insumo_datatable = {
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
          column: 'expiration_date',
          wrap_column: true,
          header: 'Fecha de Caducidad',
          wrap_header: true,
          type: 'date'
        },
        {
          column: 'nombre_comercial',
          wrap_column: true,
          header: 'Nombre Comercial',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'saldo_inventario',
          wrap_column: true,
          header: 'Unidades Disponibles',
          wrap_header: true,
          type: 'number'
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
          name: 'Seleccionar Insumo',
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
    this.medicos_datatable = {
      // title: 'Listado de Medicos',
      icon: 'user-md',
      object_description: 'doctors',
      empty_text: 'No se encontraron medicos',
      columns: [
        {
          column: 'first_name',
          wrap_column: false,
          header: 'Primer Nombre',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'last_name',
          wrap_column: true,
          header: 'Apellido',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'id_card',
          wrap_column: false,
          header: 'No. Identidad',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Seleccionar Doctor',
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
    this.patients_datatable = {
      // title: 'Listado de Medicos',
      icon: 'user-md',
      object_description: 'doctors',
      empty_text: 'No se encontraron medicos',
      columns: [
        {
          column: 'first_name',
          wrap_column: false,
          header: 'Primer Nombre',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'last_name',
          wrap_column: true,
          header: 'Apellido',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'grado',
          wrap_column: false,
          header: 'Grado',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'seccion',
          wrap_column: false,
          header: 'Seccion',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Seleccionar Paciente',
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
        {
          column: 'quantity',
          wrap_column: true,
          header: 'Disponibles',
          wrap_header: true,
          type: 'number'
        },
      ],
      events: [
        {
          name: 'Seleccionar medicamento',
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
        {
          column: 'quantity',
          wrap_column: true,
          header: 'Disponibles',
          wrap_header: true,
          type: 'number'
        },
      ],
      events: [
        {
          name: 'Seleccionar para insumo',
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

  show_medicamentos() {
    this.show_meds = true;
    this.get_medicamento_inventory();
  }

  medicamentos_datatable_events(event) {
    console.log(event.data);
    // this.confirmation_modal.show();
    this.selected_products.push({
      cartera_batch_products_id: event.data.cartera_batch_products_id,
      alert_id: event.data.alert_id,
      product_pum: event.data.product_pum,
      quantity: event.data.quantity,
      product_id: event.data.product_id,
      nombre: event.data.tipo_insumo,
      nombre_comercial: event.data.nombre_comercial,
      presentacion: event.data.presentacion,
      presentation_quantity: event.data.presentation_quantity,
      aus: event.data.aus_quantity,
      batch_product_id: event.data.batch_product_id,
      type: 'medicamento'
    });
  }

  insumos_datatable_events(event) {
    // this.confirmation_modal.show();
    this.selected_products.push({
      cartera_batch_products_id: event.data.cartera_batch_products_id,
      alert_id: event.data.alert_id,
      product_pum: event.data.product_pum,
      quantity: event.data.quantity,
      product_id: event.data.product_id,
      nombre: event.data.tipo_insumo,
      nombre_comercial: event.data.nombre_comercial,
      presentacion: event.data.presentacion,
      presentation_quantity: event.data.presentation_quantity,
      aus: event.data.aus_quantity,
      batch_product_id: event.data.batch_product_id,
      type: 'insumo'
    });
  }
  get_institutions() {
    this.endpoint.get_institutions().subscribe(data => {
      this.instituciones = data;
    });
  }

  get_institution() {
    this.endpoint.get_institution(this.selected_institution.id).subscribe(data => {
      this.patients = data.patients;
      this.doctors = data.doctors;
    });
  }

  get_institution_cartera_products() {
    this.endpoint.get_all_cartera_products(this.selected_institution.id).subscribe(data => {
      this.medicamentos = data.medicamentos;
      this.insumos = data.insumos;
    });
  }

  return() {
    this.step--;
  }

  select_institucion(event) {
    this.selected_institution = event.data;
    this.step++;
    this.get_institution();
    this.get_institution_cartera_products();
  }

  select_doctor(event) {
    this.selected_doctor = event.data;
    this.step++;
  }
  select_student(event) {
    this.selected_patient = event.data;
    this.step++;
  }
  register_form_data() {
    if (this.consultas_form.valid()) {
      this.form_values = this.consultas_form.get_values();
      this.step++;
    }
  }
  hide_modal() {
    this.step = 1;
    this.consulta_modal.hide();
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


  show_insumos() {
    this.show_meds = false;
    this.get_insumo_inventory();
  }

  get_insumo_inventory() {
    this.inventory = [];
    this.endpoint.get_insumo_inventory().subscribe(data => {
      this.inventory = data;
      this.inventory.forEach(el => {
        const date = new Date(el.expiration_date).toLocaleDateString('es-HN');
        el.expiration_date = date;
      });
    });
  }

  get_medicamento_inventory() {
    this.inventory = [];
    this.endpoint.get_medicamento_inventory().subscribe(data => {
      this.inventory = data;
      this.inventory.forEach(el => {
        const date = new Date(el.expiration_date).toLocaleDateString('es-HN');
        el.expiration_date = date;
      });
    });
  }

  add_consulta() {
    this.main_view = false;
    this.creating_consult_view = true;
  }

  open_main_view() {
    this.main_view = true;
    this.creating_consult_view = false;
  }

  get_consultas() {
    this.endpoint.get_consultas().subscribe(data => {
      this.consultas = data.consultas;
    });
  }

  insert_consulta() {
    if (this.inventory_in_form.valid) {
      this.endpoint.insert_consulta({
        institution_id: this.selected_institution.id,
        patient_id: this.selected_patient.patient_id,
        doctor_id: this.selected_doctor.doctor_id,
        motivo_consulta: this.form_values.motivo_consulta,
        diagnostico: this.form_values.diagnostico,
        recomendaciones: this.form_values.recomendaciones
      }).subscribe(data => {
        this.selected_products.forEach(el => {
          console.log(el);

          const consulta_id = data.consulta_id;
          this.endpoint.use_cartera_product({
            alert_id: el.alert_id,
            student_count: this.selected_institution.student_count,
            quantity: el.quantity,
            used: el.used,
            product_pum: el.product_pum,
            cartera_batch_products_id: el.cartera_batch_products_id,
            cartera_id: el.cartera_id
          }).subscribe();
        });
      },
        err => {
          this.alertService.alert_error('Error', err.message);
        },
        () => {
          this.alertService.alert_success('Exito', 'La consulta ha sido creado de manera satisfactoria.');
        });
    }
  }

  instituciones_datatable_events(event) {
    console.log(event.data);

    if (event.event == 'Detalle de la Institución') {
      // this.open_institucion(event.data);
      // } else if (event.event == "Editar Institución") {
      //     this.open_update_institucion(event.data);
    } else if (event.event == 'Eliminar Institución') {
      // this.open_delete_institucion(event.data);
    }
  }

  instituciones_datatable_get_results_offset_change(data) {
    this.instituciones_filters = {
      current_offset: data.current_offset,
      view_length: data.view_length,
      sort_order: data.sort_order,
      sort_ascendent: data.sort_ascendent
    }
    let response;
    let load = {
      current_offset: this.instituciones_filters.current_offset,
      sort_ascendent: this.instituciones_filters.sort_ascendent,
      sort_order: this.instituciones_filters.sort_order,
      view_length: this.instituciones_filters.view_length,
      nombre: this.instituciones_search_data.nombre,
      ciudad: this.instituciones_search_data.ciudad,
      departamento: this.instituciones_search_data.departamento,
      calendario: this.instituciones_search_data.calendario,
      tipo: this.instituciones_search_data.tipo
    }
    this.endpoint.get_instituciones(load).subscribe(
      data => response = data,
      err => {
        this.instituciones_datatable_ref.set_loading(false);
        if (err.status && err.error) {
          this.alertService.alert_message(err.status, err.error);
        } else {
          this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
        }
      },
      () => {
        try {
          console.log(response);
          for (let i = 0; i < response.list.length; i++) {
            response.list[i].contactos = JSON.parse(response.list[i].contactos);
            response.list[i].inicio_clases = response.list[i].inicio_clases.split('-').reverse().join('/');
          }
          this.instituciones_datatable_ref.set_results_offset_change(response.list);
        } catch (error) {
          console.log(error);

          this.instituciones_datatable_ref.set_loading(false);
          this.alertService.alert_aplication_error('Error Interno del Aplicativo');
        }

      }
    );
  }

  instituciones_datatable_get_results_filter_change(data) {
    this.instituciones_filters = {
      current_offset: data.current_offset,
      view_length: data.view_length,
      sort_order: data.sort_order,
      sort_ascendent: data.sort_ascendent
    }
    let response;
    let load = {
      current_offset: this.instituciones_filters.current_offset,
      sort_ascendent: this.instituciones_filters.sort_ascendent,
      sort_order: this.instituciones_filters.sort_order,
      view_length: this.instituciones_filters.view_length,
      nombre: this.instituciones_search_data.nombre,
      ciudad: this.instituciones_search_data.ciudad,
      departamento: this.instituciones_search_data.departamento,
      calendario: this.instituciones_search_data.calendario,
      tipo: this.instituciones_search_data.tipo
    }
    this.endpoint.get_instituciones(load).subscribe(
      data => response = data,
      err => {
        this.instituciones_datatable_ref.set_loading(false);
        if (err.status && err.error) {
          this.alertService.alert_message(err.status, err.error);
        } else {
          this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
        }
      },
      () => {
        try {
          console.log(response, 'asdasdas');
          for (let i = 0; i < response.list.length; i++) {
            response.list[i].contactos = JSON.parse(response.list[i].contactos);
            response.list[i].inicio_clases = response.list[i].inicio_clases.split('-').reverse().join('/');
          }
          this.instituciones_datatable_ref.set_results_filter_change(response.list, response.count);
        } catch (error) {
          console.log(error);

          this.instituciones_datatable_ref.set_loading(false);
          this.alertService.alert_aplication_error('Error Interno del Aplicativo');
        }
      }
    );
  }

  instituciones_datatable_get_results_update_list(data) {
    this.instituciones_filters = {
      current_offset: data.current_offset,
      view_length: data.view_length,
      sort_order: data.sort_order,
      sort_ascendent: data.sort_ascendent
    }
    let response;
    let load = {
      current_offset: this.instituciones_filters.current_offset,
      sort_ascendent: this.instituciones_filters.sort_ascendent,
      sort_order: this.instituciones_filters.sort_order,
      view_length: this.instituciones_filters.view_length,
      nombre: this.instituciones_search_data.nombre,
      ciudad: this.instituciones_search_data.ciudad,
      departamento: this.instituciones_search_data.departamento,
      calendario: this.instituciones_search_data.calendario,
      tipo: this.instituciones_search_data.tipo
    }
    this.endpoint.get_instituciones(load).subscribe(
      data => response = data,
      err => {
        this.instituciones_datatable_ref.set_loading(false);
        if (err.status && err.error) {
          this.alertService.alert_message(err.status, err.error);
        } else {
          this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
        }
      },
      () => {
        try {
          console.log(response);
          for (let i = 0; i < response.list.length; i++) {
            response.list[i].contactos = JSON.parse(response.list[i].contactos);
            response.list[i].inicio_clases = response.list[i].inicio_clases.split('-').reverse().join('/');
          }
          this.instituciones_datatable_ref.set_results_update_list(response.list, response.count);
        } catch (error) {
          console.log(error);

          this.instituciones_datatable_ref.set_loading(false);
          this.alertService.alert_aplication_error('Error Interno del Aplicativo');
        }
      }
    );
  }

}
