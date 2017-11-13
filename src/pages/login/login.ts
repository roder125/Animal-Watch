import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { AuthentificationService } from './../../services/authentification/authentification.service';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
   
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, 
              public navParams: NavParams, private authService: AuthentificationService, private storageService: LocalstorageService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * Bevor die Seite geladen wird, wir geprüft, ob Login Daten gespeichert wurden
   * Wenn ja, wird automatisch eingeloggt
   */
  ionViewWillEnter() {
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
      if(this.savedEmail != "" && this.savedPassword != ""){
        this.authService.login(this.savedEmail, this.savedPassword)
        .then(currentUser => {
          console.log(currentUser);
          // Wenn Email noch nicht verifiziert wurde, schlägt der Login fehl
          if(currentUser.emailVerified == false){
            this.alert("Email has not verified yet " + currentUser.email);
          }
          else{
            console.log("Got some Data", currentUser)
            // Wenn User eingeloggt bleiben möchte, werden Anmeldedaten im lokalen Speicher gespeichert
            if(this.keepLoggedIn == true){
              console.log("Eingaben gespeichert " + this.email, this.password);
              this.storageService.saveLocal(this.email, this.password);
            }
            // Bei erfolgreichem einloggen wird der User angezeigt und die neue Seite HomePage angezeigt
            this.navCtrl.setRoot(HomePage);
            // user is logged in
          }
        })
        .catch(error => {
          console.log("Got an error", error)
          // Bei fehlerhaftem einloggen wird die error Nachricht angezeigt
          this.alert(error.message)
        });
      }
      else{
        //Mache nichts
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
      console.log(currentUser);
      // Wenn Email noch nicht verifiziert wurde, schlägt der Login fehl
      if(currentUser.emailVerified == false){
        this.alert("Email has not verified yet " + currentUser.email);
      }
      else{
        console.log("Got some Data", currentUser)
        // Wenn User eingeloggt bleiben möchte, werden Anmeldedaten im lokalen Speicher gespeichert
        if(this.keepLoggedIn == true){
          console.log("Eingaben gespeichert " + this.email, this.password);
          this.storageService.saveLocal(this.email, this.password);
        }
        // Bei erfolgreichem einloggen wird der User angezeigt und die neue Seite HomePage angezeigt
        this.navCtrl.setRoot(HomePage);
        // user is logged in
        }
      })
      .catch(error => {
        console.log("Got an error", error)
        // Bei fehlerhaftem einloggen wird die error Nachricht angezeigt
        this.alert(error.message)
      });
  }

  /**
   * Öffnet die Register Page
   */
  register() {
  	this.navCtrl.push(RegisterPage);
  }
}

