import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DjbookingListComponent } from './djbooking-list.component';

describe('DjbookingListComponent', () => {
  let component: DjbookingListComponent;
  let fixture: ComponentFixture<DjbookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DjbookingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DjbookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
