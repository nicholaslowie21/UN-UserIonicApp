import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjrequestModalPage } from './projrequest-modal.page';

describe('ProjrequestModalPage', () => {
  let component: ProjrequestModalPage;
  let fixture: ComponentFixture<ProjrequestModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjrequestModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjrequestModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
