import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'ngbs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private readonly store: Store<any>) {}

  public readonly store$ = this.store

  public readonly  user$ = this.store.pipe(map(store => store.auth?.user))

  public readonly avatarProps$ = this.user$.pipe(map(user => ({user})))
}
