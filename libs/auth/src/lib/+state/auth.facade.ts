import { Injectable } from '@angular/core'
import { NgbsUser } from '@ngbs/auth'
import { select, Store } from '@ngrx/store'

import * as AuthActions from './auth.actions'
import { NgbsAuthCredentials } from './auth.models'
import * as AuthSelectors from './auth.selectors'

/*
 * AuthFacade
 *
 * The facade is injected into view components, which consume data from and
 * make function calls to the facade.
 *
 * In this case the facade creates hooks into NgRx, but it may also consume
 * other services
 */
@Injectable()
export class NgbsAuthFacade {
  constructor(private readonly store: Store) {}

  public readonly isAuthLoaded$ = this.store.pipe(
    select(AuthSelectors.isAuthLoaded)
  )

  public readonly isLoggedIn$ = this.store.pipe(
    select(AuthSelectors.isLoggedIn)
  )

  public readonly user$ = this.store.pipe(select(AuthSelectors.getUser))

  public logOut() {
    this.store.dispatch(AuthActions.logOut())
  }

  public signUp(credentials: NgbsAuthCredentials) {
    this.store.dispatch(AuthActions.signUpSubmit({ credentials }))
  }

  public logIn(credentials: NgbsAuthCredentials) {
    this.store.dispatch(AuthActions.logInSubmit({ credentials }))
  }

  public updateEmail(newEmail: NgbsUser['email']) {
    if(!newEmail) return
    this.store.dispatch(AuthActions.updateEmail({ newEmail }))
  }

  public updatePassword(newPassword: string) {
    if(!newPassword) return
    this.store.dispatch(AuthActions.updatePassword({ newPassword }))
  }
}
