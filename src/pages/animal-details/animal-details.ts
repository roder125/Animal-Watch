import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDetailsPage } from '../user-details/user-details';


@IonicPage()
@Component({
  selector: 'page-animal-details',
  templateUrl: 'animal-details.html',
})
export class AnimalDetailsPage {

  animal: any;
  saveArray =[];
  user = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public listService: AnimalListService) {
    this.animal = this.navParams.get("animal");
  }

  ionViewDidLoad() {
    this.showUser();
  }

  showUser(){
    let uId = this.animal.uId;
    this.listService.getUserListRef().orderByChild("uId").equalTo(uId).on("child_added", snapshot => {  
      this.saveArray.push(snapshot);
      console.log(snapshot.val());
      this.user = this.saveArray.slice().reverse().map( c => ({
        key: c.key, ... c.val()
      }));
    });
  }

  showUserDetails(user){
    this.navCtrl.push(UserDetailsPage, {user: user});
  }
}
