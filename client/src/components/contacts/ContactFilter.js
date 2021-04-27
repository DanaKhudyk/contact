import React, { useRef, useContext, useEffect } from 'react';

import ContactContext from '../../context/contact/contactContext';

import ContactItem from './ContactItem';

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const text = useRef('')

	const { clearFilter, filterContacts, filtered } = contactContext;


	useEffect(() => {
     
    if(!filtered) {
      text.current.value = ""
    } 
    
  });


	const onChange = e => {
	    if(text.current.value !== '') {
	     	filterContacts(e.target.value);
	    } else {
	     	clearFilter()
	    }
   }
	
	return (
		<div>
			<form>
				<input ref={text} 
					type="text" 
					placeHolder="Filter Contacts..." 
					onChange={onChange}
				/>

			</form>
		</div>
	)
}

export default ContactFilter;
