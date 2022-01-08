import { FormControl, FormGroup } from '@angular/forms'

export class UpdateEmailForm extends FormGroup {
  constructor(init: { displayName?: string } = {}) {
    super({
      displayName: new FormControl(init.displayName),
    })
  }
}
