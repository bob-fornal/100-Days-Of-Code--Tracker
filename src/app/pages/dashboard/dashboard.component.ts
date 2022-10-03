
import { AfterViewInit, Component, ViewChild } from '@angular/core';

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

  toggleUseNotes = (): void => {
    const useNotes: boolean = !this._structure!.useNotes;
    this._structure!.useNotes = useNotes;
    this.storage.structureChange(this._structure!);
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

  closeNotesModal = (): void => {
    this._structure!.days[this.selectedIndex].note = this.selectedDay.note;
    this.storage.structureChange(this._structure!);
    this.modalService.close('getNotesModal');
  };

  selectFilename: string = '';
  saveData = (): void => {
    const date: string = (new Date()).toISOString().split('T')[0];
    this.selectFilename = '100DaysOfCode--' + date + '.json';
    this.modalService.open('getFilename');
  };

  closeGetFilename = (): void => {
    const filename: string = this.checkFilename(this.selectFilename);
    console.log(filename);

    const a = document.createElement('a');
    const blob = new Blob([JSON.stringify(this._structure!, null, 2)], { type: 'application/json' });
    a.href = URL.createObjectURL(blob);
    
    a.setAttribute('download', filename);
    console.log(filename);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.modalService.close('getFilename');
  };

  checkFilename = (name: string): string => {
    let [ filename, extension ] = name.split('.');
    console.log(name, filename, extension);
    return filename + (extension === undefined ? '.json' : extension);
  };

  loadData = (): void => {
    this.modalService.open('loadFile');
  };

  cancelLoadFile = (): void => {
    this.modalService.close('loadFile');
  };

  onFileDropped = (files: any): void => {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (event: any): void => {
      const result = JSON.parse(event.target.result);
      this._structure = result;
      this.storage.structureChange(this._structure!);
    };
    fileReader.readAsText(files.item(0));
    this.modalService.close('loadFile');
  };

}
