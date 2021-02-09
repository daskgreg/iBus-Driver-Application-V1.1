import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutedetailsPage } from './routedetails.page';

describe('RoutedetailsPage', () => {
  let component: RoutedetailsPage;
  let fixture: ComponentFixture<RoutedetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutedetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutedetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
