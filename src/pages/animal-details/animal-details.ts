import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-animal-details',
  templateUrl: 'animal-details.html',
})
export class AnimalDetailsPage {

  animal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.animal = this.navParams.get("animal");
  }

  ionViewDidLoad() {

  }
}
