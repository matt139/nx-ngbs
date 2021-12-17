import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Action } from '@ngrx/store'
import { ReplaySubject } from 'rxjs'

@Component({
  template: `
    <ngbs-auth-log-in-form
      (action$)="action$.next($event)"
    ></ngbs-auth-log-in-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthLogInView {
  private readonly ngOnDestroy$ = new ReplaySubject<void>(1)

  public readonly action$ = new ReplaySubject<Action>(1)
}
