import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatListModule,
  MatTabsModule, MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule, MatTabsModule, MatCardModule,
    MatListModule, MatIconModule, MatDividerModule, MatButtonModule, MatToolbarModule, BrowserAnimationsModule,
  ],
  exports: [MatTabsModule, MatCardModule,
    MatListModule, MatIconModule, MatDividerModule, MatButtonModule,  MatToolbarModule, BrowserAnimationsModule,],
  declarations: []
})
export class MaterialElementsModule {
}
