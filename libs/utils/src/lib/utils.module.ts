import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SelectStylesheetDirective } from './directives/select-stylesheet/select-stylesheet.directive'
import { NgbsUncheckOnDocumentClickModule } from './directives/uncheck-on-document-click/uncheck-on-document-click.module'
import { ComponentWithProps } from './components/component-with-props'

@NgModule({
  imports: [CommonModule, NgbsUncheckOnDocumentClickModule],
  declarations: [SelectStylesheetDirective, ComponentWithProps],
  exports: [SelectStylesheetDirective, ComponentWithProps],
})
export class NgbsUtilsModule {}
