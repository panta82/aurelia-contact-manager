import { inject } from 'aurelia-framework';
import { RouteConfig } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

import { WebAPI } from '../lib/web-api';
import Contact from '../lib/Contact';
import { clone, areEqual } from '../lib/utility';
import { ContactViewed, ContactUpdated } from './../lib/messages';

@inject(WebAPI, EventAggregator)
export class ContactDetail {
	routeConfig: RouteConfig;
	contact: Contact;
	originalContact: Contact;

	constructor(private api: WebAPI, private ea: EventAggregator) {}

	private setContact(contact: Contact) {
		this.contact = contact;
		this.routeConfig.navModel.setTitle(this.contact.firstName);
		this.originalContact = clone(this.contact);
	}

	activate(params, routeConfig: RouteConfig) {
		this.routeConfig = routeConfig;

		return this.api.getContactDetails(params.id).then(contact => {
			this.setContact(contact);
			this.ea.publish(new ContactViewed(this.contact));
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
			this.ea.publish(new ContactUpdated(this.contact));
		});
	}

	canDeactivate() {
		if (!areEqual(this.originalContact, this.contact)) {
			const leave = confirm(
				'You have unsaved changes. Are you sure you wish to leave?'
			);

			if (!leave) {
				this.ea.publish(new ContactViewed(this.contact));
			}

			return leave;
		}
		return true;
	}
}
