// Initialize LocalStorage
function initStorage() {
    if (!localStorage.getItem('classes')) {
        localStorage.setItem('classes', JSON.stringify([]));
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
}

// Load Demo Data
function loadDemoData() {
    const demoClasses = [
        { id: 1, name: 'BCA 1st Year', year: 1 },
        { id: 2, name: 'BCA 2nd Year', year: 2 },
        { id: 3, name: 'MCA 1st Year', year: 1 }
    ];
    
    const demoTeachers = [
        { id: 1, name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com', assignedClass: 'BCA 1st Year' },
        { id: 2, name: 'Prof. Priya Sharma', email: 'priya@example.com', assignedClass: 'BCA 2nd Year' },
        { id: 3, name: 'Dr. Amit Patel', email: 'amit@example.com', assignedClass: 'MCA 1st Year' }
    ];
    
    const demoStudents = [
        { id: 1, name: 'Rahul Verma', rollNumber: 'BCA001', class: 'BCA 1st Year' },
        { id: 2, name: 'Anita Singh', rollNumber: 'BCA002', class: 'BCA 1st Year' },
        { id: 3, name: 'Vikram Joshi', rollNumber: 'BCA003', class: 'BCA 1st Year' },
        { id: 4, name: 'Sneha Gupta', rollNumber: 'BCA021', class: 'BCA 2nd Year' },
        { id: 5, name: 'Arjun Reddy', rollNumber: 'BCA022', class: 'BCA 2nd Year' },
        { id: 6, name: 'Pooja Mehta', rollNumber: 'MCA001', class: 'MCA 1st Year' }
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
function showAddClassModal() {
    document.getElementById('classModalTitle').textContent = 'Add Class';
    document.getElementById('classId').value = '';
    document.getElementById('className').value = '';
    document.getElementById('classYear').value = '';
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
        document.getElementById('classYear').value = cls.year;
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addClassModal').classList.add('active');
    }
}

function saveClass(event) {
    event.preventDefault();
    const classes = getData('classes');
    const id = document.getElementById('classId').value;
    const classData = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('className').value,
        year: document.getElementById('classYear').value
    };
    
    if (id) {
        const index = classes.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            classes[index] = classData;
        }
    } else {
        classes.push(classData);
    }
    
    saveData('classes', classes);
    closeModal();
    loadClassesTable();
}

function loadClassesTable() {
    const classes = getData('classes');
    const tbody = document.getElementById('classesTableBody');
    tbody.innerHTML = '';
    
    classes.forEach(cls => {
        const row = `
            <tr>
                <td>${cls.name}</td>
                <td>${cls.year}</td>
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
    document.getElementById('teacherModalTitle').textContent = 'Add Teacher';
    document.getElementById('teacherId').value = '';
    document.getElementById('teacherName').value = '';
    document.getElementById('teacherEmail').value = '';
    
    const classes = getData('classes');
    const select = document.getElementById('teacherClass');
    select.innerHTML = '<option value="">Select Class</option>';
    classes.forEach(cls => {
        select.innerHTML += `<option value="${cls.name}">${cls.name}</option>`;
    });
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('addTeacherModal').classList.add('active');
}

function showEditTeacherModal(id) {
    const teachers = getData('teachers');
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
        document.getElementById('teacherModalTitle').textContent = 'Edit Teacher';
        document.getElementById('teacherId').value = teacher.id;
        document.getElementById('teacherName').value = teacher.name;
        document.getElementById('teacherEmail').value = teacher.email;
        
        const classes = getData('classes');
        const select = document.getElementById('teacherClass');
        select.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            const selected = cls.name === teacher.assignedClass ? 'selected' : '';
            select.innerHTML += `<option value="${cls.name}" ${selected}>${cls.name}</option>`;
        });
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addTeacherModal').classList.add('active');
    }
}

function saveTeacher(event) {
    event.preventDefault();
    const teachers = getData('teachers');
    const id = document.getElementById('teacherId').value;
    const teacherData = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('teacherName').value,
        email: document.getElementById('teacherEmail').value,
        assignedClass: document.getElementById('teacherClass').value
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
}

function loadTeachersTable() {
    const teachers = getData('teachers');
    const tbody = document.getElementById('teachersTableBody');
    tbody.innerHTML = '';
    
    teachers.forEach(teacher => {
        const row = `
            <tr>
                <td>${teacher.name}</td>
                <td>${teacher.email}</td>
                <td>${teacher.assignedClass}</td>
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
    document.getElementById('studentRoll').value = '';
    
    const classes = getData('classes');
    const select = document.getElementById('studentClass');
    select.innerHTML = '<option value="">Select Class</option>';
    classes.forEach(cls => {
        select.innerHTML += `<option value="${cls.name}">${cls.name}</option>`;
    });
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('addStudentModal').classList.add('active');
}

function showEditStudentModal(id) {
    const students = getData('students');
    const student = students.find(s => s.id === id);
    if (student) {
        document.getElementById('studentModalTitle').textContent = 'Edit Student';
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentRoll').value = student.rollNumber;
        
        const classes = getData('classes');
        const select = document.getElementById('studentClass');
        select.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            const selected = cls.name === student.class ? 'selected' : '';
            select.innerHTML += `<option value="${cls.name}" ${selected}>${cls.name}</option>`;
        });
        
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('addStudentModal').classList.add('active');
    }
}

function saveStudent(event) {
    event.preventDefault();
    const students = getData('students');
    const id = document.getElementById('studentId').value;
    const studentData = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('studentName').value,
        rollNumber: document.getElementById('studentRoll').value,
        class: document.getElementById('studentClass').value
    };
    
    if (id) {
        const index = students.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
            students[index] = studentData;
        }
    } else {
        students.push(studentData);
    }
    
    saveData('students', students);
    closeModal();
    loadStudentsTable();
}

function loadStudentsTable() {
    const students = getData('students');
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.rollNumber}</td>
                <td>${student.class}</td>
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
function loadAttendanceReports() {
    const classes = getData('classes');
    const select = document.getElementById('reportClassFilter');
    select.innerHTML = '<option value="">All Classes</option>';
    classes.forEach(cls => {
        select.innerHTML += `<option value="${cls.name}">${cls.name}</option>`;
    });
    
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
    
    const tbody = document.getElementById('reportsTableBody');
    tbody.innerHTML = '';
    
    filtered.forEach(record => {
        const row = `
            <tr>
                <td>${record.date}</td>
                <td>${record.className}</td>
                <td>${record.studentName}</td>
                <td><span style="color: ${record.status === 'present' ? '#2ecc71' : '#e74c3c'}">${record.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-edit" onclick="showEditAttendanceModal('${record.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteAttendance('${record.id}')">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
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
    const teachers = getData('teachers');
    const select = document.getElementById('teacherClassSelect');
    select.innerHTML = '<option value="">Select a class</option>';
    
    teachers.forEach(teacher => {
        select.innerHTML += `<option value="${teacher.assignedClass}">${teacher.assignedClass}</option>`;
    });
    
    // Set today's date
    document.getElementById('attendanceDate').valueAsDate = new Date();
}

function loadStudentsForAttendance() {
    const className = document.getElementById('teacherClassSelect').value;
    if (!className) {
        document.getElementById('attendanceStudentsList').innerHTML = '';
        document.getElementById('saveAttendanceBtn').style.display = 'none';
        return;
    }
    
    const students = getData('students').filter(s => s.class === className);
    const container = document.getElementById('attendanceStudentsList');
    container.innerHTML = '<h3>Mark Attendance</h3>';
    
    students.forEach(student => {
        const item = document.createElement('div');
        item.className = 'attendance-item';
        item.innerHTML = `
            <span><strong>${student.name}</strong> (${student.rollNumber})</span>
            <div class="attendance-toggle">
                <button class="toggle-btn present" onclick="markStatus(${student.id}, 'present', this)">Present</button>
                <button class="toggle-btn" onclick="markStatus(${student.id}, 'absent', this)">Absent</button>
            </div>
        `;
        container.appendChild(item);
    });
    
    document.getElementById('saveAttendanceBtn').style.display = 'block';
}

let attendanceData = {};

function markStatus(studentId, status, btn) {
    const buttons = btn.parentElement.querySelectorAll('.toggle-btn');
    buttons.forEach(b => {
        b.classList.remove('present', 'absent');
    });
    btn.classList.add(status);
    attendanceData[studentId] = status;
}

function saveAttendance() {
    const className = document.getElementById('teacherClassSelect').value;
    const date = document.getElementById('attendanceDate').value;
    const students = getData('students');
    const attendance = getData('attendance');
    
    Object.keys(attendanceData).forEach(studentId => {
        const student = students.find(s => s.id === parseInt(studentId));
        if (student) {
            // Check if attendance already exists
            const existingIndex = attendance.findIndex(a => 
                a.studentId === parseInt(studentId) && a.date === date
            );
            
            const record = {
                id: Date.now() + Math.random(),
                studentId: parseInt(studentId),
                studentName: student.name,
                className: className,
                date: date,
                status: attendanceData[studentId]
            };
            
            if (existingIndex >= 0) {
                attendance[existingIndex] = record;
            } else {
                attendance.push(record);
            }
        }
    });
    
    saveData('attendance', attendance);
    alert('Attendance saved successfully!');
    attendanceData = {};
    loadStudentsForAttendance();
}

function loadTeacherHistorySection() {
    const teachers = getData('teachers');
    const select = document.getElementById('historyClassFilter');
    select.innerHTML = '<option value="">Select Class</option>';
    
    teachers.forEach(teacher => {
        select.innerHTML += `<option value="${teacher.assignedClass}">${teacher.assignedClass}</option>`;
    });
}

function loadTeacherHistory() {
    const className = document.getElementById('historyClassFilter').value;
    const date = document.getElementById('historyDateFilter').value;
    
    if (!className) return;
    
    let attendance = getData('attendance').filter(a => a.className === className);
    if (date) {
        attendance = attendance.filter(a => a.date === date);
    }
    
    const tbody = document.getElementById('historyTableBody');
    tbody.innerHTML = '';
    
    attendance.forEach(record => {
        const row = `
            <tr>
                <td>${record.date}</td>
                <td>${record.studentName}</td>
                <td><span style="color: ${record.status === 'present' ? '#2ecc71' : '#e74c3c'}">${record.status.toUpperCase()}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
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
