class Contact {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;

	constructor(source) {
		Object.assign(this, source);
	}
}

export default Contact;
