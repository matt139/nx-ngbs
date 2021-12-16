import { NgModule } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { StoreModule, Store } from '@ngrx/store'
import { NxModule } from '@nrwl/angular'

import { AuthFacade } from './auth.facade'
import { AUTH_FEATURE_KEY, State, reducer } from './auth.reducer'

interface TestSchema {
  auth: State
}

describe(AuthFacade.name, () => {
  let facade: AuthFacade
  let store: Store<TestSchema>

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(AUTH_FEATURE_KEY, reducer)],
        providers: [AuthFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] })

      store = TestBed.inject(Store)
      facade = TestBed.inject(AuthFacade)
    })

    describe(AuthFacade.prototype.logIn.name, () => {
      it('should exist', () => {
        expect(facade.logIn).toBeTruthy()
        expect(store).toBeTruthy()
      })
    })

    describe(AuthFacade.prototype.signUp.name, () => {
      it('should exist', () => {
        expect(facade.signUp).toBeTruthy()
      })
    })
  })
})
