import { AuthentificationService } from './../../services/authentification/authentification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  keepLoggedIn: boolean;
  stayLoggedIn: boolean;
  savedEmail: string;
  savedPassword: string;
  public static storage : Storage;

  constructor(private storage: Storage, private fireAuth: AngularFireAuth,private alertCtrl: AlertController, 
              public navCtrl: NavController, public navParams: NavParams, private authS: AuthentificationService) {             
                LoginPage.storage = storage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }
  /**
   * Wenn Einloggdaten im lokalen Speicher vorhanden sind, wird automatisch mit diesen eingeloggt
   */
  ionViewWillEnter(){
    let pEmail = this.storage.get('email')

    let pPassword = this.storage.get('password')

    Promise.all([pEmail, pPassword])
    .then((data =>{      
      this.savedEmail = data[0];
      console.log(data);
      this.savedPassword = data[1];
      console.log(data);
      return;
    }))
    .then(()=>{
      if(this.savedEmail != "" || this.savedPassword != ""){
        this.authS.login(this.savedEmail, this.savedPassword);
        this.fireAuth.auth.signInWithEmailAndPassword(this.savedEmail, this.savedPassword)
        .then((data)=>{
            var currentUser = this.fireAuth.auth.currentUser;
            if(currentUser.emailVerified == false){
                this.alert("Email wurde noch nicht verifiziert: " + this.fireAuth.auth.currentUser.email);
            }
            else{     
                console.log("Got some Data", data)
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
    });   
  }

  /**
   * Wenn Angemeldet bleiben ausgewählt ist, wird die ingegebene Email und das Passwort in lokalen Storage gespeichert 
   */
  updateCheckbox(){  
    if(this.keepLoggedIn == true){
      console.log(this.keepLoggedIn);
      this.storage.set('email', this.email);
      this.storage.set('password', this.password);
    }
    else{
      this.storage.set('email', "");
      this.storage.set('password', "");
    }
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
   * this.fire.auth.signInWithEmailAndPassword() erwartet eine richtige Email und Passwort
   */
  login(){  
      this.fireAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(data => {
        var currentUser = this.fireAuth.auth.currentUser;
        // Wenn Email noch nicht verifiziert wurde, schlägt der Login fehl
        if(currentUser.emailVerified == false){
          this.alert("Email wurde noch nicht verifiziert: " + this.fireAuth.auth.currentUser.email);
        }
        else{     
          console.log("Got some Data", data)
          // Bei erfolgreichem einloggen wird der User angezeigt und die neue    Seite LoggedIn angezeigt
          this.alert("Hello " + this.fireAuth.auth.currentUser.email);
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
   * Öffnet Register Page
   */
  register(){
    this.navCtrl.push(RegisterPage);
  }

  /**
   * setzt gespeicherte Logindaten zurück, welche sich im lokal Storage befinden
   * @param user 
   */
  public static resetLoginInformation(user: any){
    console.log("auszuloggender User ist: " + user.email);
    LoginPage.storage.set('email', "");
    LoginPage.storage.set('password', "");
  }

}
