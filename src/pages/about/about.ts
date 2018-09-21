import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SpeechRecognition} from "@ionic-native/speech-recognition";
import {ChangeDetectorRef} from "@angular/core";
import {TextToSpeech} from "@ionic-native/text-to-speech";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  bgcolor: string = 'white';
  text: string;

  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition, private tts: TextToSpeech) {

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

  start() {
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          console.log('matches'),
          this.bgcolor = matches[0];
        }
      )
  }

}
