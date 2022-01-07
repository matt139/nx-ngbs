import { ChangeDetectionStrategy, Component, Output } from "@angular/core";
import { clickLogOut, NgbsAuthAvatarComponentAction } from "./avatar.component";
import { NgbsAuthFacade } from "@ngbs/auth";
import { ofType } from "@ngrx/effects";
import { map, ReplaySubject } from "rxjs";

/*
*
* NgbsAuthAvatarWidget
*
* Wraps NgbsAvatarComponent. Widges are "Smart" components that serve as wrappers around "dumb" components
*/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ngbs-auth-avatar-widget',
  template: '<ngbs-auth-avatar [props]="avatarProps$ | async" (action$)="this.action$.next($event)"></ngbs-auth-avatar>',
})
export class NgbsAuthAvatarWidget {
  constructor(private readonly authFacade: NgbsAuthFacade) {}

  // actions are allowed to propagate outside of the widget to the app for
// further handling as needed (ie logging)
  @Output()
  public readonly action$ = new ReplaySubject<NgbsAuthAvatarComponentAction>(1)

  public readonly avatarProps$ = this.authFacade.user$.pipe(
    map(user => ({user}))
  )

  public readonly logOut = this.action$
    .pipe(ofType(clickLogOut))
    .subscribe(() => this.authFacade.logOut())
}

