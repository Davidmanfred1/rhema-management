// Church Management System - Main Application
class ChurchManagementSystem {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.data = {
            members: [],
            offerings: [],
            events: [],
            settings: {
                churchName: 'Rhema Church',
                churchAddress: '123 Rhema Way, Faith City, FC 12345',
                churchPhone: '(555) 123-4567',
                churchEmail: 'info@rhemachurch.org'
            }
        };
        
        this.users = [
            { username: 'admin', password: 'admin123', role: 'Administrator', name: 'Admin User' },
            { username: 'pastor', password: 'pastor123', role: 'Pastor', name: 'Pastor John' }
        ];
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.setupEventListeners();
        this.checkAuth();
        this.loadSampleData();
    }
    
    // Authentication
    checkAuth() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showApp();
        } else {
            this.showLogin();
        }
    }
    
    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Add a small delay to show the loading state
            setTimeout(() => {
                this.showApp();
            }, 500);

            return true;
        }
        return false;
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showLogin();
    }

    quickLogin(username, password) {
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;

        // Trigger the login
        if (this.login(username, password)) {
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            this.showNotification(`Welcome ${this.currentUser.name}! You have successfully logged in.`, 'success');
        }
    }
    
    showLogin() {
        document.getElementById('loginModal').style.display = 'flex';
        document.getElementById('app').style.display = 'none';
    }
    
    showApp() {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        document.getElementById('currentUser').textContent = `Welcome, ${this.currentUser.name}`;

        // Add a welcome animation
        const app = document.getElementById('app');
        app.style.opacity = '0';
        app.style.transform = 'translateY(20px)';

        setTimeout(() => {
            app.style.transition = 'all 0.5s ease-out';
            app.style.opacity = '1';
            app.style.transform = 'translateY(0)';
        }, 100);

        // Ensure we navigate to dashboard after login
        this.navigateTo('dashboard');

        // Show welcome notification after a brief delay
        setTimeout(() => {
            this.showNotification(`Welcome back, ${this.currentUser.name}! 🎉`, 'success');
        }, 1000);
    }
    
    // Data Management
    loadData() {
        const savedData = localStorage.getItem('churchData');
        if (savedData) {
            this.data = { ...this.data, ...JSON.parse(savedData) };
        }
    }
    
    saveData() {
        localStorage.setItem('churchData', JSON.stringify(this.data));
    }
    
    loadSampleData() {
        if (this.data.members.length === 0) {
            this.data.members = [
                {
                    id: 1,
                    name: 'John Smith',
                    email: 'john.smith@email.com',
                    phone: '(555) 123-4567',
                    address: '123 Main St, City, State 12345',
                    joinDate: '2023-01-15',
                    status: 'active',
                    birthDate: '1985-06-20',
                    membershipType: 'regular'
                },
                {
                    id: 2,
                    name: 'Mary Johnson',
                    email: 'mary.johnson@email.com',
                    phone: '(555) 234-5678',
                    address: '456 Oak Ave, City, State 12345',
                    joinDate: '2023-03-10',
                    status: 'active',
                    birthDate: '1990-09-15',
                    membershipType: 'regular'
                },
                {
                    id: 3,
                    name: 'David Wilson',
                    email: 'david.wilson@email.com',
                    phone: '(555) 345-6789',
                    address: '789 Pine St, City, State 12345',
                    joinDate: '2022-11-20',
                    status: 'active',
                    birthDate: '1978-12-03',
                    membershipType: 'elder'
                }
            ];
            
            this.data.offerings = [
                {
                    id: 1,
                    date: '2024-01-07',
                    type: 'tithe',
                    amount: 500.00,
                    donor: 'John Smith',
                    method: 'cash',
                    notes: 'Sunday service offering'
                },
                {
                    id: 2,
                    date: '2024-01-07',
                    type: 'offering',
                    amount: 250.00,
                    donor: 'Mary Johnson',
                    method: 'check',
                    notes: 'General offering'
                },
                {
                    id: 3,
                    date: '2024-01-14',
                    type: 'special',
                    amount: 1000.00,
                    donor: 'David Wilson',
                    method: 'online',
                    notes: 'Building fund'
                }
            ];
            
            this.data.events = [
                {
                    id: 1,
                    title: 'Sunday Worship Service',
                    description: 'Weekly worship service with sermon and communion',
                    date: '2024-01-21',
                    time: '10:00 AM',
                    location: 'Main Sanctuary',
                    type: 'worship',
                    attendees: 150,
                    maxAttendees: 200
                },
                {
                    id: 2,
                    title: 'Bible Study',
                    description: 'Weekly Bible study and discussion',
                    date: '2024-01-24',
                    time: '7:00 PM',
                    location: 'Fellowship Hall',
                    type: 'study',
                    attendees: 45,
                    maxAttendees: 60
                },
                {
                    id: 3,
                    title: 'Youth Group Meeting',
                    description: 'Monthly youth group activities and fellowship',
                    date: '2024-01-28',
                    time: '6:00 PM',
                    location: 'Youth Room',
                    type: 'youth',
                    attendees: 25,
                    maxAttendees: 40
                }
            ];
            
            this.saveData();
        }
    }
    
    // Event Listeners
    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const submitBtn = e.target.querySelector('button[type="submit"]');

            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"><span class="spinner"></span> Logging in...</span>';
            submitBtn.disabled = true;

            // Simulate a brief loading delay for better UX
            setTimeout(() => {
                if (this.login(username, password)) {
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                    this.showNotification('Login successful! Welcome to Rhema Church Management System.', 'success');
                } else {
                    this.showNotification('Invalid credentials. Please check your username and password.', 'error');
                }

                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 800);
        });
        
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });
        
        // Sidebar navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.navigateTo(page);
            });
        });
        
        // Enhanced sidebar toggle for mobile
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');

            if (window.innerWidth <= 768 &&
                sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target)) {
                this.closeSidebar();
            }
        });

        // Add swipe gestures for mobile navigation
        this.setupSwipeGestures();
        
        // Add member button
        document.getElementById('addMemberBtn').addEventListener('click', () => {
            this.showMemberModal();
        });
        
        // Add offering button
        document.getElementById('addOfferingBtn').addEventListener('click', () => {
            this.showOfferingModal();
        });
        
        // Add event button
        document.getElementById('addEventBtn').addEventListener('click', () => {
            this.showEventModal();
        });
        
        // Member search
        document.getElementById('memberSearch').addEventListener('input', (e) => {
            this.filterMembers(e.target.value);
        });
        
        // Offering filter
        document.getElementById('offeringFilter').addEventListener('change', (e) => {
            this.filterOfferings(e.target.value);
        });
        
        // View toggle buttons
        document.getElementById('listViewBtn').addEventListener('click', () => {
            this.switchEventView('list');
        });
        
        document.getElementById('calendarViewBtn').addEventListener('click', () => {
            this.switchEventView('calendar');
        });
        
        // Church info form
        document.getElementById('churchInfoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveChurchInfo();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                this.closeModal();
            }

            // Ctrl/Cmd + K for search (when on members page)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k' && this.currentPage === 'members') {
                e.preventDefault();
                document.getElementById('memberSearch').focus();
            }
        });
    }
    
    // Navigation
    navigateTo(page) {
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');
        
        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            members: 'Members',
            offerings: 'Offerings',
            events: 'Events',
            reports: 'Reports',
            settings: 'Settings'
        };
        document.getElementById('pageTitle').textContent = titles[page];
        
        // Show/hide pages with smooth transition
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Add a small delay for smooth transition
        setTimeout(() => {
            document.getElementById(`${page}Page`).classList.add('active');
        }, 50);
        
        this.currentPage = page;
        
        // Load page-specific data
        switch (page) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'members':
                this.loadMembers();
                break;
            case 'offerings':
                this.loadOfferings();
                break;
            case 'events':
                this.loadEvents();
                break;
            case 'reports':
                this.loadReports();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
        
        // Close mobile sidebar
        this.closeSidebar();
    }

    // Mobile Navigation Methods
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');

        // Add/remove body scroll lock
        if (sidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('open');
        document.body.style.overflow = '';
    }

    openSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    // Swipe Gesture Setup
    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;
        let isScrolling = false;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // Determine if user is scrolling vertically
            if (Math.abs(diffY) > Math.abs(diffX)) {
                isScrolling = true;
                return;
            }

            // Only handle horizontal swipes
            if (!isScrolling && Math.abs(diffX) > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY || isScrolling) {
                startX = 0;
                startY = 0;
                return;
            }

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const sidebar = document.querySelector('.sidebar');

            // Swipe right to open sidebar (from left edge)
            if (diffX < -50 && startX < 50 && window.innerWidth <= 768) {
                this.openSidebar();
            }
            // Swipe left to close sidebar
            else if (diffX > 50 && sidebar.classList.contains('open')) {
                this.closeSidebar();
            }

            startX = 0;
            startY = 0;
        }, { passive: true });
    }

    // Mobile Cards Creation
    createMobileCards(type, data, fields) {
        const container = document.querySelector(`#${type}Page`);
        let mobileCardsContainer = container.querySelector('.mobile-cards');

        if (!mobileCardsContainer) {
            mobileCardsContainer = document.createElement('div');
            mobileCardsContainer.className = 'mobile-cards';
            container.querySelector('.table-container').parentNode.insertBefore(
                mobileCardsContainer,
                container.querySelector('.table-container').nextSibling
            );
        }

        mobileCardsContainer.innerHTML = data.map(item => `
            <div class="mobile-card">
                <div class="mobile-card-header">
                    <div class="mobile-card-title">${item.name || item.title || `${type.slice(0, -1)} #${item.id}`}</div>
                    <div class="mobile-card-actions">
                        <button class="btn btn-sm btn-outline" onclick="cms.edit${type.charAt(0).toUpperCase() + type.slice(1, -1)}(${item.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="cms.delete${type.charAt(0).toUpperCase() + type.slice(1, -1)}(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="mobile-card-body">
                    ${fields.slice(1).map(field => `
                        <div class="mobile-card-field">
                            <div class="mobile-card-label">${field.label}</div>
                            <div class="mobile-card-value">
                                ${field.format ? field.format(item[field.key]) : item[field.key]}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
    
    // Dashboard
    updateDashboard() {
        // Update stats
        document.getElementById('totalMembers').textContent = this.data.members.length;
        
        const totalOfferings = this.data.offerings.reduce((sum, offering) => sum + offering.amount, 0);
        document.getElementById('totalOfferings').textContent = `$${totalOfferings.toLocaleString()}`;
        
        const upcomingEvents = this.data.events.filter(event => new Date(event.date) >= new Date()).length;
        document.getElementById('upcomingEvents').textContent = upcomingEvents;
        
        // Calculate monthly growth (simplified)
        const currentMonth = new Date().getMonth();
        const currentMonthMembers = this.data.members.filter(member => 
            new Date(member.joinDate).getMonth() === currentMonth
        ).length;
        const growthRate = this.data.members.length > 0 ? 
            ((currentMonthMembers / this.data.members.length) * 100).toFixed(1) : 0;
        document.getElementById('monthlyGrowth').textContent = `${growthRate}%`;
        
        // Load recent activities
        this.loadRecentActivities();
        
        // Load upcoming events
        this.loadUpcomingEvents();
    }

    loadRecentActivities() {
        const activities = [
            {
                icon: 'fas fa-user-plus',
                title: 'New Member Added',
                description: `${this.data.members[this.data.members.length - 1]?.name || 'Member'} joined the church`,
                time: '2 hours ago'
            },
            {
                icon: 'fas fa-donate',
                title: 'Offering Recorded',
                description: `$${this.data.offerings[this.data.offerings.length - 1]?.amount || 0} offering received`,
                time: '1 day ago'
            },
            {
                icon: 'fas fa-calendar-plus',
                title: 'Event Created',
                description: `${this.data.events[this.data.events.length - 1]?.title || 'Event'} scheduled`,
                time: '3 days ago'
            }
        ];

        const container = document.getElementById('recentActivities');
        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-info">
                    <h4>${activity.title}</h4>
                    <p>${activity.description} • ${activity.time}</p>
                </div>
            </div>
        `).join('');
    }

    loadUpcomingEvents() {
        const upcomingEvents = this.data.events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);

        const container = document.getElementById('upcomingEventsList');
        if (upcomingEvents.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No upcoming events</p></div>';
            return;
        }

        container.innerHTML = upcomingEvents.map(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleDateString('en-US', { month: 'short' });

            return `
                <div class="event-item">
                    <div class="event-date">
                        <div class="day">${day}</div>
                        <div class="month">${month}</div>
                    </div>
                    <div class="event-info">
                        <h4>${event.title}</h4>
                        <p>${event.time} • ${event.location}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Members Management
    loadMembers() {
        // Load table view
        const tbody = document.querySelector('#membersTable tbody');
        tbody.innerHTML = this.data.members.map(member => `
            <tr>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${new Date(member.joinDate).toLocaleDateString()}</td>
                <td><span class="status-badge status-${member.status}">${member.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-outline" onclick="cms.editMember(${member.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="cms.deleteMember(${member.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Create mobile card view
        this.createMobileCards('members', this.data.members, [
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'joinDate', label: 'Join Date', format: (date) => new Date(date).toLocaleDateString() },
            { key: 'status', label: 'Status', format: (status) => `<span class="status-badge status-${status}">${status}</span>` }
        ]);
    }

    filterMembers(searchTerm) {
        const filteredMembers = this.data.members.filter(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phone.includes(searchTerm)
        );

        const tbody = document.querySelector('#membersTable tbody');
        tbody.innerHTML = filteredMembers.map(member => `
            <tr>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${new Date(member.joinDate).toLocaleDateString()}</td>
                <td><span class="status-badge status-${member.status}">${member.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-outline" onclick="cms.editMember(${member.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="cms.deleteMember(${member.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    showMemberModal(member = null) {
        const isEdit = member !== null;
        const modalHtml = `
            <div class="modal-overlay active">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <h3>${isEdit ? 'Edit Member' : 'Add New Member'}</h3>
                        <button class="modal-close" onclick="cms.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="memberForm">
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="memberName">Full Name</label>
                                    <input type="text" id="memberName" name="name" value="${member?.name || ''}"
                                           autocomplete="name" autocapitalize="words" required>
                                </div>
                                <div class="form-group">
                                    <label for="memberEmail">Email</label>
                                    <input type="email" id="memberEmail" name="email" value="${member?.email || ''}"
                                           autocomplete="email" autocapitalize="none" inputmode="email" required>
                                </div>
                                <div class="form-group">
                                    <label for="memberPhone">Phone</label>
                                    <input type="tel" id="memberPhone" name="phone" value="${member?.phone || ''}"
                                           autocomplete="tel" inputmode="tel" required>
                                </div>
                                <div class="form-group">
                                    <label for="memberBirthDate">Birth Date</label>
                                    <input type="date" id="memberBirthDate" name="birthDate" value="${member?.birthDate || ''}">
                                </div>
                                <div class="form-group">
                                    <label for="memberAddress">Address</label>
                                    <textarea id="memberAddress" name="address" rows="3">${member?.address || ''}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="memberStatus">Status</label>
                                    <select id="memberStatus" name="status">
                                        <option value="active" ${member?.status === 'active' ? 'selected' : ''}>Active</option>
                                        <option value="inactive" ${member?.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                                        <option value="pending" ${member?.status === 'pending' ? 'selected' : ''}>Pending</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="memberType">Membership Type</label>
                                    <select id="memberType" name="membershipType">
                                        <option value="regular" ${member?.membershipType === 'regular' ? 'selected' : ''}>Regular</option>
                                        <option value="elder" ${member?.membershipType === 'elder' ? 'selected' : ''}>Elder</option>
                                        <option value="deacon" ${member?.membershipType === 'deacon' ? 'selected' : ''}>Deacon</option>
                                        <option value="youth" ${member?.membershipType === 'youth' ? 'selected' : ''}>Youth</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="memberJoinDate">Join Date</label>
                                    <input type="date" id="memberJoinDate" name="joinDate" value="${member?.joinDate || new Date().toISOString().split('T')[0]}" required>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline" onclick="cms.closeModal()">Cancel</button>
                        <button class="btn btn-primary" onclick="cms.saveMember(${member?.id || 'null'})">${isEdit ? 'Update' : 'Add'} Member</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modalContainer').innerHTML = modalHtml;
    }

    saveMember(id) {
        const form = document.getElementById('memberForm');
        const formData = new FormData(form);
        const memberData = Object.fromEntries(formData.entries());

        // Basic validation
        if (!memberData.name || !memberData.email || !memberData.phone) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(memberData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            if (id) {
                // Edit existing member
                const memberIndex = this.data.members.findIndex(m => m.id === id);
                this.data.members[memberIndex] = { ...this.data.members[memberIndex], ...memberData };
            } else {
                // Add new member
                const newId = Math.max(...this.data.members.map(m => m.id), 0) + 1;
                this.data.members.push({ id: newId, ...memberData });
            }

            this.saveData();
            this.loadMembers();
            this.closeModal();
            this.updateDashboard();

            // Show success message
            this.showNotification(`Member ${id ? 'updated' : 'added'} successfully!`, 'success');
        } catch (error) {
            console.error('Error saving member:', error);
            alert('Error saving member. Please try again.');
        }
    }

    editMember(id) {
        const member = this.data.members.find(m => m.id === id);
        this.showMemberModal(member);
    }

    deleteMember(id) {
        if (confirm('Are you sure you want to delete this member?')) {
            this.data.members = this.data.members.filter(m => m.id !== id);
            this.saveData();
            this.loadMembers();
            this.updateDashboard();
        }
    }

    // Offerings Management
    loadOfferings() {
        this.updateOfferingSummary();

        const tbody = document.querySelector('#offeringsTable tbody');
        tbody.innerHTML = this.data.offerings.map(offering => `
            <tr>
                <td>${new Date(offering.date).toLocaleDateString()}</td>
                <td><span class="status-badge status-${offering.type}">${offering.type}</span></td>
                <td>$${offering.amount.toLocaleString()}</td>
                <td>${offering.donor}</td>
                <td>${offering.method}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-outline" onclick="cms.editOffering(${offering.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="cms.deleteOffering(${offering.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    updateOfferingSummary() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Monthly total
        const monthlyOfferings = this.data.offerings.filter(offering => {
            const offeringDate = new Date(offering.date);
            return offeringDate.getMonth() === currentMonth && offeringDate.getFullYear() === currentYear;
        });
        const monthlyTotal = monthlyOfferings.reduce((sum, offering) => sum + offering.amount, 0);
        document.getElementById('monthlyTotal').textContent = `$${monthlyTotal.toLocaleString()}`;

        // Yearly total
        const yearlyOfferings = this.data.offerings.filter(offering => {
            const offeringDate = new Date(offering.date);
            return offeringDate.getFullYear() === currentYear;
        });
        const yearlyTotal = yearlyOfferings.reduce((sum, offering) => sum + offering.amount, 0);
        document.getElementById('yearlyTotal').textContent = `$${yearlyTotal.toLocaleString()}`;

        // Average offering
        const averageOffering = this.data.offerings.length > 0 ?
            this.data.offerings.reduce((sum, offering) => sum + offering.amount, 0) / this.data.offerings.length : 0;
        document.getElementById('averageOffering').textContent = `$${averageOffering.toLocaleString()}`;
    }

    filterOfferings(type) {
        const filteredOfferings = type === 'all' ?
            this.data.offerings :
            this.data.offerings.filter(offering => offering.type === type);

        const tbody = document.querySelector('#offeringsTable tbody');
        tbody.innerHTML = filteredOfferings.map(offering => `
            <tr>
                <td>${new Date(offering.date).toLocaleDateString()}</td>
                <td><span class="status-badge status-${offering.type}">${offering.type}</span></td>
                <td>$${offering.amount.toLocaleString()}</td>
                <td>${offering.donor}</td>
                <td>${offering.method}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-outline" onclick="cms.editOffering(${offering.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="cms.deleteOffering(${offering.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    showOfferingModal(offering = null) {
        const isEdit = offering !== null;
        const modalHtml = `
            <div class="modal-overlay active">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <h3>${isEdit ? 'Edit Offering' : 'Record New Offering'}</h3>
                        <button class="modal-close" onclick="cms.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="offeringForm">
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="offeringDate">Date</label>
                                    <input type="date" id="offeringDate" name="date" value="${offering?.date || new Date().toISOString().split('T')[0]}" required>
                                </div>
                                <div class="form-group">
                                    <label for="offeringType">Type</label>
                                    <select id="offeringType" name="type" required>
                                        <option value="tithe" ${offering?.type === 'tithe' ? 'selected' : ''}>Tithe</option>
                                        <option value="offering" ${offering?.type === 'offering' ? 'selected' : ''}>General Offering</option>
                                        <option value="special" ${offering?.type === 'special' ? 'selected' : ''}>Special Offering</option>
                                        <option value="building" ${offering?.type === 'building' ? 'selected' : ''}>Building Fund</option>
                                        <option value="missions" ${offering?.type === 'missions' ? 'selected' : ''}>Missions</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="offeringAmount">Amount</label>
                                    <input type="number" id="offeringAmount" name="amount" step="0.01" min="0"
                                           value="${offering?.amount || ''}" inputmode="decimal" required>
                                </div>
                                <div class="form-group">
                                    <label for="offeringDonor">Donor</label>
                                    <input type="text" id="offeringDonor" name="donor" value="${offering?.donor || ''}"
                                           autocomplete="name" autocapitalize="words" required>
                                </div>
                                <div class="form-group">
                                    <label for="offeringMethod">Payment Method</label>
                                    <select id="offeringMethod" name="method" required>
                                        <option value="cash" ${offering?.method === 'cash' ? 'selected' : ''}>Cash</option>
                                        <option value="check" ${offering?.method === 'check' ? 'selected' : ''}>Check</option>
                                        <option value="online" ${offering?.method === 'online' ? 'selected' : ''}>Online</option>
                                        <option value="card" ${offering?.method === 'card' ? 'selected' : ''}>Credit/Debit Card</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="offeringNotes">Notes</label>
                                    <textarea id="offeringNotes" name="notes" rows="3">${offering?.notes || ''}</textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline" onclick="cms.closeModal()">Cancel</button>
                        <button class="btn btn-primary" onclick="cms.saveOffering(${offering?.id || 'null'})">${isEdit ? 'Update' : 'Record'} Offering</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modalContainer').innerHTML = modalHtml;
    }

    saveOffering(id) {
        const form = document.getElementById('offeringForm');
        const formData = new FormData(form);
        const offeringData = Object.fromEntries(formData.entries());
        offeringData.amount = parseFloat(offeringData.amount);

        if (id) {
            // Edit existing offering
            const offeringIndex = this.data.offerings.findIndex(o => o.id === id);
            this.data.offerings[offeringIndex] = { ...this.data.offerings[offeringIndex], ...offeringData };
        } else {
            // Add new offering
            const newId = Math.max(...this.data.offerings.map(o => o.id), 0) + 1;
            this.data.offerings.push({ id: newId, ...offeringData });
        }

        this.saveData();
        this.loadOfferings();
        this.closeModal();
        this.updateDashboard();
    }

    editOffering(id) {
        const offering = this.data.offerings.find(o => o.id === id);
        this.showOfferingModal(offering);
    }

    deleteOffering(id) {
        if (confirm('Are you sure you want to delete this offering record?')) {
            this.data.offerings = this.data.offerings.filter(o => o.id !== id);
            this.saveData();
            this.loadOfferings();
            this.updateDashboard();
        }
    }

    // Events Management
    loadEvents() {
        const container = document.getElementById('eventsListView');
        container.innerHTML = this.data.events.map(event => {
            const eventDate = new Date(event.date);
            const isUpcoming = eventDate >= new Date();

            return `
                <div class="event-card">
                    <div class="event-card-header">
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                    </div>
                    <div class="event-card-body">
                        <div class="event-meta">
                            <div class="event-meta-item">
                                <i class="fas fa-calendar"></i>
                                <span>${eventDate.toLocaleDateString()}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-users"></i>
                                <span>${event.attendees}/${event.maxAttendees} attendees</span>
                            </div>
                        </div>
                    </div>
                    <div class="event-card-footer">
                        <span class="attendee-count">${isUpcoming ? 'Upcoming' : 'Past'} Event</span>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-outline" onclick="cms.editEvent(${event.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="cms.deleteEvent(${event.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    switchEventView(view) {
        const listBtn = document.getElementById('listViewBtn');
        const calendarBtn = document.getElementById('calendarViewBtn');
        const listView = document.getElementById('eventsListView');
        const calendarView = document.getElementById('eventsCalendarView');

        if (view === 'list') {
            listBtn.classList.add('active');
            calendarBtn.classList.remove('active');
            listView.style.display = 'grid';
            calendarView.style.display = 'none';
        } else {
            listBtn.classList.remove('active');
            calendarBtn.classList.add('active');
            listView.style.display = 'none';
            calendarView.style.display = 'block';
            this.loadCalendar();
        }
    }

    loadCalendar() {
        // Simple calendar implementation
        const calendar = document.getElementById('calendar');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Get first day of month and number of days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        let calendarHTML = '';

        // Calendar headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            calendarHTML += `<div class="calendar-header">${day}</div>`;
        });

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="calendar-day other-month"></div>';
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = this.data.events.filter(event => event.date === dateStr);
            const isToday = day === currentDate.getDate() && currentMonth === currentDate.getMonth();

            calendarHTML += `
                <div class="calendar-day ${isToday ? 'today' : ''}">
                    <div>${day}</div>
                    ${dayEvents.map(event => `
                        <div class="calendar-event" title="${event.title}">${event.title}</div>
                    `).join('')}
                </div>
            `;
        }

        calendar.innerHTML = calendarHTML;
    }

    showEventModal(event = null) {
        const isEdit = event !== null;
        const modalHtml = `
            <div class="modal-overlay active">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <h3>${isEdit ? 'Edit Event' : 'Create New Event'}</h3>
                        <button class="modal-close" onclick="cms.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="eventForm">
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="eventTitle">Event Title</label>
                                    <input type="text" id="eventTitle" name="title" value="${event?.title || ''}" required>
                                </div>
                                <div class="form-group">
                                    <label for="eventType">Event Type</label>
                                    <select id="eventType" name="type" required>
                                        <option value="worship" ${event?.type === 'worship' ? 'selected' : ''}>Worship Service</option>
                                        <option value="study" ${event?.type === 'study' ? 'selected' : ''}>Bible Study</option>
                                        <option value="youth" ${event?.type === 'youth' ? 'selected' : ''}>Youth Event</option>
                                        <option value="fellowship" ${event?.type === 'fellowship' ? 'selected' : ''}>Fellowship</option>
                                        <option value="outreach" ${event?.type === 'outreach' ? 'selected' : ''}>Outreach</option>
                                        <option value="meeting" ${event?.type === 'meeting' ? 'selected' : ''}>Meeting</option>
                                        <option value="other" ${event?.type === 'other' ? 'selected' : ''}>Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="eventDate">Date</label>
                                    <input type="date" id="eventDate" name="date" value="${event?.date || ''}" required>
                                </div>
                                <div class="form-group">
                                    <label for="eventTime">Time</label>
                                    <input type="time" id="eventTime" name="time" value="${event?.time || ''}" required>
                                </div>
                                <div class="form-group">
                                    <label for="eventLocation">Location</label>
                                    <input type="text" id="eventLocation" name="location" value="${event?.location || ''}" required>
                                </div>
                                <div class="form-group">
                                    <label for="eventMaxAttendees">Max Attendees</label>
                                    <input type="number" id="eventMaxAttendees" name="maxAttendees" min="1" value="${event?.maxAttendees || ''}" required>
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="eventDescription">Description</label>
                                    <textarea id="eventDescription" name="description" rows="3" required>${event?.description || ''}</textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline" onclick="cms.closeModal()">Cancel</button>
                        <button class="btn btn-primary" onclick="cms.saveEvent(${event?.id || 'null'})">${isEdit ? 'Update' : 'Create'} Event</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modalContainer').innerHTML = modalHtml;
    }

    saveEvent(id) {
        const form = document.getElementById('eventForm');
        const formData = new FormData(form);
        const eventData = Object.fromEntries(formData.entries());
        eventData.maxAttendees = parseInt(eventData.maxAttendees);
        eventData.attendees = id ? this.data.events.find(e => e.id === id).attendees : 0;

        if (id) {
            // Edit existing event
            const eventIndex = this.data.events.findIndex(e => e.id === id);
            this.data.events[eventIndex] = { ...this.data.events[eventIndex], ...eventData };
        } else {
            // Add new event
            const newId = Math.max(...this.data.events.map(e => e.id), 0) + 1;
            this.data.events.push({ id: newId, ...eventData });
        }

        this.saveData();
        this.loadEvents();
        this.closeModal();
        this.updateDashboard();
    }

    editEvent(id) {
        const event = this.data.events.find(e => e.id === id);
        this.showEventModal(event);
    }

    deleteEvent(id) {
        if (confirm('Are you sure you want to delete this event?')) {
            this.data.events = this.data.events.filter(e => e.id !== id);
            this.saveData();
            this.loadEvents();
            this.updateDashboard();
        }
    }

    // Reports
    loadReports() {
        this.createMembershipChart();
        this.createOfferingChart();
        this.createAttendanceChart();
    }

    createMembershipChart() {
        const ctx = document.getElementById('membershipChart').getContext('2d');

        // Group members by join month
        const membersByMonth = {};
        this.data.members.forEach(member => {
            const month = new Date(member.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            membersByMonth[month] = (membersByMonth[month] || 0) + 1;
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(membersByMonth),
                datasets: [{
                    label: 'New Members',
                    data: Object.values(membersByMonth),
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createOfferingChart() {
        const ctx = document.getElementById('offeringChart').getContext('2d');

        // Group offerings by type
        const offeringsByType = {};
        this.data.offerings.forEach(offering => {
            offeringsByType[offering.type] = (offeringsByType[offering.type] || 0) + offering.amount;
        });

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(offeringsByType),
                datasets: [{
                    data: Object.values(offeringsByType),
                    backgroundColor: [
                        '#4f46e5',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createAttendanceChart() {
        const ctx = document.getElementById('attendanceChart').getContext('2d');

        // Get event attendance data
        const eventLabels = this.data.events.map(event => event.title);
        const attendanceData = this.data.events.map(event => event.attendees);
        const maxAttendanceData = this.data.events.map(event => event.maxAttendees);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: eventLabels,
                datasets: [{
                    label: 'Actual Attendance',
                    data: attendanceData,
                    backgroundColor: '#10b981'
                }, {
                    label: 'Max Capacity',
                    data: maxAttendanceData,
                    backgroundColor: '#e5e7eb'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Settings
    loadSettings() {
        const form = document.getElementById('churchInfoForm');
        form.churchName.value = this.data.settings.churchName;
        form.churchAddress.value = this.data.settings.churchAddress;
        form.churchPhone.value = this.data.settings.churchPhone;
        form.churchEmail.value = this.data.settings.churchEmail;
    }

    saveChurchInfo() {
        const form = document.getElementById('churchInfoForm');
        const formData = new FormData(form);
        const settings = Object.fromEntries(formData.entries());

        this.data.settings = { ...this.data.settings, ...settings };
        this.saveData();

        // Show success message
        alert('Church information updated successfully!');
    }

    // Utility Functions
    closeModal() {
        document.getElementById('modalContainer').innerHTML = '';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add notification styles if not already added
        if (!document.getElementById('notificationStyles')) {
            const styles = document.createElement('style');
            styles.id = 'notificationStyles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    z-index: 1001;
                    min-width: 300px;
                    animation: slideIn 0.3s ease-out;
                }

                .notification-success { border-left: 4px solid #10b981; }
                .notification-error { border-left: 4px solid #ef4444; }
                .notification-info { border-left: 4px solid #4f46e5; }

                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex: 1;
                }

                .notification-close {
                    background: none;
                    border: none;
                    color: #6b7280;
                    cursor: pointer;
                    padding: 0.25rem;
                }

                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    generateReport(type) {
        // Placeholder for report generation
        console.log(`Generating ${type} report...`);
        alert(`${type} report generation would be implemented here.`);
    }

    exportData(format) {
        // Placeholder for data export
        console.log(`Exporting data in ${format} format...`);
        alert(`Data export in ${format} format would be implemented here.`);
    }

    importData() {
        // Placeholder for data import
        console.log('Importing data...');
        alert('Data import functionality would be implemented here.');
    }

    backupData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `church-data-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        alert('Data backup downloaded successfully!');
    }

    restoreData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                this.data = { ...this.data, ...importedData };
                this.saveData();
                alert('Data restored successfully! Please refresh the page.');
                location.reload();
            } catch (error) {
                alert('Error restoring data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the application
let cms;
document.addEventListener('DOMContentLoaded', () => {
    try {
        cms = new ChurchManagementSystem();
        // Make cms globally available for onclick handlers
        window.cms = cms;
    } catch (error) {
        console.error('Error initializing Church Management System:', error);
        alert('Error loading the application. Please refresh the page.');
    }
});

// Error handling for global functions
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
