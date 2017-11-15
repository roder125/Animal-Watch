import { SearchResultPage } from './../search-result/search-result';
import { AnimalDetailsPage } from './../animal-details/animal-details';
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { AuthentificationService } from './../../services/authentification/authentification.service';
import { Animal } from './../../models/add-animals/animal.interface';
import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, List } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AddAnimalPage } from '../add-animal/add-animal';
import { AngularFireAction, SnapshotAction, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('pageSlider') pageSlider: Slides;
  tabs: any = '0';
  animalList$: Observable<SnapshotAction[]>;
  result$ : Observable<any[]>;
  resultArray = [];
  image;
  noImage;

  constructor(public navCtrl: NavController, private animalListService: AnimalListService,
              private authService: AuthentificationService,private storageService: LocalstorageService) {
    this.showList();
  }
  
  ionViewDidLoad() {
    
  }

  /**
   * Slider slidet zum ausgewählten Tab
   * @param index 
   */
  selectTab(index) {
    this.pageSlider.slideTo(index);
  }
  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
   }

   /**
    * Logged den aktuellen user aus und resetet die anmelde Variablen im Storage
    */
  logout(){
    this.authService.logout();
    this.storageService.saveLocal("","");
    this.navCtrl.setRoot(LoginPage);
  }
  /*
  showList(){
    this.animalList$ = this.animalList
    .getShoppingList()  // DB List
    .snapshotChanges()  // Access to Key and Value
    .map(changes => {
        changes.forEach(snapshot => {
          console.log("Key :"+snapshot.key);
          var url = snapshot.payload.val();
          console.log("Value :"+ url.downloadUrl);
        })
        return changes.map( c => ({
        key: c.payload.key, ... c.payload.val()
      }))
    });
  }
  */
  
  /**
   * Zeigt die Liste  aus der Datenbank an, mit Hilde des Services
   */
  showList(){
    this.animalList$ = this.animalListService
    .getShoppingList()  // DB List
    .auditTrail()  // Access to Key and Value  ["child_added"]
    /*
    .map(changes => { 
      changes.forEach(snapshot => {
        var data = snapshot.payload.val();
        
      })
    */
    .map(data => {
      return data.slice().reverse().map( c => ({
        key: c.payload.key, ... c.payload.val()
      }))
    });
  }
  

  /**
   * Fügt ein Tier in die Datenbank ein
   */
  addAnimal(){
    this.navCtrl.push(AddAnimalPage);
  }

  search(){
    this.animalListService.getSearchResult("tag").orderByChild("name").equalTo("Skotty").on("child_added",(snapshot) =>{
      var val = snapshot.val();
      this.resultArray.push(val);
    })
    console.log(this.resultArray)
    //this.navCtrl.push(SearchResultPage);
  }
}
