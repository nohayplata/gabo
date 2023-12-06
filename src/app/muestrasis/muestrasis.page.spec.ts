import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MuestrasisPage } from './muestrasis.page';

describe('MuestrasisPage', () => {
  let component: MuestrasisPage;
  let fixture: ComponentFixture<MuestrasisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MuestrasisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
