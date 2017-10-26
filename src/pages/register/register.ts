import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email: string;
  password: string;

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
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
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then (data =>{
      this.fire.auth.currentUser.sendEmailVerification();
      this.alert("User is created: " + data.email + "\n" + "A verification Email has ben send to your Email address.");
      this.navCtrl.pop();
    })
    .catch(error =>{
      console.log("Got an Error", error);
      this.alert("User is created " + error);
    });
  }

}
