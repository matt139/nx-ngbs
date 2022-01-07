import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SelectStylesheetDirective } from './directives/select-stylesheet/select-stylesheet.directive'
import { NgbsUncheckOnDocumentClickModule } from './directives/uncheck-on-document-click/uncheck-on-document-click.module'

@NgModule({
  imports: [CommonModule, NgbsUncheckOnDocumentClickModule],
  declarations: [SelectStylesheetDirective],
  exports: [SelectStylesheetDirective],
})
export class NgbsUtilsModule {}
