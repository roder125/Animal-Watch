import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { AuthentificationService } from './../../services/authentification/authentification.service';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { HomePage } from "../home/home"

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email;
  password;
  loginUser;
  keepLoggedIn;
  savedEmail;
  savedPassword;
   
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public loadCtrl: LoadingController,
              public navParams: NavParams, private authService: AuthentificationService, private storageService: LocalstorageService) {
  }

  ionViewDidLoad() {
    
  }

  /**
   * Bevor die Seite geladen wird, wir geprüft, ob Login Daten gespeichert wurden
   * Wenn ja, wird automatisch eingeloggt
   */
  ionViewWillEnter() {
    let loader = this.loadCtrl.create({
      content: "anmelden",
    });
    let pEmail = this.storageService.getSavedEmail();
    let pPassword = this.storageService.getSavedPassword();

    Promise.all([pEmail, pPassword])
    .then((data =>{      
      this.savedEmail = data[0];
      console.log(this.savedEmail);
      this.savedPassword = data[1];
      console.log(this.savedPassword);
      return;
    }))
    .then(()=>{
      if(this.savedEmail == "" && this.savedPassword == "" || this.savedEmail == undefined && this.savedPassword == undefined ){
        
      }
      else{
        loader.present()
          .then(()=>{
            // this.authService.login(this.savedEmail, this.savedPassword)
            this.authService.login(this.savedEmail, this.savedPassword)
            .then(currentUser => {
              // Wenn Email noch nicht verifiziert wurde, schlägt der Login fehl
              if(currentUser.emailVerified == false){
                this.alert("Email has not verified yet " + currentUser.email);
                loader.dismiss();
              }
              else{
                loader.dismiss();
                // Bei erfolgreichem einloggen wird der User angezeigt und die neue Seite HomePage angezeigt
                this.navCtrl.setRoot(HomePage);
                // user is logged in
              }
            })
            .catch(error => {
              // Bei fehlerhaftem einloggen wird die error Nachricht angezeigt
              this.alert(error.message)
              loader.dismiss();
            });
          });
      }   
    }) 
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
   * Methode zum einloggen
   * this.fire.auth.signInWithEmailAndPassword() erwartet eine rcihtige Email und Password
   */
  login(){
    this.authService.login(this.email, this.password)
      .then(currentUser => {
        let loader = this.loadCtrl.create({
          content: "anmelden",
        });
        loader.present()
          .then(()=>{
                // Wenn Email noch nicht verifiziert wurde, schlägt der Login fehl
            if(currentUser.emailVerified == false){
              loader.dismiss();
              this.alert("Email has not verified yet " + currentUser.email);
            }
            else{
              // Wenn User eingeloggt bleiben möchte, werden Anmeldedaten im lokalen Speicher gespeichert
              if(this.keepLoggedIn == true){
                this.storageService.saveLocal(this.email, this.password);
              }
              // Bei erfolgreichem einloggen wird der User angezeigt und die neue Seite HomePage angezeigt
              this.navCtrl.setRoot(HomePage);
              loader.dismiss();
              // user is logged in
              }
            })
            .catch(error => {
              // Bei fehlerhaftem einloggen wird die error Nachricht angezeigt
              this.alert(error.message);
              loader.dismiss();
            });
          });      
  }

  /**
   * Öffnet die Register Page
   */
  register() {
  	this.navCtrl.push(RegisterPage);
  }
}

