import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAnnouncementDetailsPage } from './view-announcement-details.page';

describe('ViewAnnouncementDetailsPage', () => {
  let component: ViewAnnouncementDetailsPage;
  let fixture: ComponentFixture<ViewAnnouncementDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAnnouncementDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAnnouncementDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
