import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menu: Array<any> = [
    { link: '/dashboard', title: 'Dashboard' },
    { link: '/detail', title: 'Details' },
    { link: '/goals', title: 'Goals' }
  ];
}
