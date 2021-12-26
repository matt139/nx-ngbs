import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { ComponentActions } from '@ngbs/utils'
import { ofType } from '@ngrx/effects'
import { createAction, props } from '@ngrx/store'
import { merge, ReplaySubject } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'
import { NgbsAuthFacade } from '../../+state/auth.facade'
import { NgbsUser } from '../../+state/auth.models'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ngbs-auth-avatar',
  templateUrl: './avatar.component.html',
})
export class NgbsAuthAvatarComponent {
  private readonly props$ = new ReplaySubject<NgbsAvatarComponentProps>(1)
  public readonly clickLogOut$ = new ReplaySubject<{ event: Event }>(1)
  public readonly clickLogIn$ = new ReplaySubject<{ event: Event }>(1)
  public readonly clickSettings$ = new ReplaySubject<{ event: Event }>(1)
  public readonly clickSignUp$ = new ReplaySubject<{ event: Event }>(1)
  private readonly toggleElement$ = new ReplaySubject<HTMLElement>(1)

  constructor(private readonly authFacade: NgbsAuthFacade) {}

  @ViewChild('toggle')
  private set toggleElement(elementRef: ElementRef) {
    if (!elementRef.nativeElement) return
    this.toggleElement$.next(elementRef.nativeElement)
  }

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
    this.clickSettings$.pipe(map(clickSettings))
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

  private closeMenu = merge(
    this.clickLogOut$.pipe(map(clickLogOut)),
    this.clickLogIn$.pipe(map(clickLogIn)),
    this.clickSignUp$.pipe(map(clickSignUp)),
    this.clickSettings$.pipe(map(clickSettings))
  )
    .pipe(withLatestFrom(this.toggleElement$))
    .subscribe(([, element]) => element.click())

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

export const clickSettings = createAction(
  `[NgbsAuthAvatarComponent] Settings Clicked`,
  props<{ event: Event }>()
)

export type NgbsAuthAvatarComponentAction =
  ComponentActions<NgbsAuthAvatarComponent>
