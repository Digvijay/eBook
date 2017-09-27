import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { User } from 'app/user/main/user.model';

@Injectable()
export class DataService {
    private dataObs$ = new Subject();

    getData() {
        return this.dataObs$;
    }

    updateData(data: any) {
        if(data) {
            localStorage.setItem('currentUser', JSON.stringify(data as User));
            this.dataObs$.next(data);
        } else {
            localStorage.removeItem('currentUser');
            this.dataObs$.next(null);
        }

    }
}