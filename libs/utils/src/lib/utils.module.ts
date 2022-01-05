import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectStylesheetDirective } from './directives/select-stylesheet/select-stylesheet.directive';
import { UncheckOnDocumentClickDirective } from './directives/uncheck-on-document-click/uncheck-on-document-click.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SelectStylesheetDirective,
    UncheckOnDocumentClickDirective
  ],
  exports: [
    SelectStylesheetDirective,
    UncheckOnDocumentClickDirective
  ],
})
export class UtilsModule {}
