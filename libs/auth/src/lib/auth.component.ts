import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AuthView {
  constructor(private readonly router: Router) {
  }
}
