import { Component } from "@angular/core";
import { Action } from "@ngrx/store";
import { ReplaySubject } from "rxjs";

@Component({
  template: `
  <ngbs-log-in-form (action$)="action$.next($event)"></ngbs-log-in-form>
  `
})
export class NgbsLogInView {

  private readonly ngOnDestroy$ = new ReplaySubject<void>(1)

  public readonly action$ = new ReplaySubject<Action>(1)
}
