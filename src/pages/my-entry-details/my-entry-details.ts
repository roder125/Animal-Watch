import { AuthentificationService } from './../../services/authentification/authentification.service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AnimalListService } from '../../services/animal-list/animal-list.service';


@IonicPage()
@Component({
  selector: 'page-my-entry-details',
  templateUrl: 'my-entry-details.html',
})
export class MyEntryDetailsPage {

  animal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseService: AnimalListService, 
              public toastCtrl: ToastController, public authService: AuthentificationService) {
    this.animal = this.navParams.get("animal");
  }

  ionViewDidLoad() {

  }

  /**
   * Löscht das Tier aus der Datenabnk mit dem Foto im Storage
   * @param key 
   * @param name 
   */
  delete(key, name){
    this.databaseService.deleteAnimal(key, this.animal.pathUrls)
      .then((data)=>{
        this.navCtrl.setRoot(HomePage);
        this.showSuccesToast(name);
      })
      .catch((data)=>{
        this.showErrorToast(name);
      })
  }

  showSuccesToast(name){
    var toast = this.toastCtrl.create({
      message: name + " wurde erfolgreich entfernt.",
      duration: 3000
    }) 
    toast.present();
  }
  
  showErrorToast(name){
    var toast = this.toastCtrl.create({
      message: "Leider gab es einen Fehler beim löschen, versuchen Sie es bitte erneut.",
      duration: 3000
    }) 
    toast.present();
  }
}
