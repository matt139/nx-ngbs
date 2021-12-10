import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogInFormComponent } from './log-in-form/log-in-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'sign-up',
        component: SignUpFormComponent,
      },
      {
        path: 'log-in',
        component: LogInFormComponent,
      },
    ]),
  ],
  declarations: [SignUpFormComponent, LogInFormComponent],
})
export class AuthModule {}
