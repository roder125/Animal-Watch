import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { SearchResultPage } from '../search-result/search-result';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  animalSpecies;
  animalBreed;
  animalName;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {

  }
  cancel(){
    this.navCtrl.pop();
  }

  /**
   * Öffnet die Searchresult Page und übergibt Suchparameter
   */
  search(){
    /*
    this.animalListService.getSearchResult("tag").orderByChild("name").equalTo("Skotty").on("child_added",(snapshot) =>{
      var val = snapshot.val();
      this.resultArray.push(val);
    });*/
    var speciesTag = "animalSpecies";
    var breedTag = "animalBreed";
    var nameTag = "name";
    this.navCtrl.push(SearchResultPage, {
      speciesTag: speciesTag, 
      aninmalSpecies: this.animalSpecies,
      breedTag: breedTag,
      animalBreed: this.animalBreed,
      nameTag: nameTag, 
      animalName: this.animalName
    });
    this.viewCtrl.dismiss();
  }
}
