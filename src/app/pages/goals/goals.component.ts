
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
}
