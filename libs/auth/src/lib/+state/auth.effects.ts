import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';

@Injectable()
export class AuthEffects {
  init$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.init)));

  constructor(private readonly actions$: Actions) {}
}
