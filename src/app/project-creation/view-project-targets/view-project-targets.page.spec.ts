import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewProjectTargetsPage } from './view-project-targets.page';

describe('ViewProjectTargetsPage', () => {
  let component: ViewProjectTargetsPage;
  let fixture: ComponentFixture<ViewProjectTargetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectTargetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProjectTargetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
