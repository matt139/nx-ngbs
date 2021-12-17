import { ChangeDetectionStrategy, Component, Output } from '@angular/core'
import { merge, of, ReplaySubject, switchMap } from 'rxjs'
import { filter, map, withLatestFrom } from 'rxjs/operators'
import { LogInForm, LogInFormValues } from './log-in.form'
import { createAction, props } from '@ngrx/store'
import { ComponentActions } from '@ngbs/utils'

/**
 * LogInFormComponent
 *
 * a basic log in form
 */
@Component({
  selector: 'ngbs-auth-log-in-form',
  templateUrl: './log-in-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthLogInFormComponent {
  private readonly formSubmit$ = new ReplaySubject<{
    event: Event
    form: LogInForm
  }>(1)

  private readonly buttonClickSubmit$ = new ReplaySubject<{ event: Event }>(1)

  private readonly buttonClickSignUp$ = new ReplaySubject<{ event: Event }>(1)

  public readonly logInForm$ = of(new LogInForm())

  @Output()
  public readonly action$ = merge(
    this.formSubmit$.pipe(
      filter(({ form }) => form.valid),
      map(formSubmitLogIn)
    ),
    this.buttonClickSignUp$.pipe(map(buttonClickSignUp)),
    this.buttonClickSubmit$.pipe(map(buttonClickSubmit))
  )

  a = this.action$.subscribe(x => console.log('a = this.action$', x))

  public readonly preventNavigation = this.formSubmit$.subscribe(({ event }) =>
    event.preventDefault()
  )
}

export const formSubmitLogIn = createAction(
  '[NgbsAuthLogInFormComponent] Log In Form Submit',
  props<{ event: Event; form: LogInForm }>()
)

export const buttonClickSignUp = createAction(
  '[NgbsAuthLogInFormComponent] Sign Up Button Clicked',
  props<{ event: Event }>()
)

export const buttonClickSubmit = createAction(
  '[NgbsAuthLogInFormComponent] Submit Button Clicked',
  props<{ event: Event }>()
)

export type NgbsAuthLogInFormComponentActions =
  ComponentActions<NgbsAuthLogInFormComponent>
