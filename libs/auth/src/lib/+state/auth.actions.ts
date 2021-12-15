import { createAction, props } from '@ngrx/store'
import { NgbsUser } from '../models/user'
import { AuthEntity, NgbsAuthCredentials } from './auth.models'

/*
 * Init
 */
export const init = createAction('[Auth Page] Init')

export const loadAuthSuccess = createAction(
  '[NgbsAuth] Load Auth Success',
  props<{ auth: AuthEntity[] }>()
)

export const loadAuthFailure = createAction(
  '[NgbsAuth] Load Auth Failure',
  props<{ error: any }>()
)

/*
 * Sign Up
 */
export const signUpSubmit = createAction(
  '[NgbsAuth] Sign Up Submit',
  props<{ credentials: NgbsAuthCredentials }>()
)

export const signUpSuccess = createAction(
  '[NgbsAuth] Sign Up Success',
  props<{ user: NgbsUser }>()
)

export const signUpFailure = createAction(
  '[NgbsAuth] Sign Up Failure',
  props<{ error: any }>()
)

/*
 * Log In
 */
export const logInSubmit = createAction(
  '[NgbsAuth] Log In Submit',
  props<{ credentials: NgbsAuthCredentials }>()
)

export const logInSuccess = createAction(
  '[NgbsAuth] Log In Success',
  props<{ user: NgbsUser }>()
)

export const logInFailure = createAction(
  '[NgbsAuth] Log In Failure',
  props<{ error: any }>()
)

/*
 * Log Out
 */
export const logOut = createAction('[NgbsAuth] Log Out')
