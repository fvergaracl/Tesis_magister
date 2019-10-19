import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosttestComponent } from './posttest.component';

describe('PosttestComponent', () => {
  let component: PosttestComponent;
  let fixture: ComponentFixture<PosttestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosttestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
