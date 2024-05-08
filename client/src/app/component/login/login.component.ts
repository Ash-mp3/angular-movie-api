import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [],
})
export class LoginComponent implements OnInit {
  firestore = inject(Firestore);
  user$: Observable<User | undefined>;

  constructor() {}

  ngOnInit(): void {
    getDocs(collection(this.firestore, 'users')).then((response) => {
        // this.user$ = response.docs[0]
        console.log(response.docs[0])
    });
      console.log('hello')
  }
}
