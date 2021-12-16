import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { map, ReplaySubject } from 'rxjs'
import { NgbsUser } from '../../+state/auth.models'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ngbs-auth-avatar',
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
          [src]="user.photoURL"
          aria-label="logged in"
        />
      </summary>
      <menu class="position-absolute bg-light" style="width: 10rem;">
        <li><a routerLink="/auth/profile">Profile</a></li>
        <li><a (click)="clickLogOut($event)">Log Out</a></li>
      </menu>
      <pre>{{user | json}}</pre>
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
          [src]="anonymousUser.photoURL"
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
export class NgbsAuthAvatarComponent {
  private readonly props$ = new ReplaySubject<NgbsAvatarComponentProps>(1)
  private readonly clickLogOut$ = new ReplaySubject<Event>(1)

  @Input()
  set props(props: NgbsAvatarComponentProps | null) {
    if (!props) return
    this.props$.next(props)
  }

  public readonly user$ = this.props$.pipe(map((props) => props.user))

  public readonly anonymousUser = {
    avatarUrl: 'anonymous.jpg',
  }

  public clickLogOut(event: Event) {
    this.clickLogOut$.next(event)
  }
}

export interface NgbsAvatarComponentProps {
  readonly user?: NgbsUser | null
}
