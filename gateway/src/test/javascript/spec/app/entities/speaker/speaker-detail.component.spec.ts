/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { SpeakerDetailComponent } from '../../../../../../main/webapp/app/entities/speaker/speaker-detail.component';
import { SpeakerService } from '../../../../../../main/webapp/app/entities/speaker/speaker.service';
import { Speaker } from '../../../../../../main/webapp/app/entities/speaker/speaker.model';

describe('Component Tests', () => {

    describe('Speaker Management Detail Component', () => {
        let comp: SpeakerDetailComponent;
        let fixture: ComponentFixture<SpeakerDetailComponent>;
        let service: SpeakerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SpeakerDetailComponent],
                providers: [
                    SpeakerService
                ]
            })
            .overrideTemplate(SpeakerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpeakerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpeakerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Speaker(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.speaker).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
