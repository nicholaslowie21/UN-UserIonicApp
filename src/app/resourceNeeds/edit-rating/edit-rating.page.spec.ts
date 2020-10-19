import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRatingPage } from './edit-rating.page';

describe('EditRatingPage', () => {
  let component: EditRatingPage;
  let fixture: ComponentFixture<EditRatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRatingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
