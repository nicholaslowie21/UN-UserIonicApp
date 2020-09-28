import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewOthersProjectsPage } from './view-others-projects.page';

describe('ViewOthersProjectsPage', () => {
  let component: ViewOthersProjectsPage;
  let fixture: ComponentFixture<ViewOthersProjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOthersProjectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOthersProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
