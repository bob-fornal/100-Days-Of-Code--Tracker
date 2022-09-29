import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  host: {'class': 'wrapper--content'}
})
export class GoalsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
