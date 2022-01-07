import { NgModule } from "@angular/core";
import { NgbsAuthLogInFormComponent } from "./log-in-form.component";

export * from "./log-in-form.component";
export * from './log-in.form'

@NgModule({
  declarations: [NgbsAuthLogInFormComponent],
  exports: [NgbsAuthLogInFormComponent]
})
export class NgbsLogInFormModule {}
