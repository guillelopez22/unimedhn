import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy, OnInit  } from '@angular/core';
import { FormControlDirective } from '@angular/forms';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { LayoutService } from '../layout/layout.service';
import { ModalDirective } from 'ngx-bootstrap';
import { default as swal } from 'sweetalert2';
import { FormRendererComponent } from '../components/form_renderer/form_renderer.component';
import { AlertService } from '../components/alert_service/alert.service';
import { ExcelService } from '../components/excel_service/excel.service';
import { conformToMask } from 'angular2-text-mask/dist/angular2TextMask';
import { ServiceDatatableComponent } from '../components/service_datatable/service-datatable.component';
import departamentos from '../components/catalogs/departamentos';

@Component({
    selector: 'instituciones',
    templateUrl: './instituciones.component.html',
    styleUrls:[
        '../../vendor/libs/spinkit/spinkit.scss'
    ]
})
export class InstitucionesComponent implements OnInit{
    public departamentos:any[];
    public ciudades:any[];
    public departamentos_search:any[];
    public ciudades_search:any[];
    public view:number;
    public inner_view:number;
    public loading:boolean;

    @ViewChild('instituciones_modal') instituciones_modal: ModalDirective;
    @ViewChild('instituciones_form') instituciones_form: FormRendererComponent;
    @ViewChild('instituciones_form_view') instituciones_form_view: FormRendererComponent;
    @ViewChild('instituciones_datatable_ref') instituciones_datatable_ref: ServiceDatatableComponent;
    public instituciones_view:number;
    public instituciones_modal_view:number;
    public instituciones_list:any[];
    public instituciones_loading:boolean;
    public instituciones_datatable:any;
    public instituciones_datatable_loading:boolean;
    public instituciones_inputs=[];
    public instituciones_contactos=[];
    public instituciones_data = {
        id:"",
        nombre:"",
        correo:"",
        telefono:"",
        departamento:"",
        ciudad:"",
        direccion:"",
        inicio_clases:"",
        calendario:"",
        tipo:"",
        contactos:[],
        alumnos:[],
        doctores:[]
    };

    public instituciones_filters = {
        current_offset:1,
        view_length:10,
        sort_order:"",
        sort_ascendent:false
    };

    @ViewChild('instituciones_search_modal') instituciones_search_modal: ModalDirective;
    @ViewChild('instituciones_search_form') instituciones_search_form: FormRendererComponent;
    public instituciones_search_inputs=[]; 
    public instituciones_search_data = {
        nombre:"",
        ciudad:"",
        departamento:"",
        calendario:"",
        tipo:""
    }

    @ViewChild('contacto_form') contacto_form: FormControlDirective;
    public contacto_submitted:boolean;
    public contacto_view_ref:number;
    public contacto_data = {
        nombre:"",
        cargo:"",
        celular:""
    }
    public phone_mask=[/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/];

    constructor(private appService: AppService, public endpoint : AppEndpoints,  private layoutService: LayoutService, private alertService: AlertService, private excelService: ExcelService) {
        this.appService.pageTitle = 'Instituciones';
        this.view = 1;
        this.inner_view = 1;
        this.loading = false;
        this.departamentos = departamentos;
        this.ciudades = [];

        this.departamentos_search = departamentos;
        this.ciudades_search = [];

        this.instituciones_view = 1;
        this.instituciones_modal_view = 1;
        this.instituciones_list = [];
        this.instituciones_loading = false;
        this.instituciones_datatable_loading = false;
        this.instituciones_inputs=[
            {
                class:"row",
                columns:[
                    {
                        class:"col-md-6",
                        inputs:[
                            {
                                type:"text",
                                extra:"",
                                name:"nombre",
                                label:"Nombre de la Institución",
                                icon:"",
                                class:"form-control",
                                placeholder:"",
                                minlength:null,
                                maxlength:"100",
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"Formato Inválido",
                                error_minlength:"",
                                list_data:{
                                    value:"",
                                    text:""
                                },
                                list:()=>{
                                    return []
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return true;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"select",
                                extra:"",
                                name:"calendario",
                                label:"Calendario Académico",
                                icon:"",
                                class:"form-control",
                                placeholder:"- Seleccione -",
                                minlength:null,
                                maxlength:null,
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"",
                                error_minlength:"",
                                list_data:{
                                    value:"value",
                                    text:"text"
                                },
                                list:()=>{
                                    return [
                                        {
                                            value:"Hondureño",
                                            text:"Hondureño"
                                        },
                                        {
                                            value:"Estados Unidos",
                                            text:"Estados Unidos"
                                        }  
                                    ]
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return true;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"select",
                                extra:"",
                                name:"tipo",
                                label:"Idiomas",
                                icon:"",
                                class:"form-control",
                                placeholder:"- Seleccione -",
                                minlength:null,
                                maxlength:null,
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"",
                                error_minlength:"",
                                list_data:{
                                    value:"value",
                                    text:"text"
                                },
                                list:()=>{
                                    return [
                                        {
                                            value:"Monolingüe",
                                            text:"Monolingüe"
                                        },
                                        {
                                            value:"Bilingüe",
                                            text:"Bilingüe"
                                        },
                                        {
                                            value:"Trilingüe",
                                            text:"Trilingüe"
                                        } 
                                    ]
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return true;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    }
                ]
            },
            {
                class:"row",
                columns:[
                    {
                        class:"col-md-6",
                        inputs:[
                            {
                                type:"email",
                                extra:"",
                                name:"correo",
                                label:"Correo Electrónico",
                                icon:"",
                                class:"form-control",
                                placeholder:"",
                                minlength:null,
                                maxlength:"100",
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"",
                                error_minlength:"",
                                list_data:{
                                    value:"",
                                    text:""
                                },
                                list:()=>{
                                    return []
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return true;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"text",
                                extra:"",
                                name:"telefono",
                                label:"Teléfono",
                                icon:"",
                                class:"form-control",
                                placeholder:"",
                                minlength:null,
                                maxlength:null,
                                pattern:"^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                                error_required:"Requerido",
                                error_pattern:"Formato Inválido",
                                error_minlength:"",
                                list_data:{
                                    value:"",
                                    text:""
                                },
                                list:()=>{
                                    return []
                                },
                                textmask:()=>{
                                    return [/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/];
                                },
                                required:()=>{
                                    return false;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"calendar",
                                extra:"popup",
                                name:"inicio_clases",
                                label:"Inicio de Clases",
                                icon:"",
                                class:"form-control",
                                placeholder:"",
                                minlength:null,
                                maxlength:null,
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"Formato Inválido",
                                error_minlength:"",
                                list_data:{
                                    value:"",
                                    text:""
                                },
                                list:()=>{
                                    return []
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return true;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                ]
            },
            {
                class:"row",
                columns:[
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"select",
                                extra:"",
                                name:"departamento",
                                label:"Departamento",
                                icon:"",
                                class:"form-control",
                                placeholder:"- Seleccione -",
                                minlength:null,
                                maxlength:null,
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"",
                                error_minlength:"",
                                list_data:{
                                    value:"name",
                                    text:"name"
                                },
                                list:()=>{
                                    return this.departamentos;
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return true;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                    this.instituciones_data.ciudad = "";
                                    this.ciudades = [];
                                    for(var i = 0;i<this.departamentos.length;i++){
                                        if(event == this.departamentos[i].name){
                                            this.ciudades = this.departamentos[i].towns;
                                        }
                                    }
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"select",
                                extra:"",
                                name:"ciudad",
                                label:"Ciudad",
                                icon:"",
                                class:"form-control",
                                placeholder:"- Seleccione -",
                                minlength:null,
                                maxlength:null,
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"",
                                error_minlength:"",
                                list_data:{
                                    value:"name",
                                    text:"name"
                                },
                                list:()=>{
                                    return this.ciudades;
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return true;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                    {
                        class:"col-md-6",
                        inputs:[
                            {
                                type:"text",
                                extra:"",
                                name:"direccion",
                                label:"Dirección",
                                icon:"",
                                class:"form-control",
                                placeholder:"",
                                minlength:null,
                                maxlength:"200",
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"Formato Inválido",
                                error_minlength:"",
                                list_data:{
                                    value:"",
                                    text:""
                                },
                                list:()=>{
                                    return []
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return true;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    }
                ]
            },
        ];
        this.instituciones_search_inputs=[
            {
                class:"row",
                columns:[
                    {
                        class:"col-md-6",
                        inputs:[
                            {
                                type:"text",
                                extra:"",
                                name:"nombre",
                                label:"Nombre de la Institución",
                                icon:"",
                                class:"form-control",
                                placeholder:"",
                                minlength:null,
                                maxlength:"100",
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"Formato Inválido",
                                error_minlength:"",
                                list_data:{
                                    value:"",
                                    text:""
                                },
                                list:()=>{
                                    return []
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return false;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"select",
                                extra:"",
                                name:"calendario",
                                label:"Calendario Académico",
                                icon:"",
                                class:"form-control",
                                placeholder:"- Seleccione -",
                                minlength:null,
                                maxlength:null,
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"",
                                error_minlength:"",
                                list_data:{
                                    value:"value",
                                    text:"text"
                                },
                                list:()=>{
                                    return [
                                        {
                                            value:"Hondureño",
                                            text:"Hondureño"
                                        },
                                        {
                                            value:"Estados Unidos",
                                            text:"Estados Unidos"
                                        }  
                                    ]
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return false;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"select",
                                extra:"",
                                name:"tipo",
                                label:"Idiomas",
                                icon:"",
                                class:"form-control",
                                placeholder:"- Seleccione -",
                                minlength:null,
                                maxlength:null,
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"",
                                error_minlength:"",
                                list_data:{
                                    value:"value",
                                    text:"text"
                                },
                                list:()=>{
                                    return [
                                        {
                                            value:"Monolingüe",
                                            text:"Monolingüe"
                                        },
                                        {
                                            value:"Bilingüe",
                                            text:"Bilingüe"
                                        },
                                        {
                                            value:"Trilingüe",
                                            text:"Trilingüe"
                                        } 
                                    ]
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return false;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    }
                ]
            },
            {
                class:"row",
                columns:[
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"select",
                                extra:"",
                                name:"departamento",
                                label:"Departamento",
                                icon:"",
                                class:"form-control",
                                placeholder:"- Seleccione -",
                                minlength:null,
                                maxlength:null,
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"",
                                error_minlength:"",
                                list_data:{
                                    value:"name",
                                    text:"name"
                                },
                                list:()=>{
                                    return this.departamentos_search;
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return false;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                    this.instituciones_search_data.ciudad = "";
                                    this.ciudades_search = [];
                                    for(var i = 0;i<this.departamentos_search.length;i++){
                                        if(event == this.departamentos_search[i].name){
                                            this.ciudades_search = this.departamentos_search[i].towns;
                                        }
                                    }
                                },
                                input:()=>{
                                }
                            }
                        ]
                    },
                    {
                        class:"col-md-3",
                        inputs:[
                            {
                                type:"select",
                                extra:"",
                                name:"ciudad",
                                label:"Ciudad",
                                icon:"",
                                class:"form-control",
                                placeholder:"- Seleccione -",
                                minlength:null,
                                maxlength:null,
                                pattern:null,
                                error_required:"Requerido",
                                error_pattern:"",
                                error_minlength:"",
                                list_data:{
                                    value:"name",
                                    text:"name"
                                },
                                list:()=>{
                                    return this.ciudades_search;
                                },
                                textmask:()=>{
                                    return false;
                                },
                                required:()=>{
                                    return false;
                                },
                                disabled:()=>{
                                    return false;
                                },
                                change:(event)=>{
                                },
                                input:()=>{
                                }
                            }
                        ]
                    }
                ]
            },
        ];
        this.contacto_view_ref = 1;
    }

    ngOnInit(){
        this.instituciones_datatable = {
            title:"Listado de Instituciones",
            icon:"graduation-cap",
            object_description:"instituciones",
            empty_text:"No se encontraron instituciones",
            columns:[
                {   
                    column:"nombre",
                    wrap_column:false,
                    header:"Institución",
                    wrap_header:true,
                    type:"text"
                },
                {   
                    column:"departamento",
                    wrap_column:true,
                    header:"Departamento",
                    wrap_header:true,
                    type:"text"
                },
                {   
                    column:"ciudad",
                    wrap_column:false,
                    header:"Ciudad",
                    wrap_header:true,
                    type:"text"
                },
                {   
                    column:"calendario",
                    wrap_column:true,
                    header:"Calendario Académico",
                    wrap_header:true,
                    type:"text"
                },
                {   
                    column:"tipo",
                    wrap_column:true,
                    header:"Idiomas",
                    wrap_header:true,
                    type:"text"
                }
            ],
            events:[
                {
                    name:"Detalle de la Institución",
                    style:"color:#39B7CB",
                    hover_style:"cursor:pointer; color:#39B7CB; background-color:#BDF0FF !important;",
                    icon:"search"
                },
                {
                    name:"Editar Institución",
                    style:"color:#ffb300",
                    hover_style:"cursor:pointer; color:#ffb300; background-color:#FFF7C6 !important;",
                    icon:"edit"
                },
                {
                    name:"Eliminar Institución",
                    style:"color:#FB5D5D",
                    hover_style:"cursor:pointer; color:#FB5D5D; background-color:#FEDCDC !important;",
                    icon:"trash-alt"
                }
            ],
            navigation_offsets:[5,10,15,20,25,50],
            show_search_field:true,
            table_icon:"caret-right"
        }
    }

    ngAfterViewInit(){
        setTimeout(()=>{ this.instituciones_datatable_ref.set_show_length(10); }, 500);
        
    }

    //########################################################################
    //INSTITUCIONES ##########################################################

        instituciones_datatable_events(event){
            if(event.event == "Detalle de la Institución"){
                this.open_institucion(event.data);
            }else if(event.event == "Editar Institución"){
                this.open_update_institucion(event.data);
            }else if(event.event == "Eliminar Institución"){
                this.open_delete_institucion(event.data);
            }
        }

        open_institucion(data){
            this.view = 2;
            this.inner_view = 1;
            this.instituciones_data = {
                id:data.id,
                nombre:data.nombre,
                correo:data.correo,
                telefono:data.telefono,
                departamento:data.departamento,
                ciudad:data.ciudad,
                direccion:data.direccion,
                inicio_clases:data.inicio_clases,
                calendario:data.calendario,
                tipo:data.tipo,
                contactos:data.contactos,
                alumnos:[],
                doctores:[]
            };
        }

        close_institucion(){
            this.view = 1;
            this.inner_view = 1;
            this.instituciones_data = {
                id:"",
                nombre:"",
                correo:"",
                telefono:"",
                departamento:"",
                ciudad:"",
                direccion:"",
                inicio_clases:"",
                calendario:"",
                tipo:"",
                contactos:[],
                alumnos:[],
                doctores:[]
            };
        }

        open_generales(){
            this.inner_view = 1;
        }

        open_alumnos(){
            this.inner_view = 2;
        }

        open_doctores(){
            this.inner_view = 3;
        }

        instituciones_datatable_get_results_offset_change(data){
            this.instituciones_filters = {
                current_offset:data.current_offset,
                view_length:data.view_length,
                sort_order:data.sort_order,
                sort_ascendent:data.sort_ascendent
            }
            var response;
            var load = {
                current_offset:this.instituciones_filters.current_offset,
                sort_ascendent:this.instituciones_filters.sort_ascendent,
                sort_order:this.instituciones_filters.sort_order,
                view_length:this.instituciones_filters.view_length,
                nombre:this.instituciones_search_data.nombre,
                ciudad:this.instituciones_search_data.ciudad,
                departamento:this.instituciones_search_data.departamento,
                calendario:this.instituciones_search_data.calendario,
                tipo:this.instituciones_search_data.tipo
            }
            this.endpoint.get_instituciones(load).subscribe(
                data => response = data,
                err => {
                    this.instituciones_datatable_ref.set_loading(false);
                    if(err.status && err.error){
                        this.alertService.alert_message(err.status ,err.error);
                    }else{
                        this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                    }
                },
                ()=> {
                    try{
                        console.log(response);
                        for(var i = 0;i<response.list.length;i++){
                            response.list[i].contactos = JSON.parse(response.list[i].contactos);
                            response.list[i].inicio_clases = response.list[i].inicio_clases.split("-").reverse().join("/");
                        }
                        this.instituciones_datatable_ref.set_results_offset_change(response.list);
                    }catch(error){
                        this.instituciones_datatable_ref.set_loading(false);
                        this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                    }
                    
                }
            );
        }

        instituciones_datatable_get_results_filter_change(data){
            this.instituciones_filters = {
                current_offset:data.current_offset,
                view_length:data.view_length,
                sort_order:data.sort_order,
                sort_ascendent:data.sort_ascendent
            }
            var response;
            var load = {
                current_offset:this.instituciones_filters.current_offset,
                sort_ascendent:this.instituciones_filters.sort_ascendent,
                sort_order:this.instituciones_filters.sort_order,
                view_length:this.instituciones_filters.view_length,
                nombre:this.instituciones_search_data.nombre,
                ciudad:this.instituciones_search_data.ciudad,
                departamento:this.instituciones_search_data.departamento,
                calendario:this.instituciones_search_data.calendario,
                tipo:this.instituciones_search_data.tipo
            }
            this.endpoint.get_instituciones(load).subscribe(
                data => response = data,
                err => {
                    this.instituciones_datatable_ref.set_loading(false);
                    if(err.status && err.error){
                        this.alertService.alert_message(err.status ,err.error);
                    }else{
                        this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                    }
                },
                ()=> {
                    try{
                        console.log(response);
                        for(var i = 0;i<response.list.length;i++){
                            for(var i = 0;i<response.list.length;i++){
                                response.list[i].contactos = JSON.parse(response.list[i].contactos);
                                response.list[i].inicio_clases = response.list[i].inicio_clases.split("-").reverse().join("/");
                            }
                        }
                        this.instituciones_datatable_ref.set_results_filter_change(response.list, response.count);
                    }catch(error){
                        this.instituciones_datatable_ref.set_loading(false);
                        this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                    }
                }
            );
        }

        instituciones_datatable_get_results_update_list(data){
            this.instituciones_filters = {
                current_offset:data.current_offset,
                view_length:data.view_length,
                sort_order:data.sort_order,
                sort_ascendent:data.sort_ascendent
            }
            var response;
            var load = {
                current_offset:this.instituciones_filters.current_offset,
                sort_ascendent:this.instituciones_filters.sort_ascendent,
                sort_order:this.instituciones_filters.sort_order,
                view_length:this.instituciones_filters.view_length,
                nombre:this.instituciones_search_data.nombre,
                ciudad:this.instituciones_search_data.ciudad,
                departamento:this.instituciones_search_data.departamento,
                calendario:this.instituciones_search_data.calendario,
                tipo:this.instituciones_search_data.tipo
            }
            this.endpoint.get_instituciones(load).subscribe(
                data => response = data,
                err => {
                    this.instituciones_datatable_ref.set_loading(false);
                    if(err.status && err.error){
                        this.alertService.alert_message(err.status ,err.error);
                    }else{
                        this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                    }
                },
                ()=> {
                    try{
                        console.log(response);
                        for(var i = 0;i<response.list.length;i++){
                            for(var i = 0;i<response.list.length;i++){
                                response.list[i].contactos = JSON.parse(response.list[i].contactos);
                                response.list[i].inicio_clases = response.list[i].inicio_clases.split("-").reverse().join("/");
                            }
                        }
                        this.instituciones_datatable_ref.set_results_update_list(response.list, response.count);
                    }catch(error){
                        this.instituciones_datatable_ref.set_loading(false);
                        this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                    }
                }
            );
        }

        open_insert_institucion(){
            this.instituciones_loading = false;
            this.instituciones_form.clean_form();
            this.instituciones_contactos = [];
            this.instituciones_modal_view = 1;
            this.instituciones_modal.show();
        }

        insert_institucion(){
            if(this.instituciones_form.valid() && this.instituciones_contactos.length > 0){
                this.instituciones_loading = true;
                var form_values = this.instituciones_form.get_values();
                var load = {
                    nombre:form_values.nombre,
                    correo:form_values.correo,
                    telefono:form_values.telefono,
                    departamento:form_values.departamento,
                    ciudad:form_values.ciudad,
                    direccion:form_values.direccion,
                    inicio_clases:form_values.inicio_clases.split("/").reverse().join("-"),
                    calendario:form_values.calendario,
                    tipo:form_values.tipo,
                    contactos:JSON.stringify(this.instituciones_contactos)
                };
                var response;
                this.endpoint.insert_institucion(load).subscribe(
                    data => response = data,
                    err => {
                        this.instituciones_loading = false;
                        if(err.status && err.error){
                            this.alertService.alert_message(err.status ,err.error);
                        }else{
                            this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                        }
                    },
                    ()=> {
                        try{
                            this.instituciones_modal.hide();
                            this.instituciones_datatable_ref.emit_get_results_update_list();
                            this.alertService.alert_success(response.title, response.message);
                            this.instituciones_loading = false;
                        }catch(error){
                            this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                            this.instituciones_loading = false;
                        }
                    }
                );
            }
        }

        open_update_institucion(data){
            this.instituciones_form.clean_form();
            this.instituciones_form.set_values_with_date(data);
            this.instituciones_contactos = data.contactos;
            this.instituciones_loading = false;
            this.instituciones_modal_view = 2;
            this.instituciones_modal.show();
        }

        open_view_institucion(data){
            this.instituciones_form_view.clean_form();
            this.instituciones_form_view.set_values(data);
            this.instituciones_contactos = data.contactos;
            this.instituciones_loading = false;
        }

        update_institucion(){
            if(this.instituciones_form.valid() && this.instituciones_contactos.length > 0){
                this.alertService.option_alert("Editar Institución","¿Está seguro que desea editar la institución seleccionada?","Sí, Editar").then((result) => {
                    if(result.value){
                        this.instituciones_loading = true;
                        var form_values = this.instituciones_form.get_values();
                        var load = {
                            id:form_values.id,
                            nombre:form_values.nombre,
                            correo:form_values.correo,
                            telefono:form_values.telefono,
                            departamento:form_values.departamento,
                            ciudad:form_values.ciudad,
                            direccion:form_values.direccion,
                            inicio_clases:form_values.inicio_clases.split("/").reverse().join("-"),
                            calendario:form_values.calendario,
                            tipo:form_values.tipo,
                            contactos:JSON.stringify(this.instituciones_contactos)
                        };
                        var response;
                        this.endpoint.update_institucion(load).subscribe(
                            data => response = data,
                            err => {
                                this.instituciones_loading = false;
                                if(err.status && err.error){
                                    this.alertService.alert_message(err.status ,err.error);
                                }else{
                                    this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                                }
                            },
                            ()=> {
                                try{
                                    this.instituciones_modal.hide();
                                    this.instituciones_datatable_ref.emit_get_results_update_list();
                                    this.alertService.alert_success(response.title, response.message);
                                    this.instituciones_loading = false;
                                }catch(error){
                                    this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                                    this.instituciones_loading = false;
                                }
                            }
                        );
                    }
                }).catch(()=>{return false;}); 
            }
        }

        open_delete_institucion(data){
            this.alertService.option_alert("Eliminar Institución","¿Está seguro que desea eliminar la institución seleccionada?<br><br><b>Institución:<br></b><b class='text-success'> "+data.nombre+"</b>","Sí, Eliminar").then((result) => {
                if(result.value){
                    this.delete_institucion(data.id);
                }
            }).catch(()=>{return false;});
        }

        delete_institucion(id){
            this.instituciones_datatable_loading = true;
            var load = {
                id:id
            };
            var response;
            this.endpoint.delete_institucion(load).subscribe(
                data => response = data,
                err => {
                    this.instituciones_datatable_loading = false;
                    if(err.status && err.error){
                        this.alertService.alert_message(err.status ,err.error);
                    }else{
                        this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                    }
                },
                ()=> {
                    try{
                        this.instituciones_datatable_ref.emit_get_results_update_list();
                        this.alertService.alert_success(response.title, response.message);
                        this.instituciones_datatable_loading = false;
                    }catch(error){
                        this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                        this.instituciones_datatable_loading = false;
                    }
                }
            );
        }

        instituciones_open_search(){
            this.instituciones_search_form.set_values(this.instituciones_search_data);
            this.instituciones_search_modal.show();
        }

        search_instituciones(){
            if(this.instituciones_search_form.valid()){
                if(this.instituciones_search_form.get_values().nombre){
                    this.instituciones_search_data.nombre = this.instituciones_search_form.get_values().nombre;
                }else{
                    this.instituciones_search_data.nombre = "";
                }
                if(this.instituciones_search_form.get_values().ciudad){
                    this.instituciones_search_data.ciudad = this.instituciones_search_form.get_values().ciudad;
                }else{
                    this.instituciones_search_data.ciudad = "";
                }
                if(this.instituciones_search_form.get_values().departamento){
                    this.instituciones_search_data.departamento = this.instituciones_search_form.get_values().departamento;
                }else{
                    this.instituciones_search_data.departamento = "";
                }
                if(this.instituciones_search_form.get_values().calendario){
                    this.instituciones_search_data.calendario = this.instituciones_search_form.get_values().calendario;
                }else{
                    this.instituciones_search_data.calendario = "";
                }
                if(this.instituciones_search_form.get_values().tipo){
                    this.instituciones_search_data.tipo = this.instituciones_search_form.get_values().tipo;
                }else{
                    this.instituciones_search_data.tipo = "";
                }
                this.instituciones_search_modal.hide();
                this.instituciones_datatable_ref.emit_get_results_filter_change();
            }
        }

        clean_search_instituciones(){
            this.instituciones_search_data = {
                nombre:"",
                ciudad:"",
                departamento:"",
                calendario:"",
                tipo:""
            }
            this.instituciones_search_modal.hide();
            this.instituciones_datatable_ref.emit_get_results_filter_change();
        }

        open_add_contacto(){
            this.contacto_view_ref = this.instituciones_modal_view + 0;
            this.contacto_submitted = false;
            this.contacto_data = {
                nombre:"",
                cargo:"",
                celular:""
            }
            this.instituciones_modal_view = 3;
        }

        close_add_contacto(){
            this.contacto_submitted = false;
            this.contacto_data = {
                nombre:"",
                cargo:"",
                celular:""
            }
            this.instituciones_modal_view = this.contacto_view_ref + 0;
        }

        remove_contacto(index){
            this.instituciones_contactos.splice(index, 1);
        }

        add_contacto(){
            if(this.contacto_form.valid){
                this.instituciones_contactos.push(this.contacto_data);
                this.close_add_contacto();
            }else{
                this.contacto_submitted = true;
            }
        }

    //INSTITUCIONES ##########################################################
    //########################################################################

    //########################################################################
    //CATALOGS ###############################################################

    //CATALOGS ###############################################################
    //########################################################################

    //########################################################################
    //MISC ###################################################################

    //MISC ###################################################################
    //########################################################################

    ngOnDestroy() {
        setTimeout(() => this.layoutService.off('resize.app-home'));
    }

}
