import { Location } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  template: `
    <h3>You must be logged in to use this feature</h3>
    <a routerLink="/auth/log-in" class="d-block">Log In</a>
    <a routerLink="/auth/sign-up" class="d-block">Sign Up</a>
    <a (click)="goBack()" class="d-block">Back</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthGuardView {
  constructor(private readonly location: Location) {}

  public goBack() {
    this.location.back()
  }
}
