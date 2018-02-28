import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Speaker } from './speaker.model';
import { SpeakerPopupService } from './speaker-popup.service';
import { SpeakerService } from './speaker.service';
import { Session, SessionService } from '../session';

@Component({
    selector: 'jhi-speaker-dialog',
    templateUrl: './speaker-dialog.component.html'
})
export class SpeakerDialogComponent implements OnInit {

    speaker: Speaker;
    isSaving: boolean;

    sessions: Session[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private speakerService: SpeakerService,
        private sessionService: SessionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sessionService.query()
            .subscribe((res: HttpResponse<Session[]>) => { this.sessions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.speaker.id !== undefined) {
            this.subscribeToSaveResponse(
                this.speakerService.update(this.speaker));
        } else {
            this.subscribeToSaveResponse(
                this.speakerService.create(this.speaker));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Speaker>>) {
        result.subscribe((res: HttpResponse<Speaker>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Speaker) {
        this.eventManager.broadcast({ name: 'speakerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSessionById(index: number, item: Session) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-speaker-popup',
    template: ''
})
export class SpeakerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private speakerPopupService: SpeakerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.speakerPopupService
                    .open(SpeakerDialogComponent as Component, params['id']);
            } else {
                this.speakerPopupService
                    .open(SpeakerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
