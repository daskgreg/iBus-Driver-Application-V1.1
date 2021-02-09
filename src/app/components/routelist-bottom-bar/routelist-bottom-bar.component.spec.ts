import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutelistBottomBarComponent } from './routelist-bottom-bar.component';

describe('RoutelistBottomBarComponent', () => {
  let component: RoutelistBottomBarComponent;
  let fixture: ComponentFixture<RoutelistBottomBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutelistBottomBarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutelistBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
