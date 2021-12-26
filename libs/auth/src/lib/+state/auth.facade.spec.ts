import { NgModule } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { StoreModule, Store } from '@ngrx/store'
import { NxModule } from '@nrwl/angular'

import { NgbsAuthFacade } from './auth.facade'
import { AUTH_FEATURE_KEY, State, reducer } from './auth.reducer'

interface TestSchema {
  auth: State
}

describe(NgbsAuthFacade.name, () => {
  let facade: NgbsAuthFacade
  let store: Store<TestSchema>

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(AUTH_FEATURE_KEY, reducer)],
        providers: [NgbsAuthFacade],
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
      facade = TestBed.inject(NgbsAuthFacade)
    })

    describe(NgbsAuthFacade.prototype.logIn.name, () => {
      it('should exist', () => {
        expect(facade.logIn).toBeTruthy()
        expect(store).toBeTruthy()
      })
    })

    describe(NgbsAuthFacade.prototype.signUp.name, () => {
      it('should exist', () => {
        expect(facade.signUp).toBeTruthy()
      })
    })
  })
})
