import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';
import { combineLatest, fromEvent, of, ReplaySubject } from 'rxjs';

/**
 * Allow users to customize themes by selecting a stylesheet and update link in <head>
 */

@Directive({
  selector: 'select[ngbsSelectStylesheet]',
})
export class SelectStylesheetDirective implements AfterViewInit {
  private readonly ngAfterViewInit$ = new ReplaySubject<void>(1);

  private readonly linkElement = this.renderer.createElement('link');

  constructor(
    private readonly elementRef: ElementRef<HTMLSelectElement>,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  private readonly options$ = of(
    stylesheets.map((stylesheet) => {
      const option = this.renderer.createElement('option');
      option.value = stylesheet.value;
      option.innerText = stylesheet.key;
      return option;
    })
  );

  private readonly setOptions = combineLatest(
    this.options$,
    this.ngAfterViewInit$
  ).subscribe(([options]) =>
    options.forEach((option) =>
      this.elementRef.nativeElement.appendChild(option)
    )
  );

  private readonly initLinkElement = this.ngAfterViewInit$.subscribe(() => {
    const head = this.document.head;
    this.renderer.setAttribute(this.linkElement, 'rel', 'stylesheet');
    this.renderer.appendChild(head, this.linkElement);
  });

  private readonly updateStylesheet = fromEvent(
    this.elementRef.nativeElement,
    'change'
  ).subscribe(() => {
    this.setLinkElement(this.elementRef.nativeElement.value);
  });

  private setLinkElement(href: string = stylesheets[0].value) {
    this.renderer.setAttribute(this.linkElement, 'href', href);
  }

  public ngAfterViewInit() {
    this.ngAfterViewInit$.next();
    this.ngAfterViewInit$.complete();
  }
}

const stylesheets = [
  {
    value:
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    key: 'Bootstrap',
  },
  {
    value: 'https://bootswatch.com/5/cerulean/bootstrap.css',
    key: 'cerulean',
  },
  {
    value: 'https://bootswatch.com/5/cosmo/bootstrap.css',
    key: 'cosmo',
  },
  {
    value: 'https://bootswatch.com/5/cyborg/bootstrap.css',
    key: 'cyborg',
  },
  {
    value: 'https://bootswatch.com/5/darkly/bootstrap.css',
    key: 'darkly',
  },
  {
    value: 'https://bootswatch.com/5/flatly/bootstrap.css',
    key: 'flatly',
  },
  {
    value: 'https://bootswatch.com/5/journal/bootstrap.css',
    key: 'journal',
  },
  {
    value: 'https://bootswatch.com/5/litera/bootstrap.css',
    key: 'litera',
  },
  {
    value: 'https://bootswatch.com/5/lumen/bootstrap.css',
    key: 'lumen',
  },
  {
    value: 'https://bootswatch.com/5/lux/bootstrap.css',
    key: 'lux',
  },
  {
    value: 'https://bootswatch.com/5/materia/bootstrap.css',
    key: 'materia',
  },
  {
    value: 'https://bootswatch.com/5/minty/bootstrap.css',
    key: 'minty',
  },
  {
    value: 'https://bootswatch.com/5/morph/bootstrap.css',
    key: 'morph',
  },
  {
    value: 'https://bootswatch.com/5/pulse/bootstrap.css',
    key: 'pulse',
  },
  {
    value: 'https://bootswatch.com/5/quartz/bootstrap.css',
    key: 'quartz',
  },
  {
    value: 'https://bootswatch.com/5/sandstone/bootstrap.css',
    key: 'sandstone',
  },
  {
    value: 'https://bootswatch.com/5/simplex/bootstrap.css',
    key: 'simplex',
  },
  {
    value: 'https://bootswatch.com/5/sketchy/bootstrap.css',
    key: 'sketchy',
  },
  {
    value: 'https://bootswatch.com/5/slate/bootstrap.css',
    key: 'slate',
  },
  {
    value: 'https://bootswatch.com/5/solar/bootstrap.css',
    key: 'solar',
  },
  {
    value: 'https://bootswatch.com/5/spacelab/bootstrap.css',
    key: 'spacelab',
  },
  {
    value: 'https://bootswatch.com/5/superhero/bootstrap.css',
    key: 'superhero',
  },
  {
    value: 'https://bootswatch.com/5/united/bootstrap.css',
    key: 'united',
  },
  {
    value: 'https://bootswatch.com/5/vapor/bootstrap.css',
    key: 'vapor',
  },
  {
    value: 'https://bootswatch.com/5/yeti/bootstrap.css',
    key: 'yeti',
  },
  {
    value: 'https://bootswatch.com/5/zephyr/bootstrap.css',
    key: 'zephyr',
  },
];
