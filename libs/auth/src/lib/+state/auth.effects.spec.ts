import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from '@ngrx/store'
import { provideMockStore } from '@ngrx/store/testing'
import { NxModule } from '@nrwl/angular'
import { hot } from 'jasmine-marbles'
import { Observable, of } from 'rxjs'
import { AuthService } from '../auth.service'

import * as AuthActions from './auth.actions'
import { AuthEffects } from './auth.effects'

describe('AuthEffects', () => {
  let actions: Observable<Action>
  let effects: AuthEffects
  const user = {
    email: 'test@example.com',
    photoURL: 'image.png',
    displayName: 'userman',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), RouterTestingModule],
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useValue: {
            logIn: jest.fn(() => {
              return of(user)
            }),
            signUp: jest.fn(() => {
              return of(user)
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
          user,
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
          user,
        }),
      })

      expect(effects.signUp$).toBeObservable(expected)
    })
  })
})
