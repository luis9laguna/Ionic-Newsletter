import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
  news: Article[] = [];
  constructor( private newService: NewsService) {}


  ngOnInit(){
   this.segment.value = this.categories[0];
    this.getNews( this.segment.value );
  }

  getNews( category: string, event? ){
    this.newService.getCategory( category )
    .subscribe( res => {
      this.news.push(...res.articles);   
      if( res.articles.length == 0 ){
        event.target.disabled = true;
        return;
      }
      if( event ){
        event.target.complete();
      }
    });
  }

  categoryChange( event ){
    this.news = [];
    this.getNews( event.detail.value );
  }

  loadData( event ){
    this.getNews( this.segment.value, event );
  }

}
