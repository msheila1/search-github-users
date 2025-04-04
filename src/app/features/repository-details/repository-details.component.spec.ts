import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RepositoryDetailsComponent } from './repository-details.component';

describe('RepositoryDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepositoryDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } } // 🔹 Mock de ActivatedRoute
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RepositoryDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
