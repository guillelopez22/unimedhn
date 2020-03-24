import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceDatatableComponent } from '../components/service_datatable/service-datatable.component';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { AlertService } from '../components/alert_service/alert.service';

@Component({
  selector: 'consultas',
  templateUrl: 'consulta.component.html'
})

export class ConsultaComponent implements OnInit {
  @ViewChild('cosultas_datatable_ref') consultas_datatable_ref: ServiceDatatableComponent;
  @ViewChild('instituciones_datatable_ref') instituciones_datatable_ref: ServiceDatatableComponent;
  public instituciones_datatable: any;
  public consultas_datatable: any;
  public consultas_loading_datatable = true;
  public instituciones_datatable_loading: boolean;
  public consultas = [];
  public main_view = true;
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
   }

  ngOnInit() {
    this.consultas_datatable = {
      // title: 'Listado de Medicos',
      icon: 'user-md',
      object_description: 'consultas',
      empty_text: 'No se encontraron consultas',
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
          name: 'Detalle de la Consulta',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        {
          name: 'Eliminar Eliminar Consulta',
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
      title: 'Listado de Instituciones',
      icon: 'graduation-cap',
      object_description: 'instituciones',
      empty_text: 'No se encontraron instituciones',
      columns: [
        {
          column: 'nombre',
          wrap_column: false,
          header: 'Institución',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'departamento',
          wrap_column: true,
          header: 'Departamento',
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
          column: 'calendario',
          wrap_column: true,
          header: 'Calendario Académico',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'tipo',
          wrap_column: true,
          header: 'Idiomas',
          wrap_header: true,
          type: 'text'
        }
      ],
      events: [
        {
          name: 'Detalle de la Institución',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'search'
        },
        // {
        //     name: "Editar Institución",
        //     style: "color:#ffb300",
        //     hover_style: "cursor:pointer; color:#ffb300; background-color:#FFF7C6 !important;",
        //     icon: "edit"
        // },
        {
          name: 'Eliminar Institución',
          style: 'color:#FB5D5D',
          hover_style: 'cursor:pointer; color:#FB5D5D; background-color:#FEDCDC !important;',
          icon: 'trash-alt'
        }
      ],
      navigation_offsets: [5, 10, 15, 20, 25, 50],
      show_search_field: true,
      table_icon: 'caret-right'
    };
  }
  ngAfterViewInit() {
    setTimeout(() => { this.instituciones_datatable_ref.set_show_length(10); }, 500);
  }
  add_consulta() {
    this.main_view = false;
    this.creating_consult_view = true;
  }

  open_main_view() {
    this.main_view = true;
    this.creating_consult_view = false;
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
