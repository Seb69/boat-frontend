import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BoatModule } from './boat/boat.module';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BoatModule,
    AuthModule.forRoot({
      // The domain and clientId were configured in the previous chapter
      domain: 'sebastien-andre.eu.auth0.com',
      clientId: 'AiXSBNsS2rl1XXDBjcyZIg8KaCC4Re1n',

      // Request this audience at user authentication time
      audience: 'https://sebastien-andre.eu.auth0.com/api/v2/',

      redirectUri: window.location.origin,

      // Automaticaly add token to matching uri
      httpInterceptor: {
        allowedList: ['/api/*']
      }

    })
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
