import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProdcutoComponent } from './table-prodcuto.component';

describe('TableProdcutoComponent', () => {
  let component: TableProdcutoComponent;
  let fixture: ComponentFixture<TableProdcutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProdcutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProdcutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
