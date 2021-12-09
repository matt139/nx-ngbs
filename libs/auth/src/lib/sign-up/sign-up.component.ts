import { Component, Output } from '@angular/core';
import { merge, ReplaySubject } from 'rxjs';

export class FormSubmitAction {
  public type = '[SignUpFormComponent] Sign Up Form Submit';
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
  public readonly formSubmit$ = new ReplaySubject<FormSubmitAction>(1);
  public readonly buttonClickSubmit$ =
    new ReplaySubject<ButtonClickSubmitAction>(1);
  public readonly buttonClickLogIn$ = new ReplaySubject<ButtonClickLogInAction>(
    1
  );

  @Output()
  public readonly action = merge(
    this.formSubmit$,
    this.buttonClickLogIn$,
    this.buttonClickSubmit$,
  );

  public readonly formSubmit = (event: Event) => {
    event.preventDefault();
    this.formSubmit$.next(new FormSubmitAction());
  };

  public readonly buttonClickSubmit = () => {
    this.buttonClickSubmit$.next(new ButtonClickSubmitAction());
  };

  public readonly buttonClickLogIn = () => {
    this.buttonClickLogIn$.next(new ButtonClickLogInAction());
  };
}
