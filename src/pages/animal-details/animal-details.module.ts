import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalDetailsPage } from './animal-details';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AnimalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalDetailsPage),
    PipesModule
  ],
})
export class AnimalDetailsPageModule {}
