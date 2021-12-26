import { Injectable } from '@angular/core'
import { from, map } from 'rxjs'
import { NgbsAuthCredentials } from './+state/auth.models'
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth'
import { getUserFromResponse } from './models/user'

@Injectable()
export class AuthService {
  constructor(private readonly angularFireAuth: Auth) {}

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
