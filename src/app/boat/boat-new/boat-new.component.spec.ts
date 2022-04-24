import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatNewComponent } from './boat-new.component';

describe('BoatNewComponent', () => {
  let component: BoatNewComponent;
  let fixture: ComponentFixture<BoatNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
