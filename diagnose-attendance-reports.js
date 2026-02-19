// Diagnostic script for attendance reports issue
// Run this in the browser console to check data and function availability

console.log('=== ATTENDANCE REPORTS DIAGNOSTIC ===');

// Check if demo data exists
function checkDemoData() {
    console.log('\n1. CHECKING DEMO DATA:');
    
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
    const attendance = JSON.parse(localStorage.getItem('attendance') || '[]');
    
    console.log('Students:', students.length, students.length > 0 ? '✅' : '❌');
    console.log('Classes:', classes.length, classes.length > 0 ? '✅' : '❌');
    console.log('Attendance:', attendance.length, attendance.length > 0 ? '✅' : '❌');
    
    if (students.length > 0) {
        console.log('Sample student:', students[0]);
    }
    
    if (attendance.length > 0) {
        console.log('Sample attendance:', attendance[0]);
        
        // Check attendance data structure
        const firstRecord = attendance[0];
        const hasRequiredFields = firstRecord.studentId && firstRecord.date && firstRecord.status;
        console.log('Attendance data structure valid:', hasRequiredFields ? '✅' : '❌');
        
        // Check student IDs match
        const studentIds = students.map(s => s.id);
        const attendanceStudentIds = [...new Set(attendance.map(a => a.studentId))];
        console.log('Student IDs in students:', studentIds);
        console.log('Student IDs in attendance:', attendanceStudentIds);
        
        const hasMatchingIds = attendanceStudentIds.some(id => studentIds.includes(id));
        console.log('Student IDs match between tables:', hasMatchingIds ? '✅' : '❌');
    }
    
    return { students, classes, attendance };
}

// Check if functions exist
function checkFunctions() {
    console.log('\n2. CHECKING FUNCTIONS:');
    
    const functions = [
        'loadAttendanceReports',
        'loadStudentReport', 
        'loadDateReport',
        'switchReportTab'
    ];
    
    functions.forEach(funcName => {
        const exists = typeof window[funcName] === 'function';
        console.log(`${funcName}:`, exists ? '✅' : '❌');
    });
}

// Check DOM elements
function checkDOMElements() {
    console.log('\n3. CHECKING DOM ELEMENTS:');
    
    const elements = [
        'adminReportsSection',
        'studentReportFilter',
        'studentReportTableBody',
        'studentReportStats',
        'dateReportDate',
        'dateReportTableBody'
    ];
    
    elements.forEach(elementId => {
        const exists = document.getElementById(elementId) !== null;
        console.log(`#${elementId}:`, exists ? '✅' : '❌');
    });
}

// Test the loadStudentReport function
function testStudentReport() {
    console.log('\n4. TESTING STUDENT REPORT:');
    
    const data = checkDemoData();
    
    if (data.students.length === 0) {
        console.log('❌ No students found. Load demo data first.');
        return;
    }
    
    if (data.attendance.length === 0) {
        console.log('❌ No attendance records found. Load demo data first.');
        return;
    }
    
    // Test with first student
    const firstStudent = data.students[0];
    console.log('Testing with student:', firstStudent.student_name, 'ID:', firstStudent.id);
    
    // Check if student has attendance records
    const studentAttendance = data.attendance.filter(a => parseInt(a.studentId) === firstStudent.id);
    console.log('Student attendance records:', studentAttendance.length);
    
    if (studentAttendance.length > 0) {
        console.log('✅ Student has attendance records');
        console.log('Sample record:', studentAttendance[0]);
    } else {
        console.log('❌ Student has no attendance records');
        
        // Show all student IDs in attendance
        const allStudentIds = [...new Set(data.attendance.map(a => a.studentId))];
        console.log('Student IDs with attendance:', allStudentIds);
        console.log('Available students:', data.students.map(s => ({ id: s.id, name: s.student_name })));
    }
}

// Run all diagnostics
function runDiagnostics() {
    checkDemoData();
    checkFunctions();
    checkDOMElements();
    testStudentReport();
    
    console.log('\n=== DIAGNOSTIC COMPLETE ===');
    console.log('If all checks show ✅, the attendance reports should work.');
    console.log('If any show ❌, that indicates the issue.');
}

// Auto-run diagnostics
runDiagnostics();

// Export functions for manual testing
window.attendanceDiagnostics = {
    checkDemoData,
    checkFunctions,
    checkDOMElements,
    testStudentReport,
    runDiagnostics
};

console.log('\nDiagnostic functions available as window.attendanceDiagnostics');