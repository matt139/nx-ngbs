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
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded))
  public readonly allAuth$ = this.store.pipe(select(AuthSelectors.getAllAuth))
  public readonly selectedAuth$ = this.store.pipe(
    select(AuthSelectors.getSelected)
  )

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
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
    console.log('not implemented')
  }
}
