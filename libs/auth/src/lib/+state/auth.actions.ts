import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';

export const init = createAction('[Auth Page] Init');

export const loadAuthSuccess = createAction(
  '[NgbsAuth] Load Auth Success',
  props<{ auth: AuthEntity[] }>()
);

export const loadAuthFailure = createAction(
  '[NgbsAuth] Load Auth Failure',
  props<{ error: any }>()
);
