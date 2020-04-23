import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [':host { display: block; }', ':host /deep/ .layout-loading .sidenav-link { transition: none !important; }']
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  // Prevent "blink" effect
  public initialized = false;
  public isAdmin = false;

  constructor(private layoutService: LayoutService) {
  }

  ngOnInit() {
    if (localStorage.getItem('unimed_session')) {
      const object = JSON.parse(localStorage.getItem('unimed_session'));
      if (object) {
        if (object.role === 1) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } else {
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;

      this.layoutService.init();
      this.layoutService.update();
      this.layoutService.setAutoUpdate(true);
    });
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.layoutService.destroy();
    });
  }

  closeSidenav() {
    setTimeout(() => {
      this.layoutService.setCollapsed(true);
    });
  }
}
