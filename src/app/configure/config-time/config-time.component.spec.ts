import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTimeComponent } from './config-time.component';

describe('ConfigTimeComponent', () => {
  let component: ConfigTimeComponent;
  let fixture: ComponentFixture<ConfigTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
