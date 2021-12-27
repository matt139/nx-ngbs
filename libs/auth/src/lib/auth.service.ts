import { Injectable } from '@angular/core'
import { from, map, ReplaySubject } from 'rxjs'
import { NgbsAuthCredentials } from './+state/auth.models'
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth'
import { getUserFromResponse, getUserProperties, NgbsUser } from './models/user'

@Injectable()
export class AuthService {
  constructor(private readonly angularFireAuth: Auth) {
    this.angularFireAuth.onAuthStateChanged({
      next: (user) => this.user$.next(user ? getUserProperties(user) : null),
      error: (error) => this.user$.error(error),
      complete: () => this.user$.complete(),
    })
  }

  public readonly user$ = new ReplaySubject<NgbsUser | null>(1)

  a = this.user$.subscribe((x) => console.log('a = this.user$', x))

  public logIn({ emailAddress, password }: NgbsAuthCredentials) {
    return from(
      signInWithEmailAndPassword(this.angularFireAuth, emailAddress, password)
    ).pipe(map(getUserFromResponse))
  }

  public signUp({ emailAddress, password }: NgbsAuthCredentials) {
    return from(
      createUserWithEmailAndPassword(
        this.angularFireAuth,
        emailAddress,
        password
      )
    ).pipe(map(getUserFromResponse))
  }

  public logOut() {
    return from(signOut(this.angularFireAuth))
  }
}
