import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `
  <h1> view profile </h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgbsAuthViewProfileView {
}
