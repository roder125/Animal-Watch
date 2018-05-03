import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEntrysPage } from './my-entrys';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MyEntrysPage,
  ],
  imports: [
    IonicPageModule.forChild(MyEntrysPage),
    PipesModule
  ],
})
export class MyEntrysPageModule {}
