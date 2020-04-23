import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControlDirective } from '@angular/forms';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';
import { default as swal } from 'sweetalert2';
import { AlertService } from '../components/alert_service/alert.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: [
	'../../vendor/styles/pages/authentication.scss'
	]
})
export class LoginComponent {

	@ViewChild('login_form') login_form:FormControlDirective;
	public login_submitted:boolean;
	public login_loading:boolean;
	public login_data = {
		username:"",
		password:""
	}
    public login_view:number;

    @ViewChild('password_form') password_form:FormControlDirective;
    public recover_submitted:boolean;
    public recover_loading:boolean;
    public view:number;
    public recover_data = {
        user_id:"",
        change_password:"",
        confirm_password:""
    }

	constructor(private appService: AppService, public endpoint : AppEndpoints, private router: Router, private alertService: AlertService) {
		this.appService.pageTitle = 'Conectarse';
		this.login_submitted = false;
		this.login_loading = false;
        this.login_view = 1;
        this.recover_submitted = false;
        this.recover_loading = false;
        this.view = 1;
	}

	login(){
		if(this.login_form.valid){
			this.login_submitted = false;
			this.login_loading = true;
            var response;
            var load = {
                username:this.login_data.username,
                password:this.login_data.password
            };
            this.endpoint.login(load).subscribe(
                data => response = data,
                err => {
                    if(err.status && err.error){
                        this.alertService.alert_message(err.status ,err.error);
                    }else{
                        this.alertService.alert_internal_server_error("Error interno del servidor", "Revise su conexión de internet o inténtelo más tarde");
                    }
                    this.login_loading = false;
                },
                ()=> {
                    try{
                        if(response && response.first_login){
                            this.login_view = 2;
                            this.view = 1;
                            this.recover_data.user_id = response.id;
                            this.recover_submitted = false;
                            this.recover_loading = false;
                        }else{
                            this.endpoint.set_session({
                                name:response.name,
                                token:response.token,
                                role:response.role,
                                user_id:response.user_id
                            })
                            this.router.navigateByUrl('/plataforma/inicio');
                        }
                       	this.login_loading = false;
                    }catch(error){
                        this.alertService.alert_aplication_error("Error Interno del Aplicativo");
                        this.login_loading = false;
                    }
                }
            );
		}else{
			this.login_submitted = true;
		}
	}

    back_login(){
        this.login_view = 1;
        this.view = 1;
        this.recover_data = {
            user_id:"",
            change_password:"",
            confirm_password:""
        }
        this.login_data = {
            username:"",
            password:""
        }
        this.login_submitted = false;
        this.login_loading = false;
    }

    request_change_password(){
        if(this.password_form.valid && (this.recover_data.change_password && this.recover_data.confirm_password && this.recover_data.change_password == this.recover_data.confirm_password)){
            this.recover_submitted = false;
            this.recover_loading = true;
            var response;
            var load = {
                id:this.recover_data.user_id,
                password:this.recover_data.change_password,
            };
            this.recover_loading = false;
            this.endpoint.request_password_change_first_login(load).subscribe(
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
                        this.view = 2;
                        this.recover_loading = false;
                        this.recover_data = {
                            user_id:"",
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
