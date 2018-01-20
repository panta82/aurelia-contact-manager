import { WebAPI } from '../lib/web-api';
import { inject } from 'aurelia-framework';

import Contact from '../lib/Contact';

@inject(WebAPI)
export class ContactList {
	contacts: any[] = [];
	selectedId = 0;

	constructor(private api: WebAPI) {}

	created() {
		this.api.getContactList().then(contacts => (this.contacts = contacts));
	}

	select(contact: Contact) {
		this.selectedId = contact.id;
		return true;
	}
}
