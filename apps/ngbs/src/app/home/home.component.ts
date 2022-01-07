import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component } from '@angular/core'

@Component({
  selector: 'ngbs-root',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
