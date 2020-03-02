import { Injectable } from  '@angular/core';
import { HttpClient, HttpParams, HttpUrlEncodingCodec, HttpParameterCodec, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

export class FormQueryEncoder implements HttpParameterCodec {
    encodeKey(k: string): string { return encodeURIComponent(k); }
    encodeValue(v: string): string { return encodeURIComponent(v); }
    decodeKey(k: string): string { return encodeURIComponent(k); }
    decodeValue(v: string): string { return encodeURIComponent(v); }
}

@Injectable()
export class AppEndpoints {
    private endpoint:string;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.endpoint = "http://"+window.location.hostname+":8000/api";
    }

    //########################################################################
    //CATALOGS ###############################################################


    //CATALOGS ###############################################################
    //########################################################################

    //########################################################################
    //AUTH ###################################################################

        login(payload):Observable<any>{
            let params = new HttpParams({encoder: new FormQueryEncoder()})
            .set('username', payload.username)
            .set('password', payload.password);
            return this.httpClient.get(this.endpoint + "/login", {params:params, responseType: 'json'});
        }

        request_recovery_code(payload):Observable<any>{
            return this.httpClient.post(this.endpoint + "/request_recovery_code", payload, {responseType: 'json'});
        }

        validate_recovery_code(payload):Observable<any>{
            let params = new HttpParams({encoder: new FormQueryEncoder()})
            .set('id', payload.id)
            .set('user_email', payload.user_email)
            .set('restore_code', payload.restore_code);
            return this.httpClient.get(this.endpoint + "/validate_recovery_code", {params:params, responseType: 'json'});
        }

        request_password_change(payload):Observable<any>{
            return this.httpClient.post(this.endpoint + "/request_password_change", payload, {responseType: 'json'});
        }

        request_password_change_first_login(payload):Observable<any>{
            return this.httpClient.post(this.endpoint + "/request_password_change_first_login", payload, {responseType: 'json'});
        }

        logout(){
            this.reset_session();
        }

        get_session(){
            if(localStorage.getItem('unimed_session')){
                var object = JSON.parse(localStorage.getItem('unimed_session'));
                if(object){
                    return{
                        name:object.name,
                        token:object.token,
                        valid:true
                    };
                    return object;
                }else{
                    return{
                        name:"",
                        token:"",
                        valid:false
                    };
                }
            }else{
                return{
                    name:"",
                    token:"",
                    valid:false
                };
            }
        }

        set_session(session){
            console.log(session);
            localStorage.setItem('unimed_session', JSON.stringify(session));
        }

        reset_session(){
            this.router.navigateByUrl('/conectarse');
            localStorage.removeItem('unimed_session');
        }

        get_headers(){
            if(this.get_session() && this.get_session().token){
                var headers = new HttpHeaders({
                    'Authorization': this.get_session().token
                });
                return headers;
            }else{
                return null;
            }
            
        }

    //AUTH ###################################################################
    //########################################################################

    //########################################################################
    //INSTITUCIONES ##########################################################

        get_instituciones(payload):Observable<any>{
            return this.httpClient.get(this.endpoint + "/get_instituciones", { params:payload, headers:this.get_headers(), responseType: 'json' });
        }

        insert_institucion(payload):Observable<any>{
            return this.httpClient.post(this.endpoint + "/insert_institucion", payload, { headers:this.get_headers(), responseType: 'json'});
        }

        update_institucion(payload):Observable<any>{
            return this.httpClient.put(this.endpoint + "/update_institucion", payload, { headers:this.get_headers(), responseType: 'json'});
        }

        delete_institucion(payload):Observable<any>{
            return this.httpClient.delete(this.endpoint + "/delete_institucion", { params:payload, headers:this.get_headers(), responseType: 'json' });
        }

    //INSTITUCIONES ##########################################################
    //########################################################################
}