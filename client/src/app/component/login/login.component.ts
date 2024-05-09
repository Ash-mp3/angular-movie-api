import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MatCardModule, MatInputModule, MatFormFieldModule],
})
export class LoginComponent implements OnInit {
  firestore = inject(Firestore);
  user$: Observable<User | undefined>;

  constructor() {}

  async ngOnInit(): Promise<void> {
      const collectionRef = collection(this.firestore, 'users');
      const snapshots = await getDocs(collectionRef);
      const data = snapshots.docs.map(doc => doc.data());
      console.log(data)
  }
}
