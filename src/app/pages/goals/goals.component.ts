
import { Component } from '@angular/core';

import { ModalService } from '@shared/modal/modal.service';
import { StorageService } from '@core/services/storage.service';

import { Goal } from '@core/interfaces/goal';
import { Structure } from '@core/interfaces/strucuture';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  host: {'class': 'wrapper--content'}
})
export class GoalsComponent {

  goals: Array<Goal> = [];
  _structure: Structure | null = null;

  draggingIndex: number = -1;

  constructor(
    private modalService: ModalService,
    private storage: StorageService
  ) {
    this.storage.structure.subscribe(this.handleStructureChange);
  }

  handleStructureChange = (structure: Structure): void => {
    this._structure = { ...structure };
    this.goals = structure.goals;
  };

  onDragStart = (fromIndex: number): void => {
    this.draggingIndex = fromIndex;
  };

  onDragEnter = (toIndex: number): void => {
    if (this.draggingIndex === toIndex) return;
    this.reorderItems(this.draggingIndex, toIndex);
  };

  onDragEnd = (): void => {
    this.draggingIndex = -1;
    this._structure!.goals = [ ...this.goals ];
    this.storage.storeStructure(this._structure!);
  };

  reorderItems = (fromIndex: number, toIndex: number): void => {
    const item = this.goals.splice(fromIndex, 1)[0];
    this.goals.splice(toIndex, 0, item);
    this.draggingIndex = toIndex;
  };

  newGoal: Goal = { description: '', done: false };
  addGoal = (): void => {
    this.newGoal = { description: '', done: false };
    this.modalService.open('getGoal');
  };

  closeGoalModal = (): void => {
    this.goals.push({ ...this.newGoal });
    this._structure!.goals = [ ...this.goals ];
    this.storage.storeStructure(this._structure!);
    this.modalService.close('getGoal');
  };

  toggleGoal = (index: number): void => {
    this.goals[index].done = !this.goals[index].done;
    this._structure!.goals = [ ...this.goals ];
    this.storage.storeStructure(this._structure!);
  };

  deleteGoal = (index: number): void => {
    this.goals.splice(index, 1);
    this._structure!.goals = [ ...this.goals ];
    this.storage.storeStructure(this._structure!);
  };

  editIndex: number = -1;
  editGoal = (index: number): void => {
    this.editIndex = index;
    this.newGoal = { ...this.goals[index] };
    this.modalService.open('changeGoal');
  };

  closeChangeGoalModal = (): void => {
    const index: number = this.editIndex;
    this.goals[index] = { ...this.newGoal };
    this._structure!.goals = [ ...this.goals ];
    this.storage.storeStructure(this._structure!);
    this.modalService.close('changeGoal');
  };

}
