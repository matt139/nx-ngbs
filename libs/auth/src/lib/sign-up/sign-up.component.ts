import { Component, Output } from '@angular/core';
import { combineLatest, ReplaySubject } from 'rxjs';

export type SignUpComponentActions = any
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
export class SignUpComponent {

  public readonly formSubmit$ = new ReplaySubject<Event>(1);
  public readonly buttonClickSubmit$ = new ReplaySubject<Event>(1);
  public readonly buttonClickLogIn$ = new ReplaySubject<Event>(1);

  @Output()
  public readonly action = combineLatest([this.formSubmit$, this.buttonClickLogIn$, this.buttonClickSubmit$])

  a = this.action.subscribe((x) =>
    console.log('a = this.clickSubmit$', x)
  );
}
