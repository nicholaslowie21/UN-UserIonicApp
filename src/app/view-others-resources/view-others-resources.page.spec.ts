import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewOthersResourcesPage } from './view-others-resources.page';

describe('ViewOthersResourcesPage', () => {
  let component: ViewOthersResourcesPage;
  let fixture: ComponentFixture<ViewOthersResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOthersResourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOthersResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
