import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEntryDetailsPage } from './my-entry-details';

@NgModule({
  declarations: [
    MyEntryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyEntryDetailsPage),
  ],
})
export class MyEntryDetailsPageModule {}
