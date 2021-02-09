import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {
	 pages = [
    {
      title: 'routelist',
      url: '/home2/routelist'
    },
    {
      title: 'wallet',
      url: '/home2/wallet',
    },
    {
      title:'routehistory',
      url:'/home2/routehistory',
    },
    {
      title: 'settings',
      url: '/home2/settings'
    },
  ];
  selectedPath = '';

  constructor(private router: Router,private menu: MenuController) { 
  	 this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    
    });
  }

  ngOnInit() {
  }

}
