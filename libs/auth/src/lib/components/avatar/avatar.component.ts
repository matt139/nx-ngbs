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
          class="w-100 bi-person-circle rounded-circle"
          [src]="user.avatarUrl"
          aria-label="logged in"
        />
      </summary>
      <menu class="position-absolute bg-light" style="width: 10rem;">
        <li>Profile</li>
        <li>Log Out</li>
      </menu>
    </details>
    <details
      class="position-relative"
      style="width: 5rem; height: 5rem;"
      *ngIf="!(user$ | async)"
    >
      <summary style="list-style: none;">
        <img
          class="w-100 bi-person-circle rounded-circle"
          [src]="anonymousUser.avatarUrl"
          aria-label="logged out"
        />
      </summary>
      <menu class="position-absolute bg-light" style="width: 10rem;">
        <li>Sign Up</li>
        <li>Log In</li>
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
