
import { Component, OnInit } from '@angular/core';

import { Item } from '@core/interfaces/item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {'class': 'wrapper--content'}
})
export class DashboardComponent implements OnInit {

  days: Array<Item> = [];

  constructor() {
    for (let i = 0, len = 100; i < len; i++) {
      this.days.push({ number: i + 1, done: false });
    }
    this.days[0].done = true;
    this.days[1].done = true;
    this.days[2].done = true;
  }

  ngOnInit(): void {
  }

  selectDay = (index: number): void => {
    this.days[index].done = true;
  };

}
