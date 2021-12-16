import { TestBed } from '@angular/core/testing'
import { UserCredential } from '@angular/fire/auth'
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from '@ngrx/store'
import { provideMockStore } from '@ngrx/store/testing'
import { NxModule } from '@nrwl/angular'
import { hot } from 'jasmine-marbles'
import { Observable, of } from 'rxjs'
import { AuthService } from '../auth.service'
import { testUser } from '../models/user'

import * as AuthActions from './auth.actions'
import { AuthEffects } from './auth.effects'

describe('AuthEffects', () => {
  let actions: Observable<Action>
  let effects: AuthEffects
  const userCredential = { user: { email: 'test@example.com' } }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useValue: {
            logIn: jest.fn((credentials: any) => {
              return of(userCredential)
            }),
            signUp: jest.fn((credentials: any) => {
              return of(userCredential)
            }),
          },
        },
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    })

    effects = TestBed.inject(AuthEffects)
  })

  it('should exist', () => {
    expect(effects).toBeTruthy()
  })

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AuthActions.init() })

      const expected = hot('-a-|', {
        a: AuthActions.init(),
      })

      expect(effects.init$).toBeObservable(expected)
    })
  })

  describe('logIn$', () => {
    it('should log in and return success', () => {
      actions = hot('-a-|', {
        a: AuthActions.logInSubmit({
          credentials: {
            emailAddress: 'test@example.com',
            password: 'Pa$$w0rd',
          },
        }),
      })

      const expected = hot('-a-|', {
        a: AuthActions.logInSuccess({
          user: { emailAddress: userCredential.user.email },
        }),
      })

      expect(effects.logIn$).toBeObservable(expected)
    })
  })

  describe('signUp$', () => {
    it('should sign upand return success', () => {
      actions = hot('-a-|', {
        a: AuthActions.signUpSubmit({
          credentials: {
            emailAddress: 'test@example.com',
            password: 'Pa$$w0rd',
          },
        }),
      })

      const expected = hot('-a-|', {
        a: AuthActions.signUpSuccess({
          user: { emailAddress: userCredential.user.email },
        }),
      })

      expect(effects.signUp$).toBeObservable(expected)
    })
  })
})
