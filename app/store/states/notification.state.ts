import { Shelter } from '../../common/models/Shelter';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { IAppState } from '../app.state';

export class NotificationState {

    static NAMESPACE = 'NotificationState';

    static ActionTypes = {
        GET: `${NotificationState.NAMESPACE} Get`,
        GET_SUCCESS: `${NotificationState.NAMESPACE} Get Success`,
        GET_FAILED: `${NotificationState.NAMESPACE} Get Failed`,
    };

    /**
     * The collection of notifications
     */
    notifications: any[];
    /**
     * The loading state of the data
     */
    loading: boolean;

    static state$(state$: Observable<IAppState>): Observable<NotificationState> {
        return state$.select(state => state.notifications);
    }

    static getNotifications(state$: Observable<NotificationState>) {
        return state$.select(state => state.notifications);
    }

    constructor(options: NotificationState = <NotificationState>{}) {
        this.notifications = Array.isArray(options.notifications) ?
            options.notifications : [0, 0, 0, 0]; // Testing
        this.loading = false;
    }

}

export const getNotifications: any = compose(NotificationState.getNotifications, NotificationState.state$);
