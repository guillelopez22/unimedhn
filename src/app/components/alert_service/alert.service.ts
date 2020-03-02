import { Injectable } from  '@angular/core';
import { default as swal } from 'sweetalert2';

@Injectable()
export class AlertService {

    constructor() {}

    alert_message(status, error){
        if(status > 0 && status != 500 && error.title && error.message){
            this.alert_error(error.title, error.message);
        }else if(status == 500){
            this.alert_internal_server_error(error.title, error.message);
        }else{
            this.alert_conexion();
        }
    }

    alert_error(title, message){
        swal({
            title: title,
            text: message,
            type: "error",
            allowOutsideClick: true
        }).catch(swal.noop);
    }

    alert_conexion() {
        swal({
            title: "Error de Conexión",
            text: "Error al acceder al servidor. Revise su conexión de internet o inténtelo más tarde.",
            type: "warning",
            allowOutsideClick: true
        }).catch(swal.noop);
    }

    alert_internal_server_error(title, message) {
        swal({
            title: title,
            text: message,
            type: "warning",
            allowOutsideClick: true
        }).catch(swal.noop);
    }

    alert_aplication_error(title) {
        swal({
            title: title,
            text: "Error interno del aplicativo.  Revise su conexión de internet o inténtelo más tarde.",
            type: "warning",
            allowOutsideClick: true
        }).catch(swal.noop);
    }

    alert_success(title, message){
        swal({
            title: title,
            text: message,
            type: "success",
            allowOutsideClick: false
        }).catch(swal.noop);
    }

    option_alert(title, message, button){
        return swal({
            title: '<i class="fa fa-exclamation-triangle text-danger"></i><br>',
            html: "<span class='swal-title'>" + title + "</span><br><span class='swal-text'>" + message + "</span><br>",
            width:"400px",
            showCancelButton: true,
            confirmButtonColor: '#D32C53',
            cancelButtonColor: '#57889c',
            confirmButtonText: button,
            cancelButtonText: 'No',
            allowOutsideClick: false,
            allowEscapeKey:false
        });
    }
}