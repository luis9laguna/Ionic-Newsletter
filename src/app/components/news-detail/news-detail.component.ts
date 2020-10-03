import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';

import { Article } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {

  @Input() new: Article;
  @Input() i: number;
  @Input() localFavs;


  constructor( private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService) { }

  ngOnInit() {}

  getArticle(){
    const browser = this.iab.create(this.new.url, '_system'); 
  }

  async menu(){

    let favs;
    if(this.localFavs){

      favs ={
        text: 'Delete from favorites',
        icon: 'trash-outline',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.deleteNews( this.new );
        }
      };

    }else{
      favs ={
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.saveNews( this.new );
        }
      };
    }


    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albums',
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.new.title,
            this.new.source.name,
            '',
            this.new.url
          );
        }
      },
      favs, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
