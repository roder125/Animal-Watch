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
  userArray = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.animalName = this.navParams.get("animalName");
  }

  /**
   * Öffnet das standart Email Programm und setzt automatisch Empfänger und Betreff
   * @param email 
   */
  mailto(email) {
    //window.open(mailto:${email}, '_system', `subject:${name}`);
    let Link=`mailto:${email}?subject=${this.animalName}`;
    window.open(Link, "_system");
 }

  /**
    * Ruft die angegebene Nummer an
    */
  call(number){
    let Link=`tel:${number}`;
    window.open(Link, "_system");   
  }

   /**
   * Öffnet eine Seite für Google Maps und übergibt die Addresse
   */
  showMaps(){
    var street: string = this.user.user.street + " " + this.user.user.nr;
    var city: string = this.user.user.plz + " " + this.user.user.place;
    
    this.navCtrl.push("GoogleMapsPage", {
      street: street,
      city: city
    })
  }

}
