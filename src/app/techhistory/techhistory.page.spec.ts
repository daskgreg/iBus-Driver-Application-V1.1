import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechhistoryPage } from './techhistory.page';

describe('TechhistoryPage', () => {
  let component: TechhistoryPage;
  let fixture: ComponentFixture<TechhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechhistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
