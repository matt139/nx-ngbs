import { Action } from '@ngrx/store'
import { testUser } from '../models/user'

import * as AuthActions from './auth.actions'
import { AuthEntity } from './auth.models'
import { State, initialState, reducer } from './auth.reducer'

describe('Auth Reducer', () => {
  const createAuthEntity = (id: string, name = ''): AuthEntity => ({
    id,
    name: name || `name-${id}`,
  })

  describe('valid Auth actions', () => {
    describe(AuthActions.logInSubmit.type, () => {
      it('should exist', () => {
        expect(AuthActions.logInSubmit).toBeTruthy()
      })
    })

    describe(AuthActions.logInFailure.type, () => {
      it('should exist', () => {
        expect(AuthActions.logInFailure).toBeTruthy()
      })
    })

    describe(AuthActions.logInSuccess.type, () => {
      it('should update state with the logged in user', () => {
        expect(AuthActions.logInSubmit).toBeTruthy()
      })

      const action = AuthActions.logInSuccess({ user: testUser })
      const result: State = reducer(initialState, action)
      expect(result.user).toBe(testUser)
    })

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
      expect(result.user).toBe(testUser)
    })


    it('loadAuthSuccess should return the list of known Auth', () => {
      const auth = [
        createAuthEntity('PRODUCT-AAA'),
        createAuthEntity('PRODUCT-zzz'),
      ]
      const action = AuthActions.loadAuthSuccess({ auth })

      const result: State = reducer(initialState, action)

      expect(result.loaded).toBe(true)
      expect(result.ids.length).toBe(2)
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
