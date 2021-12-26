import { Observable } from "rxjs"

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
