
import { CameraSerive } from './../services/camera/camera.service';
import { LocalstorageService } from './../services/localstorage/localstorage.service';
import { AuthentificationService } from './../services/authentification/authentification.service';
import { AnimalListService } from './../services/animal-list/animal-list.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { AddAnimalPage } from '../pages/add-animal/add-animal';


export const environment = {
  firebase: {
    apiKey: "AIzaSyAgPVP5tBexT-vXfeQDJIvdbn14e8HiCEQ",
    authDomain: "animal-watch.firebaseapp.com",
    databaseURL: "https://animal-watch.firebaseio.com",
    projectId: "animal-watch",
    storageBucket: "animal-watch.appspot.com",
    messagingSenderId: "740888176510"
  }  
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    AddAnimalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    AddAnimalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    AnimalListService,
    AuthentificationService,
    LocalstorageService,
    CameraSerive,
    Camera
  ]
})
export class AppModule {}
