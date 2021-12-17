import { Observable } from "rxjs"

export interface ComponentWithActions {
  readonly action$: Observable<unknown>
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

/*
 * Extract action types from component with  @Output() action$
 */
export type ComponentActions<T extends ComponentWithActions> = NonNullable<
  ThenArg<ReturnType<T['action$']['toPromise']>>
>

