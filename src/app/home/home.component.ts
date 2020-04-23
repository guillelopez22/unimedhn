import { Component, ViewChildren, QueryList, AfterViewInit, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { BaseChartDirective } from 'ng2-charts';
import { LayoutService } from '../layout/layout.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormControlDirective } from '@angular/forms';
import { FormRendererComponent } from '../components/form_renderer/form_renderer.component';
import { AlertService } from '../components/alert_service/alert.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public integer_mask = createNumberMask({ allowNegative: true, allowDecimal: false, integerLimit: 25, prefix: '', includeThousandsSeparator: true });
  public decimal_mask = createNumberMask({ allowNegative: true, allowDecimal: true, integerLimit: 25, decimalLimit: 25, prefix: '', includeThousandsSeparator: true });
  @ViewChild('instituciones_modal') instituciones_modal: ModalDirective;
  @ViewChild('consultas_form') consultas_form: FormRendererComponent;
  @ViewChild('consulta_modal') consulta_modal: ModalDirective;
  @ViewChild('inventory_in_form') inventory_in_form: FormControlDirective;
  medicamentos_datatable_loading: boolean;
  submitted: boolean;
  insumos_datatable_loading: boolean;
  form_values: any;
  displayRangeModel = 12;
  header = '';
  small_text = '';
  isAdmin = false;
  show_meds = true;
  user_data: any;
  doctor_data: any;
  institutions = [];
  consultas = [];
  patients = [];
  selected_products = [];
  selected_institution: any;
  instituciones_datatable_loading: boolean;
  instituciones_datatable: any;
  patients_datatable: any;
  patients_datatable_loading: boolean;
  medicamentos = [];
  insumos = [];
  medicamentos_datatable: any;
  insumos_datatable: any;
  step = 1;
  selected_patient: any;
  inventory = [];
  consulta_inputs = [];
 chart1Data = [{
    label: 'Visits',
    data: [14, 37, 30, 46, 80, 42, 33, 13, 25, 6, 88, 96],
    borderWidth: 1,
    fill: false
  }, {
    label: 'Returns',
    data: [56, 17, 19, 96, 73, 46, 67, 40, 77, 43, 64, 54],
    borderWidth: 1,
    borderDash: [5, 5]
  }];
  chart1Options = {
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#aaa',
          autoSkipPadding: 50
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#aaa',
          maxTicksLimit: 5
        }
      }]
    },

    responsive: false,
    maintainAspectRatio: false
  };
  chart1Colors = [{
    backgroundColor: 'rgba(38, 180, 255, 0.1)',
    borderColor: '#26B4FF'
  }, {
    backgroundColor: 'rgba(136, 151, 170, 0.1)',
    borderColor: '#8897aa'
  }];
  // Chart 2
  //
  chart2Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
    ],
    borderWidth: 0
  }];
  chart2Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart2Colors = [{
    backgroundColor: '#673AB7'
  }];
  // Chart 3
  //
  chart3Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
    ],
    borderWidth: 1,
    pointRadius: 1,
    lineTension: 0
  }];
  chart3Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart3Colors = [{
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#009688',
    pointBorderColor: 'rgba(0,0,0,0)'
  }];
  // Chart 4
  //
  chart4Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
    ],
    borderWidth: 1,
    pointRadius: 1,
    lineTension: 0
  }];
  chart4Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart4Colors = [{
    backgroundColor: 'rgba(206, 221, 54, 0)',
    borderColor: 'rgba(206, 221, 54, 1)',
    pointBorderColor: 'rgba(0,0,0,0)'
  }];
  // Chart 5
  //
  chart5Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
    ],
    borderWidth: 1,
    pointRadius: 1,
    lineTension: 0
  }];
  chart5Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart5Colors = [{
    backgroundColor: 'rgba(136, 151, 170, .2)',
    borderColor: 'rgba(136, 151, 170, 1)',
    pointBorderColor: 'rgba(0,0,0,0)'
  }];
  // Chart 6
  //
  chart6Data = [{
    data: [1225, 654, 211],
    borderWidth: 1
  }];
  chart6Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      position: 'right',
      labels: {
        boxWidth: 12
      }
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart6Colors = [{
    backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)'],
    borderColor: ['#647c8a', '#2196f3', '#02bc77']
  }];
  // Chart 7
  //
  chart7Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
    ],
    borderWidth: 0
  }];
  chart7Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart7Colors = [{
    backgroundColor: '#8897AA'
  }];
  // Chart 8
  //
  chart8Data = [{
    data: [1225, 654, 211, 402],
    borderWidth: 1
  }];
  chart8Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      position: 'right',
      labels: {
        boxWidth: 12
      }
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart8Colors = [{
    backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)', 'rgba(206, 221, 54, 0.5)'],
    borderColor: ['#647c8a', '#2196f3', '#02bc77', 'rgba(206, 221, 54, 1)']
  }];
  // Resize charts
  //
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
  constructor(private appService: AppService, public endpoint : AppEndpoints,  private layoutService: LayoutService, private alertService: AlertService) {
    this.appService.pageTitle = 'Inicio';
    this.instituciones_datatable_loading = false;
    this.patients_datatable_loading = false;
    this.medicamentos_datatable_loading = false;
    this.insumos_datatable_loading = false;
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
    if (localStorage.getItem('unimed_session')) {
      const object = JSON.parse(localStorage.getItem('unimed_session'));
      if (object) {
        this.user_data = object;
        if (object.role === 1) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } else {
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
    }
    this.get_doctor_data();
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
    this.patients_datatable = {
      // title: 'Listado de medicamentos',
      icon: 'user-md',
      object_description: 'alumnos',
      empty_text: 'No se encontraron alumnos',
      columns: [
        {
          column: 'first_name',
          wrap_column: false,
          header: 'Nombre',
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
          column: 'gender',
          wrap_column: false,
          header: 'Sexo',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'grado',
          wrap_column: true,
          header: 'Grado',
          wrap_header: true,
          type: 'text'
        },
        {
          column: 'seccion',
          wrap_column: true,
          header: 'Seccion',
          wrap_header: true,
          type: 'text'
        },
      ],
      events: [
        {
          name: 'Realizar Consulta',
          style: 'color:#39B7CB',
          hover_style: 'cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;',
          icon: 'stethoscope'
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

  ngAfterViewInit() {
    setTimeout(() => {
      const resizeCharts = () => this.charts.forEach(chart => chart.chart.resize());
      resizeCharts();
      this.layoutService.on('resize.app-home', resizeCharts);
    });
  }

  hide_modal() {
    this.step = 1;
    this.consulta_modal.hide();
  }

  return() {
    this.step --;
  }

  ngOnDestroy() {
    setTimeout(() => this.layoutService.off('resize.app-home'));
  }

  select_patient(event) {
    this.selected_patient = event.data;
    this.consulta_modal.show();
  }

  get_doctor_data() {
    this.endpoint.get_doctor_by_user(this.user_data.user_id).subscribe(data => {
      this.doctor_data = data.doctor;
      this.header = this.doctor_data.first_name;
      this.institutions = data.institutions;
      this.consultas = data.consultas;
      if (data.institutions.length > 1) {
        this.instituciones_modal.show();
      } else {
        this.selected_institution = data.institutions[0];
        this.small_text = this.selected_institution.nombre;
        this.get_institution_students();
        this.get_institution_cartera_products();
      }
    });
  }

  select_institution(event) {
    this.selected_institution = event.data;
    this.small_text = this.selected_institution.nombre;
    this.get_institution_students();
    this.get_institution_cartera_products();
    this.instituciones_modal.hide();
  }

  get_institution_students() {
    this.endpoint.alumno_by_institution({institution_id: this.selected_institution.id}).subscribe(data => {
      this.patients = data;
    });
  }

  get_institution_cartera_products() {
    this.endpoint.get_all_cartera_products(this.selected_institution.id).subscribe(data => {
      console.log(data);

      this.medicamentos = data.medicamentos;
      this.insumos = data.insumos;
    });
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
  valid() {
    if (this.inventory_in_form.valid) {
      this.submitted = false;
      return true;
    } else {
      this.submitted = true;
      return false;
    }
  }

  insert_consulta() {
    if (this.inventory_in_form.valid) {
      this.endpoint.insert_consulta({
        institution_id: this.selected_institution.id,
        patient_id: this.selected_patient.patient_id,
        doctor_id: this.doctor_data.doctor_id,
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
          }).subscribe(() => {
            this.get_doctor_data();
            this.consulta_modal.hide();
            this.selected_products = [];
          });
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

  show_medicamentos() {
    this.show_meds = true;
    this.get_medicamento_inventory();
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

  medicamentos_datatable_events(event) {
    console.log(event.data);
    // this.confirmation_modal.show();
    this.selected_products.push({
      cartera_id: event.data.cartera_id,
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
    console.log('====================================');
    console.log(this.selected_products);
    console.log('====================================');
  }

  insumos_datatable_events(event) {
    // this.confirmation_modal.show();
    this.selected_products.push({
      cartera_id: event.data.cartera_id,
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
}
