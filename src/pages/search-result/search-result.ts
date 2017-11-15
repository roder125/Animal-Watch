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

  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: AnimalListService) {
    this.showResultList();
  }

  ionViewDidLoad() {

  }

  showResultList(){
    
  }

}
