import { Animal } from './../../models/add-animals/animal.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase';



@Injectable()
export class AnimalListService{    

    private animalListRef = this.db.list<any>('animal-list');
    

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
     */
    getShoppingList(){
        return this.animalListRef;
    }

    // , imageUrl muss noch hinzugefügt werden
    addAnimal(name, age, date, url, description){
        return this.animalListRef.push({
            name: name,
            age: age,
            date: date,
            downloadUrl: url,
            description: description
            //image: imageUrl
        });
    }
}