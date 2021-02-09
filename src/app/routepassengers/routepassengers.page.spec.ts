import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutepassengersPage } from './routepassengers.page';

describe('RoutepassengersPage', () => {
  let component: RoutepassengersPage;
  let fixture: ComponentFixture<RoutepassengersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutepassengersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutepassengersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
