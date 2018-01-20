import { RouterConfiguration, Router } from 'aurelia-router';

export class App {
	message = 'Hello World!';

	configureRouter(config: RouterConfiguration, router: Router) {
		config.title = 'Contacts';
		config.map([
			{ route: '', moduleId: 'no-selection', title: 'Select' },
			{ route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts' }
		]);
	}
}
