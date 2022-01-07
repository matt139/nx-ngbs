import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { ReplaySubject, takeUntil } from 'rxjs'
import { NgbsAuthFacade } from '../../+state/auth.facade'
import {
  formSubmitLogIn,
  NgbsAuthLogInFormComponentAction,
} from '../../components/log-in-form/log-in-form.component'

@Component({
  template: `
    <ngbs-auth-log-in-form
      (action$)="action$.next($event)"
    ></ngbs-auth-log-in-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthLogInView implements OnDestroy {
  private readonly ngOnDestroy$ = new ReplaySubject<void>(1)

  public readonly action$ = new ReplaySubject<NgbsAuthLogInFormComponentAction>(
    1
  )

  constructor(
    private readonly authFacade: NgbsAuthFacade,
    private readonly store: Store
  ) {}

  public readonly logIn = this.action$
    .pipe(ofType(formSubmitLogIn), takeUntil(this.ngOnDestroy$))
    .subscribe((action) => {
      this.authFacade.logIn({
        emailAddress: action.form.value.emailAddress,
        password: action.form.value.password,
      })
    })

  public readonly dispatchActions = this.action$.subscribe((action) => {
    this.store.dispatch(action)
  })

  public ngOnDestroy() {
    this.ngOnDestroy$.next()
    this.ngOnDestroy$.complete()
    this.action$.complete()
  }
}
