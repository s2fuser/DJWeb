import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualToasterComponent } from './manual-toaster.component';

describe('ManualToasterComponent', () => {
  let component: ManualToasterComponent;
  let fixture: ComponentFixture<ManualToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualToasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
