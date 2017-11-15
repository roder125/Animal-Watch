import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  resultArray = [];
  speciesTag = this.navParams.get("speciesTag");
  animalSpecies = this.navParams.get("aninmalSpecies");
 
  breedTag = this.navParams.get("breedTag");
  animalBreed = this.navParams.get("animalBreed");

  nameTag = this.navParams.get("nameTag");
  animalName = this.navParams.get("animalName");

  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: AnimalListService) {
    this.showResultList();
  }

  ionViewDidLoad() {

  }

  /**
   * Ergebis der Suche werden in Array gespeichert und ausgegeben
   */
  showResultList(){
    // es wird nach der Tierart und Rasse gesucht
    if(this.animalSpecies != undefined && this.animalBreed != undefined){
      this.listService.getListRef().orderByChild("species").equalTo(this.animalSpecies).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        this.resultArray.push(val);
      });
      this.listService.getListRef().orderByChild("breed").equalTo(this.animalBreed).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        this.resultArray.push(val);
      });
    }
    // es wird nur nach Tierart gesucht
    if(this.animalSpecies != undefined){
      this.listService.getListRef().orderByChild("species").equalTo(this.animalSpecies).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        this.resultArray.push(val);
      });
    }
    // es wird nur nach Rasse gesucht
    if(this.animalBreed != undefined){
      this.listService.getListRef().orderByChild("breed").equalTo(this.animalBreed).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        this.resultArray.push(val);
      });
    }
    // es wird nur nach dem Namen gesucht
    if(this.animalName != undefined){
      this.listService.getListRef().orderByChild("name").equalTo(this.animalName).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        this.resultArray.push(val);
      });
    }
     
  }

}
