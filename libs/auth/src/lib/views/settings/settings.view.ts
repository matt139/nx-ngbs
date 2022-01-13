import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Action, Store } from '@ngrx/store'
import { ReplaySubject } from 'rxjs'

@Component({
  template: `
    <h1>Settings</h1>
    <ngbs-auth-update-email-form-widget
      (action$)="action$.next($event)"
    >
    </ngbs-auth-update-email-form-widget>
    <section>Change Display Name</section>
    <section>Change Photo</section>
    <section>Change Password</section>
    <section>Delete Account</section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthSettingsView {
  public readonly action$ = new ReplaySubject<Action>(1)
  constructor(private readonly store: Store) {}

  public readonly dispatchAction = this.action$.subscribe((action) =>
    this.store.dispatch(action)
  )
}
