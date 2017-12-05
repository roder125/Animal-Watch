import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { SearchResultPage } from '../search-result/search-result';
import { SpeciesAndBreedService } from '../../services/species-and-breed.service/speciesAndBreed.service';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  species;
  breed = [];
  animalName;

  breedArray =[];
  speciesArray = this.speciesAndBreedService.getSpeciesArray();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public speciesAndBreedService: SpeciesAndBreedService) {
  }

  ionViewDidLoad() {

  }
  cancel(){
    this.navCtrl.pop();
  }

  /**
   * Je nach dem, welche Rasse ausgewählt wird, werden Rassen verfügbar
   * todo: weitere Rasse hinzufügen und später auslagern
   */
  onSelectChange(){
    if(this.species == "Hund"){
      this.breedArray = this.speciesAndBreedService.getDogBreedArray();
    }
    if(this.species == "Katze"){
      this.breedArray = this.speciesAndBreedService.getCatBreedArray();
    }
  }

  /**
   * Öffnet die Searchresult Page und übergibt Suchparameter
   */
  search(){
    var speciesTag = "animalSpecies";
    var breedTag = "animalBreed";
    var nameTag = "name";
    this.navCtrl.push(SearchResultPage, {
      speciesTag: speciesTag, 
      aninmalSpecies: this.species,
      breedTag: breedTag,
      animalBreed: this.breed,
      nameTag: nameTag, 
      animalName: this.animalName
    });
    //this.viewCtrl.dismiss();
  }
}
