import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAboutasComponent } from './faq-aboutas.component';

describe('FaqAboutasComponent', () => {
  let component: FaqAboutasComponent;
  let fixture: ComponentFixture<FaqAboutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqAboutasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqAboutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
