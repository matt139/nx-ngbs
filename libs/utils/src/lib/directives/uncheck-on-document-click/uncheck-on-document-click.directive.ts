import { DOCUMENT } from '@angular/common'
import { Directive, ElementRef, Inject } from '@angular/core'
import { flatten } from 'ramda'
import { fromEvent } from 'rxjs'

/*
 * UncheckOnDocumentClickDirective
*
* Attach to input[type="checkbox"] to uncheck whenever another element is clicked. Useful for letting a user "click-off" of an open menu or dialog
 */
@Directive({
  selector: 'input[type="checkbox"][ngbsUncheckOnDocumentClick]',
})
export class UncheckOnDocumentClickDirective {
  constructor(private readonly elementRef: ElementRef<HTMLInputElement>, @Inject(DOCUMENT) private readonly document: Document) {}

  uncheckElement = fromEvent(this.document, 'click').subscribe(event => {
    const children = getChildren(this.elementRef.nativeElement)
    if (!isHTMLElement(event.target)) return
    if (event.target && children.includes(event.target)) return
    this.elementRef.nativeElement.checked = false
  })
}

function getChildren(element: HTMLElement): readonly HTMLElement[] {
  if (!element.children || !element.children.length) return [element]
  return  flatten(Array.from(element.children)).concat(element) as unknown as readonly HTMLElement[]
}

function isHTMLElement(t:any): t is HTMLElement {
  return !!t && 'children' in t
}
