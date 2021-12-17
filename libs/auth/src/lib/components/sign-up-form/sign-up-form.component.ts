import { ChangeDetectionStrategy, Component, Output } from '@angular/core'
import { ComponentActions } from '@ngbs/utils'
import { createAction, props } from '@ngrx/store'
import { merge, of, ReplaySubject, switchMap } from 'rxjs'
import { filter, map, withLatestFrom } from 'rxjs/operators'

import { SignUpForm, SignUpFormValues } from './sign-up.form'

/**
 * NgbsAuthSignUpFormComponent
 *
 * a basic sign up form
 */
@Component({
  selector: 'ngbs-auth-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgbsAuthSignUpFormComponent {
  private readonly formSubmit$ = new ReplaySubject<Event>(1)

  private readonly buttonClickSubmit$ =
    new ReplaySubject(1)

  private readonly buttonClickLogIn$ =
    new ReplaySubject(1)

  public readonly signUpForm$ = of(new SignUpForm())

  private readonly formValues$ = this.signUpForm$.pipe(
    switchMap((form) => form.valueChanges)
  )

  private formSubmitAction$ = this.formSubmit$.pipe(
    withLatestFrom(this.signUpForm$),
    filter(([, form]) => form.valid),
    map(([, form]) => formSubmitSignUp({ values: form.value }))
  )

  @Output()
  public readonly action$ = merge(
    this.formSubmitAction$,
    this.buttonClickLogIn$,
    this.buttonClickSubmit$
  )

  public readonly formSubmit = (event: Event) => {
    event.preventDefault()
    this.formSubmit$.next(event)
  }

  public readonly buttonClickSubmit = () => {
    this.buttonClickSubmit$.next(buttonClickSubmit())
  }

  public readonly buttonClickLogIn = () => {
    this.buttonClickLogIn$.next(buttonClickLogIn())
  }
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
  props<{ values: SignUpFormValues }>()
)

export const buttonClickLogIn = createAction(
  '[NgbsAuthSignUpFormComponent] Log In Button Clicked'
)

export const buttonClickSubmit = createAction(
  '[NgbsAuthSignUpFormComponent] Submit Button Clicked'
)


export type NgbsAuthSignUpComponentAction =
  ComponentActions<NgbsAuthSignUpFormComponent>
