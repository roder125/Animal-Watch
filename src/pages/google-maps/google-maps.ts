import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html',
})
export class GoogleMapsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  street: string;
  city: string;
  start;
  end;
  distance;
  duration;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  hide : Boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.street = this.navParams.get("street");
    this.city = this.navParams.get("city");
    this.end = this.city + ", " + this.street;
    console.log(this.end); 
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
    var geocoder = new google.maps.Geocoder();
    this.geocodeAdress(geocoder, this.map)
  }

  calculateAndDisplayRoute() {
    this.removeBar();
    this.calculateDistance(this.start, this.end);
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  /**
   * Berechnet die Distanz und Zeit der Route
   * @param start 
   * @param end 
   */
  calculateDistance(start, end){
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
      origins: [start],
      destinations: [end],
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === 'OK') {
        var result = response.rows[0].elements[0];
        this.distance = result.distance.text
        console.log(result.distance.text);
        this.duration = result.duration.text;
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  } 

  geocodeAdress(geocoder, resultsMap){
    var address = this.end;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  removeBar(){
    var bar = document.getElementById('floating-panel');
    bar.classList.add("upMove");
    bar.classList.remove("downMove");
    this.hide = true;
  }

  showBar(){
    var bar = document.getElementById('floating-panel');
    bar.classList.add("downMove");
    bar.classList.remove("upMove");
    this.hide = false;
  }

}
