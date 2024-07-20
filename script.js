// מערך אנשי קשר לדוגמה
const contacts = [
    { name: 'Patric Dempsey', phone: '050-1234567', info: 'Driver' },
    { name: 'Sandra Oh', phone: '052-9876543', info: 'Finance Manager' },
    { name: 'Jodie Comer', phone: '054-3210987', info: 'Support Technician' },
    { name: 'Freddie Highmore', phone: '054-8725924', info: 'Family Doctor' },
    { name: 'Steven Spielberg', phone: '054-1827364', info: 'Film Maker' }
];

// Function to display the list of contacts
function displayContacts(contactArray) {
    // Get the contact list element
    const contactList = document.querySelector('.contact-list');
    
    // Clear the current list of contacts
    contactList.innerHTML = '';
    
    // Iterate through the array of contacts
    contactArray.forEach((contact, index) => {
        // Create a new list item
        const li = document.createElement('li');
        
        // Fill the list item with HTML content
        li.innerHTML = `
            <div class="contact-info">
                <!-- Display contact name -->
                <span class="name">${contact.name}</span>
                <!-- Display contact phone number -->
                <span class="phone">Phone: ${contact.phone}</span>
                <!-- Display additional contact information -->
                <span class="info">${contact.info}</span>
            </div>
            <div class="actions">
                <!-- Button to view more information -->
                <button class="more-info-btn" data-index="${index}">More Info</button>
                <!-- Button to delete the contact -->
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        
        // Add the created element to the contact list
        contactList.appendChild(li);
    });
}

// פונקציה לפתיחת חלון ה-popup להוספת/עריכת איש קשר
function openPopup() {
    document.querySelector('.popup').style.display = 'flex';
}

// פונקציה לסגירת חלון ה-popup להוספת/עריכת איש קשר
function closePopup() {
    document.querySelector('.popup').style.display = 'none';
}

// פונקציה לפתיחת חלון ה-popup להצגת מידע נוסף על איש קשר
function openInfoPopup(contact) {
    document.querySelector('.popup-info').style.display = 'flex';
    document.querySelector('.info-content').innerText = `Name: ${contact.name}\nPhone: ${contact.phone}\nInfo: ${contact.info}`;
}

// פונקציה לסגירת חלון ה-popup להצגת מידע נוסף על איש קשר
function closeInfoPopup() {
    document.querySelector('.popup-info').style.display = 'none';
}

// הוספת אירועים לכפתורים
document.querySelector('.open-popup-btn').addEventListener('click', openPopup);
document.querySelector('.close-popup-btn').addEventListener('click', closePopup);
document.querySelector('.close-popup-info-btn').addEventListener('click', closeInfoPopup);

// טיפול בהוספת איש קשר חדש דרך ה-popup
document.querySelector('.popup-form').addEventListener('submit', function(e) {
    e.preventDefault(); // מניעת ברירת המחדל של שליחת הטופס
    const name = this.querySelector('input[placeholder="Name"]').value;
    const phone = this.querySelector('input[placeholder="Phone"]').value;
    const info = this.querySelector('input[placeholder="Info"]').value;
    contacts.push({ name, phone, info }); // הוספת איש הקשר החדש למערך
    displayContacts(contacts); // עדכון התצוגה
    closePopup(); // סגירת ה-popup
});

// הוספת אירועים לכפתורי המחיקה והמידע הנוסף ברשימת אנשי הקשר
document.querySelector('.contact-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        contacts.splice(index, 1); // מחיקת איש הקשר מהמערך
        displayContacts(contacts); // עדכון התצוגה
    }
    if (e.target.classList.contains('more-info-btn')) {
        const index = e.target.getAttribute('data-index');
        const contact = contacts[index];
        openInfoPopup(contact); // פתיחת ה-popup להצגת מידע נוסף
    }
});

// פונקציה למחיקת כל אנשי הקשר
function clearAllContacts() {
    contacts.length = 0; // ריקון המערך
    displayContacts(contacts); // עדכון התצוגה
}

// הוספת אירוע לכפתור מחיקת כל אנשי הקשר
document.querySelector('.clear-all-btn').addEventListener('click', clearAllContacts);

// פונקציה לחיפוש אנשי קשר
document.querySelector('.search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase(); // קבלת מחרוזת החיפוש
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm) || 
        contact.phone.toLowerCase().includes(searchTerm) || 
        contact.info.toLowerCase().includes(searchTerm)
    );
    displayContacts(filteredContacts); // הצגת אנשי הקשר המסוננים
});

// הצגת אנשי הקשר בעת טעינת הדף
displayContacts(contacts);
