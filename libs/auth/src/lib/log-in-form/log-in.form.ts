import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LogInForm extends FormGroup {
  constructor() {
    super({
      emailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}

export interface LogInFormValues {
  emailAddress: string;
  password: string;
}
