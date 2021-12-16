import { AuthPartialState, initialState } from './auth.reducer'
import * as AuthSelectors from './auth.selectors'

describe('Auth Selectors', () => {
  let state: AuthPartialState

  beforeEach(() => {
    state = {
      auth: {
        ...initialState,
      },
    }
  })

  describe('Auth Selectors', () => {
    describe(AuthSelectors.getAuthState.name, () => {
      it('should exist', () => {
        expect(AuthSelectors.getAuthState(state)).toBeTruthy()
      })
    })
  })
})
