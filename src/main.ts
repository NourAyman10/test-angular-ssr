import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { defineCustomElements } from '@ionic/core/loader';

// Initialize Ionic Web Components
defineCustomElements();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
