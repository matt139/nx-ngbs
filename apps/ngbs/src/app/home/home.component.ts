import { Component } from '@angular/core'

@Component({
  selector: 'ngbs-root',
  template: `
    <h1>NGBS</h1>
    <h2>A collection of Angular modules based on Bootstrap</h2>

    <ul>
      <li>
        <a routerLink="/auth"> Auth </a>
        <ul>
          <li>
            <a routerLink="/auth/sign-up">sign up</a>
          </li>
          <li>
            <a routerLink="/auth/log-in">log in</a>
          </li>
        </ul>
      </li>
      <li>
        <a routerLink="/utils">Utils</a>
      </li>
    </ul>
  `,
})
export class HomeComponent {}
