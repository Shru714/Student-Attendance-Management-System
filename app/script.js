// Initialize LocalStorage
function initStorage() {
    if (!localStorage.getItem('classes')) {
        localStorage.setItem('classes', JSON.stringify([]));
    }
    if (!localStorage.getItem('subjects')) {
        localStorage.setItem('subjects', JSON.stringify([]));
    }
    if (!localStorage.getItem('teachers')) {
        localStorage.setItem('teachers', JSON.stringify([]));
    }
    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify([]));
    }
    if (!localStorage.getItem('attendance')) {
        localStorage.setItem('attendance', JSON.stringify([]));
    }
    if (!localStorage.getItem('notifications')) {
        localStorage.setItem('notifications', JSON.stringify([]));
    }
    if (!localStorage.getItem('leaves')) {
        localStorage.setItem('leaves', JSON.stringify([]));
    }
}

// Load Demo Data
function loadDemoData() {
    const demoClasses = [
        { 
            id: 1, 
            className: 'PHP', 
            class_section: 'B',
            year: 3,
            academic_year: '2025-2026',
            createdAt: new Date().toISOString()
        },
        { 
            id: 2, 
            className: 'Java', 
            class_section: 'B',
            year: 2,
            academic_year: '2025-2026',
            createdAt: new Date().toISOString()
        },
        { 
            id: 3, 
            className: 'R programming', 
            class_section: 'A',
            year: 1,
            academic_year: '2025-2026',
            createdAt: new Date().toISOString()
        },
        { 
            id: 4, 
            className: 'C', 
            class_section: 'A',
            year: 1,
            academic_year: '2025-2026',
            createdAt: new Date().toISOString()
        },
        { 
            id: 5, 
            className: 'Python', 
            class_section: 'A',
            year: 3,
            academic_year: '2025-2026',
            createdAt: new Date().toISOString()
        }
    ];
    
    const demoTeachers = [
        { 
            id: 1, 
            name: 'Dr. Rajesh Kumar', 
            email: 'rajesh@example.com', 
            teacherId: 'TCH001',
            contactNo: '9876543210',
            phone: '1234567890',
            years: [1, 2, 3],
            classIds: [1, 2, 3, 4, 5]
        },
        { 
            id: 2, 
            name: 'Prof. Priya Sharma', 
            email: 'priya@example.com', 
            teacherId: 'TCH002',
            contactNo: '9876543211',
            phone: '1234567891',
            years: [1, 2],
            classIds: [1, 2, 3]
        },
        { 
            id: 3, 
            name: 'Dr. Amit Patel', 
            email: 'amit@example.com', 
            teacherId: 'TCH003',
            contactNo: '9876543212',
            phone: '1234567892',
            years: [1, 2, 3],
            classIds: [4, 5]
        }
    ];
    
    const demoStudents = [
        { 
            id: 1, 
            student_name: 'Rahul Verma', 
            email: 'rahul.verma@example.com',
            rollNumber: 'PHP25001', 
            classId: 1,
            address: '123 Main Street, Mumbai',
            student_contact: '9876543210',
            parent_contact: '9876543211',
            password: 'Rahul Verma',
            createdAt: new Date().toISOString()
        },
        { 
            id: 2, 
            student_name: 'Anita Singh', 
            email: 'anita.singh@example.com',
            rollNumber: 'PHP25002', 
            classId: 1,
            address: '456 Park Avenue, Delhi',
            student_contact: '9876543212',
            parent_contact: '9876543213',
            password: 'Anita Singh',
            createdAt: new Date().toISOString()
        },
        { 
            id: 3, 
            student_name: 'Vikram Joshi', 
            email: 'vikram.joshi@example.com',
            rollNumber: 'PHP25003', 
            classId: 1,
            address: '789 Lake Road, Bangalore',
            student_contact: '9876543214',
            parent_contact: '9876543215',
            password: 'Vikram Joshi',
            createdAt: new Date().toISOString()
        },
        { 
            id: 4, 
            student_name: 'Sneha Gupta', 
            email: 'sneha.gupta@example.com',
            rollNumber: 'Java25001', 
            classId: 2,
            address: '321 Hill View, Pune',
            student_contact: '9876543216',
            parent_contact: '9876543217',
            password: 'Sneha Gupta',
            createdAt: new Date().toISOString()
        },
        { 
            id: 5, 
            student_name: 'Arjun Reddy', 
            email: 'arjun.reddy@example.com',
            rollNumber: 'Java25002', 
            classId: 2,
            address: '654 Garden Street, Hyderabad',
            student_contact: '9876543218',
            parent_contact: '9876543219',
            password: 'Arjun Reddy',
            createdAt: new Date().toISOString()
        },
        { 
            id: 6, 
            student_name: 'Pooja Mehta', 
            email: 'pooja.mehta@example.com',
            rollNumber: 'Rprog25001', 
            classId: 3,
            address: '987 Beach Road, Chennai',
            student_contact: '9876543220',
            parent_contact: '9876543221',
            password: 'Pooja Mehta',
            createdAt: new Date().toISOString()
        },
        { 
            id: 7, 
            student_name: 'Nikhil Kumar', 
            email: 'nikhil.kumar@example.com',
            rollNumber: 'C25001', 
            classId: 4,
            address: '111 River Road, Kolkata',
            student_contact: '9876543222',
            parent_contact: '9876543223',
            password: 'Nikhil Kumar',
            createdAt: new Date().toISOString()
        },
        { 
            id: 8, 
            student_name: 'Divya Nair', 
            email: 'divya.nair@example.com',
            rollNumber: 'Python25001', 
            classId: 5,
            address: '222 Forest Lane, Kochi',
            student_contact: '9876543224',
            parent_contact: '9876543225',
            password: 'Divya Nair',
            createdAt: new Date().toISOString()
        }
    ];
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const demoAttendance = [
        // Today's attendance for PHP class
        { id: 1, classId: 1, studentId: 1, studentName: 'Rahul Verma', rollNumber: 'PHP25001', date: today.toISOString().split('T')[0], time: '09:30', status: 'present', markedAt: new Date().toISOString() },
        { id: 2, classId: 1, studentId: 2, studentName: 'Anita Singh', rollNumber: 'PHP25002', date: today.toISOString().split('T')[0], time: '09:30', status: 'present', markedAt: new Date().toISOString() },
        { id: 3, classId: 1, studentId: 3, studentName: 'Vikram Joshi', rollNumber: 'PHP25003', date: today.toISOString().split('T')[0], time: '09:30', status: 'absent', markedAt: new Date().toISOString() },
        
        // Today's attendance for Java class
        { id: 4, classId: 2, studentId: 4, studentName: 'Sneha Gupta', rollNumber: 'Java25001', date: today.toISOString().split('T')[0], time: '10:30', status: 'present', markedAt: new Date().toISOString() },
        { id: 5, classId: 2, studentId: 5, studentName: 'Arjun Reddy', rollNumber: 'Java25002', date: today.toISOString().split('T')[0], time: '10:30', status: 'present', markedAt: new Date().toISOString() },
        
        // Yesterday's attendance
        { id: 6, classId: 1, studentId: 1, studentName: 'Rahul Verma', rollNumber: 'PHP25001', date: yesterday.toISOString().split('T')[0], time: '09:30', status: 'present', markedAt: new Date().toISOString() },
        { id: 7, classId: 1, studentId: 2, studentName: 'Anita Singh', rollNumber: 'PHP25002', date: yesterday.toISOString().split('T')[0], time: '09:30', status: 'absent', markedAt: new Date().toISOString() },
        { id: 8, classId: 1, studentId: 3, studentName: 'Vikram Joshi', rollNumber: 'PHP25003', date: yesterday.toISOString().split('T')[0], time: '09:30', status: 'present', markedAt: new Date().toISOString() },
        
        // Two days ago
        { id: 9, classId: 1, studentId: 1, studentName: 'Rahul Verma', rollNumber: 'PHP25001', date: twoDaysAgo.toISOString().split('T')[0], time: '09:30', status: 'present', markedAt: new Date().toISOString() },
        { id: 10, classId: 1, studentId: 2, studentName: 'Anita Singh', rollNumber: 'PHP25002', date: twoDaysAgo.toISOString().split('T')[0], time: '09:30', status: 'present', markedAt: new Date().toISOString() },
        { id: 11, classId: 1, studentId: 3, studentName: 'Vikram Joshi', rollNumber: 'PHP25003', date: twoDaysAgo.toISOString().split('T')[0], time: '09:30', status: 'present', markedAt: new Date().toISOString() }
    ];
    
    saveData('classes', demoClasses);
    saveData('teachers', demoTeachers);
    saveData('students', demoStudents);
    saveData('attendance', demoAttendance);
    
    console.log('Demo data loaded successfully!');
    console.log('Classes:', demoClasses);
    console.log('Teachers:', demoTeachers);
    console.log('Students:', demoStudents);
    console.log('Attendance:', demoAttendance);
    
    alert('✅ Demo data loaded successfully!\n\nClasses: 5\nTeachers: 3\nStudents: 8\nAttendance Records: 11\n\nYou can now test all features!');
    location.reload();
}

// Get data from LocalStorage
function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

// Save data to LocalStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Login function
let selectedRole = '';

function showLoginForm(role) {
    try {
        console.log('showLoginForm called with role:', role);
        selectedRole = role;
        
        const loginPage = document.getElementById('loginPage');
        const credentialPage = document.getElementById('credentialLoginPage');
        
        if (!loginPage || !credentialPage) {
            console.error('Login pages not found!');
            alert('Error: Login pages not found. Please refresh the page.');
            return;
        }
        
        loginPage.classList.remove('active');
        credentialPage.classList.add('active');
        
        // Update form title and hint based on role
        const titleElement = document.getElementById('loginFormTitle');
        const hintElement = document.getElementById('loginHint');
        
        if (!titleElement || !hintElement) {
            console.error('Form elements not found!');
            return;
        }
        
        if (role === 'admin') {
            titleElement.textContent = 'Admin Login';
            hintElement.innerHTML = 'Default: <strong>admin@example.com</strong> / <strong>admin123</strong>';
        } else if (role === 'teacher') {
            titleElement.textContent = 'Teacher Login';
            hintElement.innerHTML = 'Demo: <strong>rajesh@example.com</strong> / <strong>teacher123</strong>';
        }
        
        // Clear previous inputs
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
        
        console.log('Login form displayed successfully');
    } catch (error) {
        console.error('Error in showLoginForm:', error);
        alert('An error occurred. Please refresh the page and try again.');
    }
}

function credentialLogin(event) {
    event.preventDefault();
    
    try {
        console.log('credentialLogin called');
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        console.log('Attempting login for role:', selectedRole, 'email:', email);
        
        // Demo credentials (in production, this would be validated against backend)
        const credentials = {
            admin: {
                'admin@example.com': 'Admin@143'
            },
            teacher: {
                // Database teachers
                'shrutiteli571@gmail.com': 'Teacher@143',
                'sunny@gmail.com': 'Teacher@143',
                'booby@gmail.com': 'Teacher@143',
                'roc@gmail.com': 'Teacher@143',
                // Demo data teachers
                'rajesh@example.com': 'teacher123',
                'priya@example.com': 'teacher123',
                'amit@example.com': 'teacher123'
            }
        };
        
        // Validate credentials
        if (credentials[selectedRole] && credentials[selectedRole][email] === password) {
            console.log('Login successful!');
            
            // Store login info
            localStorage.setItem('currentRole', selectedRole);
            localStorage.setItem('currentUser', email);
            
            // Hide login form
            document.getElementById('credentialLoginPage').classList.remove('active');
            
            // Show appropriate dashboard
            if (selectedRole === 'admin') {
                document.getElementById('adminDashboard').classList.add('active');
                loadAdminDashboard();
            } else if (selectedRole === 'teacher') {
                document.getElementById('teacherDashboard').classList.add('active');
                loadTeacherDashboard();
            }
        } else {
            console.log('Login failed - invalid credentials');
            alert('❌ Invalid email or password!\n\nPlease check your credentials and try again.');
        }
    } catch (error) {
        console.error('Error in credentialLogin:', error);
        alert('An error occurred during login. Please try again.');
    }
}

function login(role) {
    // Legacy function - redirects to new login form
    showLoginForm(role);
}

// Show student login form
function showStudentLogin() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('studentLoginPage').classList.add('active');
}

// Back to main login
function backToLogin() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('loginPage').classList.add('active');
}

// Student login with name, roll number, and password
function studentLogin(event) {
    event.preventDefault();
    const studentName = document.getElementById('studentNameLogin').value.trim();
    const rollNumber = document.getElementById('studentRollLogin').value.trim();
    const password = document.getElementById('studentPasswordLogin').value.trim();
    const students = getData('students');
    
    // Find student by roll number
    const student = students.find(s => s.rollNumber.toLowerCase() === rollNumber.toLowerCase());
    
    if (!student) {
        alert('❌ Invalid roll number! Please try again.');
        return;
    }
    
    // Check if student name matches
    if (student.student_name.toLowerCase() !== studentName.toLowerCase()) {
        alert('❌ Student name does not match the roll number! Please try again.');
        return;
    }
    
    // Check if password matches (password should be "Student@143")
    if (password !== 'Student@143') {
        alert('❌ Invalid password! Hint: The password is Student@143');
        return;
    }
    
    // Login successful
    localStorage.setItem('currentRole', 'student');
    localStorage.setItem('currentStudentId', student.id);
    document.getElementById('studentLoginPage').classList.remove('active');
    document.getElementById('studentDashboard').classList.add('active');
    loadStudentDashboard();
}

// Logout function
function logout() {
    localStorage.removeItem('currentRole');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentStudentId');
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('loginPage').classList.add('active');
}

// ADMIN FUNCTIONS
function showAdminSection(section) {
    document.querySelectorAll('#adminDashboard .content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#adminDashboard .nav-item').forEach(n => n.classList.remove('active'));
    
    const sectionMap = {
        'dashboard': 'adminDashboardSection',
        'classes': 'adminClassesSection',
        'teachers': 'adminTeachersSection',
        'students': 'adminStudentsSection',
        'timetable': 'adminTimetableSection',
        'reports': 'adminReportsSection',
        'holidays': 'adminHolidaysSection'
    };
    
    const titleMap = {
        'dashboard': 'Dashboard',
        'classes': 'Manage Classes',
        'teachers': 'Manage Teachers',
        'students': 'Manage Students',
        'timetable': 'Timetable',
        'reports': 'Attendance Reports',
        'holidays': 'Calendar & Holidays'
    };
    
    const sectionId = sectionMap[section];
    if (sectionId) {
        document.getElementById(sectionId).classList.add('active');
        document.getElementById('adminSectionTitle').textContent = titleMap[section];
    }
    
    // Find and activate the clicked nav item
    const navItems = document.querySelectorAll('#adminDashboard .nav-item');
    navItems.forEach(item => {
        if (item.textContent.includes(titleMap[section])) {
            item.classList.add('active');
        }
    });
    
    if (section === 'classes') loadClassesTable();
    if (section === 'teachers') loadTeachersTable();
    if (section === 'students') loadStudentsTable();
    if (section === 'timetable') loadTimetableList();
    if (section === 'reports') loadAttendanceReports();
    if (section === 'holidays') loadHolidayPolicy();
}

function loadAdminDashboard() {
    const classes = getData('classes');
    const teachers = getData('teachers');
    const students = getData('students');
    const attendance = getData('attendance');
    
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance.filter(a => a.date === today);
    
    document.getElementById('totalClasses').textContent = classes.length;
    document.getElementById('totalTeachers').textContent = teachers.length;
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('todayAttendance').textContent = todayAttendance.length;
    
    // Render all dashboard charts
    renderDashboardCharts();
}

// Classes Management
function getAcademicYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 0-indexed
    
    if (currentMonth >= 6) {
        return `${currentYear}-${currentYear + 1}`;
    } else {
        return `${currentYear - 1}-${currentYear}`;
    }
}

function showAddClassModal() {
    document.getElementById('classModalTitle').textContent = 'Add Class';
    document.getElementById('classId').value = '';
    document.getElementById('className').value = '';
    document.getElementById('classSection').value = '';
    document.getElementById('classYear').value = '';
    document.getElementById('classInfoBox').style.display = 'none';
    
    // Auto-generate academic year
    const academicYear = getAcademicYear();
    document.getElementById('classAcademicYear').value = academicYear;
    
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('addClassModal').classList.add('active');
}

function showEditClassModal(id) {
    const classes = getData('classes');
    const cls = classes.find(c => c.id === id);
    if (cls) {
        document.getElementById('classModalTitle').textContent = 'Edit Class';
        document.getElementById('classId').value = cls.id;
        document.getElementById('className').value = cls.className;
        document.getElementById('classSection').value = cls.class_section || '';
        document.getElementById('classYear').value = cls.year;
        document.getElementById('classAcademicYear').value = cls.academic_year || getAcademicYear();
        document.getElementById('classInfoBox').style.display = 'none';
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addClassModal').classList.add('active');
    }
}

function saveClass(event) {
    event.preventDefault();
    const classes = getData('classes');
    const id = document.getElementById('classId').value;
    const className = document.getElementById('className').value;
    const section = document.getElementById('classSection').value;
    const year = document.getElementById('classYear').value;
    const academicYear = document.getElementById('classAcademicYear').value;
    
    // Validate inputs
    if (!className || !section || !year) {
        alert('Please fill in all required fields');
        return;
    }
    
    const classData = {
        id: id ? parseInt(id) : Date.now(),
        className: className,
        class_section: section,
        year: parseInt(year),
        academic_year: academicYear,
        createdAt: new Date().toISOString()
    };
    
    if (id) {
        const index = classes.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            classes[index] = classData;
        }
    } else {
        classes.push(classData);
        
        // Show class info
        document.getElementById('displayClassName').textContent = className;
        document.getElementById('displaySection').textContent = section;
        document.getElementById('displayYear').textContent = year;
        document.getElementById('displayAcademicYear').textContent = academicYear;
        document.getElementById('classInfoBox').style.display = 'block';
    }
    
    saveData('classes', classes);
    
    if (!id) {
        alert(`Class created successfully!\n\nClass: ${className}\nSection: ${section}\nYear: ${year}\nAcademic Year: ${academicYear}`);
    }
    
    setTimeout(() => {
        closeModal();
        loadClassesTable();
        // Refresh all class dropdowns
        refreshAllClassDropdowns();
    }, id ? 0 : 2000);
}

function refreshAllClassDropdowns() {
    // Refresh Mark Attendance class dropdown
    if (document.getElementById('teacherClassSelect')) {
        loadTeacherMarkSection();
    }
    
    // Refresh Teacher modal class checkboxes
    if (document.getElementById('teacherClassesCheckboxes')) {
        const classes = getData('classes') || [];
        const classesContainer = document.getElementById('teacherClassesCheckboxes');
        classesContainer.innerHTML = '';
        classes.forEach(cls => {
            if (cls && cls.id && cls.className) {
                classesContainer.innerHTML += `
                    <label>
                        <input type="checkbox" name="teacherClasses" value="${cls.id}" onchange="updateClassTimes()">
                        ${cls.className} - ${cls.class_section || 'N/A'}
                    </label>
                `;
            }
        });
    }
    
    // Refresh Student modal class dropdown
    if (document.getElementById('studentClass')) {
        const classes = getData('classes') || [];
        const select = document.getElementById('studentClass');
        select.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            if (cls && cls.id && cls.className) {
                select.innerHTML += `<option value="${cls.id}" data-name="${cls.className}">${cls.className} - ${cls.class_section || 'N/A'}</option>`;
            }
        });
    }
}

function autoPopulateClassTime() {
    const classSelect = document.getElementById('studentClass');
    const classId = parseInt(classSelect.value);
    const teachers = getData('teachers') || [];
    
    if (!classId) {
        document.getElementById('studentClassTime').value = '';
        return;
    }
    
    // Find a teacher assigned to this class and get their class time
    let classTime = '';
    for (let teacher of teachers) {
        if (teacher.classIds && teacher.classIds.includes(classId)) {
            if (teacher.classTimes && teacher.classTimes[classId]) {
                classTime = teacher.classTimes[classId];
                break;
            }
        }
    }
    
    document.getElementById('studentClassTime').value = classTime;
}

function loadClassesTable() {
    const classes = getData('classes');
    const tbody = document.getElementById('classesTableBody');
    tbody.innerHTML = '';
    
    classes.forEach(cls => {
        const row = `
            <tr>
                <td><strong>${cls.className}</strong></td>
                <td>${cls.class_section || 'N/A'}</td>
                <td>${cls.year}</td>
                <td>${cls.academic_year || 'N/A'}</td>
                <td>
                    <button class="btn btn-edit" onclick="showEditClassModal(${cls.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteClass(${cls.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function deleteClass(id) {
    if (confirm('Are you sure you want to delete this class?')) {
        let classes = getData('classes');
        classes = classes.filter(c => c.id !== id);
        saveData('classes', classes);
        loadClassesTable();
    }
}

// Teachers Management
function showAddTeacherModal() {
    try {
        document.getElementById('teacherModalTitle').textContent = 'Add Teacher';
        document.getElementById('teacherRecordId').value = '';
        document.getElementById('teacherName').value = '';
        document.getElementById('teacherEmail').value = '';
        
        // Auto-generate Teacher ID
        const teachers = getData('teachers') || [];
        const teacherIdField = document.getElementById('teacherUniqueId');
        if (teacherIdField) {
            teacherIdField.disabled = false;
            // Generate next teacher ID (TCH001, TCH002, etc.)
            let maxNum = 0;
            teachers.forEach(t => {
                if (t.teacherId && t.teacherId.startsWith('TCH')) {
                    const num = parseInt(t.teacherId.substring(3));
                    if (!isNaN(num) && num > maxNum) {
                        maxNum = num;
                    }
                }
            });
            const nextNum = maxNum + 1;
            const nextId = 'TCH' + String(nextNum).padStart(3, '0');
            teacherIdField.value = nextId;
        }
        
        document.getElementById('teacherContactNo').value = '';
        document.getElementById('teacherPhone').value = '';
        document.getElementById('teacherPassword').value = '';
        
        // Load classes checkboxes
        const classes = getData('classes') || [];
        const classesContainer = document.getElementById('teacherClassesCheckboxes');
        if (classesContainer) {
            classesContainer.innerHTML = '';
            if (classes.length === 0) {
                classesContainer.innerHTML = '<p style="color: #e74c3c; padding: 10px;">No classes available. Please load demo data or create classes first.</p>';
            } else {
                classes.forEach(cls => {
                    if (cls && cls.id && cls.className) {
                        classesContainer.innerHTML += `
                            <label>
                                <input type="checkbox" name="teacherClasses" value="${cls.id}" onchange="updateClassTimes()">
                                ${cls.className} - ${cls.class_section || 'N/A'}
                            </label>
                        `;
                    }
                });
            }
        }
        
        // Uncheck all years
        document.querySelectorAll('input[name="teacherYears"]').forEach(cb => cb.checked = false);
        
        // Clear class times
        updateClassTimes();
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addTeacherModal').classList.add('active');
    } catch (error) {
        console.error('Error opening teacher modal:', error);
        alert('Error opening teacher form. Please check the console for details.');
    }
}

function updateClassTimes() {
    const classes = getData('classes') || [];
    const selectedClassIds = Array.from(document.querySelectorAll('input[name="teacherClasses"]:checked')).map(cb => parseInt(cb.value));
    const timesContainer = document.getElementById('teacherClassTimes');
    
    if (!timesContainer) return;
    
    if (selectedClassIds.length === 0) {
        timesContainer.innerHTML = '<p style="color: #7f8c8d; font-size: 0.9rem;">Select classes above to set times</p>';
        return;
    }
    
    let timesHtml = '';
    selectedClassIds.forEach(classId => {
        const cls = classes.find(c => c.id === classId);
        if (cls) {
            timesHtml += `
                <div class="class-time-input">
                    <label>${cls.className} - ${cls.class_section || 'N/A'}</label>
                    <input type="time" class="class-time-field" data-class-id="${classId}" placeholder="Set time (optional)">
                </div>
            `;
        }
    });
    
    timesContainer.innerHTML = timesHtml;
}

function showEditTeacherModal(id) {
    const teachers = getData('teachers');
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
        document.getElementById('teacherModalTitle').textContent = 'Edit Teacher';
        document.getElementById('teacherRecordId').value = teacher.id;
        document.getElementById('teacherName').value = teacher.name;
        document.getElementById('teacherEmail').value = teacher.email;
        document.getElementById('teacherUniqueId').value = teacher.teacherId || '';
        document.getElementById('teacherUniqueId').disabled = true; // Can't change teacher ID
        document.getElementById('teacherContactNo').value = teacher.contactNo || '';
        document.getElementById('teacherPhone').value = teacher.phone || '';
        document.getElementById('teacherPassword').value = '';
        
        // Load and check classes
        const classes = getData('classes');
        const classesContainer = document.getElementById('teacherClassesCheckboxes');
        classesContainer.innerHTML = '';
        classes.forEach(cls => {
            const checked = teacher.classIds && teacher.classIds.includes(cls.id) ? 'checked' : '';
            classesContainer.innerHTML += `
                <label>
                    <input type="checkbox" name="teacherClasses" value="${cls.id}" ${checked}>
                    ${cls.className}
                </label>
            `;
        });
        
        // Check years
        document.querySelectorAll('input[name="teacherYears"]').forEach(cb => {
            cb.checked = teacher.years && teacher.years.includes(parseInt(cb.value));
        });
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addTeacherModal').classList.add('active');
    }
}

function saveTeacher(event) {
    event.preventDefault();
    
    try {
        const teachers = getData('teachers');
        const id = document.getElementById('teacherRecordId').value;
        const contactNo = document.getElementById('teacherContactNo').value;
        
        // Validate contact number - must be exactly 10 digits
        if (!contactNo || contactNo.length !== 10 || !/^\d{10}$/.test(contactNo)) {
            alert('❌ Contact number must be exactly 10 digits!\n\nExample: 9876543210');
            document.getElementById('teacherContactNo').focus();
            return;
        }
        
        // Get selected years
        const years = Array.from(document.querySelectorAll('input[name="teacherYears"]:checked'))
            .map(cb => parseInt(cb.value));
        
        // Get selected classes
        const classIds = Array.from(document.querySelectorAll('input[name="teacherClasses"]:checked'))
            .map(cb => parseInt(cb.value));
        
        // Get class times
        const classTimes = {};
        document.querySelectorAll('.class-time-field').forEach(input => {
            const classId = parseInt(input.dataset.classId);
            const time = input.value;
            if (time) {
                classTimes[classId] = time;
            }
        });
        
        const teacherId = document.getElementById('teacherUniqueId').value.trim();
        
        // ensure ID is provided
        if (!teacherId) {
            alert('❌ Teacher ID is required and cannot be empty.');
            document.getElementById('teacherUniqueId').focus();
            return;
        }
        
        // Validate unique teacher ID (only for new teachers)
        if (!id) {
            const existingTeacher = teachers.find(t => t.teacherId === teacherId);
            if (existingTeacher) {
                alert('Teacher ID already exists! Please use a unique ID.');
                return;
            }
        }
        
        // Check if classes exist
        const classes = getData('classes') || [];
        
        if (classes.length === 0) {
            alert('No classes available. Please load demo data or create classes first.');
            return;
        }
        
        // Validate at least one selection
        if (years.length === 0) {
            alert('Please select at least one year');
            return;
        }
        if (classIds.length === 0) {
            alert('Please select at least one class');
            return;
        }
        
        const teacherData = {
            id: id ? parseInt(id) : Date.now(),
            name: document.getElementById('teacherName').value,
            email: document.getElementById('teacherEmail').value,
            teacherId: teacherId,
            contactNo: contactNo,
            phone: document.getElementById('teacherPhone').value,
            years: years,
            classIds: classIds,
            classTimes: classTimes
        };
        
        if (id) {
            const index = teachers.findIndex(t => t.id === parseInt(id));
            if (index !== -1) {
                teachers[index] = teacherData;
            }
        } else {
            teachers.push(teacherData);
        }
        
        saveData('teachers', teachers);
        closeModal();
        loadTeachersTable();
        alert('✅ Teacher saved successfully!');
    } catch (error) {
        console.error('Error saving teacher:', error);
        alert('Error saving teacher. Please check the console for details.');
    }
}

function loadTeachersTable() {
    const teachers = getData('teachers');
    const classes = getData('classes');
    const tbody = document.getElementById('teachersTableBody');
    tbody.innerHTML = '';
    
    teachers.forEach(teacher => {
        // Get year badges
        const teacherYears = teacher.years 
            ? teacher.years.map(year => `<span class="badge badge-year">Year ${year}</span>`).join(' ')
            : '<span class="badge">None</span>';
        
        // Get class names
        const teacherClasses = teacher.classIds 
            ? teacher.classIds.map(id => {
                const cls = classes.find(c => c.id === id);
                return cls ? `<span class="badge badge-class">${cls.className}</span>` : '';
              }).join(' ')
            : '<span class="badge">None</span>';
        
        const row = `
            <tr>
                <td><strong>${teacher.teacherId || 'N/A'}</strong></td>
                <td>${teacher.name}</td>
                <td>${teacher.email}</td>
                <td>${teacher.contactNo || 'N/A'}</td>
                <td><div class="teacher-years">${teacherYears}</div></td>
                <td><div class="teacher-classes">${teacherClasses}</div></td>
                <td class="actions-cell">
                    <button class="btn btn-edit" onclick="showEditTeacherModal(${teacher.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTeacher(${teacher.id})">Delete</button>
                    <button class="btn btn-info" onclick="showTeacherLeaveModal(${teacher.id})">Leave</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function deleteTeacher(id) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        let teachers = getData('teachers');
        teachers = teachers.filter(t => t.id !== id);
        saveData('teachers', teachers);
        loadTeachersTable();
    }
}

// Students Management
function showAddStudentModal() {
    document.getElementById('studentModalTitle').textContent = 'Add Student';
    document.getElementById('studentId').value = '';
    document.getElementById('studentName').value = '';
    document.getElementById('studentEmail').value = '';
    document.getElementById('studentRoll').value = '';
    document.getElementById('studentAddress').value = '';
    document.getElementById('studentContact').value = '';
    document.getElementById('parentContact').value = '';
    document.getElementById('studentClassTime').value = '';
    document.getElementById('studentInfoBox').style.display = 'none';
    
    // Generate password in background (hidden field)
    generatePassword();
    
    const classes = getData('classes') || [];
    const select = document.getElementById('studentClass');
    select.innerHTML = '<option value="">Select Class</option>';
    
    classes.forEach(cls => {
        if (cls && cls.id && cls.className) {
            select.innerHTML += `<option value="${cls.id}" data-name="${cls.className}">${cls.className} - ${cls.class_section || 'N/A'}</option>`;
        }
    });
    
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('addStudentModal').classList.add('active');
}

// Generate roll number based on class
function generateRollNumber() {
    const classSelect = document.getElementById('studentClass');
    const selectedOption = classSelect.options[classSelect.selectedIndex];
    
    if (!selectedOption || !selectedOption.value) {
        document.getElementById('studentRoll').value = '';
        return;
    }
    
    const classId = parseInt(selectedOption.value);
    const className = selectedOption.getAttribute('data-name');
    const students = getData('students');
    
    // Get class code (first 3 letters uppercase)
    const classCode = className.replace(/\s+/g, '').substring(0, 3).toUpperCase();
    
    // Get current year (last 2 digits)
    const year = new Date().getFullYear().toString().slice(-2);
    
    // Count existing students in this class
    const classStudents = students.filter(s => s.classId === classId);
    const nextNumber = (classStudents.length + 1).toString().padStart(3, '0');
    
    // Format: CLASSYEARNUMBER (e.g., BCA25001)
    const rollNumber = `${classCode}${year}${nextNumber}`;
    document.getElementById('studentRoll').value = rollNumber;
    
    // Generate password
    generatePassword();
}

// Generate random password
function generatePassword() {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById('studentPassword').value = password;
    return password;
}

function showEditStudentModal(id) {
    const students = getData('students') || [];
    const student = students.find(s => s.id === id);
    if (student) {
        document.getElementById('studentModalTitle').textContent = 'Edit Student';
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.student_name || '';
        document.getElementById('studentEmail').value = student.email || '';
        document.getElementById('studentRoll').value = student.rollNumber;
        document.getElementById('studentAddress').value = student.address || '';
        document.getElementById('studentContact').value = student.student_contact || '';
        document.getElementById('parentContact').value = student.parent_contact || '';
        document.getElementById('studentClassTime').value = student.classTime || '';
        document.getElementById('studentInfoBox').style.display = 'none';
        
        // Keep existing password (hidden)
        document.getElementById('studentPassword').value = student.password || '';
        
        const classes = getData('classes') || [];
        const select = document.getElementById('studentClass');
        select.innerHTML = '<option value="">Select Class</option>';
        
        classes.forEach(cls => {
            if (cls && cls.id && cls.className) {
                const selected = cls.id === student.classId ? 'selected' : '';
                select.innerHTML += `<option value="${cls.id}" data-name="${cls.className}" ${selected}>${cls.className} - ${cls.class_section || 'N/A'}</option>`;
            }
        });
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addStudentModal').classList.add('active');
    }
}

function saveStudent(event) {
    event.preventDefault();
    const students = getData('students') || [];
    const id = document.getElementById('studentId').value;
    const classSelect = document.getElementById('studentClass');
    const selectedOption = classSelect.options[classSelect.selectedIndex];
    const className = selectedOption.getAttribute('data-name');
    const rollNumber = document.getElementById('studentRoll').value;
    const password = document.getElementById('studentPassword').value;
    const classTime = document.getElementById('studentClassTime').value;
    
    // Check if roll number already exists (for new students)
    if (!id) {
        const existingStudent = students.find(s => s.rollNumber === rollNumber);
        if (existingStudent) {
            alert('Roll number already exists! Please select a different class or refresh.');
            return;
        }
    }
    
    const studentData = {
        id: id ? parseInt(id) : Date.now(),
        student_name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        rollNumber: rollNumber,
        classId: parseInt(classSelect.value),
        address: document.getElementById('studentAddress').value,
        student_contact: document.getElementById('studentContact').value,
        parent_contact: document.getElementById('parentContact').value,
        classTime: classTime,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    if (id) {
        const index = students.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
            // Keep the original password if not changed
            if (!password) {
                studentData.password = students[index].password;
            }
            students[index] = studentData;
        }
    } else {
        students.push(studentData);
        
        // Show credentials info
        document.getElementById('displayRoll').textContent = rollNumber;
        document.getElementById('displayPassword').textContent = password;
        document.getElementById('studentInfoBox').style.display = 'block';
        
        // Create notification for student
        createStudentNotification(studentData);
    }
    
    saveData('students', students);
    
    if (!id) {
        // For new students, show success message with credentials
        alert(`Student created successfully!\n\nRoll Number: ${rollNumber}\nPassword: ${password}\n\nCredentials have been sent to the student.`);
    }
    
    setTimeout(() => {
        closeModal();
        loadStudentsTable();
    }, id ? 0 : 2000);
}

// Create notification for student
function createStudentNotification(student) {
    const notifications = getData('notifications') || [];
    const notification = {
        id: Date.now(),
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        message: `Your account has been created. Please login using your credentials.\n\nRoll Number: ${student.rollNumber}\nPassword: ${student.password}`,
        type: 'info',
        isRead: false,
        createdAt: new Date().toISOString()
    };
    notifications.push(notification);
    saveData('notifications', notifications);
}

function loadStudentsTable() {
    const students = getData('students') || [];
    const classes = getData('classes') || [];
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const classObj = classes.find(c => c.id === student.classId);
        const className = classObj ? `${classObj.className} - ${classObj.class_section || 'N/A'}` : 'N/A';
        const classTime = student.classTime ? student.classTime : 'Not set';
        
        const row = `
            <tr>
                <td><strong>${student.rollNumber}</strong></td>
                <td>${student.student_name || 'N/A'}</td>
                <td>${student.email || 'N/A'}</td>
                <td>${className}</td>
                <td><span style="color: #3498db; font-weight: bold;">${classTime}</span></td>
                <td>${student.student_contact || 'N/A'}</td>
                <td>${student.parent_contact || 'N/A'}</td>
                <td>
                    <button class="btn btn-edit" onclick="showEditStudentModal(${student.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
                    <button class="btn btn-info" onclick="showStudentLeaveModal(${student.id})">Leave</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        let students = getData('students');
        students = students.filter(s => s.id !== id);
        saveData('students', students);
        loadStudentsTable();
    }
}

// Load Attendance Reports (missing function)
function loadAttendanceReports() {
    console.log('Loading attendance reports...');
    
    // Initialize the student report tab (default active tab)
    loadStudentReport();
    
    // Also initialize the date report tab
    loadDateReport();
    
    // Show refresh button
    const refreshBtn = document.querySelector('#adminReportsSection .btn-info');
    if (refreshBtn) {
        refreshBtn.style.display = 'inline-block';
    }
    
    console.log('Attendance reports loaded successfully');
}

// Attendance Reports
function switchReportTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.report-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tab + 'ReportTab').classList.add('active');
    event.target.classList.add('active');
    
    // Load data for selected tab
    if (tab === 'student') {
        loadStudentReport();
    } else if (tab === 'date') {
        loadDateReport();
    }
}

// Student Report
function loadStudentReport() {
    const students = getData('students') || [];
    const classes = getData('classes') || [];
    const select = document.getElementById('studentReportFilter');
    
    // Only populate dropdown if it's empty
    if (select.options.length <= 1) {
        select.innerHTML = '<option value="">Select Student</option>';
        students.forEach(student => {
            select.innerHTML += `<option value="${student.id}">${student.student_name} (${student.rollNumber})</option>`;
        });
    }
    
    const studentId = parseInt(document.getElementById('studentReportFilter').value);
    if (!studentId) {
        document.getElementById('studentReportTableBody').innerHTML = '';
        document.getElementById('studentReportStats').innerHTML = '';
        return;
    }
    
    const student = students.find(s => s.id === studentId);
    if (!student) {
        console.error('Student not found:', studentId);
        return;
    }
    
    const attendance = getData('attendance') || [];
    const startDate = document.getElementById('studentReportStartDate').value;
    const endDate = document.getElementById('studentReportEndDate').value;
    
    console.log('=== STUDENT REPORT ===');
    console.log('Student:', student.student_name, 'ID:', studentId);
    console.log('Total attendance records:', attendance.length);
    console.log('Date range:', startDate, 'to', endDate);
    
    // Filter by student ID
    let filtered = attendance.filter(a => {
        const match = parseInt(a.studentId) === studentId;
        if (match) {
            console.log('Matched record:', a);
        }
        return match;
    });
    console.log('Filtered by student:', filtered.length);
    
    // Filter by date range
    if (startDate) {
        filtered = filtered.filter(a => a.date >= startDate);
        console.log('After start date filter:', filtered.length);
    }
    if (endDate) {
        filtered = filtered.filter(a => a.date <= endDate);
        console.log('After end date filter:', filtered.length);
    }
    
    // Calculate stats
    const total = filtered.length;
    const present = filtered.filter(a => a.status === 'present').length;
    const absent = total - present;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
    
    console.log('Stats - Total:', total, 'Present:', present, 'Absent:', absent, 'Percentage:', percentage);
    
    // Display stats
    const statsHtml = `
        <div class="stat-item present">
            <h4>Present</h4>
            <div class="value">${present}</div>
        </div>
        <div class="stat-item absent">
            <h4>Absent</h4>
            <div class="value">${absent}</div>
        </div>
        <div class="stat-item">
            <h4>Total</h4>
            <div class="value">${total}</div>
        </div>
        <div class="stat-item percentage">
            <h4>Percentage</h4>
            <div class="value">${percentage}%</div>
        </div>
    `;
    document.getElementById('studentReportStats').innerHTML = statsHtml;
    
    // Display table
    const tbody = document.getElementById('studentReportTableBody');
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 40px;"><div style="color: #95a5a6; font-size: 16px;"><span style="font-size: 48px;">📋</span><br><br><strong>No Attendance Records Found</strong><br><small>This student has no attendance records for the selected date range.</small></div></td></tr>';
        return;
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    filtered.forEach(record => {
        console.log('Processing record:', record);
        
        // Get class name from classes array
        const classObj = classes.find(c => c.id === parseInt(record.classId));
        const className = classObj ? `${classObj.className} - ${classObj.class_section || 'N/A'}` : 'Unknown Class';
        
        console.log('Class for record:', className, 'ClassID:', record.classId);
        
        // Format date
        const formattedDate = record.date || 'N/A';
        
        // Format status
        const statusText = record.status === 'present' ? '✓ PRESENT' : '✗ ABSENT';
        const statusColor = record.status === 'present' ? '#27ae60' : '#e74c3c';
        
        const row = `
            <tr>
                <td><strong>${formattedDate}</strong></td>
                <td><strong>${className}</strong></td>
                <td><span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
        console.log('Added row:', formattedDate, className, statusText);
    });
    
    console.log('=== REPORT COMPLETE ===');
}

// Date Report
function loadDateReport() {
    const classes = getData('classes') || [];
    const select = document.getElementById('dateReportClassFilter');
    
    // Store current selection before rebuilding
    const currentSelection = select.value;
    
    // Rebuild dropdown only if empty
    if (select.options.length <= 1) {
        select.innerHTML = '<option value="">All Classes</option>';
        classes.forEach(cls => {
            if (cls && cls.id && cls.className) {
                select.innerHTML += `<option value="${cls.id}">${cls.className} - ${cls.class_section || 'N/A'}</option>`;
            }
        });
        // Restore selection after rebuild
        if (currentSelection) {
            select.value = currentSelection;
        }
    }
    
    const date = document.getElementById('dateReportDate').value;
    if (!date) {
        document.getElementById('dateReportTableBody').innerHTML = '';
        document.getElementById('dateReportStats').innerHTML = '';
        return;
    }
    
    const attendance = getData('attendance') || [];
    const classFilter = select.value;
    
    console.log('=== Date Report Debug ===');
    console.log('Selected date:', date);
    console.log('Selected class filter value:', classFilter);
    console.log('Selected class filter type:', typeof classFilter);
    console.log('Selected dropdown index:', select.selectedIndex);
    console.log('Selected dropdown text:', select.options[select.selectedIndex].text);
    console.log('Total attendance records:', attendance.length);
    
    // Show sample of attendance records for debugging
    if (attendance.length > 0) {
        console.log('Sample attendance record:', attendance[0]);
        console.log('Sample classId type:', typeof attendance[0].classId);
    }
    
    // Filter by date first
    let filtered = attendance.filter(a => a.date === date);
    console.log('After date filter:', filtered.length, 'records');
    
    // Show which classes are in the filtered results
    const classesInResults = [...new Set(filtered.map(a => a.classId))];
    console.log('Classes in date-filtered results:', classesInResults);
    
    // Filter by class if selected
    if (classFilter && classFilter !== '') {
        const classId = parseInt(classFilter);
        console.log('Filtering by classId:', classId, '(type:', typeof classId, ')');
        const beforeFilter = filtered.length;
        filtered = filtered.filter(a => {
            const match = a.classId === classId;
            if (!match) {
                console.log('Excluding record with classId:', a.classId, '(type:', typeof a.classId, ')');
            }
            return match;
        });
        console.log('After class filter:', filtered.length, 'records (removed', beforeFilter - filtered.length, 'records)');
    } else {
        console.log('No class filter applied - showing all classes');
    }
    
    // Calculate stats
    const total = filtered.length;
    const present = filtered.filter(a => a.status === 'present').length;
    const absent = total - present;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
    
    console.log('Stats - Total:', total, 'Present:', present, 'Absent:', absent);
    
    // Display stats with class filter indicator
    const classFilterText = classFilter ? ` (${select.options[select.selectedIndex].text})` : ' (All Classes)';
    const statsHtml = `
        <div class="stat-item present">
            <h4>Present</h4>
            <div class="value">${present}</div>
        </div>
        <div class="stat-item absent">
            <h4>Absent</h4>
            <div class="value">${absent}</div>
        </div>
        <div class="stat-item">
            <h4>Total${classFilterText}</h4>
            <div class="value">${total}</div>
        </div>
        <div class="stat-item percentage">
            <h4>Percentage</h4>
            <div class="value">${percentage}%</div>
        </div>
    `;
    document.getElementById('dateReportStats').innerHTML = statsHtml;
    
    // Display table
    const tbody = document.getElementById('dateReportTableBody');
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;"><div style="color: #95a5a6; font-size: 16px;"><span style="font-size: 48px;">📅</span><br><br><strong>No Attendance Records Found</strong><br><small>No attendance was marked for this date' + (classFilter ? ' and selected class' : '') + '.</small></div></td></tr>';
        return;
    }
    
    filtered.forEach(record => {
        // Get class name from classes array
        const classObj = classes.find(c => c.id === record.classId);
        const className = classObj ? `${classObj.className} - ${classObj.class_section || 'N/A'}` : 'N/A';
        
        const row = `
            <tr>
                <td><strong>${record.date}</strong></td>
                <td><strong>${className}</strong></td>
                <td>${record.studentName}</td>
                <td>${record.rollNumber || 'N/A'}</td>
                <td><span style="color: ${record.status === 'present' ? '#27ae60' : '#e74c3c'}; font-weight: bold;">${record.status === 'present' ? '✓ PRESENT' : '✗ ABSENT'}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    console.log('=== End Debug ===');
}

// Download functions
function downloadStudentReport(format) {
    const studentId = parseInt(document.getElementById('studentReportFilter').value);
    if (!studentId) {
        alert('Please select a student');
        return;
    }
    
    const students = getData('students');
    const student = students.find(s => s.id === studentId);
    const attendance = getData('attendance');
    const startDate = document.getElementById('studentReportStartDate').value;
    const endDate = document.getElementById('studentReportEndDate').value;
    
    let filtered = attendance.filter(a => a.studentName === student.name);
    if (startDate) filtered = filtered.filter(a => a.date >= startDate);
    if (endDate) filtered = filtered.filter(a => a.date <= endDate);
    
    if (format === 'csv') {
        downloadCSV(filtered, `Student_Report_${student.rollNumber}`);
    } else if (format === 'pdf') {
        downloadPDF(filtered, `Student Report - ${student.name}`);
    }
}

function downloadDateReport(format) {
    const date = document.getElementById('dateReportDate').value;
    if (!date) {
        alert('Please select a date');
        return;
    }
    
    const attendance = getData('attendance');
    const classFilter = document.getElementById('dateReportClassFilter').value;
    
    let filtered = attendance.filter(a => a.date === date);
    if (classFilter) filtered = filtered.filter(a => a.classId === parseInt(classFilter));
    
    if (format === 'csv') {
        downloadCSV(filtered, `Attendance_Report_${date}`);
    } else if (format === 'pdf') {
        downloadPDF(filtered, `Attendance Report - ${date}`);
    }
}

// CSV Download
function downloadCSV(data, filename) {
    let csv = 'Date,Class,Student,Roll Number,Status\n';
    
    data.forEach(record => {
        csv += `"${record.date}","${record.className}","${record.studentName}","${record.rollNumber || 'N/A'}","${record.status}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// PDF Download (Simple text-based)
function downloadPDF(data, title) {
    let content = `${title}\n`;
    content += `Generated: ${new Date().toLocaleString()}\n`;
    content += `\n`;
    content += `Date | Class | Student | Roll Number | Status\n`;
    content += `${'='.repeat(80)}\n`;
    
    data.forEach(record => {
        content += `${record.date} | ${record.className} | ${record.studentName} | ${record.rollNumber || 'N/A'} | ${record.status}\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Save Report Functions
function saveReportToDatabase() {
    const attendance = getData('attendance') || [];
    
    if (attendance.length === 0) {
        alert('❌ No attendance records to save');
        return;
    }
    
    try {
        // Create report object
        const report = {
            id: Date.now(),
            name: `Attendance Report - ${new Date().toLocaleDateString()}`,
            description: `Auto-generated attendance report with ${attendance.length} records`,
            totalRecords: attendance.length,
            presentCount: attendance.filter(a => a.status === 'present').length,
            absentCount: attendance.filter(a => a.status === 'absent').length,
            createdAt: new Date().toISOString(),
            data: attendance
        };
        
        // Get existing reports
        let reports = getData('reports') || [];
        
        // Add new report
        reports.push(report);
        
        // Save to localStorage
        saveData('reports', reports);
        
        console.log('Report saved:', report);
        alert(`✅ Report saved successfully!\n\nTotal Records: ${report.totalRecords}\nPresent: ${report.presentCount}\nAbsent: ${report.absentCount}`);
        
        // Show success notification
        showNotification(`✅ Report saved with ${report.totalRecords} records`, 'success');
        
    } catch (error) {
        console.error('Error saving report:', error);
        alert('❌ Error saving report. Check console for details.');
    }
}

function refreshReports() {
    const attendance = getData('attendance') || [];
    
    if (attendance.length === 0) {
        document.getElementById('saveReportBtn').style.display = 'none';
        alert('No attendance records available');
        return;
    }
    
    document.getElementById('saveReportBtn').style.display = 'inline-block';
    alert(`✅ Reports refreshed!\n\nTotal Records: ${attendance.length}`);
}

function showEditAttendanceModal(id) {
    const attendance = getData('attendance');
    const record = attendance.find(a => a.id == id);
    if (record) {
        document.getElementById('attendanceId').value = record.id;
        document.getElementById('attendanceStudent').value = record.studentName;
        document.getElementById('attendanceEditDate').value = record.date;
        document.getElementById('attendanceStatus').value = record.status;
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('editAttendanceModal').classList.add('active');
    }
}

function updateAttendance(event) {
    event.preventDefault();
    const attendance = getData('attendance');
    const id = document.getElementById('attendanceId').value;
    const index = attendance.findIndex(a => a.id == id);
    
    if (index !== -1) {
        attendance[index].date = document.getElementById('attendanceEditDate').value;
        attendance[index].status = document.getElementById('attendanceStatus').value;
        saveData('attendance', attendance);
        closeModal();
        loadAttendanceReports();
        alert('Attendance updated successfully!');
    }
}

function deleteAttendance(id) {
    if (confirm('Are you sure you want to delete this attendance record?')) {
        let attendance = getData('attendance');
        attendance = attendance.filter(a => a.id != id);
        saveData('attendance', attendance);
        loadAttendanceReports();
    }
}

function exportAttendanceReport() {
    const attendance = getData('attendance');
    const classFilter = document.getElementById('reportClassFilter').value;
    const dateFilter = document.getElementById('reportDateFilter').value;
    
    let filtered = attendance;
    if (classFilter) {
        filtered = filtered.filter(a => a.className === classFilter);
    }
    if (dateFilter) {
        filtered = filtered.filter(a => a.date === dateFilter);
    }
    
    if (filtered.length === 0) {
        alert('No attendance records to export!');
        return;
    }
    
    // Create CSV content
    let csv = 'Date,Class,Student,Roll Number,Status\n';
    const students = getData('students');
    
    filtered.forEach(record => {
        const student = students.find(s => s.id === record.studentId);
        const rollNumber = student ? student.rollNumber : 'N/A';
        csv += `${record.date},${record.className},${record.studentName},${rollNumber},${record.status}\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Attendance report saved successfully!');
}

// TEACHER FUNCTIONS
function showTeacherSection(section) {
    document.querySelectorAll('#teacherDashboard .content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#teacherDashboard .nav-item').forEach(n => n.classList.remove('active'));
    
    const sectionMap = {
        'dashboard': 'teacherDashboardSection',
        'mark': 'teacherMarkSection',
        'history': 'teacherHistorySection'
    };
    
    const titleMap = {
        'dashboard': 'Dashboard',
        'mark': 'Mark Attendance',
        'history': 'Attendance History'
    };
    
    document.getElementById(sectionMap[section]).classList.add('active');
    document.getElementById('teacherSectionTitle').textContent = titleMap[section];
    event.target.closest('.nav-item').classList.add('active');
    
    if (section === 'mark') loadTeacherMarkSection();
    if (section === 'history') loadTeacherHistorySection();
}

function loadTeacherDashboard() {
    const teachers = getData('teachers') || [];
    const classes = getData('classes') || [];
    const students = getData('students') || [];
    
    console.log('Loading teacher dashboard - teachers:', teachers.length);
    
    // For demo, assume first teacher
    const teacher = teachers[0];
    
    if (!teacher) {
        document.getElementById('assignedClassInfo').innerHTML = '<p style="color: #e74c3c;">No teacher data found</p>';
        return;
    }
    
    console.log('Current teacher:', teacher);
    
    // Get assigned classes
    const assignedClassIds = teacher.classIds || [];
    const assignedClasses = classes.filter(c => assignedClassIds.includes(c.id));
    
    console.log('Assigned class IDs:', assignedClassIds);
    console.log('Assigned classes:', assignedClasses);
    
    // Count total students in assigned classes
    const classStudents = students.filter(s => assignedClassIds.includes(s.classId));
    
    document.getElementById('teacherClasses').textContent = assignedClasses.length;
    document.getElementById('teacherStudents').textContent = classStudents.length;
    
    // Display assigned classes with details and times
    let classesHtml = '<h3>📚 My Classes</h3>';
    
    if (assignedClasses.length === 0) {
        classesHtml += '<p style="color: #7f8c8d;">No classes assigned</p>';
    } else {
        classesHtml += '<div class="teacher-classes-list">';
        assignedClasses.forEach(cls => {
            const classStudentCount = students.filter(s => s.classId === cls.id).length;
            const classTime = teacher.classTimes && teacher.classTimes[cls.id] ? teacher.classTimes[cls.id] : 'Not set';
            
            classesHtml += `
                <div class="teacher-class-card">
                    <div class="class-header">
                        <h4>${cls.className}</h4>
                        <span class="section-badge">${cls.class_section || 'N/A'}</span>
                    </div>
                    <div class="class-details">
                        <p><strong>Year:</strong> ${cls.year}</p>
                        <p><strong>Academic Year:</strong> ${cls.academic_year || 'N/A'}</p>
                        <p><strong>Students:</strong> ${classStudentCount}</p>
                        <p><strong>Class Time:</strong> <span style="color: #3498db; font-weight: bold;">${classTime}</span></p>
                    </div>
                </div>
            `;
        });
        classesHtml += '</div>';
    }
    
    document.getElementById('assignedClassInfo').innerHTML = classesHtml;
}

function loadTeacherMarkSection() {
    const classes = getData('classes') || [];
    const select = document.getElementById('teacherClassSelect');
    select.innerHTML = '<option value="">Select a class</option>';
    
    // Filter out undefined classes and add valid ones
    classes.forEach(cls => {
        if (cls && cls.id && cls.className) {
            select.innerHTML += `<option value="${cls.id}">${cls.className} - ${cls.class_section || 'N/A'}</option>`;
        }
    });
    
    // Set today's date
    document.getElementById('attendanceDate').valueAsDate = new Date();
    
    // Set current time
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('attendanceTime').value = `${hours}:${minutes}`;
    
    // Initialize attendance counter
    updateAttendanceCounter();
}

function checkAttendanceStatus() {
    const classId = document.getElementById('teacherClassSelect').value;
    const date = document.getElementById('attendanceDate').value;
    const warningBox = document.getElementById('attendanceWarning');
    
    if (!classId || !date) {
        warningBox.style.display = 'none';
        return;
    }
    
    // Check if date is holiday or weekend FIRST
    const dayCheck = isNonWorkingDay(date);
    
    if (dayCheck.type === 'off') {
        // Completely block attendance on off days
        warningBox.style.display = 'block';
        warningBox.className = 'warning-box error';
        warningBox.innerHTML = `
            <strong>🚫 ${dayCheck.reason}</strong><br>
            Attendance recording is disabled for this day. This is a designated holiday/off day.<br>
            <small>To mark attendance on this day, please change the day policy in Calendar & Holidays section.</small>
        `;
        
        // Disable attendance marking
        disableAttendanceMarking();
        return;
    }
    
    if (dayCheck.isHalfDay) {
        // Show info message for half days
        warningBox.style.display = 'block';
        warningBox.className = 'warning-box info';
        warningBox.innerHTML = `
            <strong>ℹ️ ${dayCheck.reason}</strong><br>
            This is a half-day. Attendance can be marked but please note the reduced working hours.
        `;
        enableAttendanceMarking();
    } else if (dayCheck.type === 'holiday') {
        // Show warning for holidays
        warningBox.style.display = 'block';
        warningBox.className = 'warning-box warning';
        warningBox.innerHTML = `
            <strong>⚠️ ${dayCheck.reason}</strong><br>
            This is a designated holiday. Attendance recording is disabled.<br>
            <small>If this is a special class, please remove the holiday from Calendar & Holidays section first.</small>
        `;
        disableAttendanceMarking();
        return;
    } else {
        // Check for existing attendance
        const attendance = getData('attendance') || [];
        const existingRecord = attendance.find(a => a.classId === parseInt(classId) && a.date === date);
        
        if (existingRecord) {
            warningBox.style.display = 'block';
            warningBox.className = 'warning-box';
            warningBox.innerHTML = `
                <strong>⚠️ Attendance Already Marked</strong><br>
                This class already has attendance marked for ${date}. 
                <button class="btn btn-secondary" onclick="editExistingAttendance(${existingRecord.id})" style="margin-top: 10px;">Edit Existing</button>
            `;
            enableAttendanceMarking();
        } else {
            warningBox.style.display = 'none';
            enableAttendanceMarking();
        }
    }
    
    // Check time restriction
    checkTimeRestriction();
}

// Disable attendance marking controls
function disableAttendanceMarking() {
    const container = document.getElementById('attendanceStudentsList');
    container.innerHTML = '<div class="disabled-message"><span style="font-size: 48px;">🚫</span><h3>Attendance Disabled</h3><p>Attendance cannot be marked on this day due to institutional policy.</p></div>';
    
    document.getElementById('saveAttendanceBtn').style.display = 'none';
    document.getElementById('markAllPresentBtn').style.display = 'none';
    document.getElementById('markAllAbsentBtn').style.display = 'none';
    document.getElementById('clearAllBtn').style.display = 'none';
    document.getElementById('exportCSVBtn').style.display = 'none';
}

// Enable attendance marking controls
function enableAttendanceMarking() {
    const classId = document.getElementById('teacherClassSelect').value;
    if (classId) {
        loadStudentsForAttendance();
    }
}

function checkTimeRestriction() {
    const time = document.getElementById('attendanceTime').value;
    const timeStatus = document.getElementById('attendanceTimeStatus');
    
    if (!time) {
        timeStatus.style.display = 'none';
        return;
    }
    
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    
    // Assume attendance window: 8:00 AM to 5:00 PM
    const startTime = 8 * 60; // 8:00 AM
    const endTime = 17 * 60; // 5:00 PM
    const warningStart = 16 * 60; // 4:00 PM (warning zone)
    
    timeStatus.style.display = 'inline-block';
    
    if (timeInMinutes < startTime || timeInMinutes > endTime) {
        timeStatus.className = 'time-status restricted';
        timeStatus.innerHTML = '🔴 Outside attendance window (8 AM - 5 PM)';
    } else if (timeInMinutes > warningStart) {
        timeStatus.className = 'time-status warning';
        timeStatus.innerHTML = '🟡 Late marking (after 4 PM)';
    } else {
        timeStatus.className = 'time-status allowed';
        timeStatus.innerHTML = '🟢 Within attendance window';
    }
}

function loadStudentsForAttendance() {
    const classId = document.getElementById('teacherClassSelect').value;
    console.log('loadStudentsForAttendance - classId:', classId);
    
    if (!classId) {
        document.getElementById('attendanceStudentsList').innerHTML = '';
        document.getElementById('saveAttendanceBtn').style.display = 'none';
        document.getElementById('markAllPresentBtn').style.display = 'none';
        document.getElementById('markAllAbsentBtn').style.display = 'none';
        document.getElementById('clearAllBtn').style.display = 'none';
        document.getElementById('exportCSVBtn').style.display = 'none';
        return;
    }
    
    const students = getData('students') || [];
    console.log('All students:', students);
    
    const classStudents = students.filter(s => s.classId === parseInt(classId));
    console.log('Students for classId', classId, ':', classStudents);
    
    const container = document.getElementById('attendanceStudentsList');
    
    if (classStudents.length === 0) {
        container.innerHTML = '<p style="padding: 20px; text-align: center; color: #7f8c8d;">No students in this class</p>';
        document.getElementById('saveAttendanceBtn').style.display = 'none';
        document.getElementById('markAllPresentBtn').style.display = 'none';
        document.getElementById('markAllAbsentBtn').style.display = 'none';
        document.getElementById('clearAllBtn').style.display = 'none';
        document.getElementById('exportCSVBtn').style.display = 'none';
        return;
    }
    
    container.innerHTML = '<h3>📚 Students (' + classStudents.length + ')</h3>';
    
    classStudents.forEach(student => {
        const item = document.createElement('div');
        item.className = 'attendance-item';
        item.id = `student-${student.id}`;
        item.innerHTML = `
            <div class="student-info">
                <div class="student-name">${student.student_name || 'Unknown'}</div>
                <div class="student-roll">${student.rollNumber || 'N/A'}</div>
            </div>
            <div class="attendance-toggle">
                <button class="toggle-btn" onclick="markStatus(${student.id}, 'present', this)">✓ Present</button>
                <button class="toggle-btn" onclick="markStatus(${student.id}, 'absent', this)">✗ Absent</button>
            </div>
        `;
        container.appendChild(item);
    });
    
    document.getElementById('saveAttendanceBtn').style.display = 'block';
    document.getElementById('markAllPresentBtn').style.display = 'inline-block';
    document.getElementById('markAllAbsentBtn').style.display = 'inline-block';
    document.getElementById('clearAllBtn').style.display = 'inline-block';
    document.getElementById('exportCSVBtn').style.display = 'inline-block';
    document.getElementById('viewHistoryBtn').style.display = 'inline-block';
    
    checkAttendanceStatus();
    updateAttendanceCounter();
}

let attendanceData = {};

function markStatus(studentId, status, btn) {
    console.log('markStatus called - studentId:', studentId, 'status:', status);
    
    if (!btn || !btn.parentElement) {
        console.error('Button element not found');
        return;
    }
    
    const buttons = btn.parentElement.querySelectorAll('.toggle-btn');
    buttons.forEach(b => {
        b.classList.remove('present', 'absent');
    });
    btn.classList.add(status);
    attendanceData[studentId] = status;
    
    console.log('Marked student', studentId, 'as', status);
    console.log('Current attendanceData:', attendanceData);
    
    updateAttendanceCounter();
}

function markAllPresent() {
    const students = document.querySelectorAll('.attendance-item');
    students.forEach(item => {
        const presentBtn = item.querySelector('.toggle-btn:first-child');
        if (presentBtn) {
            presentBtn.click();
        }
    });
    showNotification('✓ All students marked as Present', 'success');
}

function markAllAbsent() {
    const students = document.querySelectorAll('.attendance-item');
    students.forEach(item => {
        const absentBtn = item.querySelector('.toggle-btn:last-child');
        if (absentBtn) {
            absentBtn.click();
        }
    });
    showNotification('✗ All students marked as Absent', 'success');
}

function clearAllMarks() {
    if (confirm('Are you sure you want to clear all marks?')) {
        const buttons = document.querySelectorAll('.toggle-btn');
        buttons.forEach(btn => {
            btn.classList.remove('present', 'absent');
        });
        attendanceData = {};
        updateAttendanceCounter();
        showNotification('🔄 All marks cleared', 'info');
    }
}

function updateAttendanceCounter() {
    const marked = Object.keys(attendanceData).length;
    const total = document.querySelectorAll('.attendance-item').length;
    const counter = document.getElementById('attendanceCounter');
    counter.textContent = `Marked: ${marked}/${total}`;
}

function saveAttendance() {
    const classId = document.getElementById('teacherClassSelect').value;
    const date = document.getElementById('attendanceDate').value;
    const time = document.getElementById('attendanceTime').value;
    
    console.log('=== SAVE ATTENDANCE ===');
    console.log('classId:', classId, 'date:', date, 'time:', time);
    console.log('attendanceData:', attendanceData);
    
    if (!classId || !date || !time) {
        showNotification('❌ Please select class, date, and time', 'error');
        console.error('Missing required fields');
        return;
    }
    
    if (Object.keys(attendanceData).length === 0) {
        showNotification('❌ Please mark attendance for at least one student', 'error');
        console.error('No students marked');
        return;
    }
    
    // Check if date is holiday or weekend
    const nonWorkingDay = isNonWorkingDay(date);
    if (nonWorkingDay.isNonWorking) {
        if (!confirm(`⚠️ ${nonWorkingDay.reason}\n\nAre you sure you want to mark attendance for a non-working day?`)) {
            return;
        }
    } else if (nonWorkingDay.isHalfDay) {
        if (!confirm(`ℹ️ ${nonWorkingDay.reason}\n\nThis is a half-day. Continue marking attendance?`)) {
            return;
        }
    }
    
    try {
        const students = getData('students') || [];
        const classes = getData('classes') || [];
        const currentUser = localStorage.getItem('currentUser') || 'Teacher';
        console.log('Total students in system:', students.length);
        
        let attendance = getData('attendance') || [];
        console.log('Existing attendance records:', attendance.length);
        
        // Check for duplicates
        const existingRecords = attendance.filter(a => a.classId === parseInt(classId) && a.date === date);
        console.log('Existing records for this class/date:', existingRecords.length);
        
        if (existingRecords.length > 0) {
            if (!confirm('Attendance already exists for this date. Do you want to update it?')) {
                console.log('User cancelled update');
                return;
            }
            // Remove old records for this class and date
            attendance = attendance.filter(a => !(a.classId === parseInt(classId) && a.date === date));
            console.log('Removed old records, remaining:', attendance.length);
        }
        
        // Save new records
        let savedCount = 0;
        let presentCount = 0;
        let absentCount = 0;
        
        Object.keys(attendanceData).forEach(studentId => {
            const student = students.find(s => s.id === parseInt(studentId));
            if (student) {
                const record = {
                    id: Date.now() + Math.random(),
                    classId: parseInt(classId),
                    studentId: parseInt(studentId),
                    studentName: student.student_name,
                    rollNumber: student.rollNumber,
                    date: date,
                    time: time,
                    status: attendanceData[studentId],
                    markedAt: new Date().toISOString(),
                    isHoliday: nonWorkingDay.isNonWorking,
                    holidayReason: nonWorkingDay.reason
                };
                attendance.push(record);
                savedCount++;
                
                if (attendanceData[studentId] === 'present') {
                    presentCount++;
                } else {
                    absentCount++;
                }
                
                console.log('Saved record for student:', student.student_name, 'Status:', attendanceData[studentId]);
            } else {
                console.warn('Student not found for ID:', studentId);
            }
        });
        
        console.log('Total records saved:', savedCount);
        saveData('attendance', attendance);
        console.log('Attendance data saved to localStorage');
        console.log('Total attendance records now:', attendance.length);
        
        // Get class name for notification
        const classObj = classes.find(c => c.id === parseInt(classId));
        const className = classObj ? `${classObj.className} - ${classObj.class_section}` : 'Unknown Class';
        
        // Create immediate clock-in alert notification
        createClockInAlert({
            teacherName: currentUser,
            className: className,
            date: date,
            time: time,
            totalStudents: savedCount,
            presentCount: presentCount,
            absentCount: absentCount
        });
        
        showNotification(`✅ Attendance saved successfully! (${savedCount} students)`, 'success');
        attendanceData = {};
        loadStudentsForAttendance();
    } catch (error) {
        console.error('Error saving attendance:', error);
        showNotification('❌ Error saving attendance. Check console for details.', 'error');
    }
}

function exportAttendanceCSV() {
    const classId = document.getElementById('teacherClassSelect').value;
    const date = document.getElementById('attendanceDate').value;
    
    if (!classId || !date) {
        showNotification('❌ Please select class and date', 'error');
        return;
    }
    
    const attendance = getData('attendance') || [];
    const records = attendance.filter(a => a.classId === parseInt(classId) && a.date === date);
    
    if (records.length === 0) {
        showNotification('📋 No attendance records found for the selected filters', 'info');
        return;
    }
    
    let csv = 'Roll Number,Student Name,Status,Date,Time\n';
    records.forEach(record => {
        csv += `${record.rollNumber},${record.studentName},${record.status},${record.date},${record.time}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${classId}_${date}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('📥 CSV exported successfully', 'success');
}

function viewAttendanceHistory() {
    const classId = document.getElementById('teacherClassSelect').value;
    if (!classId) {
        showNotification('❌ Please select a class', 'error');
        return;
    }
    showTeacherSection('history');
}

function editExistingAttendance(recordId) {
    showNotification('📝 Edit feature coming soon', 'info');
}

function showNotification(message, type = 'info') {
    const warningBox = document.getElementById('attendanceWarning');
    warningBox.style.display = 'block';
    warningBox.className = `warning-box ${type}`;
    warningBox.innerHTML = message;
    setTimeout(() => {
        warningBox.style.display = 'none';
    }, 4000);
}

function loadTeacherHistorySection() {
    const classes = getData('classes') || [];
    const select = document.getElementById('historyClassFilter');
    select.innerHTML = '<option value="">Select Class</option>';
    
    classes.forEach(cls => {
        select.innerHTML += `<option value="${cls.id}">${cls.className} - ${cls.class_section || 'N/A'}</option>`;
    });
}

function loadTeacherHistory() {
    const classId = document.getElementById('historyClassFilter').value;
    const date = document.getElementById('historyDateFilter').value;
    
    if (!classId) {
        document.getElementById('historyTableBody').innerHTML = '';
        return;
    }
    
    let attendance = getData('attendance') || [];
    attendance = attendance.filter(a => a.classId === parseInt(classId));
    
    if (date) {
        attendance = attendance.filter(a => a.date === date);
    }
    
    // Sort by date descending
    attendance.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const tbody = document.getElementById('historyTableBody');
    tbody.innerHTML = '';
    
    if (attendance.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;"><div style="color: #95a5a6; font-size: 16px;"><span style="font-size: 48px;">📜</span><br><br><strong>No Attendance History</strong><br><small>No attendance records found for the selected class and date.</small></div></td></tr>';
        return;
    }
    
    // Calculate statistics
    const present = attendance.filter(a => a.status === 'present').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const total = attendance.length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
    
    // Display statistics
    const statsHtml = `
        <tr style="background: #f8f9fa; font-weight: bold;">
            <td colspan="5">
                📊 Statistics: Present: ${present} | Absent: ${absent} | Total: ${total} | Percentage: ${percentage}%
            </td>
        </tr>
    `;
    tbody.innerHTML = statsHtml;
    
    attendance.forEach(record => {
        const statusColor = record.status === 'present' ? '#27ae60' : '#e74c3c';
        const statusIcon = record.status === 'present' ? '✓' : '✗';
        const row = `
            <tr>
                <td>${record.date}</td>
                <td>${record.rollNumber}</td>
                <td>${record.studentName}</td>
                <td>${record.time || 'N/A'}</td>
                <td><span style="color: ${statusColor}; font-weight: bold;">${statusIcon} ${record.status.toUpperCase()}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function downloadHistoryReport() {
    const classId = document.getElementById('historyClassFilter').value;
    const date = document.getElementById('historyDateFilter').value;
    
    if (!classId) {
        showNotification('❌ Please select a class', 'error');
        return;
    }
    
    let attendance = getData('attendance') || [];
    attendance = attendance.filter(a => a.classId === parseInt(classId));
    
    if (date) {
        attendance = attendance.filter(a => a.date === date);
    }
    
    if (attendance.length === 0) {
        showNotification('📋 No attendance records found for the selected filters', 'info');
        return;
    }
    
    // Create CSV
    let csv = 'Date,Roll Number,Student Name,Time,Status\n';
    attendance.forEach(record => {
        csv += `${record.date},${record.rollNumber},${record.studentName},${record.time || 'N/A'},${record.status}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_history_${classId}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('📥 Report downloaded successfully', 'success');
}

// STUDENT FUNCTIONS
function showStudentSection(section) {
    document.querySelectorAll('#studentDashboard .content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#studentDashboard .nav-item').forEach(n => n.classList.remove('active'));
    
    const sectionMap = {
        'dashboard': 'studentDashboardSection',
        'attendance': 'studentAttendanceSection'
    };
    
    const titleMap = {
        'dashboard': 'Dashboard',
        'attendance': 'My Attendance'
    };
    
    document.getElementById(sectionMap[section]).classList.add('active');
    document.getElementById('studentSectionTitle').textContent = titleMap[section];
    event.target.closest('.nav-item').classList.add('active');
    
    if (section === 'attendance') loadStudentAttendance();
}

function loadStudentDashboard() {
    const students = getData('students');
    const classes = getData('classes');
    const attendance = getData('attendance');
    const studentId = parseInt(localStorage.getItem('currentStudentId'));
    
    const student = students.find(s => s.id === studentId);
    
    if (student) {
        // Get class name from classes array
        const studentClass = classes.find(c => c.id === student.classId);
        const className = studentClass ? `${studentClass.className} - ${studentClass.class_section || 'N/A'}` : 'N/A';
        
        // Update header with student name
        document.getElementById('studentUserInfo').textContent = student.student_name;
        
        // Display personal details
        document.getElementById('studentDetails').innerHTML = `
            <p><strong>Name:</strong> ${student.student_name}</p>
            <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
            <p><strong>Class:</strong> ${className}</p>
        `;
        
        // Calculate attendance statistics
        const studentAttendance = attendance.filter(a => a.studentId === student.id);
        const presentDays = studentAttendance.filter(a => a.status === 'present').length;
        const absentDays = studentAttendance.filter(a => a.status === 'absent').length;
        const total = studentAttendance.length;
        const percentage = total > 0 ? ((presentDays / total) * 100).toFixed(1) : 0;
        
        // Update statistics cards
        document.getElementById('studentAttendancePercent').textContent = percentage + '%';
        document.getElementById('studentPresentDays').textContent = presentDays;
        document.getElementById('studentAbsentDays').textContent = absentDays;
        document.getElementById('studentTotalDays').textContent = total;
    } else {
        alert('Student data not found!');
        logout();
    }
}

function loadStudentAttendance() {
    const attendance = getData('attendance');
    const studentId = parseInt(localStorage.getItem('currentStudentId'));
    
    if (!studentId) return;
    
    const monthFilter = document.getElementById('studentMonthFilter').value;
    let studentAttendance = attendance.filter(a => a.studentId === studentId);
    
    if (monthFilter) {
        const [year, month] = monthFilter.split('-');
        studentAttendance = studentAttendance.filter(a => {
            const [aYear, aMonth] = a.date.split('-');
            return aYear === year && aMonth === month;
        });
    }
    
    // Sort by date (newest first)
    studentAttendance.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const tbody = document.getElementById('studentAttendanceTableBody');
    tbody.innerHTML = '';
    
    if (studentAttendance.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2" style="text-align: center; padding: 40px;"><div style="color: #95a5a6; font-size: 16px;"><span style="font-size: 48px;">📊</span><br><br><strong>No Attendance Records Yet</strong><br><small>You don\'t have any attendance records for the selected month.<br>Attendance will appear here once your teacher marks it.</small></div></td></tr>';
        return;
    }
    
    studentAttendance.forEach(record => {
        const row = `
            <tr>
                <td>${record.date}</td>
                <td><span style="color: ${record.status === 'present' ? '#2ecc71' : '#e74c3c'}; font-weight: 600;">${record.status.toUpperCase()}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Modal Functions
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
    // Re-enable teacher ID field in case it was disabled during edit
    const teacherIdField = document.getElementById('teacherUniqueId');
    if (teacherIdField) {
        teacherIdField.disabled = false;
    }
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to delete all data? This cannot be undone!')) {
        localStorage.clear();
        initStorage();
        alert('All data cleared successfully!');
        location.reload();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    fixMissingTeacherIds(); // Auto-fix teachers without IDs
});

// Function to assign Teacher IDs to existing teachers that don't have one
function fixMissingTeacherIds() {
    const teachers = getData('teachers') || [];
    let modified = false;
    
    // Find the highest existing teacher number
    let maxNum = 0;
    teachers.forEach(t => {
        if (t.teacherId && t.teacherId.startsWith('TCH')) {
            const num = parseInt(t.teacherId.substring(3));
            if (!isNaN(num) && num > maxNum) {
                maxNum = num;
            }
        }
    });
    
    // Assign IDs to teachers without one
    teachers.forEach(teacher => {
        if (!teacher.teacherId || teacher.teacherId === 'N/A' || teacher.teacherId === '') {
            maxNum++;
            teacher.teacherId = 'TCH' + String(maxNum).padStart(3, '0');
            modified = true;
        }
    });
    
    // Save if any changes were made
    if (modified) {
        saveData('teachers', teachers);
        console.log('✅ Auto-assigned Teacher IDs to existing teachers');
    }
}


// LEAVE MANAGEMENT FUNCTIONS

// Show Teacher Leave Modal
function showTeacherLeaveModal(teacherId) {
    const teachers = getData('teachers');
    const teacher = teachers.find(t => t.id === teacherId);
    
    if (!teacher) {
        alert('Teacher not found!');
        return;
    }
    
    const leaves = getData('leaves') || [];
    const teacherLeaves = leaves.filter(l => l.type === 'teacher' && l.personId === teacherId);
    
    let leaveListHtml = '';
    if (teacherLeaves.length > 0) {
        leaveListHtml = '<div class="leave-list"><h4>Leave History:</h4><ul>';
        teacherLeaves.forEach(leave => {
            const statusColor = leave.status === 'approved' ? '#27ae60' : leave.status === 'rejected' ? '#e74c3c' : '#f39c12';
            leaveListHtml += `
                <li style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                    <strong>Date:</strong> ${leave.startDate} to ${leave.endDate}<br>
                    <strong>Reason:</strong> ${leave.reason}<br>
                    <strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${leave.status.toUpperCase()}</span>
                    ${leave.status === 'pending' ? `
                        <div style="margin-top: 5px;">
                            <button class="btn btn-success" onclick="updateLeaveStatus(${leave.id}, 'approved')" style="padding: 3px 8px; font-size: 12px;">Approve</button>
                            <button class="btn btn-danger" onclick="updateLeaveStatus(${leave.id}, 'rejected')" style="padding: 3px 8px; font-size: 12px;">Reject</button>
                        </div>
                    ` : ''}
                </li>
            `;
        });
        leaveListHtml += '</ul></div>';
    } else {
        leaveListHtml = '<p style="color: #95a5a6; text-align: center; padding: 20px;">No leave records found.</p>';
    }
    
    const modalHtml = `
        <div class="modal active" id="leaveModal">
            <div class="modal-content">
                <span class="close" onclick="closeLeaveModal()">&times;</span>
                <h2>Leave Management - ${teacher.name}</h2>
                <form onsubmit="submitTeacherLeave(event, ${teacherId})">
                    <div class="form-group">
                        <label>Start Date:</label>
                        <input type="date" id="leaveStartDate" required>
                    </div>
                    <div class="form-group">
                        <label>End Date:</label>
                        <input type="date" id="leaveEndDate" required>
                    </div>
                    <div class="form-group">
                        <label>Reason:</label>
                        <textarea id="leaveReason" rows="3" required placeholder="Enter leave reason..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Leave Request</button>
                </form>
                ${leaveListHtml}
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Show Student Leave Modal
function showStudentLeaveModal(studentId) {
    const students = getData('students');
    const student = students.find(s => s.id === studentId);
    
    if (!student) {
        alert('Student not found!');
        return;
    }
    
    const leaves = getData('leaves') || [];
    const studentLeaves = leaves.filter(l => l.type === 'student' && l.personId === studentId);
    
    let leaveListHtml = '';
    if (studentLeaves.length > 0) {
        leaveListHtml = '<div class="leave-list"><h4>Leave History:</h4><ul>';
        studentLeaves.forEach(leave => {
            const statusColor = leave.status === 'approved' ? '#27ae60' : leave.status === 'rejected' ? '#e74c3c' : '#f39c12';
            leaveListHtml += `
                <li style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                    <strong>Date:</strong> ${leave.startDate} to ${leave.endDate}<br>
                    <strong>Reason:</strong> ${leave.reason}<br>
                    <strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${leave.status.toUpperCase()}</span>
                    ${leave.status === 'pending' ? `
                        <div style="margin-top: 5px;">
                            <button class="btn btn-success" onclick="updateLeaveStatus(${leave.id}, 'approved')" style="padding: 3px 8px; font-size: 12px;">Approve</button>
                            <button class="btn btn-danger" onclick="updateLeaveStatus(${leave.id}, 'rejected')" style="padding: 3px 8px; font-size: 12px;">Reject</button>
                        </div>
                    ` : ''}
                </li>
            `;
        });
        leaveListHtml += '</ul></div>';
    } else {
        leaveListHtml = '<p style="color: #95a5a6; text-align: center; padding: 20px;">No leave records found.</p>';
    }
    
    const modalHtml = `
        <div class="modal active" id="leaveModal">
            <div class="modal-content">
                <span class="close" onclick="closeLeaveModal()">&times;</span>
                <h2>Leave Management - ${student.student_name}</h2>
                <form onsubmit="submitStudentLeave(event, ${studentId})">
                    <div class="form-group">
                        <label>Start Date:</label>
                        <input type="date" id="leaveStartDate" required>
                    </div>
                    <div class="form-group">
                        <label>End Date:</label>
                        <input type="date" id="leaveEndDate" required>
                    </div>
                    <div class="form-group">
                        <label>Reason:</label>
                        <textarea id="leaveReason" rows="3" required placeholder="Enter leave reason..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Leave Request</button>
                </form>
                ${leaveListHtml}
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Submit Teacher Leave
function submitTeacherLeave(event, teacherId) {
    event.preventDefault();
    
    const startDate = document.getElementById('leaveStartDate').value;
    const endDate = document.getElementById('leaveEndDate').value;
    const reason = document.getElementById('leaveReason').value.trim();
    
    if (new Date(endDate) < new Date(startDate)) {
        alert('End date cannot be before start date!');
        return;
    }
    
    const leaves = getData('leaves') || [];
    const newLeave = {
        id: Date.now(),
        type: 'teacher',
        personId: teacherId,
        startDate: startDate,
        endDate: endDate,
        reason: reason,
        status: 'pending',
        submittedAt: new Date().toISOString()
    };
    
    leaves.push(newLeave);
    saveData('leaves', leaves);
    
    alert('✅ Leave request submitted successfully!');
    closeLeaveModal();
}

// Submit Student Leave
function submitStudentLeave(event, studentId) {
    event.preventDefault();
    
    const startDate = document.getElementById('leaveStartDate').value;
    const endDate = document.getElementById('leaveEndDate').value;
    const reason = document.getElementById('leaveReason').value.trim();
    
    if (new Date(endDate) < new Date(startDate)) {
        alert('End date cannot be before start date!');
        return;
    }
    
    const leaves = getData('leaves') || [];
    const newLeave = {
        id: Date.now(),
        type: 'student',
        personId: studentId,
        startDate: startDate,
        endDate: endDate,
        reason: reason,
        status: 'pending',
        submittedAt: new Date().toISOString()
    };
    
    leaves.push(newLeave);
    saveData('leaves', leaves);
    
    alert('✅ Leave request submitted successfully!');
    closeLeaveModal();
}

// Update Leave Status
function updateLeaveStatus(leaveId, status) {
    const leaves = getData('leaves') || [];
    const leave = leaves.find(l => l.id === leaveId);
    
    if (!leave) {
        alert('Leave record not found!');
        return;
    }
    
    leave.status = status;
    leave.updatedAt = new Date().toISOString();
    saveData('leaves', leaves);
    
    alert(`✅ Leave ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
    closeLeaveModal();
}

// Close Leave Modal
function closeLeaveModal() {
    const modal = document.getElementById('leaveModal');
    if (modal) {
        modal.remove();
    }
}


// IMMEDIATE CLOCK-IN ALERTS SYSTEM

// Initialize clock-in alerts storage
function initClockInAlerts() {
    if (!localStorage.getItem('clockInAlerts')) {
        localStorage.setItem('clockInAlerts', JSON.stringify([]));
    }
}

// Create clock-in alert when attendance is marked
function createClockInAlert(data) {
    const alerts = getData('clockInAlerts') || [];
    
    const alert = {
        id: Date.now(),
        type: 'attendance_marked',
        teacherName: data.teacherName,
        className: data.className,
        date: data.date,
        time: data.time,
        totalStudents: data.totalStudents,
        presentCount: data.presentCount,
        absentCount: data.absentCount,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    alerts.unshift(alert); // Add to beginning of array
    
    // Keep only last 50 alerts
    if (alerts.length > 50) {
        alerts.splice(50);
    }
    
    saveData('clockInAlerts', alerts);
    
    // Show real-time notification
    showClockInNotification(alert);
    
    // Update notification badge
    updateNotificationBadge();
    
    console.log('Clock-in alert created:', alert);
}

// Show real-time notification popup
function showClockInNotification(alert) {
    const notification = document.createElement('div');
    notification.className = 'clock-in-notification';
    notification.innerHTML = `
        <div class="notification-header">
            <span class="notification-icon">🔔</span>
            <strong>Attendance Marked</strong>
            <span class="notification-close" onclick="this.parentElement.parentElement.remove()">×</span>
        </div>
        <div class="notification-body">
            <p><strong>${alert.teacherName}</strong> marked attendance for <strong>${alert.className}</strong></p>
            <p class="notification-stats">
                ✅ Present: ${alert.presentCount} | ❌ Absent: ${alert.absentCount} | 👥 Total: ${alert.totalStudents}
            </p>
            <p class="notification-time">${formatTime(alert.timestamp)}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }
    }, 10000);
}

// Format timestamp for display
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Update notification badge count
function updateNotificationBadge() {
    const alerts = getData('clockInAlerts') || [];
    const unreadCount = alerts.filter(a => !a.read).length;
    
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Show notification center
function showNotificationCenter() {
    const alerts = getData('clockInAlerts') || [];
    
    let alertsHtml = '';
    if (alerts.length === 0) {
        alertsHtml = '<div class="no-alerts">No attendance alerts yet</div>';
    } else {
        alertsHtml = alerts.map(alert => `
            <div class="alert-item ${alert.read ? 'read' : 'unread'}" onclick="markAlertAsRead(${alert.id})">
                <div class="alert-icon">🔔</div>
                <div class="alert-content">
                    <div class="alert-header">
                        <strong>${alert.teacherName}</strong> marked attendance
                        ${!alert.read ? '<span class="unread-dot"></span>' : ''}
                    </div>
                    <div class="alert-details">
                        <strong>Class:</strong> ${alert.className}<br>
                        <strong>Date:</strong> ${alert.date} at ${alert.time}<br>
                        <strong>Students:</strong> ${alert.totalStudents} (✅ ${alert.presentCount} Present, ❌ ${alert.absentCount} Absent)
                    </div>
                    <div class="alert-time">${formatTime(alert.timestamp)}</div>
                </div>
            </div>
        `).join('');
    }
    
    const modalHtml = `
        <div class="modal active" id="notificationModal">
            <div class="modal-content notification-center">
                <div class="notification-center-header">
                    <h2>🔔 Attendance Alerts</h2>
                    <div class="notification-actions">
                        <button class="btn btn-sm" onclick="markAllAlertsAsRead()">Mark All Read</button>
                        <button class="btn btn-sm btn-danger" onclick="clearAllAlerts()">Clear All</button>
                        <span class="close" onclick="closeNotificationCenter()">&times;</span>
                    </div>
                </div>
                <div class="notification-center-body">
                    ${alertsHtml}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Mark alert as read
function markAlertAsRead(alertId) {
    const alerts = getData('clockInAlerts') || [];
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
        alert.read = true;
        saveData('clockInAlerts', alerts);
        updateNotificationBadge();
    }
}

// Mark all alerts as read
function markAllAlertsAsRead() {
    const alerts = getData('clockInAlerts') || [];
    alerts.forEach(alert => alert.read = true);
    saveData('clockInAlerts', alerts);
    updateNotificationBadge();
    closeNotificationCenter();
    showNotificationCenter();
}

// Clear all alerts
function clearAllAlerts() {
    if (confirm('Are you sure you want to clear all attendance alerts?')) {
        saveData('clockInAlerts', []);
        updateNotificationBadge();
        closeNotificationCenter();
    }
}

// Close notification center
function closeNotificationCenter() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.remove();
    }
}

// Initialize on page load
initClockInAlerts();
updateNotificationBadge();


// HOLIDAY & WEEKEND POLICY SYSTEM

// Initialize holiday policy storage
function initHolidayPolicy() {
    if (!localStorage.getItem('holidays')) {
        localStorage.setItem('holidays', JSON.stringify([]));
    }
    if (!localStorage.getItem('weekendPolicy')) {
        localStorage.setItem('weekendPolicy', JSON.stringify({
            monday: 'full',
            tuesday: 'full',
            wednesday: 'full',
            thursday: 'full',
            friday: 'full',
            saturday: 'off',
            sunday: 'off'
        }));
    }
}

// Load holiday policy section
function loadHolidayPolicy() {
    loadWeekendPolicy();
    loadHolidaysTable();
    loadPolicySummary();
}

// Load weekend policy
function loadWeekendPolicy() {
    const policy = getData('weekendPolicy') || {
        monday: 'full',
        tuesday: 'full',
        wednesday: 'full',
        thursday: 'full',
        friday: 'full',
        saturday: 'off',
        sunday: 'off'
    };
    
    document.getElementById('policyMonday').value = policy.monday || 'full';
    document.getElementById('policyTuesday').value = policy.tuesday || 'full';
    document.getElementById('policyWednesday').value = policy.wednesday || 'full';
    document.getElementById('policyThursday').value = policy.thursday || 'full';
    document.getElementById('policyFriday').value = policy.friday || 'full';
    document.getElementById('policySaturday').value = policy.saturday || 'off';
    document.getElementById('policySunday').value = policy.sunday || 'off';
}

// Save weekend policy
function saveWeekendPolicy() {
    const policy = {
        monday: document.getElementById('policyMonday').value,
        tuesday: document.getElementById('policyTuesday').value,
        wednesday: document.getElementById('policyWednesday').value,
        thursday: document.getElementById('policyThursday').value,
        friday: document.getElementById('policyFriday').value,
        saturday: document.getElementById('policySaturday').value,
        sunday: document.getElementById('policySunday').value
    };
    saveData('weekendPolicy', policy);
    showNotification('✅ Working days policy updated successfully!', 'success');
    loadPolicySummary();
}

// Load holidays table
function loadHolidaysTable() {
    const holidays = getData('holidays') || [];
    const tbody = document.getElementById('holidaysTableBody');
    tbody.innerHTML = '';
    
    if (holidays.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #95a5a6;">No holidays defined yet. Click "+ Add Holiday" to add one.</td></tr>';
        return;
    }
    
    // Sort by date
    holidays.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    holidays.forEach(holiday => {
        const typeColor = holiday.type === 'national' ? '#e74c3c' : holiday.type === 'religious' ? '#9b59b6' : '#3498db';
        const row = `
            <tr>
                <td><strong>${formatDate(holiday.date)}</strong></td>
                <td>${holiday.name}</td>
                <td><span style="background: ${typeColor}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${holiday.type.toUpperCase()}</span></td>
                <td>${holiday.description || 'N/A'}</td>
                <td>
                    <button class="btn btn-edit" onclick="editHoliday(${holiday.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteHoliday(${holiday.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Format date for display
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Show add holiday modal
function showAddHolidayModal() {
    const modalHtml = `
        <div class="modal active" id="holidayModal">
            <div class="modal-content">
                <span class="close" onclick="closeHolidayModal()">&times;</span>
                <h2>Add Holiday</h2>
                <form onsubmit="saveHoliday(event)">
                    <div class="form-group">
                        <label>Holiday Name:</label>
                        <input type="text" id="holidayName" required placeholder="e.g., Independence Day">
                    </div>
                    <div class="form-group">
                        <label>Date:</label>
                        <input type="date" id="holidayDate" required>
                    </div>
                    <div class="form-group">
                        <label>Type:</label>
                        <select id="holidayType" required>
                            <option value="national">National Holiday</option>
                            <option value="religious">Religious Holiday</option>
                            <option value="institutional">Institutional Holiday</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description (Optional):</label>
                        <textarea id="holidayDescription" rows="3" placeholder="Additional details about this holiday..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Save Holiday</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Save holiday
function saveHoliday(event) {
    event.preventDefault();
    
    const name = document.getElementById('holidayName').value.trim();
    const date = document.getElementById('holidayDate').value;
    const type = document.getElementById('holidayType').value;
    const description = document.getElementById('holidayDescription').value.trim();
    
    const holidays = getData('holidays') || [];
    
    // Check for duplicate date
    if (holidays.some(h => h.date === date)) {
        alert('A holiday already exists for this date!');
        return;
    }
    
    const holiday = {
        id: Date.now(),
        name: name,
        date: date,
        type: type,
        description: description,
        createdAt: new Date().toISOString()
    };
    
    holidays.push(holiday);
    saveData('holidays', holidays);
    
    showNotification('✅ Holiday added successfully!', 'success');
    closeHolidayModal();
    loadHolidaysTable();
    loadPolicySummary();
}

// Edit holiday
function editHoliday(id) {
    const holidays = getData('holidays') || [];
    const holiday = holidays.find(h => h.id === id);
    
    if (!holiday) {
        alert('Holiday not found!');
        return;
    }
    
    const modalHtml = `
        <div class="modal active" id="holidayModal">
            <div class="modal-content">
                <span class="close" onclick="closeHolidayModal()">&times;</span>
                <h2>Edit Holiday</h2>
                <form onsubmit="updateHoliday(event, ${id})">
                    <div class="form-group">
                        <label>Holiday Name:</label>
                        <input type="text" id="holidayName" value="${holiday.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Date:</label>
                        <input type="date" id="holidayDate" value="${holiday.date}" required>
                    </div>
                    <div class="form-group">
                        <label>Type:</label>
                        <select id="holidayType" required>
                            <option value="national" ${holiday.type === 'national' ? 'selected' : ''}>National Holiday</option>
                            <option value="religious" ${holiday.type === 'religious' ? 'selected' : ''}>Religious Holiday</option>
                            <option value="institutional" ${holiday.type === 'institutional' ? 'selected' : ''}>Institutional Holiday</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description (Optional):</label>
                        <textarea id="holidayDescription" rows="3">${holiday.description || ''}</textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Holiday</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Update holiday
function updateHoliday(event, id) {
    event.preventDefault();
    
    const holidays = getData('holidays') || [];
    const index = holidays.findIndex(h => h.id === id);
    
    if (index === -1) {
        alert('Holiday not found!');
        return;
    }
    
    holidays[index].name = document.getElementById('holidayName').value.trim();
    holidays[index].date = document.getElementById('holidayDate').value;
    holidays[index].type = document.getElementById('holidayType').value;
    holidays[index].description = document.getElementById('holidayDescription').value.trim();
    holidays[index].updatedAt = new Date().toISOString();
    
    saveData('holidays', holidays);
    
    showNotification('✅ Holiday updated successfully!', 'success');
    closeHolidayModal();
    loadHolidaysTable();
    loadPolicySummary();
}

// Delete holiday
function deleteHoliday(id) {
    if (!confirm('Are you sure you want to delete this holiday?')) {
        return;
    }
    
    let holidays = getData('holidays') || [];
    holidays = holidays.filter(h => h.id !== id);
    saveData('holidays', holidays);
    
    showNotification('✅ Holiday deleted successfully!', 'success');
    loadHolidaysTable();
    loadPolicySummary();
}

// Close holiday modal
function closeHolidayModal() {
    const modal = document.getElementById('holidayModal');
    if (modal) {
        modal.remove();
    }
}

// Load policy summary
function loadPolicySummary() {
    const weekendPolicy = getData('weekendPolicy') || {
        monday: 'full', tuesday: 'full', wednesday: 'full', thursday: 'full',
        friday: 'full', saturday: 'off', sunday: 'off'
    };
    const holidays = getData('holidays') || [];
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const policyKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    const fullDays = [];
    const halfDays = [];
    const offDays = [];
    
    policyKeys.forEach((key, index) => {
        const dayName = dayNames[index];
        const policy = weekendPolicy[key];
        if (policy === 'full') fullDays.push(dayName);
        else if (policy === 'half') halfDays.push(dayName);
        else if (policy === 'off') offDays.push(dayName);
    });
    
    const today = new Date();
    const upcomingHolidays = holidays.filter(h => new Date(h.date) >= today).slice(0, 5);
    
    let summaryHtml = `
        <div class="summary-item">
            <strong>Full Working Days:</strong> ${fullDays.length > 0 ? fullDays.join(', ') : 'None'}
        </div>
        <div class="summary-item">
            <strong>Half Days:</strong> ${halfDays.length > 0 ? halfDays.join(', ') : 'None'}
        </div>
        <div class="summary-item">
            <strong>Holidays/Off Days:</strong> ${offDays.length > 0 ? offDays.join(', ') : 'None'}
        </div>
        <div class="summary-item">
            <strong>Total Holidays Defined:</strong> ${holidays.length}
        </div>
        <div class="summary-item">
            <strong>Upcoming Holidays:</strong>
            ${upcomingHolidays.length > 0 ? `
                <ul style="margin: 10px 0; padding-left: 20px;">
                    ${upcomingHolidays.map(h => `<li>${h.name} - ${formatDate(h.date)}</li>`).join('')}
                </ul>
            ` : '<p style="color: #95a5a6; margin: 10px 0;">No upcoming holidays</p>'}
        </div>
    `;
    
    document.getElementById('policySummary').innerHTML = summaryHtml;
}

// Check if date is holiday or weekend
function isNonWorkingDay(date) {
    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    const dateObj = new Date(dateStr);
    const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 6 = Saturday
    
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[dayOfWeek];
    const dayDisplayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayDisplayName = dayDisplayNames[dayOfWeek];
    
    // Check weekend policy
    const weekendPolicy = getData('weekendPolicy') || {
        monday: 'full', tuesday: 'full', wednesday: 'full', thursday: 'full',
        friday: 'full', saturday: 'off', sunday: 'off'
    };
    
    const dayPolicy = weekendPolicy[dayName];
    
    if (dayPolicy === 'off') {
        return { isNonWorking: true, reason: `${dayDisplayName} (Holiday/Off Day)`, type: 'off' };
    }
    
    if (dayPolicy === 'half') {
        return { isNonWorking: false, reason: `${dayDisplayName} (Half Day)`, type: 'half', isHalfDay: true };
    }
    
    // Check holidays
    const holidays = getData('holidays') || [];
    const holiday = holidays.find(h => h.date === dateStr);
    if (holiday) {
        return { isNonWorking: true, reason: `${holiday.name} (Holiday)`, type: 'holiday' };
    }
    
    return { isNonWorking: false, reason: null, type: 'full' };
}

// Initialize on page load
initHolidayPolicy();


// ============================================
// DASHBOARD CHARTS & ANALYTICS
// ============================================

let dashboardCharts = {};

function renderDashboardCharts() {
    // Destroy existing charts to prevent memory leaks
    Object.values(dashboardCharts).forEach(chart => {
        if (chart) chart.destroy();
    });
    dashboardCharts = {};
    
    const attendance = getData('attendance') || [];
    const students = getData('students') || [];
    const classes = getData('classes') || [];
    
    if (attendance.length === 0) {
        showNoDataMessage();
        return;
    }
    
    // Render all charts
    renderAttendanceOverviewChart(attendance);
    renderClassAttendanceChart(attendance, classes);
    renderStudentDistributionChart(attendance, students);
    renderWeeklyTrendChart(attendance);
    generateInsights(attendance, students, classes);
}

function showNoDataMessage() {
    const insightsContainer = document.getElementById('dashboardInsights');
    insightsContainer.innerHTML = `
        <div class="insight-card info">
            <h4><span class="insight-icon">ℹ️</span> No Data Available</h4>
            <p>Load demo data or mark some attendance to see analytics and insights.</p>
        </div>
    `;
}

// Chart 1: Attendance Overview (Last 7 Days)
function renderAttendanceOverviewChart(attendance) {
    const ctx = document.getElementById('attendanceOverviewChart');
    if (!ctx) return;
    
    // Get last 7 days
    const dates = [];
    const presentCounts = [];
    const absentCounts = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        const dayAttendance = attendance.filter(a => a.date === dateStr);
        presentCounts.push(dayAttendance.filter(a => a.status === 'present').length);
        absentCounts.push(dayAttendance.filter(a => a.status === 'absent').length);
    }
    
    dashboardCharts.overview = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Present',
                    data: presentCounts,
                    backgroundColor: 'rgba(46, 204, 113, 0.8)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Absent',
                    data: absentCounts,
                    backgroundColor: 'rgba(231, 76, 60, 0.8)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' students';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Chart 2: Class-wise Attendance Rate
function renderClassAttendanceChart(attendance, classes) {
    const ctx = document.getElementById('classAttendanceChart');
    if (!ctx) return;
    
    const classNames = [];
    const attendanceRates = [];
    const colors = [
        'rgba(52, 152, 219, 0.8)',
        'rgba(155, 89, 182, 0.8)',
        'rgba(46, 204, 113, 0.8)',
        'rgba(241, 196, 15, 0.8)',
        'rgba(230, 126, 34, 0.8)'
    ];
    
    classes.forEach((cls, index) => {
        const classAttendance = attendance.filter(a => a.classId === cls.id);
        if (classAttendance.length > 0) {
            const present = classAttendance.filter(a => a.status === 'present').length;
            const total = classAttendance.length;
            const rate = ((present / total) * 100).toFixed(1);
            
            classNames.push(cls.className);
            attendanceRates.push(parseFloat(rate));
        }
    });
    
    dashboardCharts.classRate = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: classNames,
            datasets: [{
                label: 'Attendance Rate (%)',
                data: attendanceRates,
                backgroundColor: colors.slice(0, classNames.length),
                borderColor: colors.slice(0, classNames.length).map(c => c.replace('0.8', '1')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Attendance: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Chart 3: Student Attendance Distribution
function renderStudentDistributionChart(attendance, students) {
    const ctx = document.getElementById('studentDistributionChart');
    if (!ctx) return;
    
    const totalPresent = attendance.filter(a => a.status === 'present').length;
    const totalAbsent = attendance.filter(a => a.status === 'absent').length;
    const totalRecords = attendance.length;
    
    dashboardCharts.distribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                data: [totalPresent, totalAbsent],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(231, 76, 60, 0.8)'
                ],
                borderColor: [
                    'rgba(46, 204, 113, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const percentage = ((context.parsed / totalRecords) * 100).toFixed(1);
                            return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// Chart 4: Weekly Attendance Trend
function renderWeeklyTrendChart(attendance) {
    const ctx = document.getElementById('weeklyTrendChart');
    if (!ctx) return;
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    
    attendance.forEach(record => {
        if (record.status === 'present') {
            const date = new Date(record.date);
            const dayIndex = date.getDay();
            dayCounts[dayIndex]++;
        }
    });
    
    dashboardCharts.weekly = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dayNames,
            datasets: [{
                label: 'Present Students',
                data: dayCounts,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Generate Insights
function generateInsights(attendance, students, classes) {
    const insightsContainer = document.getElementById('dashboardInsights');
    const insights = [];
    
    // Calculate overall attendance rate
    const totalPresent = attendance.filter(a => a.status === 'present').length;
    const totalRecords = attendance.length;
    const overallRate = ((totalPresent / totalRecords) * 100).toFixed(1);
    
    // Insight 1: Overall Performance
    if (overallRate >= 90) {
        insights.push({
            type: 'success',
            icon: '✅',
            title: 'Excellent Attendance',
            message: `Overall attendance rate is ${overallRate}%. Keep up the great work!`
        });
    } else if (overallRate >= 75) {
        insights.push({
            type: 'info',
            icon: '📊',
            title: 'Good Attendance',
            message: `Overall attendance rate is ${overallRate}%. Room for improvement.`
        });
    } else {
        insights.push({
            type: 'warning',
            icon: '⚠️',
            title: 'Low Attendance Alert',
            message: `Overall attendance rate is ${overallRate}%. Immediate action needed.`
        });
    }
    
    // Insight 2: Class with lowest attendance
    const classRates = classes.map(cls => {
        const classAttendance = attendance.filter(a => a.classId === cls.id);
        if (classAttendance.length > 0) {
            const present = classAttendance.filter(a => a.status === 'present').length;
            return {
                name: cls.className,
                rate: (present / classAttendance.length) * 100
            };
        }
        return null;
    }).filter(c => c !== null);
    
    if (classRates.length > 0) {
        const lowestClass = classRates.reduce((min, cls) => cls.rate < min.rate ? cls : min);
        if (lowestClass.rate < 80) {
            insights.push({
                type: 'warning',
                icon: '🎯',
                title: 'Focus Area Identified',
                message: `${lowestClass.name} has ${lowestClass.rate.toFixed(1)}% attendance. Consider targeted interventions.`
            });
        }
    }
    
    // Insight 3: Recent trend
    const last3Days = [];
    for (let i = 2; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayAttendance = attendance.filter(a => a.date === dateStr);
        const present = dayAttendance.filter(a => a.status === 'present').length;
        last3Days.push(present);
    }
    
    if (last3Days.length === 3 && last3Days[0] > last3Days[1] && last3Days[1] > last3Days[2]) {
        insights.push({
            type: 'warning',
            icon: '📉',
            title: 'Declining Trend',
            message: 'Attendance has been declining over the last 3 days. Monitor closely.'
        });
    } else if (last3Days.length === 3 && last3Days[0] < last3Days[1] && last3Days[1] < last3Days[2]) {
        insights.push({
            type: 'success',
            icon: '📈',
            title: 'Improving Trend',
            message: 'Attendance is improving! Continue current strategies.'
        });
    }
    
    // Insight 4: Total students tracked
    insights.push({
        type: 'info',
        icon: '👥',
        title: 'System Overview',
        message: `Tracking ${students.length} students across ${classes.length} classes with ${totalRecords} attendance records.`
    });
    
    // Render insights
    insightsContainer.innerHTML = insights.map(insight => `
        <div class="insight-card ${insight.type}">
            <h4><span class="insight-icon">${insight.icon}</span> ${insight.title}</h4>
            <p>${insight.message}</p>
        </div>
    `).join('');
}


// ============================================
// TIMETABLE MANAGEMENT SYSTEM
// ============================================

// Initialize timetable storage
function initTimetableStorage() {
    if (!localStorage.getItem('timetables')) {
        localStorage.setItem('timetables', JSON.stringify([]));
    }
    if (!localStorage.getItem('periodSettings')) {
        const defaultSettings = {
            periodDuration: 45,
            shortBreak: 5,
            longBreak: 15,
            schoolStartTime: '08:00'
        };
        localStorage.setItem('periodSettings', JSON.stringify(defaultSettings));
    }
}

// Switch timetable tabs
function switchTimetableTab(tab) {
    document.querySelectorAll('.timetable-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.timetable-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    
    const tabMap = {
        'manage': 'manageTimetableTab',
        'view': 'viewScheduleTab',
        'periods': 'periodSettingsTab'
    };
    
    document.getElementById(tabMap[tab]).classList.add('active');
    event.target.classList.add('active');
    
    if (tab === 'manage') loadTimetableList();
    if (tab === 'view') loadScheduleFilters();
    if (tab === 'periods') loadPeriodSettings();
}

// Show add timetable modal
function showAddTimetableModal() {
    document.getElementById('timetableModalTitle').textContent = 'Create Timetable';
    document.getElementById('timetableId').value = '';
    document.getElementById('timetableDay').value = 'monday';
    document.getElementById('numberOfPeriods').value = 6;
    
    // Load classes
    const classes = getData('classes') || [];
    const classSelect = document.getElementById('timetableClass');
    classSelect.innerHTML = '';
    classes.forEach(cls => {
        classSelect.innerHTML += `<option value="${cls.id}">${cls.className}</option>`;
    });
    
    // Add event listener to filter available days when class is selected
    classSelect.addEventListener('change', updateAvailableDays);
    
    generatePeriodInputs();
    
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('addTimetableModal').classList.add('active');
    
    // Trigger day filtering for the first class
    if (classes.length > 0) {
        updateAvailableDays();
    }
}

// Update available days based on selected class
function updateAvailableDays() {
    const classId = parseInt(document.getElementById('timetableClass').value);
    const daySelect = document.getElementById('timetableDay');
    
    if (!classId || isNaN(classId)) {
        // Reset to all days if no valid class selected
        daySelect.disabled = false;
        daySelect.innerHTML = `
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
        `;
        return;
    }
    
    // Get existing timetables for this class
    const timetables = getData('timetables') || [];
    const existingDays = timetables
        .filter(tt => tt.classId === classId)
        .map(tt => tt.day);
    
    // All possible days
    const allDays = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' }
    ];
    
    // Filter out days that already have timetables
    const availableDays = allDays.filter(day => !existingDays.includes(day.value));
    
    if (availableDays.length === 0) {
        daySelect.innerHTML = '<option value="">No available days (all days have timetables)</option>';
        daySelect.disabled = true;
    } else {
        daySelect.disabled = false;
        daySelect.innerHTML = availableDays.map(day => 
            `<option value="${day.value}">${day.label}</option>`
        ).join('');
    }
}

// Generate period input fields
function generatePeriodInputs() {
    const numPeriods = parseInt(document.getElementById('numberOfPeriods').value);
    const container = document.getElementById('periodInputsContainer');
    const teachers = getData('teachers') || [];
    const classId = parseInt(document.getElementById('timetableClass').value);
    
    container.innerHTML = '';
    
    for (let i = 1; i <= numPeriods; i++) {
        const periodDiv = document.createElement('div');
        periodDiv.className = 'period-input-group';
        periodDiv.innerHTML = `
            <h4>Period ${i}</h4>
            <div class="period-input-row">
                <div class="form-group">
                    <label>Subject:</label>
                    <input type="text" id="period${i}Subject" required placeholder="e.g., Mathematics">
                </div>
                <div class="form-group">
                    <label>Teacher:</label>
                    <select id="period${i}Teacher" required>
                        <option value="">Select Teacher</option>
                        ${teachers.filter(t => !classId || (t.classIds && t.classIds.includes(classId))).map(t => 
                            `<option value="${t.id}">${t.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Start Time:</label>
                    <input type="time" id="period${i}Time" required>
                </div>
            </div>
        `;
        container.appendChild(periodDiv);
    }
    
    // Auto-calculate times based on period settings
    autoCalculatePeriodTimes();
}

// Auto-calculate period times
function autoCalculatePeriodTimes() {
    const settings = JSON.parse(localStorage.getItem('periodSettings'));
    const numPeriods = parseInt(document.getElementById('numberOfPeriods').value);
    
    let currentTime = settings.schoolStartTime;
    
    for (let i = 1; i <= numPeriods; i++) {
        const timeInput = document.getElementById(`period${i}Time`);
        if (timeInput) {
            timeInput.value = currentTime;
            
            // Calculate next period time
            const [hours, minutes] = currentTime.split(':').map(Number);
            let totalMinutes = hours * 60 + minutes + settings.periodDuration;
            
            // Add break after certain periods
            if (i === 2 || i === 4) {
                totalMinutes += settings.shortBreak;
            } else if (i === 3) {
                totalMinutes += settings.longBreak;
            }
            
            const nextHours = Math.floor(totalMinutes / 60);
            const nextMinutes = totalMinutes % 60;
            currentTime = `${String(nextHours).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}`;
        }
    }
}

// Update timetable teachers based on selected class
function updateTimetableTeachers() {
    generatePeriodInputs();
}

// Save timetable
function saveTimetable(event) {
    event.preventDefault();
    
    const timetables = getData('timetables') || [];
    const id = document.getElementById('timetableId').value;
    const classId = parseInt(document.getElementById('timetableClass').value);
    const day = document.getElementById('timetableDay').value;
    const numPeriods = parseInt(document.getElementById('numberOfPeriods').value);
    
    const periods = [];
    for (let i = 1; i <= numPeriods; i++) {
        periods.push({
            periodNumber: i,
            subject: document.getElementById(`period${i}Subject`).value,
            teacherId: parseInt(document.getElementById(`period${i}Teacher`).value),
            startTime: document.getElementById(`period${i}Time`).value
        });
    }
    
    const timetableData = {
        id: id ? parseInt(id) : Date.now(),
        classId: classId,
        day: day,
        periods: periods,
        createdAt: new Date().toISOString()
    };
    
    if (id) {
        const index = timetables.findIndex(t => t.id === parseInt(id));
        if (index !== -1) {
            timetables[index] = timetableData;
        }
    } else {
        timetables.push(timetableData);
    }
    
    saveData('timetables', timetables);
    alert('✅ Timetable saved successfully!');
    closeModal();
    loadTimetableList();
}

// Load timetable list
function loadTimetableList() {
    const timetables = getData('timetables') || [];
    const classes = getData('classes') || [];
    const teachers = getData('teachers') || [];
    const container = document.getElementById('timetableList');
    
    if (timetables.length === 0) {
        container.innerHTML = '<div class="schedule-empty"><p>No timetables created yet. Click "Create Timetable" to get started.</p></div>';
        return;
    }
    
    container.innerHTML = timetables.map(tt => {
        const cls = classes.find(c => c.id === tt.classId);
        const dayName = tt.day.charAt(0).toUpperCase() + tt.day.slice(1);
        
        return `
            <div class="timetable-card">
                <div class="timetable-card-header">
                    <h4>${cls ? cls.className : 'Unknown Class'}</h4>
                    <span class="day-badge">${dayName}</span>
                </div>
                <div class="timetable-periods">
                    ${tt.periods.map(p => {
                        const teacher = teachers.find(t => t.id === p.teacherId);
                        return `
                            <div class="period-item">
                                <span class="period-number">Period ${p.periodNumber}</span>
                                <span class="period-subject">${p.subject}</span>
                                <span class="period-teacher">${teacher ? teacher.name : 'N/A'}</span>
                                <span class="period-time">${p.startTime}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="timetable-actions">
                    <button class="btn btn-edit" onclick="editTimetable(${tt.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTimetable(${tt.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

// Edit timetable
function editTimetable(id) {
    const timetables = getData('timetables') || [];
    const tt = timetables.find(t => t.id === id);
    
    if (!tt) return;
    
    document.getElementById('timetableModalTitle').textContent = 'Edit Timetable';
    document.getElementById('timetableId').value = tt.id;
    document.getElementById('numberOfPeriods').value = tt.periods.length;
    
    // Load classes
    const classes = getData('classes') || [];
    const classSelect = document.getElementById('timetableClass');
    classSelect.innerHTML = '';
    classes.forEach(cls => {
        classSelect.innerHTML += `<option value="${cls.id}" ${cls.id === tt.classId ? 'selected' : ''}>${cls.className}</option>`;
    });
    
    // Load available days for editing (include current day)
    const existingDays = timetables
        .filter(t => t.classId === tt.classId && t.id !== tt.id)
        .map(t => t.day);
    
    const allDays = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' }
    ];
    
    const availableDays = allDays.filter(day => !existingDays.includes(day.value));
    const daySelect = document.getElementById('timetableDay');
    daySelect.innerHTML = availableDays.map(day => 
        `<option value="${day.value}" ${day.value === tt.day ? 'selected' : ''}>${day.label}</option>`
    ).join('');
    
    generatePeriodInputs();
    
    // Fill in period data
    tt.periods.forEach((p, index) => {
        document.getElementById(`period${index + 1}Subject`).value = p.subject;
        document.getElementById(`period${index + 1}Teacher`).value = p.teacherId;
        document.getElementById(`period${index + 1}Time`).value = p.startTime;
    });
    
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('addTimetableModal').classList.add('active');
}

// Delete timetable
function deleteTimetable(id) {
    if (confirm('Are you sure you want to delete this timetable?')) {
        let timetables = getData('timetables') || [];
        timetables = timetables.filter(t => t.id !== id);
        saveData('timetables', timetables);
        loadTimetableList();
    }
}

// Load schedule filters
function loadScheduleFilters() {
    const classes = getData('classes') || [];
    const classFilter = document.getElementById('scheduleClassFilter');
    
    classFilter.innerHTML = '<option value="">Select Class</option>';
    classes.forEach(cls => {
        classFilter.innerHTML += `<option value="${cls.id}">${cls.className} - ${cls.class_section}</option>`;
    });
}

// Load class schedule
function loadClassSchedule() {
    const classId = parseInt(document.getElementById('scheduleClassFilter').value);
    const day = document.getElementById('scheduleDayFilter').value;
    const container = document.getElementById('scheduleDisplay');
    
    if (!classId) {
        container.innerHTML = '<div class="schedule-empty"><p>Please select a class to view schedule</p></div>';
        return;
    }
    
    const timetables = getData('timetables') || [];
    const teachers = getData('teachers') || [];
    const classes = getData('classes') || [];
    
    let filteredTimetables = timetables.filter(tt => tt.classId === classId);
    if (day) {
        filteredTimetables = filteredTimetables.filter(tt => tt.day === day);
    }
    
    if (filteredTimetables.length === 0) {
        container.innerHTML = '<div class="schedule-empty"><p>No schedule found for selected filters</p></div>';
        return;
    }
    
    const cls = classes.find(c => c.id === classId);
    
    container.innerHTML = `
        <h3>${cls ? cls.className : 'Class'} Schedule</h3>
        ${filteredTimetables.map(tt => {
            const dayName = tt.day.charAt(0).toUpperCase() + tt.day.slice(1);
            return `
                <h4 style="margin-top: 20px; color: #3498db;">${dayName}</h4>
                <table class="schedule-table">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Subject</th>
                            <th>Teacher</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tt.periods.map(p => {
                            const teacher = teachers.find(t => t.id === p.teacherId);
                            return `
                                <tr>
                                    <td>Period ${p.periodNumber}</td>
                                    <td>${p.subject}</td>
                                    <td>${teacher ? teacher.name : 'N/A'}</td>
                                    <td>${p.startTime}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            `;
        }).join('')}
    `;
}

// Load period settings
function loadPeriodSettings() {
    const settings = JSON.parse(localStorage.getItem('periodSettings'));
    
    document.getElementById('periodDuration').value = settings.periodDuration;
    document.getElementById('shortBreak').value = settings.shortBreak;
    document.getElementById('longBreak').value = settings.longBreak;
    document.getElementById('schoolStartTime').value = settings.schoolStartTime;
    
    generatePeriodPreview();
}

// Save period settings
function savePeriodSettings() {
    const settings = {
        periodDuration: parseInt(document.getElementById('periodDuration').value),
        shortBreak: parseInt(document.getElementById('shortBreak').value),
        longBreak: parseInt(document.getElementById('longBreak').value),
        schoolStartTime: document.getElementById('schoolStartTime').value
    };
    
    localStorage.setItem('periodSettings', JSON.stringify(settings));
    alert('✅ Period settings saved successfully!');
    generatePeriodPreview();
}

// Generate period preview
function generatePeriodPreview() {
    const settings = JSON.parse(localStorage.getItem('periodSettings'));
    const container = document.getElementById('periodPreview');
    
    let currentTime = settings.schoolStartTime;
    let timeline = '<h4>Sample Day Schedule</h4><div class="preview-timeline">';
    
    for (let i = 1; i <= 6; i++) {
        const [hours, minutes] = currentTime.split(':').map(Number);
        const endMinutes = hours * 60 + minutes + settings.periodDuration;
        const endHours = Math.floor(endMinutes / 60);
        const endMins = endMinutes % 60;
        const endTime = `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
        
        timeline += `
            <div class="preview-item">
                <span class="preview-label">Period ${i}</span>
                <span class="preview-time">${currentTime} - ${endTime}</span>
            </div>
        `;
        
        currentTime = endTime;
        
        // Add breaks
        if (i === 2 || i === 4) {
            const breakEnd = endMinutes + settings.shortBreak;
            const breakHours = Math.floor(breakEnd / 60);
            const breakMins = breakEnd % 60;
            const breakEndTime = `${String(breakHours).padStart(2, '0')}:${String(breakMins).padStart(2, '0')}`;
            
            timeline += `
                <div class="preview-item break">
                    <span class="preview-label">Short Break</span>
                    <span class="preview-time">${currentTime} - ${breakEndTime}</span>
                </div>
            `;
            currentTime = breakEndTime;
        } else if (i === 3) {
            const breakEnd = endMinutes + settings.longBreak;
            const breakHours = Math.floor(breakEnd / 60);
            const breakMins = breakEnd % 60;
            const breakEndTime = `${String(breakHours).padStart(2, '0')}:${String(breakMins).padStart(2, '0')}`;
            
            timeline += `
                <div class="preview-item break">
                    <span class="preview-label">Lunch Break</span>
                    <span class="preview-time">${currentTime} - ${breakEndTime}</span>
                </div>
            `;
            currentTime = breakEndTime;
        }
    }
    
    timeline += '</div>';
    container.innerHTML = timeline;
}

// Get current period for a class
function getCurrentPeriod(classId, date) {
    const timetables = getData('timetables') || [];
    const dayOfWeek = new Date(date).getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[dayOfWeek];
    
    const todayTimetable = timetables.find(tt => tt.classId === classId && tt.day === dayName);
    
    if (!todayTimetable) return null;
    
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Find current period based on time
    for (let i = 0; i < todayTimetable.periods.length; i++) {
        const period = todayTimetable.periods[i];
        const nextPeriod = todayTimetable.periods[i + 1];
        
        if (currentTime >= period.startTime && (!nextPeriod || currentTime < nextPeriod.startTime)) {
            return period;
        }
    }
    
    return null;
}

// Initialize timetable on page load
initTimetableStorage();
