import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AUTH_FEATURE_KEY, State } from './auth.reducer'

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY)

export const isAuthLoaded = createSelector(
  getAuthState,
  (state: State) => state.loaded
)

export const getAuthErrors = createSelector(
  getAuthState,
  (state: State) => state.errors
)

export const getUser = createSelector(getAuthState, (state) => state?.user)
export const getErrors = createSelector(getAuthState, (state) => state?.errors)

export const isLoggedIn = createSelector(getUser, (user) => !!user)
export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn)
