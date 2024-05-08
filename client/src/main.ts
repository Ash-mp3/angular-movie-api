import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './environments/environment.dev';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore } from 'firebase/firestore';

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);