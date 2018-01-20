import Contact from './Contact';

export class ContactUpdated {
	constructor(public contact: Contact) {}
}

export class ContactViewed {
	constructor(public contact: Contact) {}
}
