import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HomeComponent } from './home.component';
import { DogService } from '@shared/services/dog.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dogService: jasmine.SpyObj<DogService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DogService', ['getBreedImages', 'getSubBreedImages']);
    spy.getBreedImages.and.returnValue(of({ message: ['url1', 'url2'], status: 'success' }));
    spy.getSubBreedImages.and.returnValue(of({ message: ['url1', 'url2'], status: 'success' }));

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: DogService, useValue: spy }
      ]
    }).compileComponents();

    dogService = TestBed.inject(DogService) as jasmine.SpyObj<DogService>;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show scroll button when scrolled down', () => {
    // Arrange
    spyOnProperty(window, 'scrollY').and.returnValue(600);
    
    // Act
    component.checkScroll();
    
    // Assert
    expect(component.showScrollButton).toBeTruthy();
  });

  it('should hide scroll button when at top', () => {
    // Arrange
    spyOnProperty(window, 'scrollY').and.returnValue(0);
    
    // Act
    component.checkScroll();
    
    // Assert
    expect(component.showScrollButton).toBeFalsy();
  });

  it('should load breed images successfully', () => {
    // Arrange
    const params = { breed: 'husky' };
    
    // Act
    component.onSearch(params);
    
    // Assert
    expect(dogService.getBreedImages).toHaveBeenCalledWith('husky');
    expect(component.images).toEqual(['url1', 'url2']);
    expect(component.error).toBeNull();
  });

  it('should load sub-breed images successfully', () => {
    // Arrange
    const params = { breed: 'husky', subBreed: 'siberian' };
    
    // Act
    component.onSearch(params);
    
    // Assert
    expect(dogService.getSubBreedImages).toHaveBeenCalledWith('husky', 'siberian');
    expect(component.images).toEqual(['url1', 'url2']);
    expect(component.error).toBeNull();
  });

  it('should handle error when loading images fails', () => {
    // Arrange
    const params = { breed: 'husky' };
    dogService.getBreedImages.and.returnValue(throwError(() => new Error('Network error')));
    
    // Act
    component.onSearch(params);
    
    // Assert
    expect(component.error).toBe('Error loading images. Please try again.');
    expect(component.images).toEqual([]);
  });

  it('should scroll to top when scrollToTop is called', () => {
    // Arrange
    const scrollToSpy = spyOn(window, 'scrollTo');
    
    // Act
    component.scrollToTop();

  });
});
