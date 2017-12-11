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
    if(newUser.email == undefined || newUser.email == "" || newUser.password == undefined || newUser.password == "" || newUser.lastName == undefined || newUser.lastName == "" || newUser.name == undefined || newUser.name == ""){
      this.presentErrorToast("Alle Felder mit einem ' * ' müssen befüllt werden.");
    }
    else{
      this.authService.register(this.user.email.replace(" ", "").toLowerCase(), this.user.password)
      .then (user =>{
        user.sendEmailVerification();
        let uId = this.authService.getUserId();
        this.listService.createUser(newUser, uId);
        this.navCtrl.pop();
        this.presentSuccessToast();
      })
      .catch(error =>{
        console.log("error" + error);
        this.presentErrorToast(error);
      });
    }
  }

  /**
   * Zeigt einen Toast bei erfolgreichen Speichern
   */
  presentSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Account erfolgreich erstellt. Bitte bestätigen sie die verifizierungs Email, die sie erhalten haben.',
      duration: 3000
    });
    toast.present();
  }

  /**
   * Zeigt einen Toast bei erfolgreichen Speichern
   */
  presentErrorToast(error) {
    let toast = this.toastCtrl.create({
      message: error,
      duration: 5000
    });
    toast.present();
  }
}
