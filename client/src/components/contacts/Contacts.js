import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext';

import ContactItem from './ContactItem';
import Spiner from '../Layout/Spiner';

const Contacts = () => {
	const contactContext = useContext(ContactContext);

	const { contacts, filtered, getContacts, loading } = contactContext;
	
	useEffect(() => {
		getContacts()
	}, []);
	
	if(contacts && contacts.length === 0 & !loading) {
		return <h4> Please add a contact</h4>
	}



	return (
		<Fragment>
			{(contacts !== null && !loading) ? (
				<TransitionGroup>
					{
						filtered !== null 
						? filtered.map(contact => (
							<CSSTransition key={contact._id} timeout={500} className="item">
								<ContactItem  contact={contact} />
							</CSSTransition>
						)) : 
						contacts.map(contact => (
							<CSSTransition key={contact._id} timeout={500} className="item">
								<ContactItem contact={contact} />
							</CSSTransition>
						))
					}
			</TransitionGroup>
			) : <Spiner/> }
			
		</Fragment>
	)
}

export default Contacts;
