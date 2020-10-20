import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyProjectRequestsPage } from './my-project-requests.page';

describe('MyProjectRequestsPage', () => {
  let component: MyProjectRequestsPage;
  let fixture: ComponentFixture<MyProjectRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProjectRequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyProjectRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
