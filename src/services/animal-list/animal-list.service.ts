import { Animal } from './../../models/add-animals/animal.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";




@Injectable()
export class AnimalListService{    

    private animalListRef = this.db.list<any>('animal-list');

    constructor(private db: AngularFireDatabase){}

    /**
     * Return die animal-list der Datanbank
     */
    getShoppingList(){
        return this.animalListRef;
    }

    // , imageUrl muss noch hinzugefügt werden
    addAnimal(name, age){
        return this.animalListRef.push({
            name: name,
            age: age,
            //image: imageUrl
        });
    }
}