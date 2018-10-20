import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  drawerOptions : any;
  registerAccount = false;
  constructor(public navCtrl: NavController, public http: Http, private events:Events) {
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }
  stepCount = 0;
  maxStep = 3;

  createAccount() {
    this.registerAccount = true;
    this.events.publish('checkout:open', "0");
  }
  nextStep() {
    if (this.stepCount == this.maxStep) {
      console.log("Register User");
      this.navCtrl.setRoot("LoginPage");
      return;
    }
    this.stepCount++;
  }

  prevStep() {
    if (this.stepCount <= 0){
      this.events.publish('checkout:close');
      this.registerAccount = false;
      this.stepCount = 0;
    }
    else {
      this.stepCount--;
    }
  }  

  phoneIsEdit($event){

  }
}
