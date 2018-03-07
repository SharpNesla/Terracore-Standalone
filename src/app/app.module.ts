import {BrowserModule} from '@angular/platform-browser';
import {ComponentFactoryResolver, NgModule, Pipe, PipeTransform} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {MainViewModule} from "./main-editor/main-view.module";
import {PathLocationStrategy} from "@angular/common";
import {MaterialElementsModule} from "./material-elements.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ResourcesComponent} from "./resources.component";
import {ChooseImageComponent} from "./choose-image.component";
import {MainViewComponent} from "./main-editor/main-view.component";

const routes: Routes = [
  {path: '', component: MainViewComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ResourcesComponent,
    ChooseImageComponent,
  ],
  entryComponents: [
    ResourcesComponent
  ],
  imports: [
    BrowserModule, FormsModule, MaterialElementsModule,
    MainViewModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
