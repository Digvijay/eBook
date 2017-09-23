import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookFormComponent } from './ebook-form.component';

describe('EbookFormComponent', () => {
  let component: EbookFormComponent;
  let fixture: ComponentFixture<EbookFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbookFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
