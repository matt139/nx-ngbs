import { ChangeDetectionStrategy, Component, Output } from '@angular/core'
import { NgbsUser } from '@ngbs/auth'
import {
  CompleteOnDestroy$,
  ComponentActions,
  ComponentWithProps,
} from '@ngbs/utils'
import { createAction, props } from '@ngrx/store'
import { map, ReplaySubject } from 'rxjs'
import { UpdateEmailForm } from './update-email.form'

@Component({
  selector: 'ngbs-auth-update-email-form',
  templateUrl: './update-email-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthUpdateEmailFormComponent extends ComponentWithProps<NgbsUpdateEmailFormComponentProps> {
  @CompleteOnDestroy$()
  public readonly submitUpdateEmailForm$ = new ReplaySubject<{
    event: Event
    form: UpdateEmailForm
  }>(1)

  public readonly currentEmail$ = this.props$.pipe(
    map((props) => props?.currentEmail)
  )

  public readonly updateEmailForm$ = this.currentEmail$.pipe(
    map((currentEmail) => new UpdateEmailForm({ currentEmail }))
  )

  @Output()
  public readonly action$ = this.submitUpdateEmailForm$.pipe(
    map(({ form, event }) => {
      event.preventDefault()
      return submitUpdateEmailForm({ event, form })
    })
  )
}

export type NgbsUpdateEmailFormComponentProps = {
  currentEmail: NgbsUser['email']
} | null

export const submitUpdateEmailForm = createAction(
  '[NgbsAuthUpdateEmailFormComponent] Submit update email form',
  props<{ event: Event; form: UpdateEmailForm }>()
)

export type NgbsAuthUpdateEmailFormComponentAction =
  ComponentActions<NgbsAuthUpdateEmailFormComponent>
