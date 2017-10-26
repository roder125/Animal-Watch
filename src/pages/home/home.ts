import { Animal } from './../../models/add-animals/animal.interface';
import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AddAnimalPage } from '../add-animal/add-animal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user;
  animalList$: Observable<Animal[]>;
  search: string;

  constructor(private fireAuth: AngularFireAuth, public navCtrl: NavController, private animalList: AnimalListService) {
    this.user = fireAuth.auth.currentUser;
    this.showList();
  }

  logout(){
    this.user.logout;
    this.navCtrl.setRoot(LoginPage);
    LoginPage.resetLoginInformation(this.user);
  }

  showList(){
    this.animalList$ = this.animalList
    .getShoppingList()  // DB List
    .snapshotChanges()  // Access to Key and Value
    .map(changes => {
      return changes.map( c => ({
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
