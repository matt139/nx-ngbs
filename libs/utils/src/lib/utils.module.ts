import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectStylesheetDirective } from './select-stylesheet.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SelectStylesheetDirective
  ],
  exports: [
    SelectStylesheetDirective
  ],
})
export class UtilsModule {}
