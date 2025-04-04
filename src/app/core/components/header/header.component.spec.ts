import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when goToHome is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToHome();

    expect(navigateSpy).toHaveBeenCalledWith(['/']); 
    expect(navigateSpy.calls.count()).toBe(1);
  });

  it('should navigate to search when goToSearch is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToSearch();

    expect(navigateSpy).toHaveBeenCalledWith(['/search']); 
    expect(navigateSpy.calls.count()).toBe(1);
  });
});
