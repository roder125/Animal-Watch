import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-my-entrys',
  templateUrl: 'my-entrys.html',
})
export class MyEntrysPage {

  myEntrysArray = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myEntrysArray = this.navParams.get("myEntryArray");
    console.log(this.myEntrysArray);
  }

  ionViewDidLoad() {

  }

  /**
   * Zeigt die Details der eigenen Einträge
   * @param animal 
   */
  showMyEntryDetails(animal){
    this.navCtrl.push("MyEntryDetailsPage",{animal: animal});
  }
}
