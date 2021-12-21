import { Component } from '@angular/core'
import { NgbsAuthAvatarComponentAction, getErrors, getUser } from '@ngbs/auth'
import { Store } from '@ngrx/store'
import { map, ReplaySubject } from 'rxjs'

@Component({
  selector: 'ngbs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public readonly action$ = new ReplaySubject<NgbsAuthAvatarComponentAction>(1)

  constructor(private readonly store: Store) {}

  public readonly store$ = this.store

  public readonly user$ = this.store.pipe(map(getUser))
  public readonly errors$ = this.store.pipe(map(getErrors))
  public readonly avatarProps$ = this.user$.pipe(map((user) => ({ user })))

  private readonly dispatchActions = this.action$.subscribe((action) =>
    this.store.dispatch(action)
  )
}
