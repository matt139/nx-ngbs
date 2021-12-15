import { Component, OnDestroy } from '@angular/core'
import { ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { ReplaySubject, takeUntil, tap } from 'rxjs'
import { AuthFacade } from '../../+state/auth.facade'
import {
  formSubmitSignUp,
  NgbsAuthSignUpComponentAction,
} from '../../components/sign-up-form/sign-up-form.component'

/*
 * NgbsAuthSignUpView
 *
 * The view component maps UI actions to the facade to be
 * handled by module business logic
 */
@Component({
  template: `
    <ngbs-sign-up-form (action$)="action$.next($event)"></ngbs-sign-up-form>
  `,
})
export class NgbsAuthSignUpView implements OnDestroy {
  private readonly ngOnDestroy$ = new ReplaySubject<void>(1)

  public readonly action$ = new ReplaySubject<NgbsAuthSignUpComponentAction>(1)

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly store: Store
  ) {}

  private readonly signUp = this.action$
    .pipe(ofType(formSubmitSignUp), takeUntil(this.ngOnDestroy$))
    .subscribe((action) => {
      this.authFacade.signUp({
        emailAddress: action.values.emailAddress,
        password: action.values.password,
      })
    })

  /*
   * UI actions are allowed to propagate freely to the store
   * so they can be handled by external effects (ie logging,
   * analytics)
   */
  private readonly dispatchActions = this.action$.subscribe((action) => {
    this.store.dispatch(action)
  })

  public ngOnDestroy() {
    this.ngOnDestroy$.next()
    this.ngOnDestroy$.complete()
  }
}
