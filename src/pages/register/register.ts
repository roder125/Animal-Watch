import { AuthentificationService } from './../../services/authentification/authentification.service';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AnimalListService } from '../../services/animal-list/animal-list.service';
import { User } from '../../models/user-interface/user.interface';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public toastCtrl: ToastController,
              public navParams: NavParams, private authService: AuthentificationService, private listService: AnimalListService) {
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
  register(newUser) {
    console.log("user "+ newUser.email);
    this.authService.register(this.user.email.replace(" ", "").toLowerCase(), this.user.password)
    .then (user =>{
      user.sendEmailVerification();
      this.listService.createUser(newUser);
      this.navCtrl.pop();
      this.presentSuccessToast();
    })
    .catch(error =>{
      console.log("error" + error);
      this.presentErrorToast(error);
    });
  }

  /**
   * Zeigt einen Toast bei erfolgreichen Speichern
   */
  presentSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Account erfolgreich erstellt. Bitte bestätigen sie die verifizierungs Email, die sie erhalten werden.',
      duration: 3000
    });
    toast.present();
  }

  /**
   * Zeigt einen Toast bei erfolgreichen Speichern
   */
  presentErrorToast(error) {
    let toast = this.toastCtrl.create({
      message: 'Fehler! Bitte überprüfen Sie Ihre eingaben erneut. ' + error,
      duration: 5000
    });
    toast.present();
  }
}
