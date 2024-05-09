import { Injectable, Inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // @Inject(Auth) private auth: Auth
    constructor(private auth: Auth) { }
    
    async signUp(email: string, password: string): Promise<any> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            console.log('User created:', userCredential.user);
          } catch (error) {
            console.error('Error creating user:', error.code, error.message);
          }
      }
}
