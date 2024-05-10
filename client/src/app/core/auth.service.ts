import { Injectable, Inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private auth: Auth, private router: Router) { }

    get authenticated() {
        return getAuth().currentUser;
    }
    
    async signUp(email: string, password: string): Promise<any> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            console.log('User created:', userCredential.user);
          } catch (error) {
            console.error('Error creating user:', error.code, error.message);
          }
	}
	
	async signIn(email: string, password: string): Promise<any> {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
			console.log('User logged in:', userCredential.user);
			this.router.navigate(['/popular']);
          } catch (error) {
            console.error('Error logging in user:', error.code, error.message);
          }
      }
}
