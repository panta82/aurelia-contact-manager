import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

import { WebAPI } from '../lib/web-api';
import Contact from '../lib/Contact';
import { ContactViewed, ContactUpdated } from './../lib/messages';

@inject(WebAPI, EventAggregator)
export class ContactList {
	contacts: Contact[] = [];
	selectedId = 0;

	onContactViewed = (msg: ContactViewed) => {
		this.select(msg.contact);
	};

	onContactUpdated = (msg: ContactUpdated) => {
		const id = msg.contact.id;
		const contact = this.contacts.find(c => c.id === id);
		if (contact) {
			Object.assign(contact, msg.contact);
		}
	};

	constructor(private api: WebAPI, private ea: EventAggregator) {
		this.ea.subscribe(ContactViewed, this.onContactViewed);
		this.ea.subscribe(ContactUpdated, this.onContactUpdated);
	}

	created() {
		this.api.getContactList().then(contacts => (this.contacts = contacts));
	}

	select(contact: Contact) {
		this.selectedId = contact.id;
		return true;
	}
}
