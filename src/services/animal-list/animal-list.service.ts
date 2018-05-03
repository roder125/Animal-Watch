import { Animal } from './../../models/add-animals/animal.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase';



@Injectable()
export class AnimalListService{    

    private animalListRef$ = this.db.list<any>('animal-list');
    private userListRef$ = this.db.list<any>('user-list');
    
    constructor(private db: AngularFireDatabase){
    }

    /**
     * Fügt ein Bild in den Storage von Firebase ein und speicher die download Url
     * @param result 
     * @param name 
     */
    // https://angularfirebase.com/lessons/angular-file-uploads-to-firebase-storage/
    pushImageUpload(image, uId, name, idx, date){
        var images = image;
        var storageRef$ = firebase.storage().ref(`pictures/${uId}/${name}${date}/${name}${idx}`);
        return storageRef$.putString(image, "data_url");
    }

    /**
     * Return die animal-list der Datanbank
     * https://www.youtube.com/watch?v=sKFLI5FOOHs für querys
     */
    getShoppingList(){
        //this.animalListRef = this.db.list<any>('animal-list', ref => ref.orderByChild('date'));
        return this.animalListRef$;
    }

    /**
     * Returnt das Result einer Datenbankabfrage für Tiere
     */
    getAnimalListRef(){
        var ref = firebase.database().ref("animal-list");
        return ref;
    }

    /**
     * Returnt das Result einer Datenbankabfrage für User
     */
    getUserListRef(){
        var ref = firebase.database().ref("user-list");
        return ref;
    }


    addAnimal(animal){
        return this.animalListRef$.push({
            animal: animal
        });
    }

    addAnimalWithoutPicture(animal){
        return this.animalListRef$.push({
            animal: animal
        });
    }

    /**
     * Löscht ein Tier aus der Datenbank Liste und dessen Bilder aus dem Storage
     */
    deleteAnimal(key, refArray){
        console.log("Delete---------------------");
        if(refArray != undefined){
            refArray.forEach((ref) => {
                        let storageRef$ = firebase.storage().ref(ref);
                        storageRef$.delete();
                    });  
        }
        return this.animalListRef$.remove(key);
    }

    createUser(user){
        console.log(user);
        return this.userListRef$.push({
            user : user
        });
    }
}