import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { UserDataProvider } from '../providers/user-data/user-data';
import { RequestProvider } from '../providers/request/request';
import { MapsProvider } from '../providers/maps/maps';
import { StatusProvider } from '../providers/status/status'

@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserDataProvider,
    RequestProvider,
    MapsProvider,
    StatusProvider,
    Geolocation
  ]
})
export class AppModule {}
