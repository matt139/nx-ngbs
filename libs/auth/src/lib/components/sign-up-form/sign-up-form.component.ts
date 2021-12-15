import { Component, Output } from '@angular/core'
import { createAction, props } from '@ngrx/store'
import { merge, of, ReplaySubject, switchMap } from 'rxjs'
import { filter, map, withLatestFrom } from 'rxjs/operators'

import { SignUpForm, SignUpFormValues } from './sign-up.form'

/**
 * NgbsSignUpFormComponent
 *
 * a basic sign up form
 */
@Component({
  selector: 'ngbs-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class NgbsSignUpFormComponent {
  private readonly formSubmit$ = new ReplaySubject<Event>(1)

  private readonly buttonClickSubmit$ =
    new ReplaySubject<ButtonClickSubmitAction>(1)

  private readonly buttonClickLogIn$ =
    new ReplaySubject<ButtonClickLogInAction>(1)

  public readonly signUpForm$ = of(new SignUpForm())

  private readonly formValues$ = this.signUpForm$.pipe(
    switchMap((form) => form.valueChanges)
  )

  private formSubmitAction$ = this.formSubmit$.pipe(
    withLatestFrom(this.signUpForm$),
    filter(([, form]) => form.valid),
    map(([, form]) => formSubmitSignUp({values: form.value}))
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

  public readonly buttonClickSubmit = (event: Event) => {
    this.buttonClickSubmit$.next(buttonClickSubmit())
  }

  public readonly buttonClickLogIn = (event: Event) => {
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
  '[NgbsAuth/SignUpFormComponent] Sign Up Form Submit',
  props<{ values: SignUpFormValues }>()
)

export type FormSubmitSignUpAction = ReturnType<typeof formSubmitSignUp>

export const buttonClickLogIn = createAction(
  '[NgbsAuth/SignUpFormComponent] Log In Button Clicked'
)

export type ButtonClickLogInAction = ReturnType<typeof buttonClickLogIn>

export const buttonClickSubmit = createAction(
  '[NgbsAuth/SignUpFormComponent] Submit Button Clicked'
)

export type ButtonClickSubmitAction = ReturnType<typeof buttonClickSubmit>

export type NgbsAuthSignUpComponentAction =
  | FormSubmitSignUpAction
  | ButtonClickLogInAction
  | ButtonClickSubmitAction
