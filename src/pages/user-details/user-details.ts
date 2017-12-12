import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  user;
  animalName;
  company: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.animalName = this.navParams.get("animalName");
  }

  ionViewDidLoad() {
    
  }

  /**
   * Öffnet das standart Email Programm und setzt automatisch Empfänger und Betreff
   * @param email 
   */
  mailto(email) {
    //window.open(mailto:${email}, '_system', `subject:${name}`);
    let Link=`mailto:${email}?subject=${this.animalName}`;
    window.open(Link, "_system");
    console.log(Link);
 }

  /**
    * Ruft die angegebene Nummer an
    */
  call(number){
    let Link=`tel:${number}`;
    window.open(Link, "_system");
    console.log(Link);    
  }

  }
