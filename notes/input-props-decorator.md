Wrapping angular input properties in observable streams requires some boilerplate code

```typescript
@Component({
  template: '{{foo}} - {{bar}}',
})
class MyComponent {
  private readonly props$ = new ReplaySubject<MyComponentProps>(1)
  @Input()
  set props(props: MyComponentProps) {
    this.props$.next(props)
  }
}
```

We can create a decorator `@Input$()` to supplement the native `@Input()` from `@angular/core`.

```typescript
export function Input$() {
  return (target: object, propName: string): void => {
    const prop$ = new ReplaySubject<unknown>(1)
    const propName$ = propName + '$'

    Object.defineProperty(target, propName, {
      set: (value) => {
        prop$.next(value)
      },
    })
    const oldOnDestroyFn = (target as { ngOnDestroy: Function }).ngOnDestroy
    const newOnDestroyFn = () => {
      prop$.complete()
      oldOnDestroyFn && oldOnDestroyFn()
    }
    Object.assign(target, { [propName$]: prop$, ngOnDestroy: newOnDestroyFn })
  }
}
```

Use the decorator in a component like so. We only need to declare the types for
`props` and `props$` and the decorator handle the rest. We can declare `props$`
as an `Observable` so that TypeScript prohibits us from calling `.next()` from
inside our component since that wouldn't make sense for our input stream.

```typescript
class MyComponent {
  @Input()
  @Input$()
  public props!: MyComponentProps
  private readonly prop$!: Observable<MyComponentProps>

  // pluck a property from our `props$`
  private foo$ = this.prop$.pipe(map((props) => props.foo))
}
```
