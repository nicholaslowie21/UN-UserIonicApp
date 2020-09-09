import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyResourcesPage } from './my-resources.page';

describe('MyResourcesPage', () => {
  let component: MyResourcesPage;
  let fixture: ComponentFixture<MyResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyResourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
