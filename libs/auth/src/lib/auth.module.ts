import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { Route, RouterModule } from '@angular/router'
import {
  AuthGuardModule,
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard'

import { AuthView } from './auth.component'
import { NgbsAuthSignUpFormComponent } from './components/sign-up-form/sign-up-form.component'
import { NgbsAuthLogInFormModule } from './components/log-in-form/log-in-form.module'
import { NgbsAuthLogInView } from './views/log-in/log-in.view'
import { NgbsAuthSignUpView } from './views/sign-up/sign-up.view'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromAuth from './+state/auth.reducer'
import { AuthEffects } from './+state/auth.effects'
import { NgbsAvatarModule } from './components/avatar/avatar.module'
import { AuthService } from './auth.service'
import { NgbsAuthSettingsView } from './views/settings/settings.view'
import { NgbsAuthFacade } from './+state/auth.facade'
import { NgbsAuthGuardView } from './views/guard/guard.view'
import { NgbsAuthUpdateEmailFormModule } from './components/update-email-form/update-email-form.module'

export const ngbsAuthRoutes: Route[] = [
  {
    path: 'auth',
    component: AuthView,
    children: [
      {
        path: 'guard',
        pathMatch: 'full',
        component: NgbsAuthGuardView,
      },

      {
        path: 'sign-up',
        pathMatch: 'full',
        component: NgbsAuthSignUpView,
        ...canActivate(() => redirectLoggedInTo(['/auth/settings'])),
      },
      {
        path: 'log-in',
        pathMatch: 'full',
        component: NgbsAuthLogInView,
        ...canActivate(() => redirectLoggedInTo(['/auth/settings'])),
      },
      {
        path: 'settings',
        pathMatch: 'full',
        component: NgbsAuthSettingsView,
        ...canActivate(() => redirectUnauthorizedTo(['/auth/guard'])),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'log-in',
      },
      {
        path: '**',
        redirectTo: 'log-in',
      },
    ],
  },
]

@NgModule({
  imports: [
    CommonModule,
    AuthGuardModule,
    NgbsAvatarModule,
    ReactiveFormsModule,
    NgbsAuthLogInFormModule,
    NgbsAuthUpdateEmailFormModule,
    RouterModule.forChild(ngbsAuthRoutes),
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    AuthView,
    NgbsAuthSignUpFormComponent,
    NgbsAuthLogInView,
    NgbsAuthSignUpView,
    NgbsAuthSettingsView,
    NgbsAuthGuardView,
  ],
  providers: [NgbsAuthFacade, AuthService],
  exports: [NgbsAvatarModule],
})
export class NgbsAuthModule {}
