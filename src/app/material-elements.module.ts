import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatGridListModule, MatIconModule, MatListModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule, MatTabsModule, MatCardModule,
    MatListModule, MatIconModule, MatDividerModule, MatButtonModule, MatToolbarModule, BrowserAnimationsModule,
    MatIconModule , MatTooltipModule, MatGridListModule
  ],
  exports: [MatTabsModule, MatCardModule,
    MatListModule, MatIconModule, MatDividerModule, MatButtonModule,  MatToolbarModule,
    BrowserAnimationsModule, MatIconModule, MatTooltipModule, MatGridListModule],
  declarations: []
})
export class MaterialElementsModule {
}
