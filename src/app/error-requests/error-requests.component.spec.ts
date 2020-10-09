import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRequestsComponent } from './error-requests.component';

describe('ErrorRequestsComponent', () => {
  let component: ErrorRequestsComponent;
  let fixture: ComponentFixture<ErrorRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
