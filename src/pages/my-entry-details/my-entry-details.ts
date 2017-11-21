import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-my-entry-details',
  templateUrl: 'my-entry-details.html',
})
export class MyEntryDetailsPage {

  animal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.animal = this.navParams.get("animal");
  }

  ionViewDidLoad() {

  }

}
