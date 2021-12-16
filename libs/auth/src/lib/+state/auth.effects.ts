import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { AuthService } from '../auth.service'
import * as AuthActions from './auth.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}

  public readonly init$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.init))
  )

  public readonly logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logInSubmit),
      switchMap((action) => this.authService.logIn(action.credentials)),
      map((userCredential) => {
        return userCredential?.user?.email
          ? AuthActions.logInSuccess({
              user: {
                emailAddress: userCredential.user?.email,
                displayName: userCredential.user?.displayName,
                avatarUrl: userCredential.user?.photoURL,
              },
            })
          : AuthActions.logInFailure({
              error: 'AuthEffects.logIn$: missing user or user.email',
            })
      }),
      catchError((error) => {
        console.error('AuthEffects.logIn$')
        console.error(error)

        return of(
          AuthActions.signUpFailure({
            error,
          })
        )
      })
    )
  )

  public readonly signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSubmit),
      switchMap((action) => this.authService.signUp(action.credentials)),
      map((userCredential) =>
        userCredential?.user?.email
          ? AuthActions.signUpSuccess({
              user: {
                emailAddress: userCredential.user?.email,
                displayName: userCredential.user?.displayName,
                avatarUrl: userCredential.user?.photoURL,
              },
            })
          : AuthActions.signUpFailure({
              error: 'AuthEffects.signUp$ : missing user or user.email',
            })
      ),
      catchError((error) => {
        console.error('AuthEffects.signUp$')
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
