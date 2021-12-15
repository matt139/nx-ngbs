import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { AuthService } from '../auth.service'
import { formSubmitLogIn } from '../components/log-in-form/log-in-form.component'
import { formSubmitSignUp } from '../components/sign-up-form/sign-up-form.component'
import { testUser } from '../models/user'

import * as AuthActions from './auth.actions'
import { NgbsAuthCredentials } from './auth.models'
import * as AuthFeature from './auth.reducer'

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}

  private readonly init$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.init))
  )

  private readonly logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logInSubmit),
      switchMap((action) => this.authService.logIn(action.credentials)),
      map((userCredential) =>
        userCredential.user &&
        userCredential.user.email &&
        userCredential.user.displayName &&
        userCredential.user.photoURL
          ? AuthActions.logInSuccess({
              user: {
                emailAddress: userCredential.user?.email,
                displayName: userCredential.user?.displayName,
                avatarUrl: userCredential.user?.photoURL,
              },
            })
          : AuthActions.logInFailure({
              error: 'no user',
            })
      )
    )
  )

  private readonly signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSubmit),
      switchMap((action) => this.authService.signUp(action.credentials)),
      map((userCredential) =>
        userCredential.user && userCredential.user.email
          ? AuthActions.signUpSuccess({
              user: {
                emailAddress: userCredential.user?.email,
                displayName: userCredential.user?.displayName,
                avatarUrl: userCredential.user?.photoURL,
              },
            })
          : AuthActions.signUpFailure({
              error: 'AuthActions.signUpFailure : missing user or user.email',
            })
      ),
      catchError((error) => {
        console.error(error)

        return of(
          AuthActions.signUpFailure({
            error,
          })
        )
      })
    )
  )
}
