import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { createReducer, on, Action } from '@ngrx/store'
import { NgbsUser } from '../models/user'

import * as AuthActions from './auth.actions'
import { AuthEntity } from './auth.models'

export const AUTH_FEATURE_KEY = 'auth'

export interface State {
  readonly loaded: boolean // has Auth been loaded
  readonly errors: ReadonlyArray<string> // last known errors (if any)
  readonly user?: NgbsUser // currently active user, if logged in
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
  errors: [],
}

const authReducer = createReducer(
  initialState,
  on(AuthActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(AuthActions.loadAuthFailure, (state, { error }) => ({
    ...state,
    errors: [...state.errors, error],
  })),
  on(AuthActions.logInSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.signUpSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logOut, (state) => ({ ...state, user: undefined }))
)

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action)
}
