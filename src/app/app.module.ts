import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {NgxElectronModule} from "ngx-electron";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
