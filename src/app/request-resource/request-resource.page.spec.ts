import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestResourcePage } from './request-resource.page';

describe('RequestResourcePage', () => {
  let component: RequestResourcePage;
  let fixture: ComponentFixture<RequestResourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestResourcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
