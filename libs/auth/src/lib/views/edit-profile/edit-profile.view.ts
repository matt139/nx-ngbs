import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `
  <h1> edit profile </h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgbsAuthEditProfileView {
}

