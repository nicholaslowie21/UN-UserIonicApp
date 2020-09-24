import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateResourceNeedsPage } from './update-resource-needs.page';

describe('UpdateResourceNeedsPage', () => {
  let component: UpdateResourceNeedsPage;
  let fixture: ComponentFixture<UpdateResourceNeedsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateResourceNeedsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateResourceNeedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
