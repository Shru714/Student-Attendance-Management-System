// Initialize Database Connection
async function initStorage() {
    console.log('🔄 Initializing database connection...');
    try {
        // Wait for database integration to initialize
        await db.initPromise;
        
        if (db.useAPI) {
            console.log('✅ Using MySQL Database');
        } else {
            console.log('⚠️ Using localStorage (API not available)');
        }
    } catch (error) {
        console.warn('⚠️ Database initialization warning:', error);
    }
}

// Load Demo Data
async function loadDemoData() {
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
    
    try {
        // Save to database via API
        console.log('📤 Uploading demo data to database...');
        
        // Create classes
        for (const cls of demoClasses) {
            await ClassesDB.create(cls);
        }
        
        // Create teachers
        for (const teacher of demoTeachers) {
            await TeachersDB.create(teacher);
        }
        
        // Create students
        for (const student of demoStudents) {
            await StudentsDB.create(student);
        }
        
        // Create attendance records
        for (const record of demoAttendance) {
            await AttendanceDB.create(record);
        }
        
        console.log('✅ Demo data loaded successfully!');
        alert('✅ Demo data loaded successfully!\n\nClasses: 5\nTeachers: 3\nStudents: 8\nAttendance Records: 11\n\nYou can now test all features!');
        location.reload();
    } catch (error) {
        console.error('❌ Error loading demo data:', error);
        alert('❌ Error loading demo data: ' + error.message);
    }
}

// Get data from Database
async function getData(key) {
    try {
        return await db.getData(key);
    } catch (error) {
        console.error(`Error getting ${key}:`, error);
        return [];
    }
}

// Save data to Database
async function saveData(key, data) {
    try {
        return await db.saveData(key, data);
    } catch (error) {
        console.error(`Error saving ${key}:`, error);
        return { success: false, error: error.message };
    }
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
            hintElement.innerHTML = 'Default: <strong>admin@example.com</strong> / <strong>Admin@143</strong>';
        } else if (role === 'teacher') {
            titleElement.textContent = 'Teacher Login';
            hintElement.innerHTML = 'Demo: <strong>sunny@gmail.com</strong> / <strong>Teacher@143</strong>';
        }
        
        // Clear previous inputs and ensure they're enabled
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        
        if (emailInput) {
            emailInput.value = '';
            emailInput.disabled = false;
            emailInput.readOnly = false;
            emailInput.removeAttribute('disabled');
            emailInput.removeAttribute('readonly');
            // Focus on email field after a short delay
            setTimeout(() => emailInput.focus(), 100);
        }
        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.disabled = false;
            passwordInput.readOnly = false;
            passwordInput.removeAttribute('disabled');
            passwordInput.removeAttribute('readonly');
        }
        
        console.log('Login form displayed successfully');
        console.log('Email input enabled:', emailInput && !emailInput.disabled);
    } catch (error) {
        console.error('Error in showLoginForm:', error);
        alert('An error occurred. Please refresh the page and try again.');
    }
}

async function credentialLogin(event) {
    event.preventDefault();
    
    try {
        console.log('credentialLogin called');
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        console.log('Attempting login for role:', selectedRole, 'email:', email);
        
        // Login via API
        const response = await APIService.login(email, password);
        
        if (response && response.user) {
            console.log('Login successful!', response.user);
            
            // Store login info
            localStorage.setItem('currentRole', response.user.role);
            localStorage.setItem('currentUser', response.user.email);
            
            // Hide login form
            document.getElementById('credentialLoginPage').classList.remove('active');
            
            // Show appropriate dashboard
            if (response.user.role === 'admin') {
                document.getElementById('adminDashboard').classList.add('active');
                await loadAdminDashboard();
            } else if (response.user.role === 'teacher') {
                document.getElementById('teacherDashboard').classList.add('active');
                await loadTeacherDashboard();
            }
        }
    } catch (error) {
        console.error('Error in credentialLogin:', error);
        alert('❌ Invalid email or password!\n\nPlease check your credentials and try again.');
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
async function studentLogin(event) {
    event.preventDefault();
    const studentName = document.getElementById('studentNameLogin').value.trim();
    const rollNumber = document.getElementById('studentRollLogin').value.trim();
    const password = document.getElementById('studentPasswordLogin').value.trim();
    
    try {
        // Login via API
        const response = await APIService.studentLogin(rollNumber, studentName, password);
        
        if (response && response.student) {
            console.log('Student login successful!', response.student);
            
            // Login successful
            localStorage.setItem('currentRole', 'student');
            localStorage.setItem('currentStudentId', response.student.id);
            document.getElementById('studentLoginPage').classList.remove('active');
            document.getElementById('studentDashboard').classList.add('active');
            await loadStudentDashboard();
        }
    } catch (error) {
        console.error('Student login error:', error);
        alert('❌ Invalid credentials! Please check your roll number, name, and password.');
    }
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
        'reports': 'adminReportsSection'
    };
    
    const titleMap = {
        'dashboard': 'Dashboard',
        'classes': 'Manage Classes',
        'teachers': 'Manage Teachers',
        'students': 'Manage Students',
        'reports': 'Attendance Reports'
    };
    
    document.getElementById(sectionMap[section]).classList.add('active');
    document.getElementById('adminSectionTitle').textContent = titleMap[section];
    event.target.closest('.nav-item').classList.add('active');
    
    if (section === 'classes') loadClassesTable();
    if (section === 'teachers') loadTeachersTable();
    if (section === 'students') loadStudentsTable();
    if (section === 'reports') loadAttendanceReports();
}

async function loadAdminDashboard() {
    try {
        const classes = await getData('classes');
        const teachers = await getData('teachers');
        const students = await getData('students');
        const attendance = await getData('attendance');
        
        const today = new Date().toISOString().split('T')[0];
        const todayAttendance = attendance.filter(a => a.date === today);
        
        document.getElementById('totalClasses').textContent = classes.length;
        document.getElementById('totalTeachers').textContent = teachers.length;
        document.getElementById('totalStudents').textContent = students.length;
        document.getElementById('todayAttendance').textContent = todayAttendance.length;
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
    }
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

async function showEditClassModal(id) {
    try {
        const classes = await getData('classes');
        const cls = classes.find(c => c.id === id);
        
        if (!cls) {
            alert('Class not found!');
            return;
        }
        
        console.log('Editing class:', cls);
        
        document.getElementById('classModalTitle').textContent = 'Edit Class';
        document.getElementById('classId').value = cls.id;
        
        // Handle both field name formats
        const className = cls.className || cls.class_name || '';
        const classSection = cls.class_section || cls.classSection || '';
        const year = cls.year || '';
        const academicYear = cls.academic_year || cls.academicYear || getAcademicYear();
        
        document.getElementById('className').value = className;
        document.getElementById('classSection').value = classSection;
        document.getElementById('classYear').value = year;
        document.getElementById('classAcademicYear').value = academicYear;
        document.getElementById('classInfoBox').style.display = 'none';
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addClassModal').classList.add('active');
    } catch (error) {
        console.error('Error loading class for edit:', error);
        alert('Error loading class data. Please try again.');
    }
}

async function saveClass(event) {
    event.preventDefault();
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
        class_name: className,
        class_section: section,
        year: parseInt(year),
        academic_year: academicYear
    };
    
    try {
        if (id) {
            // Update existing class
            await ClassesDB.update(parseInt(id), classData);
        } else {
            // Create new class
            await ClassesDB.create(classData);
            
            // Show class info
            document.getElementById('displayClassName').textContent = className;
            document.getElementById('displaySection').textContent = section;
            document.getElementById('displayYear').textContent = year;
            document.getElementById('displayAcademicYear').textContent = academicYear;
            document.getElementById('classInfoBox').style.display = 'block';
        }
        
        if (!id) {
            alert(`Class created successfully!\n\nClass: ${className}\nSection: ${section}\nYear: ${year}\nAcademic Year: ${academicYear}`);
        }
        
        setTimeout(() => {
            closeModal();
            loadClassesTable();
            refreshAllClassDropdowns();
        }, id ? 0 : 2000);
    } catch (error) {
        console.error('Error saving class:', error);
        alert('❌ Error saving class: ' + error.message);
    }
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

async function autoPopulateClassTime() {
    const classSelect = document.getElementById('studentClass');
    const classId = parseInt(classSelect.value);
    
    if (!classId) {
        document.getElementById('studentClassTime').value = '';
        return;
    }
    
    // Set default class time to 9:00 AM (standard class start time)
    const defaultClassTime = '09:00';
    
    try {
        // Try to get class time from teachers assigned to this class
        const teachers = await getData('teachers') || [];
        let classTime = defaultClassTime;
        
        for (let teacher of teachers) {
            const teacherClasses = teacher.classes || [];
            const teacherClassIds = teacher.classIds || [];
            
            // Check if teacher is assigned to this class
            if (teacherClassIds.includes(classId) || teacherClasses.some(c => c.id === classId)) {
                if (teacher.classTimes && teacher.classTimes[classId]) {
                    classTime = teacher.classTimes[classId];
                    break;
                }
            }
        }
        
        document.getElementById('studentClassTime').value = classTime;
    } catch (error) {
        console.error('Error auto-populating class time:', error);
        // Set default time if error occurs
        document.getElementById('studentClassTime').value = defaultClassTime;
    }
}

async function loadClassesTable() {
    try {
        const classes = await getData('classes');
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
    } catch (error) {
        console.error('Error loading classes table:', error);
    }
}

async function deleteClass(id) {
    if (confirm('Are you sure you want to delete this class?')) {
        try {
            await ClassesDB.delete(id);
            await loadClassesTable();
        } catch (error) {
            console.error('Error deleting class:', error);
            alert('❌ Error deleting class: ' + error.message);
        }
    }
}

// Teachers Management
async function showAddTeacherModal() {
    try {
        document.getElementById('teacherModalTitle').textContent = 'Add Teacher';
        document.getElementById('teacherRecordId').value = '';
        document.getElementById('teacherName').value = '';
        document.getElementById('teacherEmail').value = '';
        
        // Auto-generate next teacher ID by fetching from API
        try {
            const response = await fetch('http://localhost:3000/api/admin/teachers', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            let nextId = 1;
            if (response.ok) {
                const teachers = await response.json();
                if (teachers && teachers.length > 0) {
                    // Find the highest teacher ID number
                    const teacherIds = teachers
                        .map(t => t.teacherId || t.teacher_id)
                        .filter(id => id && id.startsWith('TCH'))
                        .map(id => parseInt(id.replace('TCH', '')))
                        .filter(num => !isNaN(num));
                    
                    if (teacherIds.length > 0) {
                        nextId = Math.max(...teacherIds) + 1;
                    }
                }
            }
            const suggestedTeacherId = 'TCH' + String(nextId).padStart(3, '0');
            document.getElementById('teacherUniqueId').value = suggestedTeacherId;
        } catch (err) {
            console.error('Error generating teacher ID:', err);
            document.getElementById('teacherUniqueId').value = 'TCH001';
        }
        
        document.getElementById('teacherContactNo').value = '';
        document.getElementById('teacherPassword').value = '';
        
        // Load classes checkboxes
        const classes = await getData('classes') || [];
        console.log('Classes loaded:', classes, 'IsArray:', Array.isArray(classes));
        
        const classesContainer = document.getElementById('teacherClassesCheckboxes');
        if (classesContainer) {
            classesContainer.innerHTML = '';
            
            // Ensure classes is an array
            if (!Array.isArray(classes)) {
                console.error('Classes is not an array:', classes);
                classesContainer.innerHTML = '<p style="color: #e74c3c; padding: 10px;">Error loading classes. Please refresh the page.</p>';
                return;
            }
            
            if (classes.length === 0) {
                classesContainer.innerHTML = '<p style="color: #e74c3c; padding: 10px;">No classes available. Please load demo data or create classes first.</p>';
            } else {
                classes.forEach(cls => {
                    if (cls && cls.id && (cls.className || cls.class_name)) {
                        const className = cls.className || cls.class_name;
                        classesContainer.innerHTML += `
                            <label>
                                <input type="checkbox" name="teacherClasses" value="${cls.id}" onchange="updateClassTimes()">
                                ${className} - ${cls.class_section || 'N/A'}
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

async function updateClassTimes() {
    const classes = await getData('classes') || [];
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
            const className = cls.className || cls.class_name;
            timesHtml += `
                <div class="class-time-input">
                    <label>${className} - ${cls.class_section || 'N/A'}</label>
                    <input type="time" class="class-time-field" data-class-id="${classId}" placeholder="Set time (optional)">
                </div>
            `;
        }
    });
    
    timesContainer.innerHTML = timesHtml;
}

async function showEditTeacherModal(id) {
    try {
        const teachers = await getData('teachers');
        const teacher = teachers.find(t => t.id === id);
        
        if (!teacher) {
            alert('Teacher not found!');
            return;
        }
        
        document.getElementById('teacherModalTitle').textContent = 'Edit Teacher';
        document.getElementById('teacherRecordId').value = teacher.id;
        document.getElementById('teacherName').value = teacher.name;
        document.getElementById('teacherEmail').value = teacher.email;
        
        // Handle both camelCase and snake_case
        const teacherId = teacher.teacherId || teacher.teacher_id || '';
        const contactNo = teacher.contactNo || teacher.contact_no || '';
        
        document.getElementById('teacherUniqueId').value = teacherId;
        document.getElementById('teacherUniqueId').disabled = true; // Can't change teacher ID
        document.getElementById('teacherContactNo').value = contactNo;
        document.getElementById('teacherPassword').value = '';
        
        // Load and check classes
        const classes = await getData('classes');
        const classesContainer = document.getElementById('teacherClassesCheckboxes');
        classesContainer.innerHTML = '';
        
        classes.forEach(cls => {
            const className = cls.className || cls.class_name;
            const classSection = cls.class_section || cls.classSection || 'N/A';
            
            // Check if this class is assigned to the teacher
            let checked = false;
            if (teacher.classIds && teacher.classIds.includes(cls.id)) {
                checked = true;
            } else if (teacher.classes && teacher.classes.some(c => c.id === cls.id)) {
                checked = true;
            }
            
            classesContainer.innerHTML += `
                <label>
                    <input type="checkbox" name="teacherClasses" value="${cls.id}" ${checked ? 'checked' : ''} onchange="updateClassTimes()">
                    ${className} - ${classSection}
                </label>
            `;
        });
        
        // Check years
        document.querySelectorAll('input[name="teacherYears"]').forEach(cb => {
            cb.checked = teacher.years && teacher.years.includes(parseInt(cb.value));
        });
        
        // Update class times
        updateClassTimes();
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addTeacherModal').classList.add('active');
    } catch (error) {
        console.error('Error opening edit modal:', error);
        alert('Error loading teacher data. Please try again.');
    }
}

async function saveTeacher(event) {
    event.preventDefault();
    
    try {
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
        
        const teacherId = document.getElementById('teacherUniqueId').value;
        
        // Validate teacher ID is not empty
        if (!teacherId || teacherId.trim() === '') {
            alert('❌ Teacher ID is required!');
            document.getElementById('teacherUniqueId').focus();
            return;
        }
        
        // Check if teacher ID already exists (only for new teachers)
        if (!id) {
            try {
                const response = await fetch('http://localhost:3000/api/admin/teachers', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (response.ok) {
                    const existingTeachers = await response.json();
                    const duplicate = existingTeachers.find(t => 
                        (t.teacherId || t.teacher_id) === teacherId
                    );
                    
                    if (duplicate) {
                        alert(`❌ Teacher ID "${teacherId}" already exists!\n\nPlease use a different ID.`);
                        document.getElementById('teacherUniqueId').focus();
                        return;
                    }
                }
            } catch (err) {
                console.error('Error checking teacher ID:', err);
            }
        }
        
        // Check if classes exist
        const classes = await getData('classes') || [];
        
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
            name: document.getElementById('teacherName').value,
            email: document.getElementById('teacherEmail').value,
            teacherId: teacherId,
            contactNo: contactNo,
            password: document.getElementById('teacherPassword').value || undefined,
            years: years,
            classIds: classIds,
            classTimes: classTimes
        };
        
        if (id) {
            await TeachersDB.update(parseInt(id), teacherData);
        } else {
            await TeachersDB.create(teacherData);
        }
        
        closeModal();
        await loadTeachersTable();
        alert('✅ Teacher saved successfully!');
    } catch (error) {
        console.error('Error saving teacher:', error);
        
        // Show more specific error message
        let errorMsg = 'Error saving teacher';
        if (error.message) {
            if (error.message.includes('Teacher ID already exists')) {
                errorMsg = 'Teacher ID already exists! Please use a different Teacher ID.\n\nExisting IDs: TCH001-TCH005 are already taken.\nTry: TCH006, TCH007, etc.';
            } else if (error.message.includes('email')) {
                errorMsg = 'Email already exists or is invalid!';
            } else {
                errorMsg = error.message;
            }
        }
        
        alert('❌ ' + errorMsg);
    }
}

async function loadTeachersTable() {
    try {
        const teachers = await getData('teachers');
        const classes = await getData('classes');
        const tbody = document.getElementById('teachersTableBody');
        tbody.innerHTML = '';
        
        teachers.forEach(teacher => {
            // Handle both camelCase and snake_case field names
            const teacherId = teacher.teacherId || teacher.teacher_id || 'N/A';
            const contactNo = teacher.contactNo || teacher.contact_no || 'N/A';
            const teacherName = teacher.name || 'N/A';
            const teacherEmail = teacher.email || 'N/A';
            
            // Get year badges
            const teacherYears = teacher.years 
                ? teacher.years.map(year => `<span class="badge badge-year">Year ${year}</span>`).join(' ')
                : '<span class="badge">None</span>';
            
            // Get class names - handle both classIds and classes array
            let teacherClasses = '<span class="badge">None</span>';
            if (teacher.classes && Array.isArray(teacher.classes) && teacher.classes.length > 0) {
                teacherClasses = teacher.classes
                    .map(cls => `<span class="badge badge-class">${cls.class_name || cls.className}</span>`)
                    .join(' ');
            } else if (teacher.classIds && teacher.classIds.length > 0) {
                teacherClasses = teacher.classIds.map(id => {
                    const cls = classes.find(c => c.id === id);
                    return cls ? `<span class="badge badge-class">${cls.className || cls.class_name}</span>` : '';
                }).join(' ');
            }
            
            const row = `
                <tr>
                    <td><strong>${teacherId}</strong></td>
                    <td>${teacherName}</td>
                    <td>${teacherEmail}</td>
                    <td>${contactNo}</td>
                    <td class="teacher-years">${teacherYears}</td>
                    <td class="teacher-classes">${teacherClasses}</td>
                    <td>
                        <button class="btn btn-edit" onclick="showEditTeacherModal(${teacher.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteTeacher(${teacher.id})">Delete</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error loading teachers table:', error);
    }
}

async function deleteTeacher(id) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        try {
            await TeachersDB.delete(id);
            await loadTeachersTable();
        } catch (error) {
            console.error('Error deleting teacher:', error);
            alert('❌ Error deleting teacher: ' + error.message);
        }
    }
}

// Students Management
async function showAddStudentModal() {
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
    
    const classes = await getData('classes') || [];
    const select = document.getElementById('studentClass');
    select.innerHTML = '<option value="">Select Class</option>';
    
    classes.forEach(cls => {
        if (cls && cls.id && (cls.className || cls.class_name)) {
            const className = cls.className || cls.class_name;
            const classSection = cls.class_section || cls.classSection || 'N/A';
            select.innerHTML += `<option value="${cls.id}" data-name="${className}">${className} - ${classSection}</option>`;
        }
    });
    
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('addStudentModal').classList.add('active');
}

// Generate roll number based on class
async function generateRollNumber() {
    const classSelect = document.getElementById('studentClass');
    const selectedOption = classSelect.options[classSelect.selectedIndex];
    
    if (!selectedOption || !selectedOption.value) {
        document.getElementById('studentRoll').value = '';
        return;
    }
    
    const classId = parseInt(selectedOption.value);
    const className = selectedOption.getAttribute('data-name');
    const students = await getData('students') || [];
    
    // Get class code (first 3 letters uppercase)
    const classCode = className.replace(/\s+/g, '').substring(0, 3).toUpperCase();
    
    // Get current year (last 2 digits)
    const year = new Date().getFullYear().toString().slice(-2);
    
    // Count existing students in this class
    const classStudents = students.filter(s => s.classId === classId || s.class_id === classId);
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

async function showEditStudentModal(id) {
    console.log('showEditStudentModal called with id:', id);
    
    try {
        const students = await getData('students') || [];
        console.log('Students loaded:', students.length);
        
        const student = students.find(s => s.id === id);
        console.log('Found student:', student);
        
        if (!student) {
            alert('Student not found!');
            return;
        }
        
        document.getElementById('studentModalTitle').textContent = 'Edit Student';
        document.getElementById('studentId').value = student.id;
        
        // Handle both field name formats
        const studentName = student.student_name || student.studentName || '';
        const rollNumber = student.rollNumber || student.roll_number || '';
        const studentContact = student.student_contact || student.studentContact || '';
        const parentContact = student.parent_contact || student.parentContact || '';
        const classTime = student.classTime || student.class_time || '09:00';
        const classId = student.classId || student.class_id;
        
        document.getElementById('studentName').value = studentName;
        document.getElementById('studentEmail').value = student.email || '';
        document.getElementById('studentRoll').value = rollNumber;
        document.getElementById('studentAddress').value = student.address || '';
        document.getElementById('studentContact').value = studentContact;
        document.getElementById('parentContact').value = parentContact;
        document.getElementById('studentClassTime').value = classTime;
        document.getElementById('studentInfoBox').style.display = 'none';
        
        // Keep existing password (hidden)
        document.getElementById('studentPassword').value = student.password || '';
        
        const classes = await getData('classes') || [];
        const select = document.getElementById('studentClass');
        select.innerHTML = '<option value="">Select Class</option>';
        
        classes.forEach(cls => {
            if (cls && cls.id && (cls.className || cls.class_name)) {
                const className = cls.className || cls.class_name;
                const classSection = cls.class_section || cls.classSection || 'N/A';
                const selected = cls.id === classId ? 'selected' : '';
                select.innerHTML += `<option value="${cls.id}" data-name="${className}" ${selected}>${className} - ${classSection}</option>`;
            }
        });
        
        console.log('Opening modal...');
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addStudentModal').classList.add('active');
    } catch (error) {
        console.error('Error opening edit modal:', error);
        alert('Error loading student data: ' + error.message);
    }
}

async function saveStudent(event) {
    event.preventDefault();
    const id = document.getElementById('studentId').value;
    const classSelect = document.getElementById('studentClass');
    const selectedOption = classSelect.options[classSelect.selectedIndex];
    const className = selectedOption.getAttribute('data-name');
    const rollNumber = document.getElementById('studentRoll').value;
    const password = document.getElementById('studentPassword').value;
    
    // Don't send class_time if column doesn't exist
    const studentData = {
        student_name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        roll_number: rollNumber,
        class_id: parseInt(classSelect.value),
        address: document.getElementById('studentAddress').value,
        student_contact: document.getElementById('studentContact').value,
        parent_contact: document.getElementById('parentContact').value,
        password: password
        // Removed class_time temporarily until column is added to database
    };
    
    try {
        if (id) {
            await StudentsDB.update(parseInt(id), studentData);
        } else {
            await StudentsDB.create(studentData);
            
            // Show credentials info
            document.getElementById('displayRoll').textContent = rollNumber;
            document.getElementById('displayPassword').textContent = password;
            document.getElementById('studentInfoBox').style.display = 'block';
        }
        
        if (!id) {
            alert(`Student created successfully!\n\nRoll Number: ${rollNumber}\nPassword: ${password}\n\nCredentials have been sent to the student.`);
        }
        
        setTimeout(() => {
            closeModal();
            loadStudentsTable();
        }, id ? 0 : 2000);
    } catch (error) {
        console.error('Error saving student:', error);
        alert('❌ Error saving student: ' + error.message);
    }
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

async function loadStudentsTable() {
    try {
        const students = await getData('students') || [];
        const classes = await getData('classes') || [];
        const tbody = document.getElementById('studentsTableBody');
        tbody.innerHTML = '';
        
        students.forEach(student => {
            // Handle both field name formats
            const classId = student.classId || student.class_id;
            const rollNumber = student.rollNumber || student.roll_number;
            const studentName = student.student_name || student.studentName;
            const studentContact = student.student_contact || student.studentContact;
            const parentContact = student.parent_contact || student.parentContact;
            
            const classObj = classes.find(c => c.id === classId);
            const className = classObj ? `${classObj.className || classObj.class_name} - ${classObj.class_section || classObj.classSection || 'N/A'}` : 'N/A';
            
            // Display class time with default if not set
            let classTime = student.classTime || student.class_time;
            if (!classTime || classTime === 'Not set') {
                classTime = '09:00'; // Default class time
            }
            
            const row = `
                <tr>
                    <td><strong>${rollNumber || 'N/A'}</strong></td>
                    <td>${studentName || 'N/A'}</td>
                    <td>${student.email || 'N/A'}</td>
                    <td>${className}</td>
                    <td><span style="color: #3498db; font-weight: bold;">${classTime}</span></td>
                    <td>${studentContact || 'N/A'}</td>
                    <td>${parentContact || 'N/A'}</td>
                    <td>
                        <button class="btn btn-edit" onclick="showEditStudentModal(${student.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error loading students table:', error);
    }
}

async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            await StudentsDB.delete(id);
            await loadStudentsTable();
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('❌ Error deleting student: ' + error.message);
        }
    }
}

// Load Attendance Reports (missing function)
async function loadAttendanceReports() {
    console.log('Loading attendance reports...');
    
    // Initialize the student report tab (default active tab)
    await loadStudentReport();
    
    // Also initialize the date report tab
    await loadDateReport();
    
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
async function loadStudentReport() {
    try {
        const students = await getData('students') || [];
        const classes = await getData('classes') || [];
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
        
        const attendance = await getData('attendance') || [];
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
    } catch (error) {
        console.error('Error loading student report:', error);
    }
}

// Date Report
async function loadDateReport() {
    try {
        const classes = await getData('classes') || [];
        const select = document.getElementById('dateReportClassFilter');
        select.innerHTML = '<option value="">All Classes</option>';
        
        // Filter out undefined classes and add valid ones
        classes.forEach(cls => {
            if (cls && cls.id && cls.className) {
                select.innerHTML += `<option value="${cls.id}">${cls.className} - ${cls.class_section || 'N/A'}</option>`;
            }
        });
        
        const date = document.getElementById('dateReportDate').value;
        if (!date) {
            document.getElementById('dateReportTableBody').innerHTML = '';
            document.getElementById('dateReportStats').innerHTML = '';
            return;
        }
        
        const attendance = await getData('attendance') || [];
        const classFilter = document.getElementById('dateReportClassFilter').value;
        
        console.log('Loading date report for date:', date);
        console.log('Total attendance records:', attendance.length);
        
        let filtered = attendance.filter(a => a.date === date);
        console.log('Filtered by date:', filtered.length);
        
        if (classFilter) {
            filtered = filtered.filter(a => a.classId === parseInt(classFilter));
            console.log('Filtered by class:', filtered.length);
        }
        
        // Calculate stats
        const total = filtered.length;
        const present = filtered.filter(a => a.status === 'present').length;
        const absent = total - present;
        const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
        
        console.log('Stats - Total:', total, 'Present:', present, 'Absent:', absent);
        
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
        document.getElementById('dateReportStats').innerHTML = statsHtml;
        
        // Display table
        const tbody = document.getElementById('dateReportTableBody');
        tbody.innerHTML = '';
        
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;"><div style="color: #95a5a6; font-size: 16px;"><span style="font-size: 48px;">📅</span><br><br><strong>No Attendance Records Found</strong><br><small>No attendance was marked for this date.</small></div></td></tr>';
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
            console.log('Added record:', record.studentName, record.status);
        });
    } catch (error) {
        console.error('Error loading date report:', error);
    }
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

async function loadTeacherDashboard() {
    try {
        const currentUserEmail = localStorage.getItem('currentUser');
        const currentRole = localStorage.getItem('currentRole');
        
        console.log('='.repeat(60));
        console.log('LOADING TEACHER DASHBOARD');
        console.log('='.repeat(60));
        console.log('Current user email:', currentUserEmail);
        console.log('Current role:', currentRole);
        console.log('Token present:', !!localStorage.getItem('token'));
        
        // Teachers should use their own endpoint, not admin endpoint
        if (currentRole !== 'teacher') {
            console.error('Not a teacher role!');
            return;
        }
        
        // Fetch teacher's own classes using teacher endpoint
        console.log('Fetching teacher classes from /api/teacher/my-classes...');
        const response = await APIService.getTeacherClasses();
        console.log('Teacher classes response:', response);
        
        // Extract classes array (now includes full class details)
        const myClasses = response.classes || [];
        console.log('My classes:', myClasses);
        
        // Fetch all students to count those in teacher's classes
        const students = await getData('students') || [];
        console.log('Total students in system:', students.length);
        
        // Get class IDs
        const classIds = myClasses.map(c => c.id);
        console.log('Teacher class IDs:', classIds);
        
        // Count students in teacher's classes
        const myStudents = students.filter(s => {
            const studentClassId = s.classId || s.class_id;
            return classIds.includes(studentClassId);
        });
        
        console.log('Students in my classes:', myStudents.length);
        console.log('='.repeat(60));
        
        // Update dashboard stats
        document.getElementById('teacherClasses').textContent = myClasses.length;
        document.getElementById('teacherStudents').textContent = myStudents.length;
        
        // Display assigned classes with details
        let classesHtml = '<h3>📚 My Classes</h3>';
        
        if (myClasses.length === 0) {
            classesHtml += '<p style="color: #7f8c8d;">No classes assigned yet. Please contact admin.</p>';
        } else {
            classesHtml += '<div class="teacher-classes-list">';
            myClasses.forEach(cls => {
                const classId = cls.id || cls.class_id;
                const className = cls.className || cls.class_name || 'Unknown';
                const classSection = cls.class_section || cls.classSection || 'N/A';
                const year = cls.year || 'N/A';
                const academicYear = cls.academic_year || cls.academicYear || 'N/A';
                
                const classStudentCount = students.filter(s => {
                    const studentClassId = s.classId || s.class_id;
                    return studentClassId === classId;
                }).length;
                
                const classTime = cls.class_time || '09:00:00';
                
                classesHtml += `
                    <div class="teacher-class-card">
                        <div class="class-header">
                            <h4>${className}</h4>
                            <span class="section-badge">${classSection}</span>
                        </div>
                        <div class="class-details">
                            <p><strong>Year:</strong> ${year}</p>
                            <p><strong>Academic Year:</strong> ${academicYear}</p>
                            <p><strong>Students:</strong> ${classStudentCount}</p>
                            <p><strong>Class Time:</strong> <span style="color: #3498db; font-weight: bold;">${classTime}</span></p>
                        </div>
                    </div>
                `;
            });
            classesHtml += '</div>';
        }
        
        document.getElementById('assignedClassInfo').innerHTML = classesHtml;
    } catch (error) {
        console.error('Error loading teacher dashboard:', error);
        document.getElementById('assignedClassInfo').innerHTML = `
            <p style="color: #e74c3c;">Error loading dashboard: ${error.message}</p>
            <p style="color: #7f8c8d; font-size: 0.9rem;">Please try refreshing the page or contact admin.</p>
        `;
        document.getElementById('teacherClasses').textContent = '0';
        document.getElementById('teacherStudents').textContent = '0';
    }
}

async function loadTeacherMarkSection() {
    try {
        console.log('Loading teacher mark attendance section...');
        
        // Fetch teacher's assigned classes
        const response = await APIService.getTeacherClasses();
        console.log('Teacher classes response:', response);
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response));
        
        // Extract classes array (now includes full class details)
        const myClasses = response.classes || [];
        console.log('My classes:', myClasses);
        console.log('Number of classes:', myClasses.length);
        
        if (myClasses.length === 0) {
            console.warn('⚠️ No classes found for teacher!');
            console.log('Full response:', JSON.stringify(response, null, 2));
        }
        
        const select = document.getElementById('teacherClassSelect');
        if (!select) {
            console.error('❌ teacherClassSelect element not found!');
            return;
        }
        
        select.innerHTML = '<option value="">Select a class</option>';
        
        // Add teacher's classes to dropdown
        myClasses.forEach((cls, index) => {
            console.log(`Adding class ${index + 1}:`, cls);
            const className = cls.className || cls.class_name || 'Unknown';
            const classSection = cls.class_section || cls.classSection || '';
            const year = cls.year || '';
            const displayName = classSection ? `${className} - ${classSection} (Year ${year})` : `${className} (Year ${year})`;
            
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = displayName;
            select.appendChild(option);
            
            console.log(`✅ Added: ${displayName}`);
        });
        
        console.log('✅ Class dropdown populated with', myClasses.length, 'classes');
        console.log('Dropdown HTML:', select.innerHTML);
        
        // Set today's date
        document.getElementById('attendanceDate').valueAsDate = new Date();
        
        // Set current time
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('attendanceTime').value = `${hours}:${minutes}`;
        
        // Initialize attendance counter
        updateAttendanceCounter();
    } catch (error) {
        console.error('❌ Error loading teacher mark section:', error);
        console.error('Error stack:', error.stack);
        alert('Error loading classes: ' + error.message + '\n\nCheck browser console (F12) for details.');
    }
}

async function checkAttendanceStatus() {
    try {
        const classId = document.getElementById('teacherClassSelect').value;
        const date = document.getElementById('attendanceDate').value;
        const warningBox = document.getElementById('attendanceWarning');
        
        if (!classId || !date) {
            warningBox.style.display = 'none';
            return;
        }
        
        // For teachers, we don't need to check existing attendance
        // The database will handle duplicates with ON DUPLICATE KEY UPDATE
        // Just hide the warning box
        warningBox.style.display = 'none';
        
        // Check time restriction
        checkTimeRestriction();
    } catch (error) {
        console.error('Error checking attendance status:', error);
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

async function loadStudentsForAttendance() {
    try {
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
        
        const students = await getData('students') || [];
        console.log('All students:', students);
        
        const classStudents = students.filter(s => s.classId === parseInt(classId) || s.class_id === parseInt(classId));
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
            
            // Handle both camelCase and snake_case field names
            const studentName = student.student_name || student.studentName || 'Unknown';
            const rollNumber = student.roll_number || student.rollNumber || 'N/A';
            
            item.innerHTML = `
                <div class="student-info">
                    <div class="student-name">${studentName}</div>
                    <div class="student-roll">${rollNumber}</div>
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
        
        await checkAttendanceStatus();
        updateAttendanceCounter();
    } catch (error) {
        console.error('Error loading students for attendance:', error);
    }
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

async function saveAttendance() {
    // Prevent any default behavior
    event?.preventDefault();
    event?.stopPropagation();
    
    const classId = document.getElementById('teacherClassSelect').value;
    const date = document.getElementById('attendanceDate').value;
    const time = document.getElementById('attendanceTime').value;
    
    console.log('=== SAVE ATTENDANCE ===');
    console.log('classId:', classId, 'date:', date, 'time:', time);
    console.log('attendanceData:', attendanceData);
    console.log('Token:', localStorage.getItem('token') ? 'EXISTS' : 'MISSING');
    console.log('Role:', localStorage.getItem('currentRole'));
    
    if (!classId) {
        showNotification('❌ Please select a class from the dropdown', 'error');
        console.error('No class selected');
        return;
    }
    
    if (!date) {
        showNotification('❌ Please select a date', 'error');
        console.error('No date selected');
        return;
    }
    
    if (!time) {
        showNotification('❌ Please select a time', 'error');
        console.error('No time selected');
        return;
    }
    
    if (Object.keys(attendanceData).length === 0) {
        showNotification('❌ Please mark attendance for at least one student', 'error');
        console.error('No students marked');
        return;
    }
    
    try {
        // Prepare attendance records in the format backend expects
        const records = [];
        for (const studentId of Object.keys(attendanceData)) {
            records.push({
                studentId: parseInt(studentId),
                status: attendanceData[studentId]
            });
        }
        
        console.log('Prepared records:', records);
        
        // Prepare attendance payload for backend
        const payload = {
            classId: parseInt(classId),
            date: date,
            startTime: time,
            records: records
        };
        
        console.log('Sending attendance payload:', payload);
        
        // Save attendance via API
        const response = await APIService.createAttendanceSession(payload);
        
        console.log('✅ Attendance saved successfully!', response);
        showNotification(`✅ Attendance saved successfully! (${records.length} students)`, 'success');
        
        // Clear attendance data
        attendanceData = {};
        
        // DON'T reload students - just update the counter
        updateAttendanceCounter();
        
        // Clear the button highlights
        const buttons = document.querySelectorAll('.toggle-btn');
        buttons.forEach(btn => {
            btn.classList.remove('present', 'absent');
        });
    } catch (error) {
        console.error('Error saving attendance:', error);
        
        // Check if it's an auth error
        if (error.message && (error.message.includes('token') || error.message.includes('Authorization'))) {
            showNotification('❌ Session expired. Please login again.', 'error');
            setTimeout(() => logout(), 2000);
        } else {
            showNotification('❌ Error saving attendance: ' + error.message, 'error');
        }
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

async function loadTeacherHistorySection() {
    try {
        console.log('Loading teacher history section...');
        
        // Set initial message in table
        const tbody = document.getElementById('historyTableBody');
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;"><div style="color: #95a5a6;"><span style="font-size: 48px;">📋</span><br><br><strong>Select a Class</strong><br><small>Please select a class from the dropdown above to view attendance history.</small></div></td></tr>';
        
        // Fetch teacher's assigned classes
        const response = await APIService.getTeacherClasses();
        
        // Extract classes array (now includes full class details)
        const myClasses = response.classes || [];
        
        const select = document.getElementById('historyClassFilter');
        select.innerHTML = '<option value="">Select Class</option>';
        
        myClasses.forEach(cls => {
            const className = cls.className || cls.class_name || 'Unknown';
            const classSection = cls.class_section || cls.classSection || '';
            const displayName = classSection ? `${className} - ${classSection}` : className;
            
            select.innerHTML += `<option value="${cls.id}">${displayName}</option>`;
        });
        
        console.log('History dropdown populated with', myClasses.length, 'classes');
    } catch (error) {
        console.error('Error loading teacher history section:', error);
    }
}

async function loadTeacherHistory() {
    try {
        const classId = document.getElementById('historyClassFilter').value;
        const date = document.getElementById('historyDateFilter').value;
        
        console.log('=== LOAD TEACHER HISTORY ===');
        console.log('classId from dropdown:', classId, 'type:', typeof classId);
        console.log('date filter:', date);
        
        const tbody = document.getElementById('historyTableBody');
        
        // Check if classId is empty or invalid
        if (!classId || classId === '' || classId === 'undefined' || classId === 'null') {
            console.log('No valid classId, showing select message');
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;"><div style="color: #95a5a6;"><span style="font-size: 48px;">📋</span><br><br><strong>Select a Class</strong><br><small>Please select a class from the dropdown above to view attendance history.</small></div></td></tr>';
            return;
        }
        
        // Show loading
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;">Loading...</td></tr>';
        
        console.log('Calling APIService.getTeacherAttendanceHistory with classId:', classId);
        
        // Fetch attendance history from teacher endpoint with classId
        const history = await APIService.getTeacherAttendanceHistory(classId);
        console.log('Teacher history received:', history);
        console.log('History is array?', Array.isArray(history));
        console.log('History length:', history?.length);
        
        // Process history data
        let attendance = [];
        if (Array.isArray(history)) {
            // If history is array of students with attendance
            history.forEach(student => {
                console.log('Processing student:', student.studentName, 'attendance count:', student.attendance?.length);
                if (student.attendance && Array.isArray(student.attendance)) {
                    student.attendance.forEach(record => {
                        // Format date properly
                        let formattedDate = record.date;
                        if (record.date instanceof Date) {
                            formattedDate = record.date.toISOString().split('T')[0];
                        } else if (typeof record.date === 'string') {
                            // If it's already a string, just use the date part
                            formattedDate = record.date.split('T')[0];
                        }
                        
                        attendance.push({
                            date: formattedDate,
                            time: record.time || 'N/A',
                            status: record.status,
                            studentName: student.studentName,
                            rollNumber: student.rollNumber,
                            class_id: record.class_id,
                            student_id: record.student_id
                        });
                    });
                }
            });
        }
        
        console.log('Processed attendance records:', attendance.length);
        
        // Filter by date if specified
        if (date) {
            attendance = attendance.filter(a => a.date === date);
            console.log('After date filter:', attendance.length);
        }
        
        // Sort by date descending
        attendance.sort((a, b) => new Date(b.date) - new Date(a.date));
        
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
                    <td><span style="color: ${statusColor}; font-weight: bold;">${statusIcon} ${record.status.toUpperCase()}</span></td>
                    <td>${record.time || 'N/A'}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error loading teacher history:', error);
        console.error('Error details:', error.message, error.stack);
        const tbody = document.getElementById('historyTableBody');
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 40px; color: #e74c3c;">
            <strong>Error loading attendance history</strong><br>
            <small>${error.message || 'Please try again or check console for details'}</small>
        </td></tr>`;
    }
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

async function loadStudentDashboard() {
    try {
        console.log('=== LOAD STUDENT DASHBOARD ===');
        const studentId = parseInt(localStorage.getItem('currentStudentId'));
        console.log('Student ID:', studentId);
        
        if (!studentId) {
            console.error('No student ID found');
            alert('Student ID not found. Please log in again.');
            logout();
            return;
        }
        
        // Fetch student profile from student endpoint
        const student = await APIService.getStudentProfile();
        console.log('Student profile:', student);
        
        if (student) {
            // Update header with student name
            const studentName = student.student_name || student.name || 'Student';
            document.getElementById('studentUserInfo').textContent = studentName;
            
            // Get class information
            const className = student.class_name || student.className || 'N/A';
            const classSection = student.class_section || student.classSection || '';
            const displayClassName = classSection ? `${className} - ${classSection}` : className;
            
            // Display personal details
            document.getElementById('studentDetails').innerHTML = `
                <p><strong>Name:</strong> ${studentName}</p>
                <p><strong>Roll Number:</strong> ${student.roll_number || student.rollNumber || 'N/A'}</p>
                <p><strong>Class:</strong> ${displayClassName}</p>
            `;
            
            // Fetch attendance statistics from student endpoint
            try {
                const stats = await APIService.getStudentAttendancePercentage();
                console.log('Attendance stats:', stats);
                
                const percentage = stats.percentage || 0;
                const presentDays = stats.present || 0;
                const absentDays = stats.absent || 0;
                const total = stats.total || 0;
                
                // Update statistics cards
                document.getElementById('studentAttendancePercent').textContent = percentage.toFixed(1) + '%';
                document.getElementById('studentPresentDays').textContent = presentDays;
                document.getElementById('studentAbsentDays').textContent = absentDays;
                document.getElementById('studentTotalDays').textContent = total;
            } catch (statsError) {
                console.error('Error loading attendance stats:', statsError);
                // Set default values if stats fail
                document.getElementById('studentAttendancePercent').textContent = '0%';
                document.getElementById('studentPresentDays').textContent = '0';
                document.getElementById('studentAbsentDays').textContent = '0';
                document.getElementById('studentTotalDays').textContent = '0';
            }
        } else {
            console.error('Student profile not found');
            alert('Student data not found!');
            logout();
        }
    } catch (error) {
        console.error('Error loading student dashboard:', error);
        console.error('Error details:', error.message, error.stack);
        alert('Error loading dashboard. Please try logging in again.');
    }
}

async function loadStudentAttendance() {
    try {
        const studentId = parseInt(localStorage.getItem('currentStudentId'));
        
        console.log('=== LOAD STUDENT ATTENDANCE ===');
        console.log('studentId:', studentId);
        
        if (!studentId) {
            console.error('No student ID found in localStorage');
            const tbody = document.getElementById('studentAttendanceTableBody');
            tbody.innerHTML = '<tr><td colspan="2" style="text-align: center; padding: 40px; color: #e74c3c;">Student ID not found. Please log in again.</td></tr>';
            return;
        }
        
        console.log('Calling APIService.getStudentAttendance()');
        
        // Fetch student attendance from API
        const response = await APIService.getStudentAttendance();
        console.log('Student attendance response:', response);
        console.log('Response type:', typeof response);
        console.log('Is array?', Array.isArray(response));
        
        let studentAttendance = response || [];
        
        // Ensure it's an array
        if (!Array.isArray(studentAttendance)) {
            console.error('Attendance data is not an array:', studentAttendance);
            // If it's an object with a data property, try that
            if (studentAttendance && studentAttendance.data && Array.isArray(studentAttendance.data)) {
                studentAttendance = studentAttendance.data;
            } else {
                studentAttendance = [];
            }
        }
        
        console.log('Attendance records count:', studentAttendance.length);
        
        const monthFilter = document.getElementById('studentMonthFilter').value;
        
        if (monthFilter && studentAttendance.length > 0) {
            const [year, month] = monthFilter.split('-');
            studentAttendance = studentAttendance.filter(a => {
                if (!a.date) return false;
                const dateStr = a.date.toString().split('T')[0]; // Handle date objects
                const [aYear, aMonth] = dateStr.split('-');
                return aYear === year && aMonth === month;
            });
            console.log('After month filter:', studentAttendance.length);
        }
        
        // Sort by date (newest first)
        studentAttendance.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
        
        const tbody = document.getElementById('studentAttendanceTableBody');
        tbody.innerHTML = '';
        
        if (studentAttendance.length === 0) {
            tbody.innerHTML = '<tr><td colspan="2" style="text-align: center; padding: 40px;"><div style="color: #95a5a6; font-size: 16px;"><span style="font-size: 48px;">📊</span><br><br><strong>No Attendance Records Yet</strong><br><small>You don\'t have any attendance records for the selected month.<br>Attendance will appear here once your teacher marks it.</small></div></td></tr>';
            return;
        }
        
        studentAttendance.forEach(record => {
            // Format date properly
            let displayDate = record.date;
            if (record.date) {
                displayDate = new Date(record.date).toISOString().split('T')[0];
            }
            
            const statusColor = record.status === 'present' ? '#2ecc71' : '#e74c3c';
            const row = `
                <tr>
                    <td>${displayDate}</td>
                    <td><span style="color: ${statusColor}; font-weight: 600;">${record.status.toUpperCase()}</span></td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
        
        console.log('Student attendance loaded successfully');
    } catch (error) {
        console.error('Error loading student attendance:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        const tbody = document.getElementById('studentAttendanceTableBody');
        tbody.innerHTML = `<tr><td colspan="2" style="text-align: center; padding: 40px; color: #e74c3c;">
            <strong>Error loading attendance</strong><br>
            <small>${error.message || 'Please try again or check console for details'}</small>
        </td></tr>`;
    }
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
});
