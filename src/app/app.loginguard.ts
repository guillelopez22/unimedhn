import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppEndpoints } from './app.endpoints';

@Injectable()
export class LoginGuard implements CanActivate {

	constructor(private router:Router, private endpoint : AppEndpoints) {}

  	canActivate():boolean {
  		if(this.endpoint.get_session().valid){
  			return true;
  		}else{
  			this.endpoint.reset_session();
  			return false;
  		}
  	}
}
