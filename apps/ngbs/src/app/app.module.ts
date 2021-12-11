import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '@ngbs/utils';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    UtilsModule,
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'auth',
          loadChildren: () => import('@ngbs/auth').then((m) => m.AuthModule),
        },
        {
          path: '*',
          redirectTo: ''
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
