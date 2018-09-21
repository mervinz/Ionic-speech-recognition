import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SpeechRecognition} from "@ionic-native/speech-recognition";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bgcolor: string='white';

  constructor(public navCtrl: NavController, private speechRecognition:SpeechRecognition) {

  }
  ngOnInit() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {

        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('denied')
            )
        }
      });
  }
  start(){
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) =>{
          console.log('matches')
          this.bgcolor = matches[0];
        }
      )}

}
