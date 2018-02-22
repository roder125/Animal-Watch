
import { AuthentificationService } from './../../services/authentification/authentification.service';
import { CameraSerive } from './../../services/camera/camera.service';
import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
// Animal Interface importieren
import { Animal } from '../../models/add-animals/animal.interface';
import {DomSanitizer} from '@angular/platform-browser';
import { SpeciesAndBreedService } from '../../services/species-and-breed.service/speciesAndBreed.service';

@IonicPage()
@Component({
  selector: 'page-add-animal',
  templateUrl: 'add-animal.html',
})
export class AddAnimalPage {

  tags = [];
  noImage: boolean;
  haveImage: boolean;
  animal = {} as Animal;
  date: any;
  textLeft = 500;
  downloadUrls = [];
  pathUrls = [];
  imageArray = [];
  
  tmpBreed = [];
  species;
  breedArray =[];
  breed = [];
  showButton : Boolean = false;
  
  speciesArray = this.speciesAndBreedService.getSpeciesArray();
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthentificationService, public loadCtrl: LoadingController,
              private animalList: AnimalListService, private cameraService: CameraSerive, public toastCtrl: ToastController, public _DomSanitizer: DomSanitizer,
              public speciesAndBreedService: SpeciesAndBreedService) {
  
                this.noImage = true;
                this.haveImage = false;
  }
  /**
   * Zählt wie viele Buchstaben noch geschrieben werden können, max 500
   */
  textCounter(){
    var maxLen = 500;
    this.textLeft = 0;
    this.textLeft = maxLen - this.animal.description.length;
  }

  /**
   * Je nach dem, welche Rasse ausgewählt wird, werden Rassen verfügbar
   * todo: weitere Rasse hinzufügen und später auslagern
   */
  onSelectChange(animal){
    if(animal.animalSpecies == "Hund"){
      this.breedArray = this.speciesAndBreedService.getDogBreedArray();
    }
    if(animal.animalSpecies == "Katze"){
      this.breedArray = this.speciesAndBreedService.getCatBreedArray();
    }
  }
  /**
   * Methode ruft den camera service auf und speichert das Bild als String in die Variable
  */
  takePicture(){
    this.cameraService.takePicture()
      .then((imageData)=>{
        var base64Image = "data:image/jpeg;base64," + imageData;
        this.imageArray.push(base64Image);
        this.haveImage = true;
        this.noImage = false;
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  /*
  takePicture(){
    var image = `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`;       
    
    var base64Image = "data:image/jpeg;base64," + image;
    this.imageArray.push(base64Image);
    this.haveImage = true;
    this.noImage = false;
    console.log(this.imageArray);
  }*/
  
  getPicture(){
    this.cameraService.getPicture()
    .then((imageData)=>{
      var base64Image = "data:image/jpeg;base64," + imageData;
      this.imageArray.push(base64Image);
      this.haveImage = true;
      this.noImage = false;
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  /**
   * Parameter werden der Methode addAnimal des animalListServices übergeben und in die Datenbank gespeichert,
   * außerdem wird einer Loader angezeigt
   * https://ionicacademy.com/ionic-tokeninput/
   * @param animal 
   */
  addAnimal(animal: Animal){
    //this.date = new Date().setDate(0);
    this.date = new Date();
    animal.entryDate = this.date;
    animal.uId = this.authService.getUserId();


    animal.animalBreed = this.tmpBreed.toString()
    console.log("Was geht " + animal.animalBreed);

    if(animal.animalName == undefined || animal.animalName == "" || animal.animalAge == null || animal.animalAge == undefined || animal.animalSpecies == undefined || animal.animalSpecies == ""){
      this.presentErrorToast("Alle Felder mit einem ' * ' müssen befüllt sein.");
    }
    // Es wurde kein Foto reingestellt
    else if(this.imageArray.length == null || this.imageArray.length == 0){
      console.log("alle nötigen Eingaben da");
      this.animalList.addAnimalWithoutPicture(animal)
      .then(()=>{
        this.navCtrl.setRoot("TabsPage");
        this.presentSuccessToast();
        //loader.dismiss();
      });                 
    }
    else{
      let loader = this.loadCtrl.create({   
        content: "speichert",
      });
      //loader.present()
        //.then(()=>{
          console.log(animal.entryDate);
          console.log(animal.animalSpecies);
          console.log(animal.animalBreed);

          for(var idx = 0; idx < this.imageArray.length; idx ++){
            this.animalList.pushImageUpload(this.imageArray[idx], animal.uId, animal.animalName, idx, animal.entryDate)
              .then(data => {
                this.downloadUrls.push(data.downloadURL);
                animal.downloadUrls = this.downloadUrls.slice().reverse();
                this.pathUrls.push(data.ref.fullPath);
                animal.pathUrls = this.pathUrls;
                console.log(animal.downloadUrls);
                console.log(animal.pathUrls);
                if(animal.downloadUrls.length  == this.imageArray.length ){
                  //console.log("alle urls da: " + this.downloadUrls);
                  //console.log("alle path da: " + this.pathUrls);
                  this.animalList.addAnimal(animal)
                    .then(()=>{
                      this.navCtrl.setRoot("TabsPage");
                      this.presentSuccessToast();
                      //loader.dismiss();
                    });                  
                }
              })
              .catch((error) =>{
                console.log(error);
                this.presentErrorToast(error);
                //loader.dismiss();
              });
          }            
      //});   
    }
  }
  /**
   * Zeigt einen Toast bei erfolgreichen Speichern
   */
  presentSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Tier wurde erfolgreich hinzugefügt',
      duration: 3000
    });
    toast.present();
  }
  /**
   * Zeigt einen Toast bei Fehlern
   */
  presentErrorToast(error){
    let toast = this.toastCtrl.create({
      message: error,
      duration: 4000
    });
    toast.present();
  }

  showAddButton(){
    this.showButton = true;
  }
}
