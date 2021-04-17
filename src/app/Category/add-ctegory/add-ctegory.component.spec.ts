import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCtegoryComponent } from './add-ctegory.component';

describe('AddCtegoryComponent', () => {
  let component: AddCtegoryComponent;
  let fixture: ComponentFixture<AddCtegoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCtegoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCtegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
