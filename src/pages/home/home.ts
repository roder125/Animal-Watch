import { AnimalDetailsPage } from './../animal-details/animal-details';
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { AuthentificationService } from './../../services/authentification/authentification.service';
import { Animal } from './../../models/add-animals/animal.interface';
import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
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
  user;
  //animalList$: Observable<any[]>;
  savedList: Observable<any[]>;
  animalList$: Observable<SnapshotAction[]>;
  search: string;
  image;
  noImage;

  constructor(public navCtrl: NavController, private animalList: AnimalListService,
              private authService: AuthentificationService,private storageService: LocalstorageService) {
    this.showList();
  }

  selectTab(index) {
    this.pageSlider.slideTo(index);
  }

  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
   }

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
  
  showList(){
    this.animalList$ = this.animalList
    .getShoppingList()  // DB List
    .auditTrail()  // Access to Key and Value  ["child_added"]
    /*
    .map(changes => {
     /*  
      changes.forEach(snapshot => {
        var data = snapshot.payload.val();
        
      })
      
      return changes.map( c => ({
        key: c.payload.key, ... c.payload.val()
      }))
    });
    */
    .map(data => {
      return data.reverse().map( c => ({
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
}
