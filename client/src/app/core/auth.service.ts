import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { CreateUserService } from '../services/firebase/create-user.service';
import { UsersMoviesService } from '../services/firebase/users-movies.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private auth: Auth, private router: Router, private createUserService: CreateUserService, private usersMoviesService: UsersMoviesService) { }

    get authenticated() {
        return getAuth().currentUser;
    }
    
    async signUp(email: string, password: string): Promise<any> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            //if user is got created, log them in and send success message
            if (userCredential) {
                this.signIn(email, password)
                this.createUserService.createUser(userCredential.user.uid, email)
                return 'User signed up successfully';
            }
        } catch (error) {
            //trims firebase error message and returns it
            const errorMsg = error.message.match(/\(auth\/(.*?)\)/)[1];
            return errorMsg
          }
	}
	
	async signIn(email: string, password: string): Promise<any> {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            //if user logged in, send success message
            if (userCredential) {
                //sets user data to a variable that can be used throughout the session.
                this.usersMoviesService.initUserData()
                this.router.navigate(['/popular']);
                return 'User signed in';
            }
        } catch (error) {
            //trims firebase error message and returns it
            const errorMsg = error.message.match(/\(auth\/(.*?)\)/)[1];
            return errorMsg
          }
    }

    signUpWithGoogle(): void {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                //sets user data to a variable that can be used throughout the session.
                this.usersMoviesService.initUserData()
                this.createUserService.checkIfUserIsNew(auth.currentUser.uid)
                this.router.navigate(['/popular']);
            }).catch((error) => {
                console.error(error.code, error.message)
            })
    }

    signOut(): void {
        const auth = getAuth();
        signOut(auth).then(() => {
            this.router.navigate(['/login']);
        }).catch((error) => {
            console.error(error.code, error.message)
        })
    }
}
