import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortSelectorComponent } from './sort-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SortSelectorComponent', () => {
  let component: SortSelectorComponent;
  let fixture: ComponentFixture<SortSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatSelectModule, FormsModule],
      declarations: [SortSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir as opções de ordenação', () => {
    const matSelect = fixture.debugElement.query(By.css('mat-select'));
    expect(matSelect).toBeTruthy();
  });

  it('deve emitir evento ao alterar a ordenação', () => {
    spyOn(component.sortChange, 'emit');

    component.onSortChange('name-asc');
    expect(component.sortChange.emit).toHaveBeenCalledWith('name-asc');
  });
});
