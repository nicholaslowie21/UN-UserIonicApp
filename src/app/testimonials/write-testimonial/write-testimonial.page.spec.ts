import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WriteTestimonialPage } from './write-testimonial.page';

describe('WriteTestimonialPage', () => {
  let component: WriteTestimonialPage;
  let fixture: ComponentFixture<WriteTestimonialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteTestimonialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WriteTestimonialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
