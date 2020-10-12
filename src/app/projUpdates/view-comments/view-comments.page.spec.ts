import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCommentsPage } from './view-comments.page';

describe('ViewCommentsPage', () => {
  let component: ViewCommentsPage;
  let fixture: ComponentFixture<ViewCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
