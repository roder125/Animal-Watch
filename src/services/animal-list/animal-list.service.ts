import { Animal } from './../../models/add-animals/animal.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase';



@Injectable()
export class AnimalListService{    

    private animalListRef$ = this.db.list<any>('animal-list');
    

    constructor(private db: AngularFireDatabase){
    }

    downloadUrl;

    /**
     * Fügt ein Bild in den Storage von Firebase ein und speicher die download Url
     * @param result 
     * @param name 
     */
    // https://angularfirebase.com/lessons/angular-file-uploads-to-firebase-storage/
    pushImageUpload(result, name){
        var storageRef$ = firebase.storage().ref(`pictures/${name}`);
        var image = `data:image/jpeg;base64,${result}`;
        return storageRef$.putString(image, "data_url")
            .then((data)=>{
                let downloadUrl = data.downloadURL;
                this.downloadUrl = downloadUrl;
            })
            .catch((error)=>{
                console.log(error);
            });
    }


    getDownloadUrl(){
        return this.downloadUrl;
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
     * Returnt das Result einer Datenbankabfrage
     */
    getListRef(){
        var ref =firebase.database().ref("animal-list");
        return ref;
    }


    // imageUrl muss noch hinzugefügt werden
    addAnimal(name, age, date, downloadUrl, description, species, breed, uId){
        return this.animalListRef$.push({
            name:           name,
            age:            age,
            species:        species,
            breed:          breed,
            date:           date,
            downloadUrl:    downloadUrl,
            description:    description,
            uId:            uId,
            //image: imageUrl
        });
    }

    /**
     * Löscht ein Tier aus der Datenbank Liste und dessen Bilder aus dem Storage
     */
    deleteAnimal(key, name){
        this.animalListRef$.remove(key);
        var storageRef$ = firebase.storage().ref(`pictures/${name}`);
        return storageRef$.delete();
    }
}