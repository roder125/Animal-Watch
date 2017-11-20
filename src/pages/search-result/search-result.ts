import { AnimalDetailsPage } from './../animal-details/animal-details';
import { SnapshotAction } from 'angularfire2/database';
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
  saveArray = [];

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
    // es wird nach Tierart, Rasse und Name gesucht
    if(this.animalSpecies != undefined && this.animalBreed != undefined && this.animalName != undefined){
      this.listService.getListRef().orderByChild("name").equalTo(this.animalName).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        if(val.breed == this.animalBreed){
          if(val.species == this.animalSpecies){
            this.reverseArray(val);
          }
        }
      });
    }
    // es wird nach der Tierart und Rasse gesucht
    else if(this.animalSpecies != undefined && this.animalBreed != undefined){
      this.listService.getListRef().orderByChild("breed").equalTo(this.animalBreed).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        if(val.species == this.animalSpecies){
          this.reverseArray(val);
        }
      });
    }
    //es wird nach Tierart und Name gesucht
    else if(this.animalSpecies != undefined && this.animalName != undefined){
      this.listService.getListRef().orderByChild("name").equalTo(this.animalName).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        if(val.species == this.animalSpecies){
          this.reverseArray(val);
        }
      });
    }
    // es wird nach Rasse und Name gesucht
    else if(this.animalBreed != undefined && this.animalName != undefined){
      this.listService.getListRef().orderByChild("name").equalTo(this.animalName).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        if(val.breed == this.animalBreed){
          this.reverseArray(val);
        }
      });
    }
    // es wird nur nach Tierart gesucht
    else if(this.animalSpecies != undefined){
      this.listService.getListRef().orderByChild("species").equalTo(this.animalSpecies).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        this.reverseArray(val);  
      });
    }
    // es wird nur nach Rasse gesucht
    else if(this.animalBreed != undefined){
      this.listService.getListRef().orderByChild("breed").equalTo(this.animalBreed).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        this.reverseArray(val);
      });
    }
    // es wird nur nach dem Namen gesucht
    else if(this.animalName != undefined){
      this.listService.getListRef().orderByChild("name").equalTo(this.animalName).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        this.reverseArray(val);
      });
    }    
  }

  /**
   * Dreht das Array um, welches angezeigt werden soll, sodass neuere Einträge oben stehen
   * @param val 
   */
  reverseArray(val){
    this.saveArray.push(val);
    this.resultArray = this.saveArray.slice().reverse();
  }

  showDetails(animal){
    this.navCtrl.push(AnimalDetailsPage, {animal: animal})
  }
}
