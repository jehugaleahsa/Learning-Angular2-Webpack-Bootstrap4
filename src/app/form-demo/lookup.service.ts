import { Observable } from "rxjs";

import { State } from "./state";

export class LookupService {
    public getStates(): Observable<State[]> {
        return Observable.timer(500).map((x) => [
            { abbreviation: "AL", name: "Alabama" } as State,
            { abbreviation: "AK", name: "Alaska" } as State,
            { abbreviation: "AS", name: "American Samoa" } as State,
            { abbreviation: "AZ", name: "Arizona" } as State,
            { abbreviation: "AR", name: "Arkansas" } as State,
            { abbreviation: "CA", name: "California" } as State,
            { abbreviation: "CO", name: "Colorado" } as State,
            { abbreviation: "CT", name: "Connecticut" } as State,
            { abbreviation: "DE", name: "Delaware" } as State,
            { abbreviation: "DC", name: "District of Columbia" } as State,
            { abbreviation: "FM", name: "Fed. States of Micronesia" } as State,
            { abbreviation: "FL", name: "Florida" } as State,
            { abbreviation: "GA", name: "Georgia" } as State,
            { abbreviation: "GU", name: "Guam" } as State,
            { abbreviation: "HI", name: "Hawaii" } as State,
            { abbreviation: "ID", name: "Idaho" } as State,
            { abbreviation: "IL", name: "Illinois" } as State,
            { abbreviation: "IN", name: "Indiana" } as State,
            { abbreviation: "IA", name: "Iowa" } as State,
            { abbreviation: "KS", name: "Kansas" } as State,
            { abbreviation: "KY", name: "Kentucky" } as State,
            { abbreviation: "LA", name: "Louisiana" } as State,
            { abbreviation: "ME", name: "Maine" } as State,
            { abbreviation: "MH", name: "Marshall Islands" } as State,
            { abbreviation: "MD", name: "Maryland" } as State,
            { abbreviation: "MA", name: "Massachusetts" } as State,
            { abbreviation: "MI", name: "Michigan" } as State,
            { abbreviation: "MN", name: "Minnesota" } as State,
            { abbreviation: "MS", name: "Mississippi" } as State,
            { abbreviation: "MO", name: "Missouri" } as State,
            { abbreviation: "MT", name: "Montana" } as State,
            { abbreviation: "NE", name: "Nebraska" } as State,
            { abbreviation: "NV", name: "Nevada" } as State,
            { abbreviation: "NH", name: "New Hampshire" } as State,
            { abbreviation: "NJ", name: "New Jersey" } as State,
            { abbreviation: "NM", name: "New Mexico" } as State,
            { abbreviation: "NY", name: "New York" } as State,
            { abbreviation: "NC", name: "North Carolina" } as State,
            { abbreviation: "ND", name: "North Dakota" } as State,
            { abbreviation: "MP", name: "Northern Mariana Is." } as State,
            { abbreviation: "OH", name: "Ohio" } as State,
            { abbreviation: "OK", name: "Oklahoma" } as State,
            { abbreviation: "OR", name: "Oregon" } as State,
            { abbreviation: "PW", name: "Palau" } as State,
            { abbreviation: "PA", name: "Pennsylvania" } as State,
            { abbreviation: "PR", name: "Puerto Rico" } as State,
            { abbreviation: "RI", name: "Rhode Island" } as State,
            { abbreviation: "SC", name: "South Carolina" } as State,
            { abbreviation: "SD", name: "South Dakota" } as State,
            { abbreviation: "TN", name: "Tennessee" } as State,
            { abbreviation: "TX", name: "Texas" } as State,
            { abbreviation: "UT", name: "Utah" } as State,
            { abbreviation: "VT", name: "Vermont" } as State,
            { abbreviation: "VA", name: "Virginia" } as State,
            { abbreviation: "VI", name: "Virgin Islands" } as State,
            { abbreviation: "WA", name: "Washington" } as State,
            { abbreviation: "WV", name: "West Virginia" } as State,
            { abbreviation: "WI", name: "Wisconsin" } as State,
            { abbreviation: "WY", name: "Wyoming" } as State,
            { abbreviation: "AB", name: "Alberta" } as State,
            { abbreviation: "BC", name: "British Columbia" } as State,
            { abbreviation: "MB", name: "Manitoba" } as State,
            { abbreviation: "NB", name: "New Brunswick" } as State,
            { abbreviation: "NF", name: "Newfoundland" } as State,
            { abbreviation: "NT", name: "Northwest Territories" } as State,
            { abbreviation: "NS", name: "Nova Scotia" } as State,
            { abbreviation: "ON", name: "Ontario" } as State,
            { abbreviation: "PE", name: "Prince Edward Island" } as State,
            { abbreviation: "QC", name: "Quebec" } as State,
            { abbreviation: "SK", name: "Saskatchewan" } as State,
            { abbreviation: "YT", name: "Yukon" } as State
        ]);
    }
}
