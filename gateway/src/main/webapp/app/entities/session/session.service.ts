import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Session } from './session.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Session>;

@Injectable()
export class SessionService {

    private resourceUrl =  SERVER_API_URL + 'conference/api/sessions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(session: Session): Observable<EntityResponseType> {
        const copy = this.convert(session);
        return this.http.post<Session>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(session: Session): Observable<EntityResponseType> {
        const copy = this.convert(session);
        return this.http.put<Session>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Session>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Session[]>> {
        const options = createRequestOption(req);
        return this.http.get<Session[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Session[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Session = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Session[]>): HttpResponse<Session[]> {
        const jsonResponse: Session[] = res.body;
        const body: Session[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Session.
     */
    private convertItemFromServer(session: Session): Session {
        const copy: Session = Object.assign({}, session);
        copy.startDateTime = this.dateUtils
            .convertDateTimeFromServer(session.startDateTime);
        copy.endDateTime = this.dateUtils
            .convertDateTimeFromServer(session.endDateTime);
        return copy;
    }

    /**
     * Convert a Session to a JSON which can be sent to the server.
     */
    private convert(session: Session): Session {
        const copy: Session = Object.assign({}, session);

        copy.startDateTime = this.dateUtils.toDate(session.startDateTime);

        copy.endDateTime = this.dateUtils.toDate(session.endDateTime);
        return copy;
    }
}
