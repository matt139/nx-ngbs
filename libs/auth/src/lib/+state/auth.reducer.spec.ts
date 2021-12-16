import { Action } from '@ngrx/store'

import * as AuthActions from './auth.actions'
import { State, initialState, reducer } from './auth.reducer'
import { getErrors, getUser, isLoggedIn } from './auth.selectors'

const testUser: any = {
  email: 'test@example.com',
}

describe('Auth Reducer', () => {
  let state: State = initialState

  beforeEach(() => {
    state = initialState
  })

  describe('valid Auth actions', () => {
    describe('Sign Up', () => {
      describe(AuthActions.signUpSubmit.type, () => {
        it('should exist', () => {
          expect(AuthActions.signUpSubmit).toBeTruthy()
        })
      })

      describe(AuthActions.signUpFailure.type, () => {
        it('should exist', () => {
          expect(AuthActions.signUpFailure).toBeTruthy()
        })
      })

      describe(AuthActions.signUpSuccess.type, () => {
        it('should update state with the logged in user', () => {
          expect(AuthActions.logInSubmit).toBeTruthy()
        })

        const action = AuthActions.signUpSuccess({ user: testUser })
        const result: State = reducer(initialState, action)
        expect(getUser({ auth: result })).toBe(testUser)
      })
    })

    describe('Log In', () => {
      describe(AuthActions.logInSubmit.type, () => {
        it('should exist', () => {
          expect(AuthActions.logInSubmit).toBeTruthy()
        })
      })

      describe(AuthActions.logInFailure.type, () => {
        it('should create an error', () => {
          const action = AuthActions.logInFailure({ error: 'test error' })
          const result: State = reducer(initialState, action)
          expect(getErrors({ auth: result }).length).toBeGreaterThan(0)
        })
      })

      describe(AuthActions.logInSuccess.type, () => {
        it('should update state with the logged in user', () => {
          expect(AuthActions.logInSubmit).toBeTruthy()
        })
        const action = AuthActions.logInSuccess({ user: testUser })
        const result: State = reducer(initialState, action)
        expect(getUser({ auth: result })).toBe(testUser)
        expect(isLoggedIn({ auth: result })).toBeTruthy()
      })
    })

    describe.only('Log Out', () => {
      beforeEach(() => {
        const action = AuthActions.logInSuccess({ user: testUser })
        state = reducer(initialState, action)
      })

      describe(AuthActions.logOut.type, () => {
        it('should update state with no user', () => {
          expect(AuthActions.logOut).toBeTruthy()
          expect(isLoggedIn({ auth: state })).toBeTruthy()
          const action = AuthActions.logOut()
          const result: State = reducer(state, action)
          expect(isLoggedIn({ auth: result })).not.toBeTruthy()
          expect(getUser({ auth: result })).not.toBeTruthy()
        })
      })
    })
  })

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action
      const result = reducer(initialState, action)
      expect(result).toBe(initialState)
    })
  })
})
