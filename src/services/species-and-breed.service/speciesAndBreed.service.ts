import { Injectable } from '@angular/core';


@Injectable()
export class SpeciesAndBreedService{
    speciesArray = [
        'Hund',
        'Katze',
        'Maus',
        'Ratte',
        'Pferd'
      ]
      dogBreedArray = [
        "Chihuahua",
        "Zwergspitz",
        "Prager Rattler",
        "Yorkshire Terrier",
        "Dackel",
        "Russkiy Toy",
        "Pekingese",
        "Bolonka Zwetna",
        "Austr. Silky Terrier",
        "Malteser",
        "Norfolk Terrier",
        "Scottish Terrier",
        "Shih Tzu",
        "Havaneser",
        "Lhasa Apso",
        "Kleinspitz",
        "Papillon",
        "Zwergpinscher",
        "Schipperke",
        "Affenpinscher",
        "West H.W. Terrier",
        "Welsh Corgi Pembroke",
        "Welsh Corgi Cardigan",
        "Jack Russell Terrier",
        "Cairn Terrier",
        "Cesky Terrier",
        "Chinese Crested",
        "Mops",
        "Franz. Bulldogge",
        "Zwergschnauzer",
        "C. King Ch. Spaniel",
        "Border Terrier",
        "Parson Russell Terrier",
        "Ital. Windspiel",
        "Fox Terrier",
        "Shetland Sheepdog"
        // to be continued...
      ]
      catBreedArray = [
        'Nacktkatze',
        'Tiger',
        'Hauskatze'
      ]

    constructor(){}

    getSpeciesArray(){
        return this.speciesArray;
    }

    getDogBreedArray(){
        return this.dogBreedArray;
    }
    getCatBreedArray(){
        return this.catBreedArray;
    }
}