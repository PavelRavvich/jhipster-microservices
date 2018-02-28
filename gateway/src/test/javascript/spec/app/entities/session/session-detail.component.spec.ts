/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { SessionDetailComponent } from '../../../../../../main/webapp/app/entities/session/session-detail.component';
import { SessionService } from '../../../../../../main/webapp/app/entities/session/session.service';
import { Session } from '../../../../../../main/webapp/app/entities/session/session.model';

describe('Component Tests', () => {

    describe('Session Management Detail Component', () => {
        let comp: SessionDetailComponent;
        let fixture: ComponentFixture<SessionDetailComponent>;
        let service: SessionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SessionDetailComponent],
                providers: [
                    SessionService
                ]
            })
            .overrideTemplate(SessionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SessionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SessionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Session(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.session).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
