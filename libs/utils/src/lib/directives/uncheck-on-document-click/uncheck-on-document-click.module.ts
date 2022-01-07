import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UncheckOnDocumentClickDirective } from './uncheck-on-document-click.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [UncheckOnDocumentClickDirective],
  exports: [UncheckOnDocumentClickDirective],
})
export class NgbsUncheckOnDocumentClickModule {}
