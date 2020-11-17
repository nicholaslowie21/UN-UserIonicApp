import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestTestimonialPage } from './request-testimonial.page';

describe('RequestTestimonialPage', () => {
  let component: RequestTestimonialPage;
  let fixture: ComponentFixture<RequestTestimonialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTestimonialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestTestimonialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
