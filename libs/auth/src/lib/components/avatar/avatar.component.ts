import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { ComponentActions } from '@ngbs/utils'
import { ofType } from '@ngrx/effects'
import { createAction, props } from '@ngrx/store'
import { merge, ReplaySubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { NgbsAuthFacade } from '../../+state/auth.facade'
import { NgbsUser } from '../../+state/auth.models'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ngbs-auth-avatar',
  template: `
    <details class="position-relative" style="width: 5rem; height: 5rem;">
      <summary style="list-style: none;">
        <img
          style="width: 5rem; height: 5rem;"
          class="rounded-circle"
          aria-label="avatar-user-menu"
          data-test="avatar-img"
          [src]="imgSrc$ | async"
          [alt]="imgAlt$ | async"
        />
      </summary>
      <menu
        class="position-absolute bg-light"
        style="width: 10rem;"
        *ngIf="user$ | async as user; else loggedOutMenu"
      >
        <li>
          <a
            routerLink="/auth/profile"
            data-test="avatar-link-profile"
            (click)="clickProfile$.next({ event: $event })"
            >Profile</a
          >
        </li>
        <li>
          <a
            (click)="clickLogOut$.next({ event: $event })"
            data-test="avatar-link-log-out"
            >Log Out</a
          >
        </li>
      </menu>

      <ng-template #loggedOutMenu>
        <menu class="position-absolute bg-light" style="width: 10rem;">
          <li>
            <a
              routerLink="/auth/sign-up"
              data-test="avatar-link-sign-up"
              (click)="clickSignUp$.next({ event: $event })"
              >Sign Up</a
            >
          </li>
          <li>
            <a
              routerLink="/auth/log-in"
              data-test="avatar-link-log-in"
              (click)="clickLogIn$.next({ event: $event })"
              >Log In</a
            >
          </li>
        </menu>
      </ng-template>
    </details>
  `,
})
export class NgbsAuthAvatarComponent {
  private readonly props$ = new ReplaySubject<NgbsAvatarComponentProps>(1)
  public readonly clickLogOut$ = new ReplaySubject<{ event: Event }>(1)
  public readonly clickLogIn$ = new ReplaySubject<{ event: Event }>(1)
  public readonly clickProfile$ = new ReplaySubject<{ event: Event }>(1)
  public readonly clickSignUp$ = new ReplaySubject<{ event: Event }>(1)

  constructor(private readonly authFacade: NgbsAuthFacade) {}

  @Input()
  set props(props: NgbsAvatarComponentProps | null) {
    if (!props) return
    this.props$.next(props)
  }

  @Output()
  public readonly action$ = merge(
    this.clickLogOut$.pipe(map(clickLogOut)),
    this.clickLogIn$.pipe(map(clickLogIn)),
    this.clickSignUp$.pipe(map(clickSignUp)),
    this.clickProfile$.pipe(map(clickProfile))
  )

  public readonly user$ = this.props$.pipe(map((props) => props.user))

  public readonly imgSrc$ = this.user$.pipe(
    map((user) => {
      if (!user) return '/assets/logged-out.svg'
      if (!user.photoURL) return '/assets/logged-in.svg'
      return user.photoURL
    })
  )

  public readonly imgAlt$ = this.user$.pipe(
    map((user) => {
      if (!user) return 'Log In'
      if (!user.displayName) return user.email || 'Unknown User'
      return user.displayName
    })
  )

  public readonly logOut = this.action$
    .pipe(ofType(clickLogOut))
    .subscribe(() => this.authFacade.logOut())
}

export interface NgbsAvatarComponentProps {
  readonly user?: Pick<NgbsUser, 'photoURL' | 'displayName' | 'email'> | null
}

export const clickLogOut = createAction(
  `[NgbsAuthAvatarComponent] Log Out Clicked`,
  props<{ event: Event }>()
)

export const clickLogIn = createAction(
  `[NgbsAuthAvatarComponent] Log In Clicked`,
  props<{ event: Event }>()
)

export const clickSignUp = createAction(
  `[NgbsAuthAvatarComponent] Sign Up Clicked`,
  props<{ event: Event }>()
)

export const clickProfile = createAction(
  `[NgbsAuthAvatarComponent] Profile Clicked`,
  props<{ event: Event }>()
)

export type NgbsAuthAvatarComponentAction =
  ComponentActions<NgbsAuthAvatarComponent>
