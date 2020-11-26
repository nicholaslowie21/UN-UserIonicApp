import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PurchasePaidresourcePage } from './purchase-paidresource.page';

describe('PurchasePaidresourcePage', () => {
  let component: PurchasePaidresourcePage;
  let fixture: ComponentFixture<PurchasePaidresourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePaidresourcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasePaidresourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
