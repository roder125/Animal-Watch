import { HomePage } from './../../pages/home/home';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthentificationService{

    constructor(private fireAuth: AngularFireAuth, private alerCtrl: AlertController){ }

    /**
   * Methode zum erzeugen einer InfoBox bzw. eines Alerts
   * @param message 
   */
  alert(message: string){
    this.alerCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
    /**
     * Login User mit Email und Passwort
     */
    login(email: string, password: string){
       console.log("das ist der auth Service");
       this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then((data)=>{
            return data;
        })
        .catch((error)=>{
            return error;
        });
    }

}

