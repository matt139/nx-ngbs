import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Store } from '@ngrx/store'
import { isLoggedIn } from '../+state/auth.selectors'

@Injectable()
export class NgbsAuthIsLoggedInGuard implements CanActivate {
  constructor(private readonly store: Store) {}
  public canActivate() {
    console.log(this.store)
    return this.store.select(isLoggedIn)
  }
}
