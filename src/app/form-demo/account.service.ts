import { Observable } from "rxjs";

import { Account } from "./account";
import { Address } from "./address";

export class AccountService {
    public getAccount(id: number): Observable<Account> {
        const account = {
            createdOn: new Date(2017, 1, 13),
            name: "Bob's Auto",
            address: {
                contactName: "Steve Hanselman",
                contactPhone: "(555) 123-4567",
                contactEmail: "shansel@cheetahpaws.com",
                street1: "750 Layman St.",
                street2: null,
                street3: null,
                city: "Walburton",
                state: "WI",
                zip: null
            } as Address
        } as Account;
        return Observable.timer(1500).map((x) => account);
    }
}
