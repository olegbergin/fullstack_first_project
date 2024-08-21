"use strict";

// Initial contact records
let contacts = [
    { name: 'Patric Dempsey', phone: '050-1234567', info: 'Driver', address: '123 Main St', email: 'patric@example.com', notes: 'Loves racing' },
    { name: 'Sandra Oh', phone: '052-9876543', info: 'Finance Manager', address: '456 Elm St', email: 'sandra@example.com', notes: 'Enjoys hiking' },
    { name: 'Jodie Comer', phone: '054-3210987', info: 'Support Technician', address: '789 Maple Ave', email: 'jodie@example.com', notes: 'Tech enthusiast' },
    { name: 'Freddie Highmore', phone: '054-8725924', info: 'Family Doctor', address: '101 Oak Blvd', email: 'freddie@example.com', notes: 'Friendly and caring' },
    { name: 'Steven Spielberg', phone: '054-1827364', info: 'Film Maker', address: '202 Pine St', email: 'steven@example.com', notes: 'Loves storytelling' }
];

// Function to display the list of contacts
const displayContacts = (contactArray) => {
    const contactList = document.querySelector('.contact-list');
    contactList.innerHTML = '';

    if (contactArray.length === 0) {
        contactList.innerHTML = '<li>No contacts available.</li>';
        return;
    }

    // Sort contacts by name
    contactArray.sort((a, b) => a.name.localeCompare(b.name));

    // Create list items for each contact
    contactArray.forEach((contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="contact-name">
                <span class="name">${contact.name}</span>
            </div>
            <div class="contact-phone">
                <span class="phone">Phone: ${contact.phone}</span>
            </div>
            <div class="actions">
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="more-info-btn" data-index="${index}">More Info</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        contactList.appendChild(li);
    });
};

// Function to open the popup for adding/editing a contact
const openPopup = (contact = null, index = null) => {
    const popup = document.querySelector('.popup');
    popup.style.display = 'flex';

    const form = popup.querySelector('.popup-form');
    form.querySelector('input[placeholder="Name"]').value = contact ? contact.name : '';
    form.querySelector('input[placeholder="Phone"]').value = contact ? contact.phone : '';
    form.querySelector('input[placeholder="Address"]').value = contact ? contact.address : '';
    form.querySelector('input[placeholder="Email"]').value = contact ? contact.email : '';
    form.querySelector('textarea[placeholder="Notes"]').value = contact ? contact.notes : '';

    form.onsubmit = (e) => {
        e.preventDefault();
        const name = form.querySelector('input[placeholder="Name"]').value.trim();
        const phone = form.querySelector('input[placeholder="Phone"]').value.trim();
        const address = form.querySelector('input[placeholder="Address"]').value.trim();
        const email = form.querySelector('input[placeholder="Email"]').value.trim();
        const notes = form.querySelector('textarea[placeholder="Notes"]').value.trim();

        if (!name || !phone) {
            alert('Name and phone number are required.');
            return;
        }

        if (index !== null) {
            contacts[index] = { name, phone, address, email, notes };
        } else {
            if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
                alert('A contact with this name already exists.');
                return;
            }
            contacts.push({ name, phone, address, email, notes });
        }

        displayContacts(contacts);
        closePopup();
    };
};

// Function to close the popup
const closePopup = () => {
    document.querySelector('.popup').style.display = 'none';
};

// Function to open the info popup
const openInfoPopup = (contact) => {
    document.querySelector('.popup-info').style.display = 'flex';
    document.querySelector('.info-content').innerText = `
        Name: ${contact.name}
        Phone: ${contact.phone}
        Address: ${contact.address || 'N/A'}
        Email: ${contact.email || 'N/A'}
        Notes: ${contact.notes || 'N/A'}
    `;
};

// Function to close the info popup
const closeInfoPopup = () => {
    document.querySelector('.popup-info').style.display = 'none';
};

// Function to clear all contacts
const clearAllContacts = () => {
    contacts = [];
    displayContacts(contacts);
};

// Function for searching contacts
const searchContacts = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm) || 
        contact.phone.toLowerCase().includes(searchTerm) || 
        contact.info.toLowerCase().includes(searchTerm)
    );
    displayContacts(filteredContacts);
};

// Hover effect for contact list items
const addHoverEffect = (e) => {
    if (e.target.closest('li')) {
        e.target.closest('li').classList.add('hover');
    }
};

const removeHoverEffect = (e) => {
    if (e.target.closest('li')) {
        e.target.closest('li').classList.remove('hover');
    }
};

// Creative effect toggle
const toggleCreativeEffect = () => {
    document.body.classList.toggle('creative-effect');
};

// Add event listeners
document.querySelector('.open-popup-btn').addEventListener('click', () => openPopup());
document.querySelector('.close-popup-btn').addEventListener('click', closePopup);
document.querySelector('.close-popup-info-btn').addEventListener('click', closeInfoPopup);
document.querySelector('.clear-all-btn').addEventListener('click', clearAllContacts);
document.querySelector('.search-input').addEventListener('input', searchContacts);
document.querySelector('.contact-list').addEventListener('mouseover', addHoverEffect);
document.querySelector('.contact-list').addEventListener('mouseout', removeHoverEffect);
document.querySelector('.creative-effect-btn').addEventListener('click', toggleCreativeEffect);

// Add event listeners for delete, more info, and edit buttons
document.querySelector('.contact-list').addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    if (e.target.classList.contains('delete-btn')) {
        contacts.splice(index, 1);
        displayContacts(contacts);
    }
    if (e.target.classList.contains('more-info-btn')) {
        openInfoPopup(contacts[index]);
    }
    if (e.target.classList.contains('edit-btn')) {
        openPopup(contacts[index], index);
    }
});

// Display contacts on page load
displayContacts(contacts);