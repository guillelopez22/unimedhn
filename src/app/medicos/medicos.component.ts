import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceDatatableComponent } from '../components/service_datatable/service-datatable.component';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { AlertService } from '../components/alert_service/alert.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormRendererComponent } from '../components/form_renderer/form_renderer.component';
import { FormControlDirective } from '@angular/forms';

@Component({
  selector: 'medicos',
  templateUrl: 'medicos.component.html',
  styleUrls: [
    '../../vendor/libs/spinkit/spinkit.scss'
  ]
})

export class MedicosComponent implements OnInit {
  @ViewChild('medicos_datatable_ref') medicos_datatable_ref: ServiceDatatableComponent;
  @ViewChild('doctores_modal') doctores_modal: ModalDirective;
  public instituciones_modal_view: number;
  public contacto_submitted: boolean;
  public doctor_modal_view: number;
  @ViewChild('jornada_form') jornada_form: FormRendererComponent;
  @ViewChild('antecedentes_form') antecedentes_form: FormRendererComponent;
  @ViewChild('contacto_form') contacto_form: FormControlDirective;
  @ViewChild('academic_form') academic_form: FormRendererComponent;
  @ViewChild('doctor_form') doctor_form: FormRendererComponent;
  public doctor_background_information = [];
  public medicos_datatable: any;
  public instituciones_loading: boolean;
  public medicos_datatable_loading: boolean;
  public contacto_view_ref: number;
  public antecedentes_view = false;
  public jornada_view = false;
  public insert_doctor_main_view = true;
  public academic_view = false;
  public antecedentes_inputs = [];
  public jornadas_inputs = [];
  public academic_inputs = [];
  public institutions = [];
  public complete_antecedente = {
    antecedente_date: '',
    antecedente_desc: ''
  };
  public working_schedule = {
    hours_day: '',
    hours_start: '',
    hours_end: ''
  };
  public doctor_schedule = [];
  public instituciones_contactos = [];
  public antecedentes = [];
  public academic_data = [];
  public doctors = [];
  public instituciones_data = {
    id: 0,
    nombre: '',
    correo: '',
    telefono: '',
    departamento: '',
    ciudad: '',
    direccion: '',
    inicio_clases: '',
    calendario: '',
    tipo: '',
    contactos: [],
    alumnos: [],
    doctores: []
  };
  public doctor_data = {
    first_name: '',
    last_name: '',
    phone: '',
    extension: '',
    email: '',
    address: '',
    id_card: '',
    id_college: '',
    id_rtn: '',
    academic_information: [],
    background_information: [],
    ciudad: '',
    working_hours: [],
    foto: null
  };
  public medicos_filters = {
    current_offset: 1,
    view_length: 10,
    sort_order: '',
    sort_ascendent: false
  };
  public doctors_inputs = [];
  public contacto_data = {
    nombre: '',
    cargo: '',
    celular: ''
  }
  public doctor_search_data = {
    first_name: '',
    last_name: '',
    email: '',
    institution_name: '',
  };
  public academic_info = {
    academic_date: '',
    academic_title: '',
    academic_institution: ''
  };
  public medicos = [];
  constructor(private appService: AppService, public endpoint: AppEndpoints, private alertService: AlertService,) {
    this.appService.pageTitle = 'Medicos';
    this.medicos_datatable_loading = false;
    this.instituciones_modal_view = 1;
    this.doctors_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'first_name',
                label: 'Primer nombre del Médico',
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
            class: 'col-md-6',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'last_name',
                label: 'Apellido del Médico',
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
            class: 'col-md-12',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'address',
                label: 'Direccion',
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
        ]
      },
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-6',
            inputs: [
              {
                type: 'email',
                extra: '',
                name: 'email',
                label: 'Correo Electrónico',
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
            class: 'col-md-6',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'phone',
                label: 'Teléfono',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: null,
                pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
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
                  return [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
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
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'id_card',
                label: 'Identidad',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: null,
                pattern: '^[0-9]{4}-[0-9]{4}-[0-9]{5}$',
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
                  return [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
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
                name: 'id_rtn',
                label: 'RTN',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: null,
                pattern: '^[0-9]{4}-[0-9]{4}-[0-9]{6}$',
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
                  return [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
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
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'ciudad',
                label: 'Ciudad',
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
            class: 'col-md-3',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'id_college',
                label: 'No. Colegiado',
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
        ]
      },
    ];
    this.jornadas_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'hours_day',
                label: 'Dia de Trabajo',
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
                type: 'time',
                extra: '',
                name: 'hours_start',
                label: 'Inicio de Jornada',
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
                type: 'time',
                extra: '',
                name: 'hours_end',
                label: 'Fin de Jornada',
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
        ]
      },
    ];
    this.antecedentes_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-6',
            inputs: [
              {
                type: 'calendar',
                extra: 'popup',
                name: 'antecedente_date',
                label: 'Fecha',
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
            class: 'col-6',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'antecedente_desc',
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
        ]
      },
    ];
    this.academic_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'academic_institution',
                label: 'Institucion',
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
                type: 'text',
                extra: '',
                name: 'academic_title',
                label: 'Titulo/Certificado',
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
                type: 'calendar',
                extra: 'popup',
                name: 'academic_date',
                label: 'Fecha',
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
        ]
      },
    ];
   }

   get_institutions() {
     this.endpoint.get_institutions().subscribe(data => {
       this.institutions = data;
     });
   }

   get_doctors() {
    this.endpoint.get_all_doctors().subscribe(doctors => {
      this.medicos = doctors;
    }, err => {
      this.medicos_datatable_loading = true;
      this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
    });
   }

  ngOnInit() {
    this.get_doctors();
    this.get_institutions();
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
          column: 'ciudad',
          wrap_column: false,
          header: 'Ciudad',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'institution_name',
          wrap_column: false,
          header: 'Institucion',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Activar Medico',
          style: 'color:#196F3D',
          hover_style: 'cursor:pointer; color:#196F3D; background-color:#ABEBC6 !important;',
          icon: 'user-plus'
        },
        {
          name: 'Desactivar Medico',
          style: 'color:#BDB76B',
          hover_style: 'cursor:pointer; color:#BDB76B; background-color:#F0E68C !important;',
          icon: 'user-minus'
        },
      ],
      navigation_starting_offset_index: 0,
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right',
    };
  }

  close_add_contacto() {
    this.contacto_submitted = false;
    this.contacto_data = {
      nombre: '',
      cargo: '',
      celular: ''
    }
    this.instituciones_modal_view = this.contacto_view_ref + 0;
  }

  add_contacto() {
    if (this.contacto_form.valid) {
      this.instituciones_contactos.push(this.contacto_data);
      this.close_add_contacto();
    } else {
      this.contacto_submitted = true;
    }
  }

  remove_antecedente(index) {
    this.antecedentes.splice(index, 1);
  }

  cancel_doctor_academics() {
    this.academic_form.clean_form();
  }

  add_doctor_academics() {
    if (this.academic_form.valid()) {
      const form_values = this.academic_form.get_values();
      this.academic_info = {
        academic_date: form_values.academic_date,
        academic_institution: form_values.academic_institution,
        academic_title: form_values.academic_title
      };
      this.academic_data.push(this.academic_info);
      this.academic_info = {
        academic_date: '',
        academic_institution: '',
        academic_title: ''
      };
      this.academic_form.clean_form();
    }
  }

  add_jornada() {
    this.insert_doctor_main_view = false;
    this.jornada_view = true;
    this.antecedentes_view = false;
    this.academic_view = false;
  }

  add_antecedentes() {
    this.insert_doctor_main_view = false;
    this.jornada_view = false;
    this.antecedentes_view = true;
    this.academic_view = false;
  }

  add_academic_info() {
    this.insert_doctor_main_view = false;
    this.jornada_view = false;
    this.antecedentes_view = false;
    this.academic_view = true;
  }

  doctor_datatable_events(event) {
    // if (event.event === 'Activar Medico') {
    //   // this.open_delete_medic(event.data);
    // } else {

    // }
    console.log(event.data);

    if (event.event === 'Activar Medico') {
      this.endpoint.activate_doctor({doctor_id: event.data.doctor_id, institution_id: event.data.institution_id !== null ? event.data.institution_id: 0 }).subscribe(res => {
        this.alertService.alert_success(res.title, res.message);
      },
      err => {
        this.alertService.alert_error(err.title, err.message);
      });
    } else if (event.event === 'Desactivar Medico') {
      this.endpoint.deactivate_doctor({doctor_id: event.data.doctor_id, institution_id: event.data.institution_id !== null ? event.data.institution_id: 0 }).subscribe(res => {
        this.alertService.alert_success(res.title, res.message);
      },
      err => {
        this.alertService.alert_error(err.title, err.message);
      });
    }
  }

  open_delete_medic(data) {
    this.alertService.option_alert('Eliminar Doctor',
    '¿Está seguro que desea eliminar el doctor seleccionado?<br><br><b>Doctor:<br></b><b class=\'text-success\'> ' +
    data.first_name + ' ' + data.last_name + '</b>', 'Sí, Eliminar').then((result) => {
      if (result.value) {
        this.delete_doctor(data.doctor_id);
      }
    }).catch(() => false);
  }

  delete_doctor(id) {
    this.endpoint.delete_doctor({
      doctor_id: id
    }).subscribe(() => {
      this.alertService.alert_success('Exito', 'El doctor ha sido eliminado de manera satisfactoria');
      this.get_doctors();
    }, err => {
      this.alertService.alert_error(err.title, err.message);
    });
  }

  return_insert_view() {
    this.insert_doctor_main_view = true;
    this.jornada_view = false;
    this.antecedentes_view = false;
    this.academic_view = false;
  }
  add_doctor() {
    this.open_insert_doctor();
  }

  open_insert_doctor() {
    this.doctor_form.clean_form();
    this.doctor_background_information = [];
    this.doctor_modal_view = 1;
    this.doctores_modal.show();
  }

  insert_doctor() {
    if (this.doctor_form.valid()) {
      const form_values = this.doctor_form.get_values();
      this.doctor_data = {
        first_name: form_values.first_name,
        last_name: form_values.last_name,
        phone: form_values.phone,
        extension: form_values.extension,
        email: form_values.email,
        address: form_values.address,
        id_card: form_values.id_card,
        id_college: form_values.id_college,
        id_rtn: form_values.id_rtn,
        background_information: this.antecedentes,
        ciudad: form_values.ciudad,
        working_hours: this.doctor_schedule,
        academic_information: this.academic_data,
        foto: null
      };
      console.log(this.doctor_data);
      let response;
      this.endpoint.insert_doctors(this.doctor_data).subscribe(
        data => response = data,
        err => {
          this.instituciones_loading = false;
          if (err.status && err.error) {
            this.alertService.alert_message(err.status, err.error);
          } else {
            this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
          }
        },
        () => {
          try {
            this.doctor_modal_view = 1;
            this.doctores_modal.hide();
            this.alertService.alert_success(response.title, response.message);
            this.endpoint.assign_doctor({doctor_id: response.doctor_id, institution_id: 0}).subscribe();
            this.get_doctors();
          } catch (error) {
            this.alertService.alert_aplication_error('Error Interno del Aplicativo');
          }
        }
      );
    }
  }
  cancel_doctor_schedule() {
    this.jornada_form.clean_form();
  }

  add_doctor_schedule() {
    if (this.jornada_form.valid()) {
      const jornada_values = this.jornada_form.get_values();
      this.working_schedule = {
        hours_day: jornada_values.hours_day,
        hours_start: jornada_values.hours_start,
        hours_end: jornada_values.hours_end
      };
      this.doctor_schedule.push(
        this.working_schedule
      );
      this.working_schedule = {
        hours_day: '',
        hours_start: '',
        hours_end: ''
      };
      this.jornada_form.clean_form();
    }
  }

  remove_doctor_hours(index) {
    this.doctor_schedule.splice(index, 1);
  }

  cancel_doctor_antecedente() {
    this.antecedentes_form.clean_form();
  }

  add_doctor_antecedente() {
    if (this.antecedentes_form.valid()) {
      const form_values = this.antecedentes_form.get_values();
      this.complete_antecedente = {
        antecedente_date: form_values.antecedente_date,
        antecedente_desc: form_values.antecedente_desc
      };
      this.antecedentes.push(this.complete_antecedente);
      this.complete_antecedente = {
        antecedente_date: '',
        antecedente_desc: ''
      };
      this.antecedentes_form.clean_form();
    }
  }
}
