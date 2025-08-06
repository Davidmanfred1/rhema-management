# Rhema Church Management System

A comprehensive, modern web-based church management system built with HTML, CSS, and JavaScript. This system provides tools for managing members, offerings, events, and generating reports with a beautiful, responsive design specifically designed for Rhema Church.

## Features

### 🏛️ **Dashboard**
- Real-time statistics and key metrics
- Recent activities feed
- Upcoming events overview
- Interactive charts and analytics

### 👥 **Member Management**
- Add, edit, and delete member records
- Search and filter functionality
- Member profiles with contact information
- Membership status tracking
- Different membership types (Regular, Elder, Deacon, Youth)

### 💰 **Offering Management**
- Record and track offerings
- Multiple offering types (Tithe, General, Special, Building Fund, Missions)
- Payment method tracking (Cash, Check, Online, Card)
- Monthly and yearly summaries
- Donor management

### 📅 **Event Management**
- Create and manage church events
- Event calendar view
- Attendance tracking
- Event types (Worship, Bible Study, Youth, Fellowship, etc.)
- RSVP and capacity management

### 📊 **Reports & Analytics**
- Membership growth charts
- Offering distribution analysis
- Event attendance reports
- Interactive data visualizations using Chart.js

### ⚙️ **Settings & Administration**
- Church information management
- User management with role-based access
- Data backup and restore functionality
- Responsive design for all devices

## Demo Credentials

The system comes with pre-configured demo accounts:

- **Administrator**: Username: `admin` | Password: `admin123`
- **Pastor**: Username: `pastor` | Password: `pastor123`

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6
- **Charts**: Chart.js
- **Fonts**: Inter (Google Fonts)
- **Storage**: Local Storage (browser-based)

## Installation & Setup

1. **Clone or Download** the project files to your web server directory
2. **Open** `index.html` in a modern web browser
3. **Login** using the demo credentials provided above
4. **Start managing** your church data!

## File Structure

```
church-management-system/
├── index.html              # Main application file
├── css/
│   └── styles.css          # All styling and responsive design
├── js/
│   └── app.js              # Main application logic
├── assets/
│   ├── images/             # Image assets
│   └── icons/              # Custom icons
├── data/                   # Sample data files
└── README.md               # This file
```

## Key Features Explained

### Responsive Design
- **Mobile-first approach** with breakpoints at 768px and 480px
- **Collapsible sidebar** for mobile navigation
- **Touch-friendly** buttons and interactions
- **Optimized layouts** for tablets and desktops

### Data Management
- **Local Storage** for data persistence
- **JSON-based** data structure
- **Import/Export** functionality for data backup
- **Sample data** included for demonstration

### User Interface
- **Modern design** with clean typography
- **Intuitive navigation** with clear visual hierarchy
- **Interactive elements** with hover effects and transitions
- **Consistent color scheme** and spacing

### Security Features
- **Session management** with localStorage
- **Role-based access** (Administrator, Pastor)
- **Form validation** for data integrity
- **Secure logout** functionality

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Customization

### Colors
The CSS uses CSS custom properties (variables) for easy theming:
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #10b981;
    --danger-color: #ef4444;
    /* ... more variables */
}
```

### Adding New Features
The modular JavaScript structure makes it easy to extend:
1. Add new methods to the `ChurchManagementSystem` class
2. Create corresponding HTML templates
3. Add CSS styling for new components

## Data Structure

### Members
```javascript
{
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St",
    joinDate: "2023-01-15",
    status: "active",
    birthDate: "1985-06-20",
    membershipType: "regular"
}
```

### Offerings
```javascript
{
    id: 1,
    date: "2024-01-07",
    type: "tithe",
    amount: 500.00,
    donor: "John Smith",
    method: "cash",
    notes: "Sunday service offering"
}
```

### Events
```javascript
{
    id: 1,
    title: "Sunday Worship Service",
    description: "Weekly worship service",
    date: "2024-01-21",
    time: "10:00 AM",
    location: "Main Sanctuary",
    type: "worship",
    attendees: 150,
    maxAttendees: 200
}
```

## Future Enhancements

- **Database integration** (MySQL, PostgreSQL)
- **Email notifications** for events and reminders
- **SMS integration** for member communication
- **Online giving** integration
- **Mobile app** development
- **Multi-church** support
- **Advanced reporting** with PDF export
- **Calendar synchronization** with Google Calendar

## Support

For questions, issues, or feature requests, please refer to the documentation or contact the development team.

## License

This project is open source and available under the MIT License.

---

**Built with ❤️ for church communities worldwide**
