import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadResourcePicPage } from './upload-resource-pic.page';

describe('UploadResourcePicPage', () => {
  let component: UploadResourcePicPage;
  let fixture: ComponentFixture<UploadResourcePicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadResourcePicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadResourcePicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
