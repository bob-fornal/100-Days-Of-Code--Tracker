
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { GoalsComponent } from './goals.component';

import { AppTitleComponent } from '@shared/_spec-tools/components/app-title.component.spec';
import { DaysModalComponent } from '@shared/_spec-tools/components/days-modal.component.spec';

import { Goal } from '@core/interfaces/goal';
import { Structure } from '@core/interfaces/strucuture';

describe('GoalsComponent', () => {
  let component: GoalsComponent;
  let fixture: ComponentFixture<GoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        GoalsComponent,

        AppTitleComponent,
        DaysModalComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('expects "handleStructureChange" to take a structure and set the appropriate variables', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };

    component.handleStructureChange(structure);
    expect(component._structure).toEqual(structure);
    expect(component.goals).toEqual(structure.goals);
  });

  it('expects "onDragStart" to set dragging index', () => {
    const index: number = 1;

    component.onDragStart(index);
    expect(component.draggingIndex).toEqual(1);
  });

  it('expects "onDragEnter" to do nothing if dragging index equals new index', () => {
    const index: number = 1;
    component.draggingIndex = 1;
    spyOn(component, 'reorderItems').and.stub();

    component.onDragEnter(index);
    expect(component.reorderItems).not.toHaveBeenCalled();
  });

  it('expects "onDragEnter" to reorder items if dragging index does not equal new index', () => {
    const index: number = 1;
    component.draggingIndex = 0;
    spyOn(component, 'reorderItems').and.stub();

    component.onDragEnter(index);
    expect(component.reorderItems).toHaveBeenCalledWith(0, 1);
  });

  it('expects "onDragEnd" to clear the dragging index and store data', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    component._structure = structure;
    component.goals = structure.goals;
    spyOn(component['storage'], 'storeStructure').and.stub();
    component.draggingIndex = 0;

    component.onDragEnd();
    expect(component.draggingIndex).toEqual(-1);
    expect(component['storage'].storeStructure).toHaveBeenCalled();
  });

  it('expects "reorderItems" to adjust the goals', () => {
    const goals: Array<Goal> = [
      { description: 'first', done: false },
      { description: 'second', done: false },
      { description: 'third', done: false },
      { description: 'fourth', done: false }
    ];
    const expected: Array<Goal> = [
      { description: 'first', done: false },
      { description: 'third', done: false },
      { description: 'second', done: false },
      { description: 'fourth', done: false }
    ];
    component.goals = goals;

    component.reorderItems(1, 2);
    expect(component.goals).toEqual(expected);
  });

  it('expects "addGoal" to clear the newGoal variable and open the modal', () => {
    const expected: Goal = { description: '', done: false };
    component.newGoal = { description: 'DESCRIPTION', done: false };
    spyOn(component['modalService'], 'open').and.stub();

    component.addGoal();
    expect(component.newGoal).toEqual(expected);
    expect(component['modalService'].open).toHaveBeenCalledWith('getGoal');
  });

  it('expects "closeGoalModal" to  add the new goal, store, and close the modal', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: []
    };
    component._structure = structure;
    component.goals = structure.goals;
    component.newGoal = { description: 'NEW-GOAL', done: false };
    spyOn(component['storage'], 'storeStructure').and.stub();
    spyOn(component['modalService'], 'close').and.stub();

    component.closeGoalModal();
    expect(component['storage'].storeStructure).toHaveBeenCalledWith(structure);
    expect(component['modalService'].close).toHaveBeenCalledOnceWith('getGoal');
  });

  it('expects "toggleGoal" to change the indexed done and store', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    component._structure = structure;
    component.goals = structure.goals;
    spyOn(component['storage'], 'storeStructure').and.stub();
    const index: number = 0;

    component.toggleGoal(index);
    expect(component._structure.goals[index].done).toEqual(true);
    expect(component['storage'].storeStructure).toHaveBeenCalledWith(structure);
  });

  it('expects "deleteGoal" to delete and store', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    component._structure = structure;
    component.goals = structure.goals;
    spyOn(component['storage'], 'storeStructure').and.stub();
    const index: number = 0;

    component.deleteGoal(index);
    expect(component._structure.goals.length).toEqual(0);
    expect(component['storage'].storeStructure).toHaveBeenCalledWith(structure);
  });

  it('expects "editGoal" to set the index, newGoal, and open the modal', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    component._structure = structure;
    component.goals = structure.goals;
    spyOn(component['modalService'], 'open').and.stub();
    const index: number = 0;

    component.editGoal(index);
    expect(component.editIndex).toEqual(0);
    expect(component.newGoal).toEqual({ description: 'DESCRIPTION', done: false });
    expect(component['modalService'].open).toHaveBeenCalledWith('changeGoal');
  });

  it('expects "closeChangeGoalModal" to update the goal, store, and close the modal', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    component._structure = structure;
    component.goals = structure.goals;
    component.editIndex = 0;
    component.newGoal = { description: 'NEW-DESCRIPTION', done: false };
    spyOn(component['storage'], 'storeStructure').and.stub();
    spyOn(component['modalService'], 'close').and.stub();

    component.closeChangeGoalModal();
    expect(component._structure.goals[0].description).toEqual('NEW-DESCRIPTION');
    expect(component['storage'].storeStructure).toHaveBeenCalledWith(structure);
    expect(component['modalService'].close).toHaveBeenCalledWith('changeGoal');
  });

});
