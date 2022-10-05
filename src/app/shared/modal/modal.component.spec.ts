import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.id = 'ID';
    fixture.detectChanges();
  });

  it('expects "init" to setup', () => {
    spyOn(component.doc.body, 'appendChild').and.stub();
    spyOn(component['element'], 'addEventListener').and.stub();
    spyOn(component['modalService'], 'add');

    component.init();
    expect(component.doc.body.appendChild).toHaveBeenCalledWith(component['element']);
    expect(component['element'].addEventListener).toHaveBeenCalledWith('click', component.handleClick);
    expect(component['modalService'].add).toHaveBeenCalled();
  });

  it('expects "destroy" to cleanup', () => {
    spyOn(component['modalService'], 'remove');
    spyOn(component['element'], 'remove').and.stub();

    component.destroy();
    expect(component['modalService'].remove).toHaveBeenCalledWith('ID');
    expect(component['element'].remove).toHaveBeenCalled();
  });

  it('expects "handleClick" to not close if class is not included', () => {
    const element: any = {
      target: {
        className: 'NONE'
      }
    };
    spyOn(component, 'close').and.stub();

    component.handleClick(element);
    expect(component.close).not.toHaveBeenCalled();
  });

  it('expects "handleClick" to close if the right class is included', () => {
    const element: any = {
      target: {
        className: 'days-modal'
      }
    };
    spyOn(component, 'close').and.stub();

    component.handleClick(element);
    expect(component.close).toHaveBeenCalled();
  });

  it('expects "open" to change the element and add class', () => {
    spyOn(component.doc.body.classList, 'add').and.stub();

    component.open();
    expect(component['element'].style.display).toEqual('block');
    expect(component.doc.body.classList.add).toHaveBeenCalledWith('days-modal-open');
  });

  it('expects "close" to change the element and remove class', () => {
    spyOn(component.doc.body.classList, 'remove').and.stub();

    component.close();
    expect(component['element'].style.display).toEqual('none');
    expect(component.doc.body.classList.remove).toHaveBeenCalledWith('days-modal-open');
  });

});
