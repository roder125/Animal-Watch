import { Animal } from './../../models/add-animals/animal.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase';



@Injectable()
export class AnimalListService{    

    private animalListRef = this.db.list<any>('animal-list');

    constructor(private db: AngularFireDatabase){
    }

    private basePath:string = '/uploads';

    // https://angularfirebase.com/lessons/angular-file-uploads-to-firebase-storage/
    pushImageUpload(result){
        var pictures = firebase.storage().ref("pictures");
        var image = `data:image/jpeg;base64,${result}`;
        pictures.putString(image, "data_url");
    }

    shoppingList(){
        firebase.database().ref("animal-list")
    }
    /**
     * Return die animal-list der Datanbank
     */
    getShoppingList(){
        return this.animalListRef;
    }

    // , imageUrl muss noch hinzugefügt werden
    addAnimal(name, age, date){
        return this.animalListRef.push({
            name: name,
            age: age,
            date: date
            //image: imageUrl
        });
    }
}