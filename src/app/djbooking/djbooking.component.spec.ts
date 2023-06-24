import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DjbookingComponent } from './djbooking.component';

describe('DjbookingComponent', () => {
  let component: DjbookingComponent;
  let fixture: ComponentFixture<DjbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DjbookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DjbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
