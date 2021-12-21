import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { Route, RouterModule } from '@angular/router'

import { AuthView } from './auth.component'
import { NgbsAuthSignUpFormComponent } from './components/sign-up-form/sign-up-form.component'
import { NgbsAuthLogInFormComponent } from './components/log-in-form/log-in-form.component'
import { NgbsAuthLogInView } from './views/log-in/log-in.view'
import { NgbsAuthSignUpView } from './views/sign-up/sign-up.view'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromAuth from './+state/auth.reducer'
import { AuthEffects } from './+state/auth.effects'
import { NgbsAvatarModule } from './components/avatar/avatar.module'
import { AuthService } from './auth.service'
import { NgbsAuthViewProfileView } from './views/view-profile/view-profile.view'
import { NgbsAuthEditProfileView } from './views/edit-profile/edit-profile.view'
import { NgbsAuthIsLoggedOutGuard } from './guards/is-logged-out.guard'
import { NgbsAuthIsLoggedInGuard } from './guards/is-logged-in.guard'
import { NgbsAuthFacade } from './+state/auth.facade'

export const ngbsAuthRoutes: Route[] = [
  {
    path: 'auth',
    component: AuthView,
    children: [
      {
        path: 'sign-up',
        pathMatch: 'full',
        component: NgbsAuthSignUpView,
        canActivate: [NgbsAuthIsLoggedOutGuard],
      },
      {
        path: 'log-in',
        pathMatch: 'full',
        component: NgbsAuthLogInView,
        canActivate: [NgbsAuthIsLoggedOutGuard],
      },
      {
        path: 'profile',
        pathMatch: 'full',
        component: NgbsAuthViewProfileView,
        canActivate: [NgbsAuthIsLoggedInGuard],
      },
      {
        path: 'profile/edit',
        pathMatch: 'full',
        component: NgbsAuthEditProfileView,
        canActivate: [NgbsAuthIsLoggedInGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'log-in',
      },
      {
        path: '*',
        pathMatch: 'full',
        redirectTo: 'log-in',
      },
    ],
  },
]

@NgModule({
  imports: [
    CommonModule,
    NgbsAvatarModule,
    ReactiveFormsModule,
    RouterModule.forChild(ngbsAuthRoutes),
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    AuthView,
    NgbsAuthSignUpFormComponent,
    NgbsAuthLogInFormComponent,
    NgbsAuthLogInView,
    NgbsAuthSignUpView,
    NgbsAuthViewProfileView,
    NgbsAuthEditProfileView,
  ],
  providers: [
    NgbsAuthFacade,
    AuthService,
    NgbsAuthIsLoggedInGuard,
    NgbsAuthIsLoggedOutGuard,
  ],
  exports: [NgbsAvatarModule],
})
export class NgbsAuthModule {}
