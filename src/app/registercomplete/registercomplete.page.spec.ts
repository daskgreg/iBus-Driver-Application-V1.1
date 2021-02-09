import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistercompletePage } from './registercomplete.page';

describe('RegistercompletePage', () => {
  let component: RegistercompletePage;
  let fixture: ComponentFixture<RegistercompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistercompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistercompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
