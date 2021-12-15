import { Injectable } from '@angular/core'
import { from, of } from 'rxjs'
import { NgbsAuthCredentials } from './+state/auth.models'
import { testUser } from './models/user'
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth'

@Injectable()
export class AuthService {
  public readonly logIn = ({ emailAddress, password }: NgbsAuthCredentials) =>
    from(
      signInWithEmailAndPassword(this.angularFireAuth, emailAddress, password)
    )

  public readonly signUp = ({ emailAddress, password }: NgbsAuthCredentials) =>
    from(
      createUserWithEmailAndPassword(
        this.angularFireAuth,
        emailAddress,
        password
      )
    )

  constructor(private readonly angularFireAuth: Auth) {}
}