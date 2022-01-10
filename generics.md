Say we have a bunch of components that emit a stream of ngrx actions

```typescript
class MyComponent {
  @Output()
  public readonly action$: Observable<Action>
}
```

Each component emits its own specific actions. Instead of the generic `Action`,
we want to expose a union of the actions the component emits, such as

```typescript
class LogInComponent {
  @Output()
  public readonly action$: Observable<LogInComponentAction> = merge(
    of(logInFormSubmit({ formValues })),
    of(buttonClickSignUp())
  )
}

export const logInFormSubmit = createAction(
  'Log In Form Submit',
  props<{ formValues }>()
)

export const buttonClickSignUp = createAction('Sign Up Button Clicked')

export type LogInComponentAction =
  | ReturnType<typeof logInFormSubmit>
  | ReturnType<typeof buttonClickSignUp>
```

We want to be able to specify the more narrow type `LogInComponentAction` to
consumers, but maintining this type by hand is tedious and error prone. Instead
we can let typescript infer the types and export a type based on this
inferrence. if we know we are going to be folling the convention `@Output() action$...`,
we can create a generic type as follows

```typescript
/*
 * ComponentActions
 * Extract action types from component with  @Output() action$
 */
export type ComponentActions<T extends ComponentWithActions> = NonNullable<
  ThenArg<ReturnType<T['action$']['toPromise']>>
>
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
interface ComponentWithActions {
  readonly action$: Observable<unknown>
}
```

Then we can implement this type in our component as follows

```typescript
class LogInComponent {
  // note that we no longer manually specify a type and instead let typescript infer it
  @Output()
  public readonly action$ = merge(
    of(logInFormSubmit({ formValues })),
    of(buttonClickSignUp())
  )
}

export const logInFormSubmit = createAction(
  'Log In Form Submit',
  props<{ formValues }>()
)

export const buttonClickSignUp = createAction('Sign Up Button Clicked')

export type LogInComponentAction =
  ComponentActions<LogInComponent>
```

This allows us to specify the `LogInComponentAction` type to consuming components

```typescript
@Component({
  template: `
  <log-in-form (action$)="action$.next($event)"></log-in-form>
  <sign-up-form (action$)="action$.next($event)"></sign-up-form>
  `
})
export class AuthView implements OnDestroy {
  public readonly action$ = new Subject<AuthViewAction>()
}
export type AuthViewAction = LogInComponentAction | SignUpComponentAction
```

This allows us to effortlessly maintain very strong typing through our component
heirarchy througn an unbroken stream of `Action`s from the instigating user
interactions up through a route-level view or "Smart" component where it can be
dispatched and handled by the application.

See:
 - https://github.com/matt139/nx-ngbs/blob/master/libs/utils/src/lib/types/component-actions.ts
 - https://github.com/matt139/nx-ngbs/blob/master/libs/auth/src/lib/components/sign-up-form/sign-up-form.component.ts
