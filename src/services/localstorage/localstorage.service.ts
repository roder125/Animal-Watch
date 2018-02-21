import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable()
export class LocalstorageService{

    constructor(private storage: Storage){}
    
    saveLocal(email: string, password: string){
        this.storage.set("email", email);
        this.storage.set("password", password);
    }

    getSavedEmail() :Promise<any>{
        return this.storage.get("email");
    }
    
    getSavedPassword() :Promise<any>{
        return this.storage.get("password");
    }

    keepLoggedIn(status: Boolean){
        this.storage.set("keepLoggedIn", status);
    }

    getLogginStatus(){
        return this.storage.get("keepLoggedIn");
    }
}