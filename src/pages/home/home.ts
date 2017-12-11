import { MyEntryDetailsPage } from './../my-entry-details/my-entry-details';
import { SearchResultPage } from './../search-result/search-result';
import { AnimalDetailsPage } from './../animal-details/animal-details';
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { AuthentificationService } from './../../services/authentification/authentification.service';
import { Animal } from './../../models/add-animals/animal.interface';
import { AnimalListService } from './../../services/animal-list/animal-list.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, List, PopoverController, LoadingController, Scroll } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private animalListService: AnimalListService, public popoverCtrl: PopoverController, 
              private authService: AuthentificationService,private storageService: LocalstorageService, public loadCtrl: LoadingController) {
    
  }
  
  ionViewDidLoad() {
    this.showList();
    this.showMyEntryList();
  }

  /*
  ngAfterViewInit() {
    this.header = document.getElementById('header');
    this.scroll.addScrollEventListener(this.onScroll);
  }

  /**
   * sollte dem weg scrollen des headers dienen
   
  onScroll(event) {
    console.log(event.target.scrollTop);
    
    if(event.target.scrollTop > 56){
      console.log("hide");
      document.getElementById('header').classList.remove("showHeader");
      document.getElementById('header').classList.add("hideHeader");
      document.getElementById('scroll').classList.remove("smallList");
      document.getElementById('scroll').classList.add("bigList");
      document.getElementById('content').classList.add("bigContent");
      //this.header.remove("showHeader");
      //this.header.add("hideHeader");
    } 
    //else if(event.target.scrollTop < 56){
    else{  
      console.log("show");
      document.getElementById('header').classList.remove("hideHeader");
      document.getElementById('header').classList.add("showHeader");
      document.getElementById('content').classList.remove("bigContent");
      document.getElementById('content').classList.add("smallContent");
      //document.getElementById('scroll').classList.remove("bigList");
      //document.getElementById('scroll').classList.add("smallList");
    }    
}*/
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
    var uId = this.authService.getUserId()
    this.animalListService.getAnimalListRef().orderByChild("uId").equalTo(uId).on("child_added", snapshot => {  
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
    this.navCtrl.push(AddAnimalPage);
  }

  showDetails(animal){
    this.navCtrl.push( AnimalDetailsPage, {animal: animal});
  }

  /**
   * Zeigt die Details der eigenen Einträge
   * @param animal 
   */
  showMyEntryDetails(animal){
    this.navCtrl.push(MyEntryDetailsPage,{animal: animal});
  }
}
