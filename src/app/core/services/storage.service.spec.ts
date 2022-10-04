import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

import { Structure } from '@core/interfaces/strucuture';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('expects "generateBlank" to generate an object', () => {
    const numberOfDays: number = 1;
    const expected: Structure = {
      useGoals: true,
      useNotes: true,
      days: [{ number: 1, note: '', done: false }],
      goals: []
    };

    const result: Structure = service.generateBlank(numberOfDays);
    expect(result).toEqual(expected);
  });

  it('expects "structureChange" to take a structure add it to _structure and store it', () => {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [{ number: 1, note: '', done: false }],
      goals: []
    };
    spyOn(service.structure, 'next').and.callThrough();
    spyOn(service, 'storeStructure').and.stub();

    service.structureChange(structure);
    expect(service.structure.next).toHaveBeenCalledWith(structure);
    expect(service.storeStructure).toHaveBeenCalledWith(structure);
  });

  it('expects "storeStructure" to set the localStorage item', () => {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [{ number: 1, note: '', done: false }],
      goals: []
    };
    const structureString: string = JSON.stringify(structure);
    const key: string = service.key;
    spyOn(service.storage, 'setItem').and.stub();

    service.storeStructure(structure);
    expect(service.storage.setItem).toHaveBeenCalledWith(key, structureString);
  });

  it('expects "loadStructure" to return undefined if there is no item', () => {
    spyOn(service.storage, 'getItem').and.returnValue(null);
    spyOn(service.structure, 'next').and.stub();
    
    const result: any = service.loadStructure();
    expect(result).toBeUndefined();
    expect(service.structure.next).not.toHaveBeenCalled();
  });

  it('expects "loadStructure" to set structure with the stored value', () => {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [{ number: 1, note: '', done: false }],
      goals: []
    };
    const structureString: string = JSON.stringify(structure);
    spyOn(service.storage, 'getItem').and.returnValue(structureString);
    spyOn(service.structure, 'next').and.stub();

    service.loadStructure();
    expect(service.structure.next).toHaveBeenCalledWith(structure);
  });

});
