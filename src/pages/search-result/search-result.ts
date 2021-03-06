import { AnimalDetailsPage } from './../animal-details/animal-details';
import { SnapshotAction } from 'angularfire2/database';
import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { concat } from 'rxjs/observable/concat';

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  resultArray = [];
  saveArray = [];
  speciesTag;
  animalSpecies;
  breedTag;
  animalBreed;
  nameTag;
  animalName;


  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: AnimalListService) {
    
    this.speciesTag = this.navParams.get("speciesTag");
    this.animalSpecies = this.navParams.get("aninmalSpecies");
   
    this.breedTag = this.navParams.get("breedTag");
    this.animalBreed = this.navParams.get("animalBreed");

    this.nameTag = this.navParams.get("nameTag");
    this.animalName = this.navParams.get("animalName");
  }

  ionViewDidLoad() {
    this.showResultList();
  }

  /**
   * Ergebis der Suche werden in Array gespeichert und ausgegeben
   */
  showResultList(){
    // es wird nach Tierart, Rasse und Name gesucht ist eigentlich doppelt gemoppelt
    if(this.animalSpecies != undefined && this.animalSpecies != "" && this.animalBreed != undefined && this.animalBreed != "" && this.animalBreed != null && this.animalName != undefined && this.animalName != ""){
      this.listService.getAnimalListRef().orderByChild("animal/animalName").equalTo(this.animalName).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        var breedString : string = val.animal.animalBreed;

        this.animalBreed.forEach(breed => {
          if(breedString.includes(breed)){
            this.reverseArray(val);
          }
        });
      });
    }
    // es wird nach der Tierart und Rasse gesucht
    else if(this.animalSpecies != undefined && this.animalSpecies != ""  && this.animalBreed != undefined && this.animalBreed != "" && this.animalBreed != null){     
      this.listService.getAnimalListRef().orderByChild("animal/animalSpecies").equalTo(this.animalSpecies).on("child_added",(snapshot) =>{
        var val = snapshot.val()
        var breedString : string = val.animal.animalBreed;

        this.animalBreed.forEach(breed => {
          if(breedString.includes(breed)){
            this.reverseArray(val);
          }
        });      
      });  
    }
    //es wird nach Tierart und Name gesucht
    else if(this.animalSpecies != undefined && this.animalSpecies != "" && this.animalName != undefined && this.animalName != ""){
      this.listService.getAnimalListRef().orderByChild("animal/animalName").equalTo(this.animalName).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        if(val.animal.animalSpecies == this.animalSpecies){
          this.reverseArray(val);
        }
      });
    }
    // es wird nach Rasse und Name gesucht
    else if(this.animalBreed != undefined && this.animalBreed != "" && this.animalBreed != null && this.animalName != undefined && this.animalName != ""){
      this.listService.getAnimalListRef().orderByChild("name").equalTo(this.animalName).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        if(val.animal.animalBreed == this.animalBreed){
          this.reverseArray(val);
        }
      });
    }
    // es wird nur nach Tierart gesucht
    else if(this.animalSpecies != undefined && this.animalSpecies != ""){
      this.listService.getAnimalListRef().orderByChild("animal/animalSpecies").equalTo(this.animalSpecies).on("child_added",(snapshot) =>{
        var val = snapshot.val();
        this.reverseArray(val);  
      });
    }

    // es wird nur nach dem Namen gesucht
    else if(this.animalName != undefined && this.animalName != ""){
      this.listService.getAnimalListRef().orderByChild("animal/animalName").equalTo(this.animalName).on("child_added",(snapshot) =>{
        console.log("hat geklappt" + val);
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
    this.navCtrl.push("AnimalDetailsPage", {animal: animal});
  }
}
