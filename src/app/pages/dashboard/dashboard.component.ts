
import { Component } from '@angular/core';

import { ModalService } from '@shared/modal';
import { StorageService } from '@core/services/storage.service';

import { Goal } from '@core/interfaces/goal';
import { Item } from '@core/interfaces/item';
import { Structure } from '@core/interfaces/strucuture';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {'class': 'wrapper--content'}
})
export class DashboardComponent {

  useGoals: boolean = true;
  useNotes: boolean = true;

  days: Array<Item> = [];
  goals: Array<Goal> = [];
  _structure: Structure | null = null;

  constructor(
    private modalService: ModalService,
    private storage: StorageService
  ) {
    this.storage.structure.subscribe(this.handleStructureChange);
  }

  handleStructureChange = (structure: Structure): void => {
    this._structure = { ...structure };
    
    this.useGoals = structure.useGoals;
    this.useNotes = structure.useNotes;
    
    this.days = structure.days;
    this.goals = structure.goals;
  };

  toggleUseGoals = (): void => {
    const useGoals: boolean = !this._structure!.useGoals;
    this._structure!.useGoals = useGoals;
    this.storage.structureChange(this._structure!);
  };

  toggleUseNotes = (): void => {
    const useNotes: boolean = !this._structure!.useNotes;
    this._structure!.useNotes = useNotes;
    this.storage.structureChange(this._structure!);
  };

  toggleGoal = (index: number): void => {
    this.goals[index].done = !this.goals[index].done;
    this._structure!.goals = [ ...this.goals ];
    this.storage.structureChange(this._structure!);
  };

  selectedDay: Item = { number: -1, done: false, note: '' };
  selectedIndex: number = -1;
  toggleDay = (index: number): void => {
    const isDone: boolean = !this._structure!.days[index].done;

    this._structure!.days[index].done = isDone;
    switch (true) {
      case (this.useNotes === false):
        this.storage.structureChange(this._structure!);
        break;
      case (isDone === true && this._structure!.days[index].note === ''):
        this.selectedDay = { ...this._structure!.days[index] };
        this.selectedIndex = index;
        this.modalService.open('getNotesModal');
        break;
      default:
        this._structure!.days[index].note = '';
        this.storage.structureChange(this._structure!);
        break;
    }
  };

  closeNotesModal = (): void => {
    this._structure!.days[this.selectedIndex].note = this.selectedDay.note;
    this.storage.structureChange(this._structure!);
    this.modalService.close('getNotesModal');
  };

  selectFilename: string = '';
  saveData = (): void => {
    this.setFilename(new Date().toISOString().split('T')[0]);
    this.modalService.open('getFilename');
  };

  setFilename = (date: string): void => {
    this.selectFilename = '100DaysOfCode--' + date + '.json';
  };

  closeGetFilename = (): void => {
    const filename: string = this.checkFilename(this.selectFilename);

    const a = document.createElement('a');
    this.processDownload(document, a, filename);

    this.modalService.close('getFilename');
  };

  processDownload = (document: any, a: any, filename: string): void => {
    const blob = new Blob([JSON.stringify(this._structure!, null, 2)], { type: 'application/json' });
    a.href = URL.createObjectURL(blob);
    a.setAttribute('download', filename);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  checkFilename = (name: string): string => {
    let [ filename, extension ] = name.split('.');
    return filename + (extension === undefined ? '.json' : '.' + extension);
  };

  loadData = (): void => {
    this.modalService.open('loadFile');
  };

  cancelLoadFile = (): void => {
    this.modalService.close('loadFile');
  };

  onFileDropped = (files: any): void => {
    this.processFileRead(FileReader, files);
    this.modalService.close('loadFile');
  };

  processFileRead = (FileReader: any, files: any): void => {
    const fileReader: any = new FileReader();
    this.processFileReader(fileReader, files);
  };

  processFileReader = (fileReader: any, files: any): void => {
    fileReader.onload = this.processOnLoad;
    fileReader.readAsText(files.item(0));
  };

  processOnLoad = (event: any): void => {
    const result = JSON.parse(event.target.result);
    this._structure = result;
    this.storage.structureChange(this._structure!);
  };

}
