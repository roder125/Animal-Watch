import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { LocalstorageService } from '../services/localstorage/localstorage.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              private auth: AuthentificationService, private storage: LocalstorageService) {

    /**
     * Automatisches Einloggen
     */
    this.storage.getLogginStatus()
      .then(status =>{
        if(status == true){
          this.auth.getAuthenticatedUser().subscribe(auth => {
            !auth ? 
              this.rootPage = "LoginPage" :
              this.rootPage = "TabsPage";
          });
        }
        else{
          this.rootPage = "LoginPage";
        }
      })
      .catch(e =>{
        console.log(e);
      })
    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleBlackTranslucent();
      statusBar.backgroundColorByHexString("#333333");
      console.log("statusbar");
      splashScreen.hide();
    });
  }
}

