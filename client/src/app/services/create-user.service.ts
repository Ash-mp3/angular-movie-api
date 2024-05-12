import { Injectable } from '@angular/core';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

    constructor(private fs: Firestore, private auth: Auth) { }

    async createUser(uid: string, email: string) {
        const splitEmail = email.split("@")
        const username = splitEmail[0]
        const usersCollection = collection(this.fs, 'users')
        const newUserData: User = {
            username: username,
            email: email,
            watchlist: [],
            watched: [],
        }
        const newUserDoc = doc(usersCollection, uid)
        await setDoc(newUserDoc, newUserData).then((result) => {
            console.log('user doc created succesfully ', result)
        })
    }

    async checkIfUserIsNew(uid: string) {
        let isNew = true;
        const userDocRef = collection(this.fs, 'users')
        const allUsers = await getDocs(userDocRef)
        allUsers.docs.forEach((doc) => {
            console.log(doc.id, uid)
            if (doc.id === uid) {
                isNew = false
            }
        })
        if (isNew) {
            this.createUser(uid, this.auth.currentUser.email)
        }
    }
}
