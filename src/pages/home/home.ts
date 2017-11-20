import { SearchResultPage } from './../search-result/search-result';
import { AnimalDetailsPage } from './../animal-details/animal-details';
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { AuthentificationService } from './../../services/authentification/authentification.service';
import { Animal } from './../../models/add-animals/animal.interface';
import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, List, PopoverController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AddAnimalPage } from '../add-animal/add-animal';
import { AngularFireAction, SnapshotAction, AngularFireList } from 'angularfire2/database';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('pageSlider') pageSlider: Slides;
  tabs: any = '0';
  animalList$: Observable<SnapshotAction[]>;
  result$ : Observable<any[]>;
  animalArray = [];
  myEntryArray = [];
  saveArray = [];
  image;
  noImage;

  constructor(public navCtrl: NavController, private animalListService: AnimalListService, public popoverCtrl: PopoverController,
              private authService: AuthentificationService,private storageService: LocalstorageService) {
    
  }
  
  ionViewDidLoad() {
    this.showList();
    this.showMyEntryList();
  }
  /**
   * Öffnet das Popover für die Suche
   * @param event 
   */
  presentPopover(event){
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
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
    this.animalListService
    .getShoppingList()  // DB List
    .auditTrail()  // Access to Key and Value  ["child_added"]
    /*
    .map(changes => { 
      changes.forEach(snapshot => {
        var data = snapshot.payload.val();
        
      })
    .map(data => {
      return data.slice().reverse().map( c => ({
        key: c.payload.key, ... c.payload.val()
      }))
    });*/
    .subscribe(data => {
      this.animalArray = data.slice().reverse().map( c => ({
        key: c.payload.key, ... c.payload.val()
      }))
    });
  }
  
  
  showMyEntryList(){
    var uId = this.authService.getUserId()
    this.animalListService.getListRef().orderByChild("uId").equalTo(uId).on("child_added", snapshot => {
      var val = snapshot.val();
      this.saveArray.push(val);
      this.myEntryArray = this.saveArray.slice().reverse();
    });
  }

  /**
   * Fügt ein Tier in die Datenbank ein
   */
  addAnimal(){
    this.navCtrl.push(AddAnimalPage);
  }

  showDetails(animal){
    this.navCtrl.push( AnimalDetailsPage, {animal: animal});
  }
}
