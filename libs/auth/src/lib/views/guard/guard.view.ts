import { Location } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  template: `
    <h3>You must be logged in to use this feature</h3>
    <a routerLink="/auth/log-in">Log In</a>
    <a routerLink="/auth/sign-up">Sign Up</a>
    <a (click)="goBack()">Back</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthGuardView {
  constructor(private readonly location: Location) {}

  public goBack() {
    this.location.back()
  }
}
