import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAddEditComponent } from './visitor-add-edit.component';

describe('VisitorAddEditComponent', () => {
  let component: VisitorAddEditComponent;
  let fixture: ComponentFixture<VisitorAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
