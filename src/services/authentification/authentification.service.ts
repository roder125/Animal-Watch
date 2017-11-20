import { AngularFireAuth } from 'angularfire2/auth';

import { Injectable } from "@angular/core";


@Injectable()
export class AuthentificationService{

    constructor(private fireAuth: AngularFireAuth){}

    /**
     * login user with email and password
     * @param email 
     * @param password 
     */
    login(email: string, password: string) :Promise<any>{
        return this.fireAuth.auth.signInWithEmailAndPassword(email, password);        
    }

    /**
     * register user with email and password
     * @param email 
     * @param password 
     */
    register(email: string, password: string) :Promise<any>{
        return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    logout():Promise<any>{
        return this.fireAuth.auth.signOut();       
    }

    getUserEmail(){
        return this.fireAuth.auth.currentUser.email;
    }

    getUserId(){
        return this.fireAuth.auth.currentUser.uid;
    }

}
