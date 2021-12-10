import { Component, Output } from '@angular/core';
import { merge, of, ReplaySubject, switchMap } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { SignUpForm, SignUpFormValues } from './sign-up.form';
import { createAction, props } from '@ngrx/store';

/**
 * SignUpFormComponent
 *
 * a basic sign up form
 */
@Component({
  selector: 'ngbs-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  private readonly formSubmit$ = new ReplaySubject<Event>(1);

  private readonly buttonClickSubmit$ =
    new ReplaySubject<ButtonClickSubmitAction>(1);

  private readonly buttonClickLogIn$ =
    new ReplaySubject<ButtonClickLogInAction>(1);

  public readonly signUpForm$ = of(new SignUpForm());

  private readonly formValues$ = this.signUpForm$.pipe(
    switchMap((form) => form.valueChanges)
  );

  private formSubmitAction$ = this.formSubmit$.pipe(
    withLatestFrom(this.signUpForm$),
    filter(([, form]) => form.valid),
    map(([, form]) => formSubmitSignUp(form.value))
  );

  @Output()
  public readonly action = merge(
    this.formSubmitAction$,
    this.buttonClickLogIn$,
    this.buttonClickSubmit$
  );

  public readonly formSubmit = (event: Event) => {
    event.preventDefault();
    this.formSubmit$.next(event);
  };

  public readonly buttonClickSubmit = (event: Event) => {
    event.preventDefault();
    this.buttonClickSubmit$.next(buttonClickSubmit());
  };

  public readonly buttonClickLogIn = (event: Event) => {
    event.preventDefault();
    this.buttonClickLogIn$.next(buttonClickLogIn());
  };
}

export const formSubmitSignUp = createAction(
  '[SignUpFormComponent] Sign Up Form Submit',
  props<SignUpFormValues>()
);
export type FormSubmitSignUpAction = ReturnType<typeof formSubmitSignUp>;

export const buttonClickLogIn = createAction(
  '[SignUpFormComponent] Log In Button Clicked'
);
export type ButtonClickLogInAction = ReturnType<typeof buttonClickLogIn>;

export const buttonClickSubmit = createAction(
  '[SignUpFormComponent] Submit Button Clicked'
);
export type ButtonClickSubmitAction = ReturnType<typeof buttonClickSubmit>;

export type SignUpComponentActions =
  | FormSubmitSignUpAction
  | ButtonClickLogInAction
  | ButtonClickSubmitAction;
