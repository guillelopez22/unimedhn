import {Component, OnInit, ViewChild, Input, Output, AfterViewInit, IterableDiffers, DoCheck, EventEmitter, Sanitizer } from '@angular/core';

@Component({
  selector: 'datatable',
  templateUrl: './datatable.template.html',
  styleUrls:[
    '../../../vendor/libs/spinkit/spinkit.scss',
    './datatable.style.css'
  ]
})

export class DatatableComponent implements OnInit, DoCheck {
  @Input() set options(option:datatableOptions) {
    this.options_value = option;
    this.offsetView = this.options_value.navigation_offsets[this.options_value.navigation_starting_offset_index];
    this.update_offsets();
  };
  @Input() data_array:any[];
  @Input() loading:any;
  @Output() option_event: EventEmitter<any> = new EventEmitter<any>();

  public options_value:any;
  public order:string;
  public ascendent:boolean;
  public requestOffsetRight:number;
  public requestOffsetLeft:number;
  public offsetView:number;
  public displaying:string[];
  public resultados:any[];
  public static_resultados:any[];
  public search_word:string;
  public filtering:boolean;
  private differ: any;
  public index_clicked:number;
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

  constructor(private _iterableDiffers: IterableDiffers, public sanitizer:Sanitizer) {
    this.index_clicked = -1;
    this.offsetView = 0;
    this.hovered_index = -1;
    this.hovered_event_index = -1;
    this.order = "";
    this.ascendent = false;
    this.filtering = false;
    this.requestOffsetRight = 0;
    this.requestOffsetLeft = 0;
    this.displaying = [];
    this.search_word = "";
    this.resultados = [];
    this.differ = this._iterableDiffers.find([]).create(null);
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

  ngOnInit() {}

  AfterViewInit(){
    this.resultados = this.data_array;
    this.update_offsets();
  }

  ngDoCheck() {
    let changes = this.differ.diff(this.data_array);
    if (changes) {
      this.resultados = this.data_array;
      this.update_offsets();
    }
  }

  emit_option_event(index, event){
    for(var i = 0;i<this.data_array.length;i++){
      if(this.data_array[i]==this.resultados[index]){
        this.option_event.emit({event:event, data:this.data_array[i], index:i});
      }
    } 
    this.index_clicked = index;
  }

  filter_search(){
    var temp_results = [];
    if(this.search_word && this.search_word!=null && this.search_word !=""){
      for(var i =0;i<this.data_array.length;i++){
        for(var j =0;j<this.options_value.columns.length;j++){
          if(this.data_array[i][this.options_value.columns[j].column].toString().toLowerCase().includes(this.search_word.toLowerCase().trim())){
            temp_results.push(this.data_array[i]);
            break;
          }
        }
      }
      this.filtering = true;
      this.resultados = temp_results;
      this.update_offsets();
    }else{
      this.filtering = false;
      this.resultados = this.data_array;
      this.update_offsets();
    }
  }

  update_offsets(){
    this.requestOffsetRight = 0;
    this.requestOffsetLeft = 0;
    if(this.resultados.length > 0){
      if(this.resultados.length < this.offsetView){
        this.requestOffsetRight = this.resultados.length;
      }else{
        this.requestOffsetRight = this.offsetView;
      }
      this.requestOffsetLeft = 1;
      this.displaying = [];
      for(var i = this.requestOffsetLeft-1; i < this.requestOffsetRight; i++){
        this.displaying.push(" ");
      }
    }else{
      this.displaying = [];
      this.requestOffsetRight = 0;
      this.requestOffsetLeft = 0;
    }
    this.set_navigation_bar();
  }

  updateRequestsGoRight(){
      if(this.nav_current_value()<this.nav_max_value()){
        this.pagination_navigation(this.nav_current_value() + 1);
        this.set_navigation_bar();
      }
  }

  updateRequestsGoLeft(){
      if(this.nav_current_value()>this.nav_min_value()){
        this.pagination_navigation(this.nav_current_value() + -1);
        this.set_navigation_bar();
      }
  }

  sort_column(index){
    if(this.order == this.options_value.columns[index].column && this.ascendent == false){
      this.ascendent = true;
      if(this.options_value.columns[index].type=="number"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index].column];
          var y = b[this.options_value.columns[index].column];
          if (x < y) {return 1;}
          if (x > y) {return -1;}
          return 0;
        });
      }else if(this.options_value.columns[index].type=="text"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index].column].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          var y = b[this.options_value.columns[index].column].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          if (x < y) {return 1;}
          if (x > y) {return -1;}
          return 0;
        });
      }else if(this.options_value.columns[index].type=="date"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index].column].substring(6,10) + a[this.options_value.columns[index].column].substring(3,5) + a[this.options_value.columns[index].column].substring(0,2);
          var y = b[this.options_value.columns[index].column].substring(6,10) + b[this.options_value.columns[index].column].substring(3,5) + b[this.options_value.columns[index].column].substring(0,2);
          if (x < y) {return 1;}
          if (x > y) {return -1;}
          return 0;
        });
      }
    }else if(this.order == this.options_value.columns[index].column && this.ascendent == true){
      this.ascendent = false;
      if(this.options_value.columns[index].type=="number"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index].column];
          var y = b[this.options_value.columns[index].column];
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }else if(this.options_value.columns[index].type=="text"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index].column].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          var y = b[this.options_value.columns[index].column].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }else if(this.options_value.columns[index].type=="date"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index].column].substring(6,10) + a[this.options_value.columns[index].column].substring(3,5) + a[this.options_value.columns[index].column].substring(0,2);
          var y = b[this.options_value.columns[index].column].substring(6,10) + b[this.options_value.columns[index].column].substring(3,5) + b[this.options_value.columns[index].column].substring(0,2);
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }
    }else{
      this.order = this.options_value.columns[index].column;
      this.ascendent = false;
      if(this.options_value.columns[index].type=="number"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index].column];
          var y = b[this.options_value.columns[index].column];
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }else if(this.options_value.columns[index].type=="text"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index].column].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          var y = b[this.options_value.columns[index].column].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }else if(this.options_value.columns[index].type=="date"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index].column].substring(6,10) + a[this.options_value.columns[index].column].substring(3,5) + a[this.options_value.columns[index].column].substring(0,2);
          var y = b[this.options_value.columns[index].column].substring(6,10) + b[this.options_value.columns[index].column].substring(3,5) + b[this.options_value.columns[index].column].substring(0,2);
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }
    }
  }

  pagination_navigation(value){
    this.requestOffsetLeft = (this.offsetView * (value-1)) + 1;
    if(this.offsetView * value > this.resultados.length){
      this.requestOffsetRight = this.resultados.length;
    }else{
      this.requestOffsetRight = this.offsetView * value;
    }
    this.displaying = [];
    for(var i = this.requestOffsetLeft-1; i < this.requestOffsetRight; i++){
      this.displaying.push(" ");
    }
    this.set_navigation_bar();
  }

  nav_current_value(){
    return Math.ceil(this.requestOffsetRight/this.offsetView);
  }

  nav_min_value(){
    return 1;
  }

  nav_max_value(){
    return Math.ceil(this.resultados.length/this.offsetView);
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