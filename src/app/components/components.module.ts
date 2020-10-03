import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    NewsComponent,
    NewsDetailComponent
  ],
  exports: [
    NewsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
