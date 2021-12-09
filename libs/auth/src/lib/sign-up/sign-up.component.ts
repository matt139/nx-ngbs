import { Component, Output } from '@angular/core';
import { merge, of, ReplaySubject, switchMap } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { SignUpForm } from './sign-up.form';

export class FormSubmitAction {
  public readonly type = '[SignUpFormComponent] Sign Up Form Submit';
  constructor(
    public readonly values: {
      emailAddress: string;
      password: string;
      passwordConfirm: string;
    }
  ) {}
}

export class ButtonClickSubmitAction {
  public type = '[SignUpFormComponent] Submit Button Clicked';
}

export class ButtonClickLogInAction {
  public type = '[SignUpFormComponent] Log In Button Clicked';
}

export type SignUpComponentActions =
  | FormSubmitAction
  | ButtonClickLogInAction
  | ButtonClickSubmitAction;

/**
 * SignUpComponent
 *
 * a basic sign up form
 */
@Component({
  selector: 'ngbs-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpFormComponent {
  private readonly formSubmit$ = new ReplaySubject<FormSubmitAction>(1);
  private readonly buttonClickSubmit$ =
    new ReplaySubject<ButtonClickSubmitAction>(1);
  private readonly buttonClickLogIn$ =
    new ReplaySubject<ButtonClickLogInAction>(1);

  public readonly signUpForm$ = of(new SignUpForm());

  private readonly formValues$ = this.signUpForm$.pipe(
    switchMap((form) => form.valueChanges)
  );

  private formSubmitAction$ = this.formSubmit$.pipe(
    withLatestFrom(this.formValues$),
    map(([, values]) => new FormSubmitAction(values))
  );

  a = this.signUpForm$
    .pipe(switchMap((form) => form.valueChanges))
    .subscribe((x) => console.log('a = this.signUpForm.valueChanges', x));

  // a = this.signUpForm$
  //   .pipe(switchMap((form) => form.valueChanges))
  //   .subscribe((x) => console.log(x));

  @Output()
  public readonly action = merge(
    this.formSubmit$,
    this.buttonClickLogIn$,
    this.buttonClickSubmit$
  );

  public readonly formSubmit = (event: Event) => {
    event.preventDefault();
    this.formSubmit$.next(event);
  };

  public readonly buttonClickSubmit = () => {
    this.buttonClickSubmit$.next(new ButtonClickSubmitAction());
  };

  public readonly buttonClickLogIn = () => {
    this.buttonClickLogIn$.next(new ButtonClickLogInAction());
  };
}
