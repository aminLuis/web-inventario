import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductoComponent } from './table-producto.component';

describe('TableProductoComponent', () => {
  let component: TableProductoComponent;
  let fixture: ComponentFixture<TableProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TableProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
