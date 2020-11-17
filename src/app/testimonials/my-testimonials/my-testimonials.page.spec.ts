import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyTestimonialsPage } from './my-testimonials.page';

describe('MyTestimonialsPage', () => {
  let component: MyTestimonialsPage;
  let fixture: ComponentFixture<MyTestimonialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTestimonialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTestimonialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
