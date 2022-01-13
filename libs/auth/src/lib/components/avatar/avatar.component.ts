import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { ComponentActions, Props$ } from '@ngbs/utils'
import { createAction, props } from '@ngrx/store'
import { merge, ReplaySubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { NgbsUser } from '../../+state/auth.models'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ngbs-auth-avatar',
  templateUrl: './avatar.component.html',
  styles: [
    `
      .input-toggle {
        display: none;
      }
      input:checked + .input-toggle {
        display: block;
      }
    `,
  ],
})
export class NgbsAuthAvatarComponent {
  public readonly clickLogOut$ = new ReplaySubject<{ event: Event }>(1)
  public readonly clickLogIn$ = new ReplaySubject<{ event: Event }>(1)
  public readonly clickSettings$ = new ReplaySubject<{ event: Event }>(1)
  public readonly clickSignUp$ = new ReplaySubject<{ event: Event }>(1)

  @Input()
  @Props$()
  public props!: NgbsAvatarComponentProps
  private readonly props$!: ReplaySubject<NgbsAvatarComponentProps>

  @Output()
  public readonly action$ = merge(
    this.clickLogOut$.pipe(map(clickLogOut)),
    this.clickLogIn$.pipe(map(clickLogIn)),
    this.clickSignUp$.pipe(map(clickSignUp)),
    this.clickSettings$.pipe(map(clickSettings))
  )

  public readonly user$ = this.props$.pipe(map((props) => props?.user))

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
}

export type NgbsAvatarComponentProps = null | {
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

export const clickSettings = createAction(
  `[NgbsAuthAvatarComponent] Settings Clicked`,
  props<{ event: Event }>()
)

export type NgbsAuthAvatarComponentAction =
  ComponentActions<NgbsAuthAvatarComponent>
