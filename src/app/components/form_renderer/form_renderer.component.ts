import { Component, OnInit, ViewChild, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { FormControlDirective } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
    selector: 'form-renderer',
    templateUrl: './form_renderer.template.html',
    styleUrls: [
        './form_renderer.styles.css'
    ]
})

export class FormRendererComponent implements OnInit {
    @ViewChild('form') form: FormControlDirective;
    @Input() set config(option:FormRow[]) {
        this.options = option;
    };

    public submitted:any;
    public options:any;
    public values:any;
    public types:any;
    public date_mask = [/[0-3]/,/[0-9]/,'/',/[0-1]/,/[0-2]/,'/',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/];
    public integer_mask = createNumberMask({allowNegative:true, allowDecimal:false, integerLimit:25, prefix:'', includeThousandsSeparator:true});
    public decimal_mask = createNumberMask({allowNegative:true, allowDecimal:true, integerLimit:25, decimalLimit:25, prefix:'', includeThousandsSeparator:true});

    constructor(private atp: AmazingTimePickerService) {
        this.submitted = false;
        this.values = {};
        this.types = {};
    }

    ngOnInit() {
        this.options.forEach((row)=>{
            row.columns.forEach((col)=>{
                col.inputs.forEach((input)=>{
                    this.values[input.name]="";
                    this.types[input.name]=input.type;
                })
            });
        });
    }

    valid(){
        if(this.form.valid){
            this.submitted = false;
            return true;
        }else{
            this.submitted = true;
            return false;
        }
    }

    get_values(){
        var values = {};
        Object.keys(this.values).forEach((key)=>{
            if(this.types[key]=="date"){
                values[key]=this.values[key];
            }else if(this.types[key]=="calendar"){
                if(this.values[key]){
                    var formatted_date = new Date(this.values[key]),
                    month = '' + (formatted_date.getMonth() + 1),
                    day = '' + formatted_date.getDate(),
                    year = formatted_date.getFullYear();
                    if(month.length < 2){
                         month = '0' + month;
                    }
                    if(day.length < 2){
                        day = '0' + day;
                    }
                    values[key]=[day,month,year].join('/');
                }else{
                    values[key]=this.values[key];
                }
            }else{
                values[key]=this.values[key];
            }
        });
        return JSON.parse(JSON.stringify(values));
    }

    set_values_with_date(data){
        this.values = {};
        this.values = JSON.parse(JSON.stringify(data));
        var values = JSON.parse(JSON.stringify(data));
        this.options.forEach((row)=>{
            row.columns.forEach((col)=>{
                col.inputs.forEach((input)=>{
                    if(input.type == "calendar" && data[input.name] && data[input.name].length >= 10){
                        var calendar_data = data[input.name].split("/");
                        var date = new Date(parseInt(calendar_data[2]),(parseInt(calendar_data[1])-1),parseInt(calendar_data[0]));
                        this.values[input.name] = date;
                        console.log(date);
                    }else{
                        
                    }
                    this.types[input.name]=input.type;
                })
            });
        });
        this.submitted = false;
    }

    set_values(data){
        this.values = {};
        this.values = JSON.parse(JSON.stringify(data));
    }

    clean_form(){
        this.values = {};
        this.types = {};
        this.submitted = false;
        this.options.forEach((row)=>{
            row.columns.forEach((col)=>{
                col.inputs.forEach((input)=>{
                    this.values[input.name]="";
                    this.types[input.name]=input.type;
                })
            });
        });
    }

    unsubmit(){
        this.submitted = false;
    }

    private set_time(obj) {
        const amazingTimePicker = this.atp.open({
            theme: 'material-blue',
            time:  this.values[obj],
            locale: 'es',
            preference:{
                labels:{
                    ok:"",
                    cancel:"Cancelar"
                }
            }
        });

        amazingTimePicker.afterClose().subscribe(time => {
            this.values[obj] = time;
        });
    }
}

export class FormRow {
    class:string;
    columns:FormColumn[]
};

export class FormColumn {
    class:string;
    inputs:FormInput[];
};

export class FormInput { 
    type:string;
    extra:string;
    name:string;
    label:string;
    icon:string;
    class:string;
    placeholder:string;
    minlength:string;
    maxlength:string;
    pattern:string;
    error_required:string;
    error_pattern:string;
    error_minlength:string;
    list_data:{
        value:string,
        text:string
    }
    list:()=>{};
    textmask:()=>{};
    required:()=>{};
    disabled:()=>{};
    change:()=>{};
    input:()=>{};
};