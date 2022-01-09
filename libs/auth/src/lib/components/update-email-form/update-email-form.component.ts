import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  Output,
} from '@angular/core'
import { NgbsUser } from '@ngbs/auth'
import { ComponentActions } from '@ngbs/utils'
import { createAction, props } from '@ngrx/store'
import { map, ReplaySubject } from 'rxjs'
import { UpdateEmailForm } from './update-email.form'

@Component({
  selector: 'ngbs-auth-update-email-form',
  templateUrl: './update-email-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthUpdateEmailFormComponent implements OnDestroy {
  public readonly submitUpdateEmailForm$ = new ReplaySubject<{
    event: Event
    form: UpdateEmailForm
  }>(1)

  private readonly props$ =
    new ReplaySubject<NgbsUpdateEmailFormComponentProps | null>(1)

  public readonly currentEmail$ = this.props$.pipe(
    map((props) => props?.currentEmail)
  )

  public readonly updateEmailForm$ = this.currentEmail$.pipe(
    map((currentEmail) => new UpdateEmailForm({ currentEmail }))
  )

  @Input()
  set props(props: NgbsUpdateEmailFormComponentProps | null) {
    this.props$.next(props)
  }

  @Output()
  public readonly action$ = this.submitUpdateEmailForm$.pipe(
    map(({ form, event }) => {
      event.preventDefault()
      return submitUpdateEmailForm({ event, form })
    })
  )

  public ngOnDestroy() {
    this.submitUpdateEmailForm$.complete()
    this.props$.complete()
  }
}

export interface NgbsUpdateEmailFormComponentProps {
  currentEmail: NgbsUser['email']
}

export const submitUpdateEmailForm = createAction(
  '[NgbsAuthUpdateEmailFormComponent] Submit update email form',
  props<{ event: Event; form: UpdateEmailForm }>()
)

export type NgbsAuthUpdateEmailFormComponentAction =
  ComponentActions<NgbsAuthUpdateEmailFormComponent>
