import { Component, Input } from '@angular/core'
import { Input$ } from '../decorators/input-props'
import { ReplaySubject } from 'rxjs'

/*
 *
 *
 *
 * add a property `protected readonly props$: ReplaySubject<T>` to a
 * component and expose `@Input() public props: T` to parent components
 *
 * @example
 * ```typescript
 * interface MyComponentProps {
 *   myProperty: string
 * }
 *
 * @Component({})
 * class MyComponent extends ComponentWithProps<MyComponentProps> {
 *   myProperty$ = this.props$(map(props => props.myProperty))
 * }
 *
 * @Component({
 *   template: `<my-component [props]="childProps></my-component>`
 * })
 * class MyParent {
 *   childProps = {myProperty: 'foo'}
 * }
 * ```
 */
@Component({ template: '' })
export class ComponentWithProps<T> {
  @Input()
  @Input$()
  public props!: T
  protected readonly props$!: ReplaySubject<T>
}
