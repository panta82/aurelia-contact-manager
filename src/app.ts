import { inject } from 'aurelia-dependency-injection';
import { RouterConfiguration, Router } from 'aurelia-router';
import { WebAPI } from './lib/web-api';

@inject(WebAPI)
export class App {
	message = 'Hello World!';

	constructor(public api: WebAPI) {}

	configureRouter(config: RouterConfiguration, router: Router) {
		config.title = 'Contacts';
		config.map([
			{ route: '', moduleId: 'components/no-selection', title: 'Select' },
			{
				route: 'contacts/:id',
				moduleId: 'components/contact-detail',
				name: 'contacts'
			}
		]);
	}
}
