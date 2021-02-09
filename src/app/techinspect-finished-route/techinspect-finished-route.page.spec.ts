import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechinspectFinishedRoutePage } from './techinspect-finished-route.page';

describe('TechinspectFinishedRoutePage', () => {
  let component: TechinspectFinishedRoutePage;
  let fixture: ComponentFixture<TechinspectFinishedRoutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechinspectFinishedRoutePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechinspectFinishedRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
