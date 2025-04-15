import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonItem, IonLabel, IonInput, IonToggle,
  IonList, IonFab, IonFabButton, IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-ionic-example',
  standalone: true,
  imports: [
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButton, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonItem, IonLabel, IonInput, IonToggle,
    IonList, IonFab, IonFabButton, IonIcon
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Ionic Components Example</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Welcome to Ionic with Angular</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          This is an example of Ionic components in your Angular application.
        </ion-card-content>
      </ion-card>
      
      <ion-list>
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input type="text" placeholder="Enter your name"></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-label>Notifications</ion-label>
          <ion-toggle></ion-toggle>
        </ion-item>
      </ion-list>
      
      <ion-button expand="block" color="success" class="ion-margin-top">
        Submit
      </ion-button>
      
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="secondary">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [`
    ion-card {
      margin-bottom: 20px;
    }
  `]
})
export class IonicExampleComponent {
  constructor() {
    addIcons({ add });
  }
} 