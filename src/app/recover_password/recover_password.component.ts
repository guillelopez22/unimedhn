import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControlDirective } from '@angular/forms';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { default as swal } from 'sweetalert2';
import { AlertService } from '../components/alert_service/alert.service';

@Component({
	selector: 'recover_password',
	templateUrl: './recover_password.component.html',
	styleUrls: [
	'../../vendor/styles/pages/authentication.scss'
	]
})
export class RecoverPasswordComponent {

	@ViewChild('recover_form') recover_form:FormControlDirective;
    @ViewChild('code_form') code_form:FormControlDirective;
    @ViewChild('password_form') password_form:FormControlDirective;
	public recover_submitted:boolean;
	public recover_loading:boolean;
    public view:number;
	public recover_data = {
        user_id:"",
		user_email:"",
        user_code:"",
        change_password:"",
        confirm_password:""
	}
    public code_mask = [/[A-Z]|[a-z]|[0-9]/,'-',/[A-Z]|[a-z]|[0-9]/, '-',/[A-Z]|[a-z]|[0-9]/, '-',/[A-Z]|[a-z]|[0-9]/, '-',/[A-Z]|[a-z]|[0-9]/];

	constructor(private appService: AppService, public endpoint : AppEndpoints, private router: Router, private alertService: AlertService) {
		this.appService.pageTitle = 'Recuperar Contraseña';
		this.recover_submitted = false;
		this.recover_loading = false;
        this.view = 1;
	}

	request_recovery_code(){
		if(this.recover_form.valid){
			this.recover_submitted = false;
			this.recover_loading = true;
            var response;
            var load = {
                user_email:this.recover_data.user_email
            };
            this.endpoint.request_recovery_code(load).subscribe(
                data => response = data,
                err => {
                    if(err.status && err.error){
                        this.alertService.alert_message(err.status ,err.error);
                    }else{
                        this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                    }
                    this.recover_loading = false;
                },
                ()=> {
                    try{
                        this.recover_data.user_id = response.id;
                        this.view = 2;
                       	this.recover_loading = false;
                    }catch(error){
                        this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                        this.recover_loading = false;
                    } 
                }
            );
		}else{
			this.recover_submitted = true;
		}
	}

    validate_recovery_code(){
        if(this.code_form.valid){
            this.recover_submitted = false;
            this.recover_loading = true;
            var response;
            var load = {
                id:this.recover_data.user_id,
                user_email:this.recover_data.user_email,
                restore_code:this.recover_data.user_code.replace(/-/g,"").toUpperCase()
            };
            this.recover_loading = false;
            this.endpoint.validate_recovery_code(load).subscribe(
                data => response = data,
                err => {
                    if(err.status && err.error){
                        this.alertService.alert_message(err.status ,err.error);
                    }else{
                        this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                    }
                    this.recover_loading = false;
                },
                ()=> {
                    try{
                        this.view = 3;
                        this.recover_loading = false;
                    }catch(error){
                        this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                        this.recover_loading = false;
                    } 
                }
            );
        }else{
            this.recover_submitted = true;
        }
    }

    request_change_password(){
        if(this.password_form.valid && (this.recover_data.change_password && this.recover_data.confirm_password && this.recover_data.change_password == this.recover_data.confirm_password)){
            this.recover_submitted = false;
            this.recover_loading = true;
            var response;
            var load = {
                id:this.recover_data.user_id,
                user_email:this.recover_data.user_email,
                restore_code:this.recover_data.user_code.replace(/-/g,"").toUpperCase(),
                password:this.recover_data.change_password,
            };
            this.recover_loading = false;
            this.endpoint.request_password_change(load).subscribe(
                data => response = data,
                err => {
                    if(err.status && err.error){
                        this.alertService.alert_message(err.status ,err.error);
                    }else{
                        this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                    }
                    this.recover_loading = false;
                },
                ()=> {
                    try{
                        this.view = 4;
                        this.recover_loading = false;
                        this.recover_data = {
                            user_id:"",
                            user_email:"",
                            user_code:"",
                            change_password:"",
                            confirm_password:""
                        }
                    }catch(error){
                        this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                        this.recover_loading = false;
                    }
                }
            );
        }else{
            this.recover_submitted = true;
        }
    }
}
