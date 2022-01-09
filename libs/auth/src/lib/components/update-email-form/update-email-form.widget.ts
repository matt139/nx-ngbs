import { ChangeDetectionStrategy, Component, Output } from '@angular/core'
import { NgbsAuthFacade } from '@ngbs/auth'
import { ofType } from '@ngrx/effects'
import { map, ReplaySubject } from 'rxjs'
import {
  NgbsAuthUpdateEmailFormComponentAction,
  submitUpdateEmailForm,
} from './update-email-form.component'

@Component({
  selector: 'ngbs-auth-update-email-form-widget',
  template: `<ngbs-auth-update-email-form
      (action$)="action$.next($event)"
      [props]="updateEmailFormProps$ | async"
    ></ngbs-auth-update-email-form
    >'`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthUpdateEmailFormWidget {
  constructor(private readonly authFacade: NgbsAuthFacade) {}
  @Output()
  public readonly action$ = new ReplaySubject<NgbsAuthUpdateEmailFormComponentAction>(
    1
  )

  public updateEmailFormProps$ = this.authFacade.user$.pipe(
    map((user) => {
      if (!user || !user.email) return null
      return {
        currentEmail: user.email,
      }
    })
  )

  public readonly updateEmail = this.action$
    .pipe(ofType(submitUpdateEmailForm))
    .subscribe(({ form }) => {
      const newEmail = form.get('newEmail')?.value
      this.authFacade.updateEmail(newEmail)
    })
}
