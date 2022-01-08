import { Injectable } from '@angular/core'
import { filter, from, map, ReplaySubject, switchMap, take } from 'rxjs'
import { NgbsAuthCredentials } from './+state/auth.models'
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  signOut,
  updateEmail,
} from '@angular/fire/auth'
import { getUserFromResponse, getUserProperties } from './models/user'

@Injectable()
export class AuthService {
  constructor(private readonly angularFireAuth: Auth) {
    this.angularFireAuth.onAuthStateChanged({
      next: (user) => this.backendUser$.next(user),
      error: (error) => this.backendUser$.error(error),
      complete: () => this.backendUser$.complete(),
    })
  }

  public readonly backendUser$ = new ReplaySubject<User | null>(1)
  public readonly user$ = this.backendUser$.pipe(
    map((user) => (user ? getUserProperties(user) : null))
  )

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

  public updateEmail(newEmail: string) {
    return this.backendUser$.pipe(
      take(1),
      filter((user): user is User => !!user),
      switchMap((user) => updateEmail(user, newEmail))
    )
  }
}
