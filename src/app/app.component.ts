import {Component} from '@angular/core';
// @ts-ignore

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">Terracore</mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(){
    nw.Window.get().showDevTools()
  }
}
