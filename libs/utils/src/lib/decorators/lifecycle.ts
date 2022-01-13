import { ReplaySubject } from 'rxjs'

/**
 *
 * Lifecycle Decorators
 * Convenience decorators for handling angular lifecycle hooks as Observable
 * events instead of component method calls
 *
 */

/**
 *
 * @example
 * ```typescript
 * @NgOnInit$()
 * private readonly ngOnInit$!: ReplaySubject<void>
   test$ = this.ngOnInit$.subscribe(() => console.log('component.test$'))

   ngOnInit() {
     console.log('old ngOnInit still works')
  }
 * ```
 *
 */
export function NgOnInit$() {
  return (target: { ngOnInit: Function }, propName: string): void => {
    const ngOnInit$ = new ReplaySubject<void>(1)

    const oldInitFn = target.ngOnInit
    const newInitFn = () => {
      ngOnInit$.next()
      ngOnInit$.complete()
      oldInitFn && oldInitFn()
    }
    Object.assign(target, { [propName]: ngOnInit$, ngOnInit: newInitFn })
  }
}

export function NgOnDoCheck$() {
  return (target: object, propName: string): void => {
    const ngOnDoCheck$ = new ReplaySubject<void>(1)
    const oldOnDoCheckFn = (target as { ngOnDoCheck: Function }).ngOnDoCheck
    const newDoCheckFn = () => {
      ngOnDoCheck$.next()
      oldOnDoCheckFn && oldOnDoCheckFn()
    }
    const oldDestroyFn = (target as { ngOnDestroy: Function }).ngOnDestroy
    const newDestroyFn = () => {
      ngOnDoCheck$.complete()
      oldDestroyFn && oldDestroyFn()
    }
    Object.assign(target, {
      [propName]: ngOnDoCheck$,
      ngOnDoCheck: newDoCheckFn,
      ngOnDestroy: newDestroyFn,
    })
  }
}

export function NgAfterContentInit$() {
  return (target: { ngAfterContentInit: Function }, propName: string): void => {
    const ngAfterContentInit$ = new ReplaySubject<void>(1)

    const oldInitFn = target.ngAfterContentInit
    const newInitFn = () => {
      ngAfterContentInit$.next()
      ngAfterContentInit$.complete()
      oldInitFn && oldInitFn()
    }
    Object.assign(target, {
      [propName]: ngAfterContentInit$,
      ngOnInit: newInitFn,
    })
  }
}

export function NgAfterContentChecked$() {
  return (target: object, propName: string): void => {
    const ngAfterContentChecked$ = new ReplaySubject<void>(1)
    const oldAfterContentCheckedFn = (
      target as { ngAfterContentChecked: Function }
    ).ngAfterContentChecked
    const newDoCheckFn = () => {
      ngAfterContentChecked$.next()
      oldAfterContentCheckedFn && oldAfterContentCheckedFn()
    }
    const oldDestroyFn = (target as { ngOnDestroy: Function }).ngOnDestroy
    const newDestroyFn = () => {
      ngAfterContentChecked$.complete()
      oldDestroyFn && oldDestroyFn()
    }
    Object.assign(target, {
      [propName]: ngAfterContentChecked$,
      ngAfterContentChecked: newDoCheckFn,
      ngOnDestroy: newDestroyFn,
    })
  }
}

export function NgAfterViewInit$() {
  return (target: { ngAfterViewInit: Function }, propName: string): void => {
    const ngAfterViewInit$ = new ReplaySubject<void>(1)

    const oldInitFn = target.ngAfterViewInit
    const newInitFn = () => {
      ngAfterViewInit$.next()
      ngAfterViewInit$.complete()
      oldInitFn && oldInitFn()
    }
    Object.assign(target, { [propName]: ngAfterViewInit$, ngOnInit: newInitFn })
  }
}

export function NgAfterViewChecked$() {
  return (target: object, propName: string): void => {
    const ngAfterViewChecked$ = new ReplaySubject<void>(1)
    const oldAfterViewCheckedFn = (target as { ngAfterViewChecked: Function })
      .ngAfterViewChecked
    const newDoCheckFn = () => {
      ngAfterViewChecked$.next()
      oldAfterViewCheckedFn && oldAfterViewCheckedFn()
    }
    const oldDestroyFn = (target as { ngOnDestroy: Function }).ngOnDestroy
    const newDestroyFn = () => {
      ngAfterViewChecked$.complete()
      oldDestroyFn && oldDestroyFn()
    }
    Object.assign(target, {
      [propName]: ngAfterViewChecked$,
      ngAfterViewChecked: newDoCheckFn,
      ngOnDestroy: newDestroyFn,
    })
  }
}

export function NgOnDestroy$() {
  return (target: { ngOnDestroy: Function }, propName: string): void => {
    const ngOnDestroy$ = new ReplaySubject<void>(1)

    const oldDestroyFn = target.ngOnDestroy
    const newDestroyFn = () => {
      ngOnDestroy$.next()
      ngOnDestroy$.complete()
      oldDestroyFn && oldDestroyFn()
    }
    Object.assign(target, {
      [propName]: ngOnDestroy$,
      ngOnDestroy: newDestroyFn,
    })
  }
}

/*
 * CompleteOnDestroy$()
 * ```typescript
 * @CompleteOnDestroy$()
 * a!: ReplaySubject<void>
 * test = this.a.subscribe({ complete: () => console.log('complete') })
 *
 * ngOnDestroy() {
 *   console.log('old destroy')
 * }
 * ```
 */

export function CompleteOnDestroy$() {
  return (target: object, propName: string): void => {
    const subject = new ReplaySubject<unknown>(1)
    const oldDestroyFn = (target as { ngOnDestroy: Function }).ngOnDestroy
    const newDestroyFn = () => {
      subject.complete()
      oldDestroyFn && oldDestroyFn()
    }
    Object.assign(target, { ngOnDestroy: newDestroyFn, [propName]: subject })
  }
}
