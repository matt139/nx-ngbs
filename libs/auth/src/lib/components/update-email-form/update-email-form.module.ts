import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { NgbsAuthUpdateEmailFormComponent } from './update-email-form.component'
import { NgbsAuthUpdateEmailFormWidget } from './update-email-form.widget'

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [
    NgbsAuthUpdateEmailFormComponent,
    NgbsAuthUpdateEmailFormWidget,
  ],
  exports: [NgbsAuthUpdateEmailFormComponent, NgbsAuthUpdateEmailFormWidget],
})
export class NgbsAuthUpdateEmailFormModule {}
