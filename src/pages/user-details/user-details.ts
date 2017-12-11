import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  user;
  company: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
  }

  ionViewDidLoad() {
    
  }

  mailto(email) {
    window.open(`mailto:${email}`, '_system');
 }

}
