import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { ComponentActions } from '@ngbs/utils'
import { createAction } from '@ngrx/store'
import { map, ReplaySubject } from 'rxjs'
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
          [src]="imgSrc$ | async"
          [alt]="imgAlt$ | async"
        />
      </summary>
      <menu
        class="position-absolute bg-light"
        style="width: 10rem;"
        *ngIf="user$ | async as user; else loggedOutMenu"
      >
        <li><a routerLink="/auth/profile">Profile</a></li>
        <li><a (click)="clickLogOut($event)">Log Out</a></li>
      </menu>

      <ng-template #loggedOutMenu>
        <menu class="position-absolute bg-light" style="width: 10rem;">
          <li><a routerLink="/auth/sign-up">Sign Up</a></li>
          <li><a routerLink="/auth/log-in">Log In</a></li>
        </menu>
      </ng-template>
    </details>
  `,
})
export class NgbsAuthAvatarComponent {
  private readonly props$ = new ReplaySubject<NgbsAvatarComponentProps>(1)
  private readonly clickLogOut$ = new ReplaySubject<Event>(1)

  @Input()
  set props(props: NgbsAvatarComponentProps | null) {
    if (!props) return
    this.props$.next(props)
  }

  @Output()
  public readonly action$ = this.clickLogOut$.pipe(map(() => clickLogOut()))

  public readonly user$ = this.props$.pipe(map((props) => props.user))

  public readonly imgSrc$ = this.user$.pipe(
    map(
      (user) =>
        user?.photoURL ||
        'https://static.vecteezy.com/system/resources/previews/000/379/162/original/add-user-vector-icon.jpg'
    )
  )

  public readonly imgAlt$ = this.user$.pipe(
    map((user) => user?.displayName || 'Log In')
  )

  public clickLogOut(event: Event) {
    this.clickLogOut$.next(event)
  }
}

export interface NgbsAvatarComponentProps {
  readonly user?: NgbsUser | null
}

export const clickLogOut = createAction(
  `NgbsAuthAvatarComponent - Log Out Clicked`
)

export type NgbsAuthAvatarComponentAction =
  ComponentActions<NgbsAuthAvatarComponent>
