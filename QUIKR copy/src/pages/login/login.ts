
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google: any;
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  drawerOptions = {};
  map: any;
  desitnationSel = false;
  confirmTrip = false;
  @ViewChild('googleMaps') mapRef: ElementRef;
  displayMode: string = "";
  Latitude = undefined;
  Longitude = undefined;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private events: Events) {
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openSettings() {
    this.navCtrl.push("SettingsPage");
  }

  selected() {
    this.desitnationSel = true;
  }

  startTrip() {
    this.confirmTrip = true;
    this.events.publish("checkout:open", "55");
  }

  mininaturize = false;

  showMap() {
    this.displayMode = "Map";
    this.onMapSuccess();
   // navigator.geolocation.getCurrentPosition
    //this.onMapSuccess// , this.onMapError, { enableHighAccuracy: true });

    if (this.confirmTrip == true) {
      this.mininaturize = true;
      this.mapRef.nativeElement
      this.events.publish("checkout:open", "75");
    }
  }



  // Success callback for get geo coordinates

  onMapSuccess() {
    
   // this.Latitude = position.coords.latitude;
  //  this.Longitude = position.coords.longitude;

    this.getMap(0, 0);

  }

  // Get map by using coordinates

  getMap(latitude, longitude) {

    const location = new google.maps.LatLng(19.432470, -99.16884)

    var mapOptions = {
      center: location,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);


   //marker.setMap(map);
    map.setZoom(15);
   // map.setCenter(marker.getPosition());
  }
  onMapError(error) {
    console.log('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }
}
