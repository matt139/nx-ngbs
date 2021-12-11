import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthView } from './auth.component';
import { NgbsSignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { NgbsLogInView } from './views/log-in/log-in.view';
import { NgbsSignUpView } from './views/sign-up/sign-up.view';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthView,
        children: [
          {
            path: 'sign-up',
            component: NgbsSignUpView,
          },
          {
            path: 'log-in',
            component: NgbsLogInView,
          },
          {
            path: '',
            redirectTo: 'log-in',
          },
          {
            path: '*',
            redirectTo: 'log-in',
          },
        ],
      },
    ]),
  ],
  declarations: [
    AuthView,
    NgbsSignUpFormComponent,
    LogInFormComponent,
    NgbsLogInView,
    NgbsSignUpView,
  ],
})
export class AuthModule {}
