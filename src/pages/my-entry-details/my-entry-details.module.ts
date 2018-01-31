import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEntryDetailsPage } from './my-entry-details';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MyEntryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyEntryDetailsPage),
    PipesModule
  ],
})
export class MyEntryDetailsPageModule {}
