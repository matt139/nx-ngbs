import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ObservableComponent } from '@matttelliott/ngx-observable-components'
import { createAction, props } from '@ngrx/store'
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
export class NgbsAuthAvatarComponent extends ObservableComponent<
  NgbsAvatarComponentProps,
  NgbsAuthAvatarComponentAction
> {
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

  public readonly clickLogOut = (props: {event: Event}) => this.action$.next(clickLogOut(props))
  public readonly clickLogIn = (props: {event: Event}) => this.action$.next(clickLogIn(props))
  public readonly clickSignUp = (props: {event: Event}) => this.action$.next(clickSignUp(props))
  public readonly clickSettings = (props: {event: Event}) => this.action$.next(clickSettings(props))
}

export type NgbsAvatarComponentProps = {
  readonly user?: Pick<NgbsUser, 'photoURL' | 'displayName' | 'email'> | null
} | null

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

export type NgbsAuthAvatarComponentActionCreator =
  | typeof clickSettings
  | typeof clickSignUp
  | typeof clickLogIn
  | typeof clickLogOut

export type NgbsAuthAvatarComponentAction =
  ReturnType<NgbsAuthAvatarComponentActionCreator>
