import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectStylesheetComponent } from './select-stylesheet/select-stylesheet.component';
import { SelectStylesheetDirective } from './select-stylesheet.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SelectStylesheetComponent,
    SelectStylesheetDirective
  ],
})
export class UtilsModule {}
