import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewResourcePage } from './view-resource.page';

describe('ViewResourcePage', () => {
  let component: ViewResourcePage;
  let fixture: ComponentFixture<ViewResourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResourcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
