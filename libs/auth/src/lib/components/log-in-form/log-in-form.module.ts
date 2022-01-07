import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgbsAuthLogInFormComponent } from './log-in-form.component'

export * from './log-in-form.component'
export * from './log-in.form'

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  declarations: [NgbsAuthLogInFormComponent],
  exports: [NgbsAuthLogInFormComponent],
})
export class NgbsAuthLogInFormModule {}
