import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceDatatableComponent } from '../components/service_datatable/service-datatable.component';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { AlertService } from '../components/alert_service/alert.service';
import sexos from '../components/catalogs/sexo';
import departamentos from '../components/catalogs/departamentos';
import { FormRendererComponent } from '../components/form_renderer/form_renderer.component';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  selector: 'alumnos',
  templateUrl: 'alumnos.component.html',
  styleUrls: [
    '../../vendor/libs/spinkit/spinkit.scss'
  ]
})

export class AlumnosComponent implements OnInit {
  @ViewChild('alumnos_datatable_ref') alumnos_datatable_ref: ServiceDatatableComponent;

  @ViewChild('alumno_form') alumno_form: FormRendererComponent;
  @ViewChild('alumnos_modal') alumnos_modal: ModalDirective;
  @ViewChild('alumno_contact_form') alumno_contact_form: FormRendererComponent;
  public alumnos_datatable: any;
  public ciudades: any[];
  public alumnos_datatable_loading: boolean;
  public alumno_main_view = true;
  public departamentos: any[];
  public alumno_contacto_inputs = [];
  public sexos: any[];
  public alumno_inputs = [];
  public alumno_contacts = [];
  public alumno_contacto_view = false;
  public instituciones_data = {
    id: '',
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
  public alumnos_filters = {
    current_offset: 1,
    view_length: 10,
    sort_order: '',
    sort_ascendent: false
  };
  public doctor_search_data = {
    first_name: '',
    last_name: '',
    email: '',
    institution_name: '',
  };
  public alumnos = [];
  constructor(private appService: AppService, public endpoint: AppEndpoints, private alertService: AlertService,) {
    this.appService.pageTitle = 'alumnos';
    this.sexos = sexos;
    this.ciudades = [];
    this.alumnos_datatable_loading = false;
    this.departamentos = departamentos;
    this.alumno_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'first_name',
                label: 'Primer Nombre',
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
                name: 'last_name',
                label: 'Apellido',
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
                type: 'select',
                extra: '',
                name: 'gender',
                label: 'Sexo',
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
                  return this.sexos
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
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'birth_place',
                label: 'Lugar de Nacimiento',
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
                type: 'calendar',
                extra: 'popup',
                name: 'birth_date',
                label: 'Fecha de Nacimiento',
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
                name: 'grado',
                label: 'Grado',
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
                name: 'seccion',
                label: 'Seccion',
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
        class: 'row mt-4',
        columns: [
          {
            class: 'col-md-3',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'address_place',
                label: 'Colonia/Residencial',
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
                name: 'address_avenue',
                label: 'Avenida',
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
                name: 'address_street',
                label: 'Calle',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: null,
                pattern: '',
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
                name: 'address_block',
                label: 'Bloque',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: null,
                pattern: '',
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
                name: 'address_house',
                label: 'No. Casa',
                icon: '',
                class: 'form-control',
                placeholder: '',
                minlength: null,
                maxlength: null,
                pattern: '',
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
                type: 'select',
                extra: '',
                name: 'address_state',
                label: 'Departamento',
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
                  return this.departamentos;
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
                  this.instituciones_data.ciudad = '';
                  this.ciudades = [];
                  for (let i = 0; i < this.departamentos.length; i++) {
                    if (event == this.departamentos[i].name) {
                      this.ciudades = this.departamentos[i].towns;
                    }
                  }
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
                name: 'address_city',
                label: 'Ciudad',
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
                  return this.ciudades;
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
    this.alumno_contacto_inputs = [
      {
        class: 'row',
        columns: [
          {
            class: 'col-md-4',
            inputs: [
              {
                type: 'text',
                extra: '',
                name: 'emergency_contact_name',
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
                type: 'email',
                extra: '',
                name: 'emergency_contact_email',
                label: 'Correo',
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
                name: 'emergency_contact_phone',
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
   }

  ngOnInit() {
    this.endpoint.get_alumnos().subscribe(alumnos => {
      this.alumnos = alumnos;
    }, err => {
      this.alumnos_datatable_loading = true;
      this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
    });
    this.alumnos_datatable = {
      // title: 'Listado de alumnos',
      icon: 'user-md',
      object_description: 'doctors',
      empty_text: 'No se encontraron alumnos',
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
          column: 'institution_name',
          wrap_column: true,
          header: 'Institucion',
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
        {
          column: 'city',
          wrap_column: true,
          header: 'Ciudad',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Detalle del Medico',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        {
          name: 'Eliminar Medico',
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
  open_insert_alumno() {
    this.alumno_form.clean_form();
    this.alumnos_modal.show();
  }
  open_add_alumno_contacto() {
    this.alumno_contacto_view = true;
    this.alumno_main_view = false;
  }
  insert_alumno() {
    if (this.alumno_form.valid()) {
      const form_values = this.alumno_form.get_values();
      const alumno_data = {
        first_name: form_values.first_name,
        last_name: form_values.last_name,
        grado: form_values.grado,
        gender: form_values.gender,
        birth_place: form_values.birth_place,
        birth_date: form_values.birth_date,
        address_place: form_values.address_place,
        address_avenue: form_values.address_avenue,
        address_street: form_values.address_street,
        address_block: form_values.address_block,
        address_house: form_values.address_house,
        address_city: form_values.address_city,
        address_state: form_values.address_state,
        emergency_contacts: this.alumno_contacts,
        foto: null,
        tipo_paciente: 'Alumno',
        seccion: form_values.seccion
      };
      this.alumnos.push(alumno_data);
      this.instituciones_data.alumnos = [...this.instituciones_data.alumnos, ...this.alumnos];
      console.log(this.instituciones_data);

      let response;
      this.endpoint.insert_alumno(alumno_data).subscribe(
        data => response = data,
        err => {
          if (err.status && err.error) {
            this.alertService.alert_message(err.status, err.error);
          } else {
            this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
          }
        },
        () => {
          try {
            this.alumno_main_view = true;
            this.alumno_contacto_view = false;
            this.alumnos_modal.hide();
            this.alertService.alert_success(response.title, response.message);
            this.endpoint.get_alumnos().subscribe(alumnos => {
              this.alumnos = alumnos;
            }, err => {
              this.alumnos_datatable_loading = true;
              this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
            });
          } catch (error) {
            this.alertService.alert_aplication_error('Error Interno del Aplicativo');
          }
        }
      );
    }
  }
  return_alumno_main_view() {
    this.alumno_contacto_view = false;
    this.alumno_main_view = true;
  }
  add_alumno_contacto() {
    if (this.alumno_contact_form.valid()) {
      const form_data = this.alumno_contact_form.get_values();
      this.alumno_contacts.push({
        emergency_contact_name: form_data.emergency_contact_name,
        emergency_contact_email: form_data.emergency_contact_email,
        emergency_contact_phone: form_data.emergency_contact_phone
      });
      this.alumno_contact_form.clean_form();
    }
  }

}
