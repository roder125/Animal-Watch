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
  breed: string;
  showPos;
  hidePos;
  showU;
  hideU;

  constructor(public navCtrl: NavController, public navParams: NavParams, public listService: AnimalListService) {
    this.animal = this.navParams.get("animal");
    this.showPos= false;
    this.hidePos= true;
    this.showU= false;
    this.hideU= true;
  }

  ionViewDidLoad() {
    this.fillUserArray();
    this.showBreed();
  }

  /**
   * Holt sich die User Details aus der Datenbank
   */
  fillUserArray(){
    let uId = this.animal.uId;
    this.listService.getUserListRef().orderByChild("uId").equalTo(uId).on("child_added", snapshot => {  
      this.saveArray.push(snapshot);
      this.user = this.saveArray.slice().reverse().map( c => ({
        key: c.key, ... c.val()
      }));
    });
  }

  /**
   * Öffnet die UserDetailsPage und übergibt einen user
   * @param user 
   */
  showUserDetails(user, name){
    this.navCtrl.push(UserDetailsPage, {user: user, animalName: name});
  }

  /**
   * Zeigt die Rassen mit Leerzeichen und Komma getrennt
   */
  showBreed(){
    this.breed = this.animal.breed.toString();
    this.breed.replace(",", ", ");
    console.log(this.breed.replace(",", ", "));
  }

  /**
   * Zeigt Positions Details an
   */
  showPosition(){
    this.hidePos = false;
    this.showPos = true;
  }

  /**
   * Verbirgt Pos Details
   */
  hidePosition(){
    this.hidePos = true;
    this.showPos = false;
  }

  showUser(){
    this.hideU = false;
    this.showU = true;
  }
  hideUser(){
    this.hideU = true;
    this.showU = false;
  }
}
