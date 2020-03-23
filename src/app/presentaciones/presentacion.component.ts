import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceDatatableComponent } from '../components/service_datatable/service-datatable.component';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { AlertService } from '../components/alert_service/alert.service';

@Component({
  selector: 'presentaciones',
  templateUrl: 'presentacion.component.html',
  styleUrls: [
    '../../vendor/libs/spinkit/spinkit.scss'
  ]
})

export class PresentacionComponent implements OnInit {
  @ViewChild('medicos_datatable_ref') medicos_datatable_ref: ServiceDatatableComponent;
  public medicos_datatable: any;
  public medicos_datatable_loading: boolean;
  public medicos_filters = {
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
  public medicos = [];
  constructor(private appService: AppService, public endpoint: AppEndpoints, private alertService: AlertService,) {
    this.appService.pageTitle = 'Medicos';
    this.medicos_datatable_loading = false;
   }

  ngOnInit() {
    this.endpoint.get_doctors().subscribe(doctors => {
      this.medicos = doctors;
    }, err => {
      this.medicos_datatable_loading = true;
      this.alertService.alert_internal_server_error('Error interno del servidor', 'Revise su conexión de internet o inténtelo más tarde');
    });
    this.medicos_datatable = {
      title: 'Listado de Medicos',
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
          column: 'email',
          wrap_column: false,
          header: 'Correo',
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
}
