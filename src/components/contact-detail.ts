import { inject } from 'aurelia-framework';
import { RouteConfig } from 'aurelia-router';

import { WebAPI } from '../lib/web-api';
import Contact from '../lib/Contact';
import { clone, areEqual } from '../lib/utility';

@inject(WebAPI)
export class ContactDetail {
	routeConfig: RouteConfig;
	contact: Contact;
	originalContact: Contact;

	constructor(private api: WebAPI) {}

	private setContact(contact: Contact) {
		this.contact = contact;
		this.routeConfig.navModel.setTitle(this.contact.firstName);
		this.originalContact = clone(this.contact);
	}

	activate(params, routeConfig: RouteConfig) {
		this.routeConfig = routeConfig;

		return this.api.getContactDetails(params.id).then(contact => {
			this.setContact(contact);
		});
	}

	get canSave() {
		return (
			this.contact.firstName && this.contact.lastName && !this.api.isRequesting
		);
	}

	save() {
		if (!this.canSave) {
			return;
		}

		this.api.saveContact(this.contact).then(contact => {
			this.setContact(contact);
		});
	}

	canDeactivate() {
		if (!areEqual(this.originalContact, this.contact)) {
			return confirm(
				'You have unsaved changes. Are you sure you wish to leave?'
			);
		}
		return true;
	}
}
