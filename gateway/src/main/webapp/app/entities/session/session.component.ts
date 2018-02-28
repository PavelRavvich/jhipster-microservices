import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Session } from './session.model';
import { SessionService } from './session.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-session',
    templateUrl: './session.component.html'
})
export class SessionComponent implements OnInit, OnDestroy {
sessions: Session[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sessionService: SessionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sessionService.query().subscribe(
            (res: HttpResponse<Session[]>) => {
                this.sessions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSessions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Session) {
        return item.id;
    }
    registerChangeInSessions() {
        this.eventSubscriber = this.eventManager.subscribe('sessionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
