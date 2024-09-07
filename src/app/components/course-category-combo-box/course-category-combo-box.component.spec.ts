import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryComboBoxComponent } from './course-category-combo-box.component';

describe('CourseCategoryComboBoxComponent', () => {
  let component: CourseCategoryComboBoxComponent;
  let fixture: ComponentFixture<CourseCategoryComboBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCategoryComboBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategoryComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
