import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadProjectPicPage } from './upload-project-pic.page';

describe('UploadProjectPicPage', () => {
  let component: UploadProjectPicPage;
  let fixture: ComponentFixture<UploadProjectPicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProjectPicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadProjectPicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
