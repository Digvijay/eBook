import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EBookComponent } from './ebook.component';

describe('EBookComponent', () => {
  let component: EBookComponent;
  let fixture: ComponentFixture<EBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
