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
}

// Load Demo Data
function loadDemoData() {
    const demoClasses = [
        { 
            id: 1, 
            name: 'BCA', 
            section: '1st Year',
            year: 1,
            academicYear: '2025-2026',
            fullName: 'BCA 1st Year',
            createdAt: new Date().toISOString()
        },
        { 
            id: 2, 
            name: 'BCA', 
            section: '2nd Year',
            year: 2,
            academicYear: '2025-2026',
            fullName: 'BCA 2nd Year',
            createdAt: new Date().toISOString()
        },
        { 
            id: 3, 
            name: 'MCA', 
            section: '1st Year',
            year: 1,
            academicYear: '2025-2026',
            fullName: 'MCA 1st Year',
            createdAt: new Date().toISOString()
        }
    ];
    
    const demoSubjects = [
        { id: 1, name: 'Mathematics', code: 'MATH101' },
        { id: 2, name: 'Physics', code: 'PHY101' },
        { id: 3, name: 'Computer Science', code: 'CS101' },
        { id: 4, name: 'English', code: 'ENG101' },
        { id: 5, name: 'Data Structures', code: 'CS201' }
    ];
    
    const demoTeachers = [
        { 
            id: 1, 
            name: 'Dr. Rajesh Kumar', 
            email: 'rajesh@example.com', 
            teacherId: 'TCH001',
            contactNo: '9876543210',
            phone: '1234567890',
            years: [1, 2],
            classIds: [1, 2]
        },
        { 
            id: 2, 
            name: 'Prof. Priya Sharma', 
            email: 'priya@example.com', 
            teacherId: 'TCH002',
            contactNo: '9876543211',
            phone: '1234567891',
            years: [1, 2, 3],
            classIds: [1, 2, 3]
        },
        { 
            id: 3, 
            name: 'Dr. Amit Patel', 
            email: 'amit@example.com', 
            teacherId: 'TCH003',
            contactNo: '9876543212',
            phone: '1234567892',
            years: [1],
            classIds: [3]
        }
    ];
    
    const demoStudents = [
        { 
            id: 1, 
            name: 'Rahul Verma', 
            email: 'rahul.verma@example.com',
            rollNumber: 'BCA25001', 
            classId: 1,
            class: 'BCA 1st Year',
            address: '123 Main Street, Mumbai',
            studentContact: '9876543210',
            parentContact: '9876543211',
            password: 'Pass1234',
            createdAt: new Date().toISOString()
        },
        { 
            id: 2, 
            name: 'Anita Singh', 
            email: 'anita.singh@example.com',
            rollNumber: 'BCA25002', 
            classId: 1,
            class: 'BCA 1st Year',
            address: '456 Park Avenue, Delhi',
            studentContact: '9876543212',
            parentContact: '9876543213',
            password: 'Pass5678',
            createdAt: new Date().toISOString()
        },
        { 
            id: 3, 
            name: 'Vikram Joshi', 
            email: 'vikram.joshi@example.com',
            rollNumber: 'BCA25003', 
            classId: 1,
            class: 'BCA 1st Year',
            address: '789 Lake Road, Bangalore',
            studentContact: '9876543214',
            parentContact: '9876543215',
            password: 'Pass9012',
            createdAt: new Date().toISOString()
        },
        { 
            id: 4, 
            name: 'Sneha Gupta', 
            email: 'sneha.gupta@example.com',
            rollNumber: 'BCA25021', 
            classId: 2,
            class: 'BCA 2nd Year',
            address: '321 Hill View, Pune',
            studentContact: '9876543216',
            parentContact: '9876543217',
            password: 'Pass3456',
            createdAt: new Date().toISOString()
        },
        { 
            id: 5, 
            name: 'Arjun Reddy', 
            email: 'arjun.reddy@example.com',
            rollNumber: 'BCA25022', 
            classId: 2,
            class: 'BCA 2nd Year',
            address: '654 Garden Street, Hyderabad',
            studentContact: '9876543218',
            parentContact: '9876543219',
            password: 'Pass7890',
            createdAt: new Date().toISOString()
        },
        { 
            id: 6, 
            name: 'Pooja Mehta', 
            email: 'pooja.mehta@example.com',
            rollNumber: 'MCA25001', 
            classId: 3,
            class: 'MCA 1st Year',
            address: '987 Beach Road, Chennai',
            studentContact: '9876543220',
            parentContact: '9876543221',
            password: 'Pass2468',
            createdAt: new Date().toISOString()
        }
    ];
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const demoAttendance = [
        // Today's attendance
        { id: 1, studentId: 1, studentName: 'Rahul Verma', className: 'BCA 1st Year', date: today.toISOString().split('T')[0], status: 'present' },
        { id: 2, studentId: 2, studentName: 'Anita Singh', className: 'BCA 1st Year', date: today.toISOString().split('T')[0], status: 'present' },
        { id: 3, studentId: 3, studentName: 'Vikram Joshi', className: 'BCA 1st Year', date: today.toISOString().split('T')[0], status: 'absent' },
        { id: 4, studentId: 4, studentName: 'Sneha Gupta', className: 'BCA 2nd Year', date: today.toISOString().split('T')[0], status: 'present' },
        { id: 5, studentId: 5, studentName: 'Arjun Reddy', className: 'BCA 2nd Year', date: today.toISOString().split('T')[0], status: 'present' },
        
        // Yesterday's attendance
        { id: 6, studentId: 1, studentName: 'Rahul Verma', className: 'BCA 1st Year', date: yesterday.toISOString().split('T')[0], status: 'present' },
        { id: 7, studentId: 2, studentName: 'Anita Singh', className: 'BCA 1st Year', date: yesterday.toISOString().split('T')[0], status: 'absent' },
        { id: 8, studentId: 3, studentName: 'Vikram Joshi', className: 'BCA 1st Year', date: yesterday.toISOString().split('T')[0], status: 'present' },
        
        // Two days ago
        { id: 9, studentId: 1, studentName: 'Rahul Verma', className: 'BCA 1st Year', date: twoDaysAgo.toISOString().split('T')[0], status: 'present' },
        { id: 10, studentId: 2, studentName: 'Anita Singh', className: 'BCA 1st Year', date: twoDaysAgo.toISOString().split('T')[0], status: 'present' },
        { id: 11, studentId: 3, studentName: 'Vikram Joshi', className: 'BCA 1st Year', date: twoDaysAgo.toISOString().split('T')[0], status: 'present' }
    ];
    
    saveData('classes', demoClasses);
    saveData('subjects', demoSubjects);
    saveData('teachers', demoTeachers);
    saveData('students', demoStudents);
    saveData('attendance', demoAttendance);
    
    alert('Demo data loaded successfully! You can now test all features.');
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
function login(role) {
    localStorage.setItem('currentRole', role);
    document.getElementById('loginPage').classList.remove('active');
    
    if (role === 'admin') {
        document.getElementById('adminDashboard').classList.add('active');
        loadAdminDashboard();
    } else if (role === 'teacher') {
        document.getElementById('teacherDashboard').classList.add('active');
        loadTeacherDashboard();
    }
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

// Student login with roll number
function studentLogin(event) {
    event.preventDefault();
    const rollNumber = document.getElementById('studentRollLogin').value.trim();
    const students = getData('students');
    const student = students.find(s => s.rollNumber.toLowerCase() === rollNumber.toLowerCase());
    
    if (student) {
        localStorage.setItem('currentRole', 'student');
        localStorage.setItem('currentStudentId', student.id);
        document.getElementById('studentLoginPage').classList.remove('active');
        document.getElementById('studentDashboard').classList.add('active');
        loadStudentDashboard();
    } else {
        alert('Invalid roll number! Please try again.');
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentRole');
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
        document.getElementById('className').value = cls.name;
        document.getElementById('classSection').value = cls.section || '';
        document.getElementById('classYear').value = cls.year;
        document.getElementById('classAcademicYear').value = cls.academicYear || getAcademicYear();
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
        name: className,
        section: section,
        year: parseInt(year),
        academicYear: academicYear,
        fullName: `${className} ${section}`,
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
    }, id ? 0 : 2000);
}

function loadClassesTable() {
    const classes = getData('classes');
    const tbody = document.getElementById('classesTableBody');
    tbody.innerHTML = '';
    
    classes.forEach(cls => {
        const row = `
            <tr>
                <td><strong>${cls.name}</strong></td>
                <td>${cls.section || 'N/A'}</td>
                <td>${cls.year}</td>
                <td>${cls.academicYear || 'N/A'}</td>
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
        document.getElementById('teacherUniqueId').value = '';
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
                    classesContainer.innerHTML += `
                        <label>
                            <input type="checkbox" name="teacherClasses" value="${cls.id}">
                            ${cls.name}
                        </label>
                    `;
                });
            }
        }
        
        // Uncheck all years
        document.querySelectorAll('input[name="teacherYears"]').forEach(cb => cb.checked = false);
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addTeacherModal').classList.add('active');
    } catch (error) {
        console.error('Error opening teacher modal:', error);
        alert('Error opening teacher form. Please check the console for details.');
    }
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
                    ${cls.name}
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
        
        const teacherId = document.getElementById('teacherUniqueId').value;
        
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
            classIds: classIds
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
                return cls ? `<span class="badge badge-class">${cls.name}</span>` : '';
              }).join(' ')
            : '<span class="badge">None</span>';
        
        const row = `
            <tr>
                <td><strong>${teacher.teacherId || 'N/A'}</strong></td>
                <td>${teacher.name}</td>
                <td>${teacher.email}</td>
                <td>${teacher.contactNo || 'N/A'}</td>
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
    document.getElementById('studentInfoBox').style.display = 'none';
    
    // Generate password in background (hidden field)
    generatePassword();
    
    const classes = getData('classes');
    const select = document.getElementById('studentClass');
    select.innerHTML = '<option value="">Select Class</option>';
    classes.forEach(cls => {
        select.innerHTML += `<option value="${cls.id}" data-name="${cls.name}">${cls.name}</option>`;
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
    const students = getData('students');
    const student = students.find(s => s.id === id);
    if (student) {
        document.getElementById('studentModalTitle').textContent = 'Edit Student';
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentEmail').value = student.email || '';
        document.getElementById('studentRoll').value = student.rollNumber;
        document.getElementById('studentAddress').value = student.address || '';
        document.getElementById('studentContact').value = student.studentContact || '';
        document.getElementById('parentContact').value = student.parentContact || '';
        document.getElementById('studentInfoBox').style.display = 'none';
        
        // Keep existing password (hidden)
        document.getElementById('studentPassword').value = student.password || '';
        
        const classes = getData('classes');
        const select = document.getElementById('studentClass');
        select.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            const selected = cls.id === student.classId ? 'selected' : '';
            select.innerHTML += `<option value="${cls.id}" data-name="${cls.name}" ${selected}>${cls.name}</option>`;
        });
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addStudentModal').classList.add('active');
    }
}

function saveStudent(event) {
    event.preventDefault();
    const students = getData('students');
    const id = document.getElementById('studentId').value;
    const classSelect = document.getElementById('studentClass');
    const selectedOption = classSelect.options[classSelect.selectedIndex];
    const className = selectedOption.getAttribute('data-name');
    const rollNumber = document.getElementById('studentRoll').value;
    const password = document.getElementById('studentPassword').value;
    
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
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        rollNumber: rollNumber,
        classId: parseInt(classSelect.value),
        class: className,
        address: document.getElementById('studentAddress').value,
        studentContact: document.getElementById('studentContact').value,
        parentContact: document.getElementById('parentContact').value,
        password: password, // In real app, this should be hashed
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
    }, id ? 0 : 2000); // Delay for new students to see credentials
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
    const students = getData('students');
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = `
            <tr>
                <td><strong>${student.rollNumber}</strong></td>
                <td>${student.name}</td>
                <td>${student.email || 'N/A'}</td>
                <td>${student.class}</td>
                <td>${student.studentContact || 'N/A'}</td>
                <td>${student.parentContact || 'N/A'}</td>
                <td>
                    <button class="btn btn-edit" onclick="showEditStudentModal(${student.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
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
    select.innerHTML = '<option value="">Select Student</option>';
    students.forEach(student => {
        select.innerHTML += `<option value="${student.id}">${student.student_name} (${student.rollNumber})</option>`;
    });
    
    const studentId = parseInt(document.getElementById('studentReportFilter').value);
    if (!studentId) {
        document.getElementById('studentReportTableBody').innerHTML = '';
        document.getElementById('studentReportStats').innerHTML = '';
        return;
    }
    
    const student = students.find(s => s.id === studentId);
    const attendance = getData('attendance') || [];
    const startDate = document.getElementById('studentReportStartDate').value;
    const endDate = document.getElementById('studentReportEndDate').value;
    
    console.log('Loading student report for:', student.student_name);
    console.log('Total attendance records:', attendance.length);
    
    let filtered = attendance.filter(a => a.studentId === studentId);
    console.log('Filtered by student:', filtered.length);
    
    if (startDate) {
        filtered = filtered.filter(a => a.date >= startDate);
    }
    if (endDate) {
        filtered = filtered.filter(a => a.date <= endDate);
    }
    
    console.log('After date filter:', filtered.length);
    
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
    document.getElementById('studentReportStats').innerHTML = statsHtml;
    
    // Display table
    const tbody = document.getElementById('studentReportTableBody');
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #7f8c8d;">No attendance records found for this student</td></tr>';
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
                <td><span style="color: ${record.status === 'present' ? '#27ae60' : '#e74c3c'}; font-weight: bold;">${record.status === 'present' ? '✓ PRESENT' : '✗ ABSENT'}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
        console.log('Added record:', record.date, record.status);
    });
}

// Date Report
function loadDateReport() {
    const classes = getData('classes') || [];
    const select = document.getElementById('dateReportClassFilter');
    select.innerHTML = '<option value="">All Classes</option>';
    classes.forEach(cls => {
        select.innerHTML += `<option value="${cls.id}">${cls.className} - ${cls.class_section || 'N/A'}</option>`;
    });
    
    const date = document.getElementById('dateReportDate').value;
    if (!date) {
        document.getElementById('dateReportTableBody').innerHTML = '';
        document.getElementById('dateReportStats').innerHTML = '';
        return;
    }
    
    const attendance = getData('attendance') || [];
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
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #7f8c8d;">No attendance records found for this date</td></tr>';
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
    const teachers = getData('teachers');
    const students = getData('students');
    
    // For demo, assume first teacher
    const teacher = teachers[0];
    
    if (teacher) {
        const classStudents = students.filter(s => s.class === teacher.assignedClass);
        document.getElementById('teacherClasses').textContent = '1';
        document.getElementById('teacherStudents').textContent = classStudents.length;
        document.getElementById('assignedClassInfo').innerHTML = `
            <h3>Assigned Class</h3>
            <p><strong>Class:</strong> ${teacher.assignedClass}</p>
            <p><strong>Total Students:</strong> ${classStudents.length}</p>
        `;
    }
}

function loadTeacherMarkSection() {
    const classes = getData('classes') || [];
    const select = document.getElementById('teacherClassSelect');
    select.innerHTML = '<option value="">Select a class</option>';
    
    classes.forEach(cls => {
        select.innerHTML += `<option value="${cls.id}">${cls.className} - ${cls.class_section || 'N/A'}</option>`;
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
    } else {
        warningBox.style.display = 'none';
    }
    
    // Check time restriction
    checkTimeRestriction();
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
    if (!classId) {
        document.getElementById('attendanceStudentsList').innerHTML = '';
        document.getElementById('saveAttendanceBtn').style.display = 'none';
        document.getElementById('markAllPresentBtn').style.display = 'none';
        document.getElementById('markAllAbsentBtn').style.display = 'none';
        document.getElementById('clearAllBtn').style.display = 'none';
        document.getElementById('exportCSVBtn').style.display = 'none';
        return;
    }
    
    const students = getData('students').filter(s => s.classId === parseInt(classId));
    const container = document.getElementById('attendanceStudentsList');
    
    if (students.length === 0) {
        container.innerHTML = '<p style="padding: 20px; text-align: center; color: #7f8c8d;">No students in this class</p>';
        return;
    }
    
    container.innerHTML = '<h3>📚 Students (' + students.length + ')</h3>';
    
    students.forEach(student => {
        const item = document.createElement('div');
        item.className = 'attendance-item';
        item.id = `student-${student.id}`;
        item.innerHTML = `
            <div class="student-info">
                <div class="student-name">${student.student_name}</div>
                <div class="student-roll">${student.rollNumber}</div>
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
    const buttons = btn.parentElement.querySelectorAll('.toggle-btn');
    buttons.forEach(b => {
        b.classList.remove('present', 'absent');
    });
    btn.classList.add(status);
    attendanceData[studentId] = status;
    console.log('Marked student', studentId, 'as', status, 'Current data:', attendanceData);
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
    
    console.log('Save Attendance - classId:', classId, 'date:', date, 'time:', time);
    console.log('Attendance Data:', attendanceData);
    
    if (!classId || !date || !time) {
        showNotification('❌ Please select class, date, and time', 'error');
        return;
    }
    
    if (Object.keys(attendanceData).length === 0) {
        showNotification('❌ Please mark attendance for at least one student', 'error');
        return;
    }
    
    try {
        const students = getData('students');
        console.log('Students loaded:', students.length);
        
        let attendance = getData('attendance') || [];
        console.log('Existing attendance records:', attendance.length);
        
        // Check for duplicates
        const existingRecord = attendance.find(a => a.classId === parseInt(classId) && a.date === date);
        if (existingRecord) {
            if (!confirm('Attendance already exists for this date. Do you want to update it?')) {
                return;
            }
            // Remove old records for this class and date
            attendance = attendance.filter(a => !(a.classId === parseInt(classId) && a.date === date));
            console.log('Removed old records, remaining:', attendance.length);
        }
        
        // Save new records
        let savedCount = 0;
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
                    markedAt: new Date().toISOString()
                };
                attendance.push(record);
                savedCount++;
                console.log('Saved record for student:', student.student_name);
            } else {
                console.warn('Student not found for ID:', studentId);
            }
        });
        
        console.log('Total records saved:', savedCount);
        saveData('attendance', attendance);
        console.log('Attendance data saved to localStorage');
        
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
        showNotification('❌ No attendance records found', 'error');
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
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #7f8c8d;">No attendance records found</td></tr>';
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
        showNotification('❌ No attendance records found', 'error');
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
    const attendance = getData('attendance');
    const studentId = parseInt(localStorage.getItem('currentStudentId'));
    
    const student = students.find(s => s.id === studentId);
    
    if (student) {
        // Update header with student name
        document.getElementById('studentUserInfo').textContent = student.name;
        
        // Display personal details
        document.getElementById('studentDetails').innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
            <p><strong>Class:</strong> ${student.class}</p>
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
        tbody.innerHTML = '<tr><td colspan="2" style="text-align: center;">No attendance records found</td></tr>';
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
});
