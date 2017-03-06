import * as services from './services';
import { AppComponent } from './app';
import { Store } from './store';

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export { AppComponent };
export const providers = [
    Store,
    ...mapValuesToArray(services)
];
