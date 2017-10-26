import { AuthentificationService } from './../../services/authentification/authentification.service';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email;
  password;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, 
              public navParams: NavParams, private authService: AuthentificationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

   /**
   * Methode zum erzeugen einer InfoBox bzw. eines Alerts
   * @param message 
   */
  alert(message: string){
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  /**
   * Erstellt einen neuen User mit der fire.auth.createUserWithEmailAndPassword Funktion
   * Diese erwartet eine email und ein passwort
   * Außerdem wird eine verifizierungs Email geschickt 
   */
  register() {
    this.authService.register(this.email, this.password)
    .then (user =>{
      user.currentUser.sendEmailVerification();
      this.alert("User is created: " + user.email + "\n" + "A verification Email has ben send to your Email address.");
      this.navCtrl.pop();
    })
    .catch(error =>{
      console.log("Got an Error", error);
      this.alert("User is created " + error);
    });
  }
}
