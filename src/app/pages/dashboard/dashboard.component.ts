
import { Component } from '@angular/core';

import { ModalService } from '@shared/modal';
import { StorageService } from '@core/services/storage.service';

import { Item } from '@core/interfaces/item';
import { Structure } from '@core/interfaces/strucuture';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {'class': 'wrapper--content'}
})
export class DashboardComponent {

  useNotes: boolean = true;

  days: Array<Item> = [];
  _structure: Structure | null = null;

  constructor(
    private modalService: ModalService,
    private storage: StorageService
  ) {
    this.storage.structure.subscribe(this.handleStructureChange);
  }

  handleStructureChange = (structure: Structure): void => {
    this._structure = { ...structure };
    this.days = structure.days;
    this.useNotes = structure.useNotes;
  };

  selectedDay: Item = { number: -1, done: false, note: '' };
  selectedIndex: number = -1;
  toggleDay = (index: number): void => {
    const isDone: boolean = !this._structure!.days[index].done;

    this._structure!.days[index].done = isDone;
    if (this.useNotes === false) {
      this.storage.structureChange(this._structure!);
    } else if (isDone === true && this._structure!.days[index].note === '') {
      this.selectedDay = { ...this._structure!.days[index] };
      this.selectedIndex = index;
      this.modalService.open('getNotesModal');
    } else {
      this._structure!.days[index].note = '';
      this.storage.structureChange(this._structure!);
    }
  };

  closeNotesModal = () => {
    this._structure!.days[this.selectedIndex].note = this.selectedDay.note;
    this.storage.structureChange(this._structure!);
    this.modalService.close('getNotesModal');
  };

}
