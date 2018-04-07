
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { AuthentificationService } from './../../services/authentification/authentification.service';
import { Animal } from './../../models/add-animals/animal.interface';
import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, List, PopoverController, LoadingController, Scroll, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAction, SnapshotAction, AngularFireList } from 'angularfire2/database';
import { SpeciesAndBreedService } from '../../services/species-and-breed.service/speciesAndBreed.service';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  @ViewChild('pageSlider') pageSlider: Slides;
  @ViewChild(Scroll) scroll: Scroll;
 
  header;
  tabs: any = '0';
  animalList$: Observable<SnapshotAction[]>;
  result$ : Observable<any[]>;
  animalArray = [];
  myEntryArray = [];
  saveArray = [];
  image;
  noImage;
  species;
  breed = [];
  animalName;

  breedArray =[];
  speciesArray = this.speciesAndBreedService.getSpeciesArray();

  constructor(public navCtrl: NavController, private animalListService: AnimalListService, public popoverCtrl: PopoverController, 
              private authService: AuthentificationService,private storageService: LocalstorageService, public loadCtrl: LoadingController,
              private speciesAndBreedService: SpeciesAndBreedService) {
    
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
    let popover = this.popoverCtrl.create("PopoverPage");
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
    this.navCtrl.setRoot("LoginPage");
    this.authService.logout();
    this.storageService.keepLoggedIn(false);
  }
  
  /**
   * Zeigt die Liste  aus der Datenbank an, mit Hilde des Services
   */
  showList(){
    let loader = this.loadCtrl.create({
      content:  "lädt..",
    });
    loader.present()
      .then(()=>{
        this.animalListService
        .getShoppingList()  // DB List
        .snapshotChanges()  // Access to Key and Value  ["child_added"]
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
          loader.dismiss();
        });
      });
  }
  
  /**
   * Zeigt die Einträge, die ein User gemacht hat
   */
  showMyEntryList(){
    var uId = this.authService.getUserId();
    this.animalListService.getAnimalListRef().orderByChild("animal/uId").equalTo(uId).on("child_added", snapshot => {
      console.log("Hier müsste es klappen");
      this.saveArray.push(snapshot);
      this.myEntryArray = this.saveArray.slice().reverse().map( c => ({
        key: c.key, ... c.val()
      }));   
    });
  }

  /**
   * Fügt ein Tier in die Datenbank ein
   */
  addAnimal(){
    this.navCtrl.push("AddAnimalPage");
  }

  showDetails(animal){
    this.navCtrl.push( "AnimalDetailsPage", {animal: animal});
  }

  /**
   * Zeigt die Details der eigenen Einträge
   * @param animal 
   */
  showMyEntryDetails(animal){
    this.navCtrl.push("MyEntryDetailsPage",{animal: animal});
  }

  /**
   * Je nach dem, welche Rasse ausgewählt wird, werden Rassen verfügbar
   * todo: weitere Rasse hinzufügen und später auslagern
   */
  onSelectChange(){
    if(this.species == "Hund"){
      this.breedArray = this.speciesAndBreedService.getDogBreedArray();
    }
    if(this.species == "Katze"){
      this.breedArray = this.speciesAndBreedService.getCatBreedArray();
    }
  }

  /**
   * Öffnet die Searchresult Page und übergibt Suchparameter
   */
  search(){
    var speciesTag = "animalSpecies";
    var breedTag = "animalBreed";
    var nameTag = "name";
    this.navCtrl.push("SearchResultPage", {
      speciesTag: speciesTag, 
      aninmalSpecies: this.species,
      breedTag: breedTag,
      animalBreed: this.breed,
      nameTag: nameTag, 
      animalName: this.animalName
    });
    //this.viewCtrl.dismiss();
  }
}
