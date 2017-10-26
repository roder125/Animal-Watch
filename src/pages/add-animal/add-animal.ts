import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
// Animal Interface importieren
import { Animal } from '../../models/add-animals/animal.interface';

@IonicPage()
@Component({
  selector: 'page-add-animal',
  templateUrl: 'add-animal.html',
})
export class AddAnimalPage {

  animal = {} as Animal;

  constructor(public navCtrl: NavController, public navParams: NavParams, private animalList: AnimalListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAnimalPage');
  }

  addAnimal(animal: Animal){
    if(animal.animalName == "" || animal.animalAge == null){
      console.log("Keine gültigen eingaben");
    }
    else{
      this.animalList.addAnimal(animal)
        .then((animal)=>{
          this.navCtrl.pop();
        });
    }
    
  }

}
