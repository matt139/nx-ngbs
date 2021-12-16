import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Store } from '@ngrx/store'
import { isLoggedOut } from '../+state/auth.selectors'

@Injectable()
export class NgbsAuthIsLoggedOutGuard implements CanActivate {
  constructor(private readonly store: Store) {}
  public canActivate() {
    return this.store.select(isLoggedOut)
  }
}
