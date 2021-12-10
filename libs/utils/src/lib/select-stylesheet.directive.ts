import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';
import { combineLatest, fromEvent, of, ReplaySubject } from 'rxjs';

const LINK_ID = 'link-ngbs-select-stylesheet';

/**
 * Allow users to customize themes by selecting a stylesheet and update link in <head>
 */

@Directive({
  selector: 'select[ngbsSelectStylesheet]',
})
export class SelectStylesheetDirective implements AfterViewInit {
  private readonly ngAfterViewInit$ = new ReplaySubject<void>(1);

  private readonly linkElement =
    this.document.querySelector(`#${LINK_ID}`) ||
    this.renderer.createElement('link');

  constructor(
    private readonly elementRef: ElementRef<HTMLSelectElement>,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  private readonly options$ = of(
    stylesheets.map((stylesheet) => {
      const option = this.renderer.createElement('option');
      option.value = stylesheet.url;
      option.innerText = stylesheet.name;
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
    this.renderer.setAttribute(this.linkElement, 'id', LINK_ID);
    this.renderer.setAttribute(this.linkElement, 'rel', 'stylesheet');
    const existingLinkElement = this.document.querySelector(`#${LINK_ID}`);
    if (existingLinkElement) {
      this.elementRef.nativeElement.value =
        existingLinkElement.getAttribute('href')?.valueOf() || defaultUrl;
    } else {
      const head = this.document.head;
      this.renderer.appendChild(head, this.linkElement);
    }
  });

  private readonly updateStylesheet = fromEvent(
    this.elementRef.nativeElement,
    'change'
  ).subscribe(() => {
    this.setLinkElement(this.elementRef.nativeElement.value);

  });

  private setLinkElement(href: string = defaultUrl) {
    this.renderer.setAttribute(this.linkElement, 'href', href);
  }

  public ngAfterViewInit() {
    this.ngAfterViewInit$.next();
    this.ngAfterViewInit$.complete();
  }
}

const stylesheets = [
  {
    url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    name: 'Bootstrap',
  },
  {
    url: 'https://bootswatch.com/5/cerulean/bootstrap.css',
    name: 'cerulean',
  },
  {
    url: 'https://bootswatch.com/5/cosmo/bootstrap.css',
    name: 'cosmo',
  },
  {
    url: 'https://bootswatch.com/5/cyborg/bootstrap.css',
    name: 'cyborg',
  },
  {
    url: 'https://bootswatch.com/5/darkly/bootstrap.css',
    name: 'darkly',
  },
  {
    url: 'https://bootswatch.com/5/flatly/bootstrap.css',
    name: 'flatly',
  },
  {
    url: 'https://bootswatch.com/5/journal/bootstrap.css',
    name: 'journal',
  },
  {
    url: 'https://bootswatch.com/5/litera/bootstrap.css',
    name: 'litera',
  },
  {
    url: 'https://bootswatch.com/5/lumen/bootstrap.css',
    name: 'lumen',
  },
  {
    url: 'https://bootswatch.com/5/lux/bootstrap.css',
    name: 'lux',
  },
  {
    url: 'https://bootswatch.com/5/materia/bootstrap.css',
    name: 'materia',
  },
  {
    url: 'https://bootswatch.com/5/minty/bootstrap.css',
    name: 'minty',
  },
  {
    url: 'https://bootswatch.com/5/morph/bootstrap.css',
    name: 'morph',
  },
  {
    url: 'https://bootswatch.com/5/pulse/bootstrap.css',
    name: 'pulse',
  },
  {
    url: 'https://bootswatch.com/5/quartz/bootstrap.css',
    name: 'quartz',
  },
  {
    url: 'https://bootswatch.com/5/sandstone/bootstrap.css',
    name: 'sandstone',
  },
  {
    url: 'https://bootswatch.com/5/simplex/bootstrap.css',
    name: 'simplex',
  },
  {
    url: 'https://bootswatch.com/5/sketchy/bootstrap.css',
    name: 'sketchy',
  },
  {
    url: 'https://bootswatch.com/5/slate/bootstrap.css',
    name: 'slate',
  },
  {
    url: 'https://bootswatch.com/5/solar/bootstrap.css',
    name: 'solar',
  },
  {
    url: 'https://bootswatch.com/5/spacelab/bootstrap.css',
    name: 'spacelab',
  },
  {
    url: 'https://bootswatch.com/5/superhero/bootstrap.css',
    name: 'superhero',
  },
  {
    url: 'https://bootswatch.com/5/united/bootstrap.css',
    name: 'united',
  },
  {
    url: 'https://bootswatch.com/5/vapor/bootstrap.css',
    name: 'vapor',
  },
  {
    url: 'https://bootswatch.com/5/yeti/bootstrap.css',
    name: 'yeti',
  },
  {
    url: 'https://bootswatch.com/5/zephyr/bootstrap.css',
    name: 'zephyr',
  },
];

const defaultUrl = stylesheets[0].url;
