import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { Router } from '@angular/router';
import { CreateUserService } from '../services/create-user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private auth: Auth, private router: Router, private createUserService: CreateUserService) { }

    get authenticated() {
        return getAuth().currentUser;
    }
    
    async signUp(email: string, password: string): Promise<any> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            if (userCredential) {
                this.signIn(email, password)
                this.createUserService.createUser(userCredential.user.uid, email)
            }
            console.log('User created:', userCredential.user);
          } catch (error) {
            console.error('Error creating user:', error.code, error.message);
          }
	}
	
	async signIn(email: string, password: string): Promise<any> {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            console.log('User logged in:', userCredential.user);
            if (userCredential) {
                localStorage.setItem('uid', userCredential.user.uid);
            }
			this.router.navigate(['/popular']);
          } catch (error) {
            console.error('Error logging in user:', error.code, error.message);
          }
    }

    signUpWithGoogle(): void {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                this.createUserService.checkIfUserIsNew(auth.currentUser.uid)
                localStorage.setItem('uid', auth.currentUser.uid);
                this.router.navigate(['/popular']);
            }).catch((error) => {
                console.error(error.code, error.message)
            })
    }
}
