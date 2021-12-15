import { Component, Output } from '@angular/core';
import { merge, of, ReplaySubject, switchMap } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { LogInForm, LogInFormValues } from './log-in.form';
import { createAction, props } from '@ngrx/store';

/**
 * LogInFormComponent
 *
 * a basic log in form
 */
@Component({
  selector: 'ngbs-auth-log-in-form',
  templateUrl: './log-in-form.component.html',
})
export class NgbsAuthLogInFormComponent {
  private readonly formSubmit$ = new ReplaySubject<Event>(1);

  private readonly buttonClickSubmit$ =
    new ReplaySubject<ButtonClickSubmitAction>(1);

  private readonly buttonClickSignUp$ =
    new ReplaySubject<ButtonClickLogInAction>(1);

  public readonly logInForm$ = of(new LogInForm());

  private readonly formValues$ = this.logInForm$.pipe(
    switchMap((form) => form.valueChanges)
  );

  private formSubmitAction$ = this.formSubmit$.pipe(
    withLatestFrom(this.logInForm$),
    filter(([, form]) => form.valid),
    map(([, form]) => formSubmitLogIn(form.value))
  );

  @Output()
  public readonly action$ = merge(
    this.formSubmitAction$,
    this.buttonClickSignUp$,
    this.buttonClickSubmit$
  );

  public readonly formSubmit = (event: Event) => {
    event.preventDefault();
    this.formSubmit$.next(event);
  };

  public readonly buttonClickSubmit = (event: Event) => {
    this.buttonClickSubmit$.next(buttonClickSubmit());
  };

  public readonly buttonClickSignUp = (event: Event) => {
    this.buttonClickSignUp$.next(buttonClickLogIn());
  };
}

export const formSubmitLogIn = createAction(
  '[LogInFormComponent] Log In Form Submit',
  props<LogInFormValues>()
);
export type FormSubmitLogInAction = ReturnType<typeof formSubmitLogIn>;

export const buttonClickLogIn = createAction(
  '[LogInFormComponent] Sign Up Button Clicked'
);
export type ButtonClickLogInAction = ReturnType<typeof buttonClickLogIn>;

export const buttonClickSubmit = createAction(
  '[LogInFormComponent] Submit Button Clicked'
);
export type ButtonClickSubmitAction = ReturnType<typeof buttonClickSubmit>;

export type LogInComponentActions =
  | FormSubmitLogInAction
  | ButtonClickLogInAction
  | ButtonClickSubmitAction;
