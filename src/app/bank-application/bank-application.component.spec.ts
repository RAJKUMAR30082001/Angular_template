import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankApplicationComponent } from './bank-application.component';

describe('BankApplicationComponent', () => {
  let component: BankApplicationComponent;
  let fixture: ComponentFixture<BankApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
