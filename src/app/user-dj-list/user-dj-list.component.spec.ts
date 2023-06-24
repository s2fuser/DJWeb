import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDJListComponent } from './user-dj-list.component';

describe('UserDJListComponent', () => {
  let component: UserDJListComponent;
  let fixture: ComponentFixture<UserDJListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDJListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDJListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
