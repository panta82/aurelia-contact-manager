import Contact from './Contact';

let latency = 200;
let id = 0;

function getId() {
	return ++id;
}

let contacts: Array<Contact> = [
	new Contact({
		id: getId(),
		firstName: 'John',
		lastName: 'Tolkien',
		email: 'tolkien@inklings.com',
		phoneNumber: '867-5309'
	}),
	new Contact({
		id: getId(),
		firstName: 'Clive',
		lastName: 'Lewis',
		email: 'lewis@inklings.com',
		phoneNumber: '867-5309'
	}),
	new Contact({
		id: getId(),
		firstName: 'Owen',
		lastName: 'Barfield',
		email: 'barfield@inklings.com',
		phoneNumber: '867-5309'
	}),
	new Contact({
		id: getId(),
		firstName: 'Charles',
		lastName: 'Williams',
		email: 'williams@inklings.com',
		phoneNumber: '867-5309'
	}),
	new Contact({
		id: getId(),
		firstName: 'Roger',
		lastName: 'Green',
		email: 'green@inklings.com',
		phoneNumber: '867-5309'
	})
];

export class WebAPI {
	isRequesting = false;

	getContactList(): Promise<Array<Contact>> {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let results = contacts.map(x => {
					return new Contact({
						id: x.id,
						firstName: x.firstName,
						lastName: x.lastName,
						email: x.email
					});
				});
				resolve(results);
				this.isRequesting = false;
			}, latency);
		});
	}

	getContactDetails(id): Promise<Contact> {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let found = contacts.filter(x => x.id == id)[0];
				found = JSON.parse(JSON.stringify(found));
				if (found) {
					found = new Contact(found);
				}
				resolve(found);
				this.isRequesting = false;
			}, latency);
		});
	}

	saveContact(contact: Contact): Promise<Contact> {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let instance = new Contact(JSON.parse(JSON.stringify(contact)));
				let found = contacts.filter(x => x.id == contact.id)[0];

				if (found) {
					let index = contacts.indexOf(found);
					contacts[index] = instance;
				} else {
					instance.id = getId();
					contacts.push(instance);
				}

				this.isRequesting = false;
				resolve(instance);
			}, latency);
		});
	}
}
