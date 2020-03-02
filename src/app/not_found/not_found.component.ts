import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AppEndpoints } from '../app.endpoints';

@Component({
  selector: 'not_found',
  templateUrl: './not_found.component.html'
})
export class NotFoundComponent {

  constructor(private appService: AppService, public endpoint : AppEndpoints, private router: Router) {
    this.appService.pageTitle = 'Error 404';
  }

  go_back(){
  	this.router.navigateByUrl('/plataforma/inicio');
  }
}
