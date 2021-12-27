import { createAction, props } from '@ngrx/store'
import { NgbsError } from './auth.models'
import { NgbsUser } from '../models/user'
import { NgbsAuthCredentials } from './auth.models'

/*
 * Init
 */
export const init = createAction(
  '[NgbsAuth] Init',
  props<{ user: NgbsUser | null }>()
)

export const loadAuthSuccess = createAction('[NgbsAuth] Load Auth Success')

export const loadAuthFailure = createAction(
  '[NgbsAuth] Load Auth Failure',
  props<{ error: NgbsError }>()
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
  props<{ error: NgbsError }>()
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
  props<{ error: NgbsError }>()
)

/*
 * Log Out
 */
export const logOut = createAction('[NgbsAuth] Log Out')

/*
 * Change Password
 */
export const changePasswordSubmit = createAction(
  '[NgbsAuth] Change Password Submit',
  props<{ credentials: NgbsAuthCredentials }>()
)

export const changePasswordSuccess = createAction(
  '[NgbsAuth] Change Password Success',
  props<{ user: NgbsUser }>()
)

export const changePasswordFailure = createAction(
  '[NgbsAuth] Change Password Failure',
  props<{ error: NgbsError }>()
)
