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
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth.service';

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
export class LoginComponent {
  firestore = inject(Firestore);
  user$: Observable<User | undefined>;
  form: FormGroup;
  fb: FormBuilder = new FormBuilder();

  constructor(private AuthService: AuthService, fb: FormBuilder) {
    this.form = fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.required],
    });
  }

  loginUser(Email: string, Password: string) {
    const isUserLoggedIn = this.AuthService.signIn(Email, Password);
    console.log(isUserLoggedIn);
  }

  onSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid!');
      return;
    }
    const formData = this.form.value;
    console.log('Form data:', formData);
    this.loginUser(formData.Email, formData.Password);
    this.form.reset();
  }
    
  
}

//   async ngOnInit(): Promise<void> {
//       const collectionRef = collection(this.firestore, 'users');
//       const snapshots = await getDocs(collectionRef);
//       const data = snapshots.docs.map(doc => doc.data());
//       console.log(data)
//   }
