import { Animal } from './../../models/add-animals/animal.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase';



@Injectable()
export class AnimalListService{    

    private animalListRef$ = this.db.list<any>('animal-list');
    

    constructor(private db: AngularFireDatabase){
    }

    url;

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
                this.url = downloadUrl;
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    getPicture(){
        var storageRef$ = firebase.storage().ref(`pictures/123`);
        return storageRef$.getDownloadURL();
    }

    getDownloadUrl(){
        return this.url;
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
    getSearchResult(tag: string){
        var ref =firebase.database().ref("animal-list");
        return ref;
    }


    // imageUrl muss noch hinzugefügt werden
    addAnimal(name, age, date, url, description, species, breed){
        return this.animalListRef$.push({
            name: name,
            age: age,
            species: species,
            breed: breed,
            date: date,
            downloadUrl: url,
            description: description
            //image: imageUrl
        });
    }
}