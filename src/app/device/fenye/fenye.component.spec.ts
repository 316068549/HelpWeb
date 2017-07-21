import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenyeComponent } from './fenye.component';

describe('FenyeComponent', () => {
  let component: FenyeComponent;
  let fixture: ComponentFixture<FenyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
