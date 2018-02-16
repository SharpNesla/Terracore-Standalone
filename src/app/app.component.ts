import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z4">Terracore</mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor() {
    nw.Window.get().showDevTools()

  }
}
