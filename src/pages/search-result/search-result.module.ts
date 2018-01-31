import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultPage } from './search-result';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SearchResultPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchResultPage),
    PipesModule
  ],
})
export class SearchResultPageModule {}
