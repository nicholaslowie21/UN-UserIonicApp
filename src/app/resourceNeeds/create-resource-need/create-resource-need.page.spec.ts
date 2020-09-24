import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateResourceNeedPage } from './create-resource-need.page';

describe('CreateResourceNeedPage', () => {
  let component: CreateResourceNeedPage;
  let fixture: ComponentFixture<CreateResourceNeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResourceNeedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateResourceNeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
