import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualToasterErrorComponent } from './manual-toaster-error.component';

describe('ManualToasterErrorComponent', () => {
  let component: ManualToasterErrorComponent;
  let fixture: ComponentFixture<ManualToasterErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualToasterErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualToasterErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
