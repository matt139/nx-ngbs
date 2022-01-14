import { ReplaySubject } from 'rxjs'

/*
 *
 *  Class method decorator to convert an angular @Input() property to an
 *  observable stream that completes on ngOnDestroy. Parent components pass down
 *  inputs just like normal (eg `<my-component [props]="propsFromParent"></my-component>`
 *  or `<my-component [props]="propsStreamFromParent$ |
 *  async"></my-component>`). note that the both the input and observable
 *  properties must be declared on the component
 *  with similar names `props` and `props$`
 *
 * @example
 *
 * ```typescript
 *  class MyComponent {
 *    @Input()
 *    @InputProps$()
 *    public props!: MyComponentProps
 *    private readonly props$!: ReplaySubject<MyComponentProps>
 *
 *    private foo$ = this.props$.pipe(map(props => props.foo))
 *  }
 *  ```
 *
 */
export function InputProps() {
  return (target: object, propName: string): void => {
    const props$ = new ReplaySubject<unknown>(1)
    const propName$ = propName + '$'

    Object.defineProperty(target, propName, {
      set: (value) => {
        props$.next(value)
      },
    })
    const oldOnDestroyFn = (target as { ngOnDestroy: Function }).ngOnDestroy
    const newOnDestroyFn = () => {
      props$.complete()
      oldOnDestroyFn && oldOnDestroyFn()
    }
    Object.assign(target, { [propName$]: props$, ngOnDestroy: newOnDestroyFn })
  }
}
