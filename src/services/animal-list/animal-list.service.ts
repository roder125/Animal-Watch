import { Animal } from './../../models/add-animals/animal.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";




@Injectable()
export class AnimalListService{

    private animalListRef = this.db.list<Animal>('animal-list');

    constructor(private db: AngularFireDatabase){}

    /**
     * Return die animal-list der Datanbank
     */
    getShoppingList(){
        return this.animalListRef;
    }

    addAnimal(animal: Animal){
        return this.animalListRef.push(animal);
    }
}