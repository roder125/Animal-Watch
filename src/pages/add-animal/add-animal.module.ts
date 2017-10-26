import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAnimalPage } from './add-animal';

@NgModule({
  declarations: [
    AddAnimalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAnimalPage),
  ],
})
export class AddAnimalPageModule {}
