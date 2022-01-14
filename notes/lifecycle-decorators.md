In Angular it is often convenient to treat component lifecycle events os
observable streams instead of component methods (they are events, after all).

in order to accomplish this, we often find outselves doing something like

```typescript
export class MyComponent implements OnInit {
  private readonly ngOnInit$ = new ReplaySubject<void>(1)

  public ngOnInit(): void {
    this.ngOnInit$.next()
    this.ngOnInit$.complete()
  }
}
```

We can create a custom decorator to shorten this to

```typescript
export class MyComponent {
  @NgOnInit$()
  private readonly ngOnInit$!: ReplaySubject<void>
}
```

note that we use the `!` operator to signal to typescript that the `ngOnInit$`
property will be defined later in the decorator.

---

The decorator implementation is fairly straightforward

```typescript
export function NgOnInit$() {
  return (target: object, propName: string): void => {
    const ngOnInit$ = new ReplaySubject<void>(1)

    const oldInitFn = (target as { ngOnInit: Function }).ngOnInit
    const newInitFn = () => {
      ngOnInit$.next()
      ngOnInit$.complete()
      oldInitFn && oldInitFn()
    }
    Object.assign(target, { [propName]: ngOnInit$, ngOnInit: newInitFn })
  }
}
```

If there is an existing `ngOnInit` method, it is called so that any existing
functionality is unaffected.

```typescript
export class MyComponent {
  private readonly ngOnInit$!: ReplaySubject<void>
   test$ = this.ngOnInit$.subscribe(() => console.log('component.test$'))

   public ngOnInit: void() {
     console.log('old ngOnInit still works')
  }
}
```
See:
 - https://github.com/matt139/nx-ngbs/blob/master/libs/utils/src/lib/decorators/lifecycle.ts
