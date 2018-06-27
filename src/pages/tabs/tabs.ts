
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { AuthentificationService } from './../../services/authentification/authentification.service';
import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, List, PopoverController, LoadingController, Scroll, IonicPage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SpeciesAndBreedService } from '../../services/species-and-breed.service/speciesAndBreed.service';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  @ViewChild('pageSlider') pageSlider: Slides;
  @ViewChild('newbieSlides') newbieSlides: Slides;
  @ViewChild('nearbySlides') nearbySlides: Slides;
  @ViewChild(Scroll) scroll: Scroll;
 
  edit : boolean = false;
  tabs: any = '0';
  animalArray = [];
  myEntryArray = [];
  myEntryArrayLength: number = 0;
  saveArray = [];
  species;
  breed = [];
  animalName;
  user;
  userSaveArray = [];
  newbieSlideIndex: any;
  nearbySlideIndex: any;

  breedArray =[];
  speciesArray = this.speciesAndBreedService.getSpeciesArray();

  constructor(public navCtrl: NavController, private animalListService: AnimalListService, public popoverCtrl: PopoverController, 
              private authService: AuthentificationService,private storageService: LocalstorageService, public loadCtrl: LoadingController,
              private speciesAndBreedService: SpeciesAndBreedService) {
    
  }
  
  ionViewDidLoad() {
    this.showList();
    this.showMyEntryList();
    this.showUser();
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
      this.saveArray.push(snapshot);
      this.myEntryArray = this.saveArray.slice().reverse().map( c => ({
        key: c.key, ... c.val()
      }));
      this.myEntryArrayLength = this.myEntryArray.length;
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
  **/
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

  /**
   * Opens the definded Page
   */
  openPage(pageName : string){
   
    if(pageName == "MyEntrysPage"){
      this.navCtrl.push(pageName, {myEntryArray : this.myEntryArray});
    }
    else{
      this.navCtrl.push(pageName);
    }
  }

  showUser(){
    var curUser = this.authService.getUserId();
    this.animalListService.getUserListRef().orderByChild("user/uId").equalTo(curUser).on("child_added", snapshot => {  
      this.userSaveArray.push(snapshot);   
      this.user = this.userSaveArray.map( c => ({
        key: c.key, ... c.val()
      }));
      console.log(this.user)
    });
  }

  /**
   * Wird aufgerufen, wenn der Nutzer den Edit Button betätigt
   * @param user 
   */
  editProfile(user){
    this.edit = true;    
    console.log(user.user.nr);
  }


  /**
   * Speichert die Änderungen, die vom Nutzer getätigt wurden 
   * @param user 
   */
  saveProfileChanges(user){
    this.edit = false;
    console.log(user)
  }

  /**
   * Holt sich den index der aktuellen Slide
   * @param $event 
   */
  getSlideIndex($event, name: string){
    if(name == "newbie")
      this.newbieSlideIndex = $event._snapIndex.toString();

    if(name == "nearby")
      this.nearbySlideIndex = $event._snapIndex.toString();
  }

  /**
   * Spring zu der nächsten Slide
   * @param slide 
   */
  nextSlide(slide: string) {
    if(slide == "newbie"){
      this.newbieSlides.slideNext();
    }
    else if(slide == "nearby"){
      this.nearbySlides.slideNext();
    }   
  }

  /**
   * Spring zu der vorherigen Slide
   * @param slide 
   */
  prevSlide(slide: string) {
    if(slide == "newbie"){
      this.newbieSlides.slidePrev();
    }   
    else if(slide == "nearby"){
      this.nearbySlides.slidePrev();
    } 
  }
}
