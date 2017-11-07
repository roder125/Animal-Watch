import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalDetailsPage } from './animal-details';

@NgModule({
  declarations: [
    AnimalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalDetailsPage),
  ],
})
export class AnimalDetailsPageModule {}
