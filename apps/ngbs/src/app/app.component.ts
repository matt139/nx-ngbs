import { Component } from '@angular/core'
import { getErrors } from '@ngbs/auth'
import { Action, Store } from '@ngrx/store'
import { map, ReplaySubject } from 'rxjs'

@Component({
  selector: 'ngbs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public readonly action$ = new ReplaySubject<Action>(1)

  constructor(private readonly store: Store) {}

  public readonly store$ = this.store

  public readonly errors$ = this.store.pipe(map(getErrors))

  public readonly dispatchActions = this.action$.subscribe((action) =>
    this.store.dispatch(action)
  )
}
