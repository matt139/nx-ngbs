import { Component, Input } from '@angular/core'
import { map, ReplaySubject } from 'rxjs'
import { anonymousUser } from '../../models/user'

@Component({
  selector: 'ngbs-avatar',
  template: `
    <details
      class="position-relative"
      style="width: 5rem; height: 5rem;"
      *ngIf="user$ | async as user"
    >
      <summary style="list-style: none;">
        <img
          style="width: 5rem; height: 5rem;"
          class="w-100 rounded-circle"
          [src]="user.avatarUrl"
          aria-label="logged in"
        />
      </summary>
      <menu class="position-absolute bg-light" style="width: 10rem;">
        <li><a routerLink="/auth/profile">Profile</a></li>
        <li><a (click)="clickLogOut($event)">Log Out</a></li>
      </menu>
    </details>
    <details
      class="position-relative"
      style="width: 5rem; height: 5rem;"
      *ngIf="!(user$ | async)"
    >
      <summary style="list-style: none;">
        <img
          style="width: 5rem; height: 5rem;"
          class="w-100 rounded-circle"
          [src]="anonymousUser.avatarUrl"
          aria-label="logged out"
        />
      </summary>
      <menu class="position-absolute bg-light" style="width: 10rem;">
        <li><a routerLink="/auth/sign-up">Sign Up</a></li>
        <li><a routerLink="/auth/log-in">Log In</a></li>
      </menu>
    </details>
  `,
})
export class NgbsAvatarComponent {
  private readonly props$ = new ReplaySubject<NgbsAvatarComponentProps>(1)

  @Input()
  set props(props: NgbsAvatarComponentProps) {
    if (!props) return
    this.props$.next(props)
  }

  public readonly user$ = this.props$.pipe(map((props) => props.user))

  public readonly anonymousUser = anonymousUser
}

export interface NgbsAvatarComponentProps {
  readonly user?: NgbsUser
}

export type NgbsUser = { displayName: string; avatarUrl: string }
