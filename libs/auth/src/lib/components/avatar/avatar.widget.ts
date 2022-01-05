import { ChangeDetectionStrategy, Component } from "@angular/core";
import { clickLogOut, NgbsAuthAvatarComponentAction, NgbsAuthFacade, NgbsAvatarComponentProps } from "@ngbs/auth";
import { ofType } from "@ngrx/effects";
import { map, ReplaySubject } from "rxjs";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ngbs-auth-avatar-widget',
  template: '<ngbs-auth-avatar [props]="props$ | async" (action$)="this.action$.next($event)"></ngbs-auth-avatar>',
})
export class NgbsAuthAvatarWidget {
  constructor(private readonly authFacade: NgbsAuthFacade) {}

  public readonly action$ = new ReplaySubject<NgbsAuthAvatarComponentAction>(1)
  public readonly props$ = this.authFacade.user$.pipe(
    map(user => ({user}))
  )

  public readonly logOut = this.action$
    .pipe(ofType(clickLogOut))
    .subscribe(() => this.authFacade.logOut())
}

