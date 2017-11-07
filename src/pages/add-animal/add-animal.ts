import { CameraSerive } from './../../services/camera/camera.service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private animalList: AnimalListService, private cameraService: CameraSerive) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAnimalPage');
  }

  /**
   * Methode ruft den camera service auf und speichert das Bild als String in die Variable
   */
  getPicture(){
    this.cameraService.takePicture()
      .then((imageData)=>{
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.animal.imageUrl = base64Image;
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  /**
   * Parameter werden der Methode addAnimal des animalListServices übergeben und in die Datenbank gespeichert
   * @param animal 
   */
  addAnimal(animal: Animal){
    if(animal.animalName == "" || animal.animalAge == null){
      console.log("Keine gültigen eingaben");
    }
    else{
      this.navCtrl.pop();
      this.animalList.addAnimal(animal.animalName, animal.animalAge, animal.imageUrl)
    }
    
  }

}
