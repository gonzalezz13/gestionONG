import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Directrices } from './directrices';

describe('Directrices', () => {
  let component: Directrices;
  let fixture: ComponentFixture<Directrices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Directrices],
    }).compileComponents();

    fixture = TestBed.createComponent(Directrices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
