import { Injectable } from '@angular/core'
import { select, Store, Action } from '@ngrx/store'

import * as AuthActions from './auth.actions'
import { NgbsAuthCredentials } from './auth.models'
import * as AuthFeature from './auth.reducer'
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
export class AuthFacade {
  constructor(private readonly store: Store) {}

  public readonly isAuthLoaded$ = this.store.pipe(
    select(AuthSelectors.isAuthLoaded)
  )

  public readonly isLoggedIn$ = this.store.pipe(
    select(AuthSelectors.isLoggedIn)
  )

  public readonly user$ = this.store.pipe(select(AuthSelectors.getUser))


  public init() {
    this.store.dispatch(AuthActions.init())
  }

  public signUp(credentials: NgbsAuthCredentials) {
    this.store.dispatch(AuthActions.signUpSubmit({ credentials }))
  }

  public logIn(credentials: NgbsAuthCredentials) {
    this.store.dispatch(AuthActions.logInSubmit({ credentials }))
  }

  public logOut() {
    console.warn('AuthFacade:logOut() - not implemented')
  }
}