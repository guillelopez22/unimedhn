import {Component, OnInit, ViewChild, Input, Output, AfterViewInit, EventEmitter, Sanitizer } from '@angular/core';

@Component({
    selector: 'service-datatable',
    templateUrl: './service-datatable.template.html',
    styleUrls:[
    '../../../vendor/libs/spinkit/spinkit.scss',
    './service-datatable.style.css'
    ]
})

export class ServiceDatatableComponent implements OnInit{
    @Input() set datatable_options(option:datatableOptions) {
        if(option){
            this.options = option;
        }
    };
    @Output() option_event: EventEmitter<any> = new EventEmitter<any>();
    @Output() get_results_offset_change: EventEmitter<any> = new EventEmitter<any>();
    @Output() get_results_filter_change: EventEmitter<any> = new EventEmitter<any>();
    @Output() get_results_update_list: EventEmitter<any> = new EventEmitter<any>();

    private differ: any;
    public options:any;
    public order:string;
    public ascendent:boolean;
    public requestOffsetRight:number;
    public requestOffsetLeft:number;
    public show_length:number;
    public results_length:number;
    public results:any[];
    public loading:boolean;
    public filtering:boolean;
    public hovered_index:number;
    public hovered_event_index:number;
    public navigation_bar = {
        min6:-6,
        min5:-5,
        min4:-4,
        min3:-3,
        min2:-2,
        min1:-1,
        center:1,
        sum1:2,
        sum2:3,
        sum3:4,
        sum4:5,
        sum5:6,
        sum6:7,
    }

    constructor(public sanitizer:Sanitizer) {
        this.order = "";
        this.ascendent = false;
        this.requestOffsetRight = 1;
        this.requestOffsetLeft = 1;
        this.results_length = 0;
        this.results = [];
        this.loading = true;
        this.filtering = false;
        this.hovered_index = -1;
        this.hovered_event_index = -1;
    }

    ngOnInit() {
    }

    AfterViewInit(){
    }

    set_show_length(num){
        this.show_length = num;
        this.order = "";
        this.ascendent = false;
        this.requestOffsetRight = 1;
        this.requestOffsetLeft = 1;
        this.results_length = 0;
        this.results = [];
        this.loading = false;
        this.filtering = false;
        this.hovered_index = -1;
        this.hovered_event_index = -1;
        this.navigation_bar = {
            min6:-6,
            min5:-5,
            min4:-4,
            min3:-3,
            min2:-2,
            min1:-1,
            center:1,
            sum1:2,
            sum2:3,
            sum3:4,
            sum4:5,
            sum5:6,
            sum6:7,
        }
        this.emit_get_results_filter_change();
    }

    set_loading(value:boolean){
        this.loading = value;
    }

    get_loading(){
        return this.loading;
    }

    emit_option_event(index, event){
        this.option_event.emit({event:event, data:this.results[index]});
    }

    emit_get_results_offset_change(){
        this.loading = true;
        var current_value = (this.nav_current_value()*parseInt(this.show_length + "")) - parseInt(this.show_length + "");
        this.get_results_offset_change.emit({current_offset:current_value, view_length:parseInt(this.show_length + ""), sort_order:this.order, sort_ascendent:this.ascendent});
    }

    emit_get_results_filter_change(){
        this.loading = true;
        this.get_results_filter_change.emit({current_offset:0, view_length:parseInt(this.show_length + ""), sort_order:this.order, sort_ascendent:this.ascendent});
    }

    emit_get_results_update_list(){
        this.loading = true;
        var current_value = (this.nav_current_value()*parseInt(this.show_length + "")) - parseInt(this.show_length + "");
        this.get_results_update_list.emit({current_offset:current_value, view_length:parseInt(this.show_length + ""), sort_order:this.order, sort_ascendent:this.ascendent});
    }

    set_results_offset_change(results:any[]){
        this.results = results;
        this.set_navigation_bar();
        this.loading = false;
    }

    set_results_filter_change(results:any[], results_length:number){
        this.results = results;
        this.results_length = results_length;
        this.update_offsets();
        this.set_navigation_bar();
        this.loading = false;
    }

    set_results_update_list(results:any[], results_length:number){
        console.log(results, results_length);
        this.results = results;
        this.results_length = results_length;
        this.update_offsets_update_list();
        this.set_navigation_bar();
    }

    set_navigation_bar(){
        this.navigation_bar.min6 = (this.nav_current_value()-6);
        this.navigation_bar.min5 = (this.nav_current_value()-5);
        this.navigation_bar.min4 = (this.nav_current_value()-4);
        this.navigation_bar.min3 = (this.nav_current_value()-3);
        this.navigation_bar.min2 = (this.nav_current_value()-2);
        this.navigation_bar.min1 = (this.nav_current_value()-1);
        this.navigation_bar.center = (this.nav_current_value());
        this.navigation_bar.sum1 = (this.nav_current_value()+1);
        this.navigation_bar.sum2 = (this.nav_current_value()+2);
        this.navigation_bar.sum3 = (this.nav_current_value()+3);
        this.navigation_bar.sum4 = (this.nav_current_value()+4);
        this.navigation_bar.sum5 = (this.nav_current_value()+5);
        this.navigation_bar.sum6 = (this.nav_current_value()+6);
    }

    set_offset_view(selected){
        this.show_length = parseInt(selected);
        this.emit_get_results_filter_change();
        this.set_navigation_bar();
    } 

    update_offsets(){
        if(this.results_length > 0){
            if(this.results_length < this.show_length){
                this.requestOffsetRight = this.results_length;
            }else{
                this.requestOffsetRight = this.show_length;
            }
            this.requestOffsetLeft = 1;
        }else{
            this.requestOffsetRight = 1;
            this.requestOffsetLeft = 1;
        }
    }

    update_offsets_update_list(){
        if(this.results_length > 0){
            if(this.results_length < this.show_length){
                this.requestOffsetRight = this.results_length;
                this.requestOffsetLeft = 1;
                this.loading = false;
            }else if(this.results_length < this.requestOffsetLeft){
                this.requestOffsetLeft = this.requestOffsetLeft - this.show_length;
                this.requestOffsetRight = this.requestOffsetRight - this.show_length;
                this.emit_get_results_update_list();
            }else{
                this.loading = false;
            }
        }else{
            this.requestOffsetRight = 1;
            this.requestOffsetLeft = 1;
            this.loading = false;
        }
    }

    updateRequestsGoRight(){
        if(this.results_length > 0){
            if(this.results_length< this.requestOffsetRight+this.show_length){
                this.requestOffsetRight = this.results_length;
            }else{
                this.requestOffsetRight = this.requestOffsetRight + this.show_length;
            }
            this.requestOffsetLeft = this.requestOffsetLeft + this.show_length;
        }
        this.emit_get_results_offset_change();
    }

    updateRequestsGoLeft(){
        if(this.results_length > 0){
            if(this.results_length == this.requestOffsetRight){
                this.requestOffsetLeft = this.requestOffsetLeft - this.show_length;
                this.requestOffsetRight = this.requestOffsetLeft + this.show_length - 1;
            }else{
                this.requestOffsetLeft = this.requestOffsetLeft - this.show_length;
                this.requestOffsetRight = this.requestOffsetRight - this.show_length;
            }
        }
        this.emit_get_results_offset_change();
    }

    pagination_navigation(value){
        this.requestOffsetLeft = (this.show_length * (value-1)) + 1;
        if(this.show_length * value > this.results_length){
            this.requestOffsetRight = this.results_length;
        }else{
            this.requestOffsetRight = this.show_length * value;
        }
        this.emit_get_results_offset_change();
    }

    sort_column(index){
        if(this.order == this.options.columns[index].column && this.ascendent == false){
            this.ascendent = true;

        }else if(this.order == this.options.columns[index].column && this.ascendent == true){
            this.ascendent = false;

        }else{
            this.order = this.options.columns[index].column;
            this.ascendent = false;
        }
        this.emit_get_results_filter_change();
    }

    nav_current_value(){
        return Math.ceil(this.requestOffsetRight/this.show_length);
    }

    nav_min_value(){
        return 1;
    }

    nav_max_value(){
        return Math.ceil(this.results_length/this.show_length);
    }
}

export class datatableOptions {
    object_description:string;
    empty_text:string;
    columns:datatableColumns[];
    events:datatableEvents[];
    navigation_offsets:number[];
    navigation_starting_offset_index:number;
    show_search_field:boolean;
    table_icon:string;
};

export class datatableColumns {
    column:string;
    wrap_column:boolean;
    header:string;
    wrap_header:boolean;
    type:string;
    class:string;
};

export class datatableEvents {
    name:string;
    style:string;
    hover_style:string;
    icon:string;
};