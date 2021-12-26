import { ChangeDetectionStrategy, Component, Output } from '@angular/core'
import { ComponentActions } from '@ngbs/utils'
import { createAction, props } from '@ngrx/store'
import { merge, ReplaySubject } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { SignUpForm } from './sign-up.form'

/**
 * NgbsAuthSignUpFormComponent
 *
 * a basic sign up form
 */
@Component({
  selector: 'ngbs-auth-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthSignUpFormComponent {
  public readonly signUpForm = new SignUpForm()

  public readonly formSubmit$ = new ReplaySubject<{
    event: Event
    form: SignUpForm
  }>(1)

  public readonly buttonClickSubmit$ = new ReplaySubject<{ event: MouseEvent }>(
    1
  )

  public readonly buttonClickLogIn$ = new ReplaySubject<{ event: MouseEvent }>(
    1
  )

  @Output()
  public readonly action$ = merge(
    this.formSubmit$.pipe(
      filter(({ form }) => form.valid),
      map(formSubmitSignUp)
    ),
    this.buttonClickLogIn$.pipe(map(buttonClickLogIn)),
    this.buttonClickSubmit$.pipe(map(buttonClickSubmit))
  )

  // public readonly preventNavigation = this.formSubmit$.subscribe(({ event }) =>
  //   event.preventDefault()
  // )
}

/*
 * Components should define their own actions for all user interactions, even
 * if the actions won't be directly used by reducers or effects.
 *
 * Component actions bubble up to their parent components just as regular DOM
 * events do, and can be handled accordingly.
 *
 * Component actions can be mapped to module actions in a facade or parent
 * component
 *
 * The goal is to define actions with the greatest degree of granularity for
 * debugging, logging, analytics, etc
 */

export const formSubmitSignUp = createAction(
  '[NgbsAuthSignUpFormComponent] Sign Up Form Submit',
  props<{ event: Event; form: SignUpForm }>()
)

export const buttonClickLogIn = createAction(
  '[NgbsAuthSignUpFormComponent] Log In Button Clicked',
  props<{ event: MouseEvent }>()
)

export const buttonClickSubmit = createAction(
  '[NgbsAuthSignUpFormComponent] Submit Button Clicked',
  props<{ event: MouseEvent }>()
)

export type NgbsAuthSignUpFormComponentAction =
  ComponentActions<NgbsAuthSignUpFormComponent>
