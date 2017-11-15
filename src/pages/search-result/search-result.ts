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
  tag = this.navParams.get("tag");
  species = this.navParams.get("species");

  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: AnimalListService) {
    this.showResultList();
  }

  ionViewDidLoad() {

  }

  showResultList(){
    
    this.listService.getListRef().orderByChild(this.tag).equalTo(this.species).on("child_added",(snapshot) =>{
      var val = snapshot.val();
      this.resultArray.push(val);
      console.log(this.resultArray);
    });
  }

}
