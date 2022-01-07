import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { RouterModule } from '@angular/router'
import { NgbsUtilsModule } from '@ngbs/utils'
import { NgbsAuthModule } from '@ngbs/auth'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from '../environments/environment'
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store'


/*
 * Firebase throws an error in some browsers in private browsing mode where
 * some forms of local storage are not available.
 *
 * This is expected and does not seem to have significant impacts on
 * functionality
 */
const firebaseConfig = {
  apiKey: 'AIzaSyBeYQrfMVcn6h_YtUzZm5V0Yk0UY1_ZFTI',
  authDomain: 'nx-ngbs.firebaseapp.com',
  projectId: 'nx-ngbs',
  storageBucket: 'nx-ngbs.appspot.com',
  messagingSenderId: '409586410444',
  appId: '1:409586410444:web:e1e7a1c3b75a4a049eb369',
  measurementId: 'G-QD3NFE6D06',
}

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    NgbsUtilsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent,
        },

        // Eager load AuthModule because user is very likely to use it
        // {
        //   path: 'auth',
        //   loadChildren: () => Promise.resolve(AuthModule),
        // },
        //lazy load other modules
        // {
        //   path: 'auth',
        //   loadChildren: () => import('@ngbs/auth').then((m) => m.AuthModule),
        // },
        {
          path: '**',
          redirectTo: '',
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    StoreModule.forRoot({
      router: routerReducer
    }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    NgbsAuthModule,
    StoreRouterConnectingModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
