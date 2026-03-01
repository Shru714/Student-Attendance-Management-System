// QR CODE ATTENDANCE SYSTEM
// ============================================

// Initialize QR code storage
function initQRStorage() {
    if (!localStorage.getItem('qrSessions')) {
        localStorage.setItem('qrSessions', JSON.stringify([]));
    }
    if (!localStorage.getItem('qrScans')) {
        localStorage.setItem('qrScans', JSON.stringify([]));
    }
}

// Encryption key (in production, use environment variable)
const QR_ENCRYPTION_KEY = 'AttendanceSystem2026SecretKey';

// Show QR Generator Modal (Teacher/Admin)
function showQRGeneratorModal() {
    const classes = getData('classes') || [];
    const classSelect = document.getElementById('qrClassSelect');
    
    classSelect.innerHTML = '<option value="">Select Class</option>';
    classes.forEach(cls => {
        classSelect.innerHTML += `<option value="${cls.id}">${cls.className} - ${cls.class_section}</option>`;
    });
    
    // Set default date and time
    const now = new Date();
    document.getElementById('qrDate').value = now.toISOString().split('T')[0];
    document.getElementById('qrTime').value = now.toTimeString().slice(0, 5);
    
    // Hide QR display, show form
    document.getElementById('qrCodeDisplay').style.display = 'none';
    document.querySelector('#qrGeneratorModal form').style.display = 'block';
    
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('qrGeneratorModal').classList.add('active');
}

// Generate QR Code
function generateQRCode(event) {
    event.preventDefault();
    
    const classId = parseInt(document.getElementById('qrClassSelect').value);
    const date = document.getElementById('qrDate').value;
    const time = document.getElementById('qrTime').value;
    const duration = parseInt(document.getElementById('qrDuration').value);
    
    if (!classId || !date || !time) {
        alert('❌ Please fill all required fields');
        return;
    }
    
    // Create session
    const sessionId = 'QR' + Date.now();
    const expiresAt = new Date(`${date}T${time}`);
    expiresAt.setMinutes(expiresAt.getMinutes() + duration);
    
    const sessionData = {
        sessionId: sessionId,
        classId: classId,
        date: date,
        time: time,
        duration: duration,
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
        isActive: true,
        studentsScanned: []
    };
    
    // Save session
    const sessions = getData('qrSessions') || [];
    sessions.push(sessionData);
    saveData('qrSessions', sessions);
    
    // Create QR data
    const qrData = {
        sessionId: sessionId,
        classId: classId,
        date: date,
        time: time,
        expiresAt: expiresAt.toISOString()
    };
    
    // Encrypt QR data
    const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(qrData),
        QR_ENCRYPTION_KEY
    ).toString();
    
    // Clear previous QR code
    document.getElementById('qrCodeContainer').innerHTML = '';
    
    // Generate QR code
    new QRCode(document.getElementById('qrCodeContainer'), {
        text: encryptedData,
        width: 300,
        height: 300,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Update display
    document.getElementById('sessionIdDisplay').textContent = sessionId;
    document.getElementById('expiresAtDisplay').textContent = expiresAt.toLocaleString();
    document.getElementById('scannedCountDisplay').textContent = '0';
    
    // Hide form, show QR code
    document.querySelector('#qrGeneratorModal form').style.display = 'none';
    document.getElementById('qrCodeDisplay').style.display = 'block';
    
    // Start monitoring scans
    startScanMonitoring(sessionId);
    
    alert('✅ QR Code generated successfully!\n\nStudents can now scan to mark attendance.');
}

// Monitor scans in real-time
let scanMonitorInterval = null;
function startScanMonitoring(sessionId) {
    if (scanMonitorInterval) {
        clearInterval(scanMonitorInterval);
    }
    
    scanMonitorInterval = setInterval(() => {
        const scans = getData('qrScans') || [];
        const sessionScans = scans.filter(s => s.sessionId === sessionId);
        document.getElementById('scannedCountDisplay').textContent = sessionScans.length;
        
        // Check if session expired
        const sessions = getData('qrSessions') || [];
        const session = sessions.find(s => s.sessionId === sessionId);
        if (session && new Date(session.expiresAt) < new Date()) {
            clearInterval(scanMonitorInterval);
            alert('⏰ Session has expired!');
        }
    }, 2000); // Update every 2 seconds
}

// Close QR Session
function closeQRSession() {
    if (scanMonitorInterval) {
        clearInterval(scanMonitorInterval);
    }
    
    const sessionId = document.getElementById('sessionIdDisplay').textContent;
    
    // Mark session as inactive
    const sessions = getData('qrSessions') || [];
    const sessionIndex = sessions.findIndex(s => s.sessionId === sessionId);
    if (sessionIndex !== -1) {
        sessions[sessionIndex].isActive = false;
        saveData('qrSessions', sessions);
    }
    
    // Save attendance records
    const scans = getData('qrScans') || [];
    const sessionScans = scans.filter(s => s.sessionId === sessionId);
    
    if (sessionScans.length > 0) {
        const attendance = getData('attendance') || [];
        const session = sessions[sessionIndex];
        
        sessionScans.forEach(scan => {
            const student = getData('students').find(s => s.id === scan.studentId);
            if (student) {
                attendance.push({
                    id: Date.now() + Math.random(),
                    classId: session.classId,
                    studentId: scan.studentId,
                    studentName: student.student_name,
                    rollNumber: student.rollNumber,
                    date: session.date,
                    time: session.time,
                    status: 'present',
                    markedAt: scan.scannedAt,
                    method: 'qr_code'
                });
            }
        });
        
        saveData('attendance', attendance);
        alert(`✅ Session closed!\n\n${sessionScans.length} students marked present.`);
    } else {
        alert('ℹ️ Session closed. No students scanned.');
    }
    
    closeModal();
}

// Show QR Scanner Modal (Student)
let html5QrCode = null;
function showQRScannerModal() {
    const studentId = parseInt(localStorage.getItem('currentStudentId'));
    if (!studentId) {
        alert('❌ Please login as a student first!');
        return;
    }
    
    document.getElementById('scanResult').innerHTML = '';
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('qrScannerModal').classList.add('active');
    
    // Initialize scanner
    html5QrCode = new Html5Qrcode("qrReader");
    
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        onScanSuccess,
        onScanFailure
    ).catch(err => {
        console.error('Camera error:', err);
        document.getElementById('scanResult').innerHTML = `
            <div style="color: #e74c3c; padding: 20px; background: #fee; border-radius: 8px;">
                <h3>❌ Camera Access Error</h3>
                <p>${err}</p>
                <p style="margin-top: 10px;">Please allow camera access and try again.</p>
            </div>
        `;
    });
}

// On successful QR scan
function onScanSuccess(decodedText, decodedResult) {
    // Stop scanning
    if (html5QrCode) {
        html5QrCode.stop();
    }
    
    try {
        // Decrypt QR data
        const decryptedBytes = CryptoJS.AES.decrypt(decodedText, QR_ENCRYPTION_KEY);
        const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        
        // Validate session
        const sessions = getData('qrSessions') || [];
        const session = sessions.find(s => s.sessionId === decryptedData.sessionId);
        
        if (!session) {
            showScanError('Invalid QR code. Session not found.');
            return;
        }
        
        if (!session.isActive) {
            showScanError('This session has been closed by the teacher.');
            return;
        }
        
        if (new Date(session.expiresAt) < new Date()) {
            showScanError('This QR code has expired.');
            return;
        }
        
        // Check if student already scanned
        const scans = getData('qrScans') || [];
        const studentId = parseInt(localStorage.getItem('currentStudentId'));
        const alreadyScanned = scans.find(s => 
            s.sessionId === decryptedData.sessionId && s.studentId === studentId
        );
        
        if (alreadyScanned) {
            showScanError('You have already marked attendance for this session.');
            return;
        }
        
        // Verify student is in this class
        const students = getData('students') || [];
        const student = students.find(s => s.id === studentId);
        
        if (!student || student.classId !== session.classId) {
            showScanError('You are not enrolled in this class.');
            return;
        }
        
        // Record scan
        scans.push({
            id: Date.now(),
            sessionId: decryptedData.sessionId,
            studentId: studentId,
            studentName: student.student_name,
            rollNumber: student.rollNumber,
            scannedAt: new Date().toISOString()
        });
        saveData('qrScans', scans);
        
        // Show success
        document.getElementById('scanResult').innerHTML = `
            <div style="color: #27ae60; padding: 20px; background: #d5f4e6; border-radius: 8px;">
                <h3>✅ Attendance Marked Successfully!</h3>
                <p style="margin-top: 10px;"><strong>Name:</strong> ${student.student_name}</p>
                <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
                <p><strong>Date:</strong> ${session.date}</p>
                <p><strong>Time:</strong> ${session.time}</p>
                <p style="margin-top: 15px; font-size: 14px; opacity: 0.8;">
                    Your attendance has been recorded. You can close this window now.
                </p>
            </div>
        `;
        
    } catch (error) {
        console.error('Scan error:', error);
        showScanError('Invalid QR code format. Please try again.');
    }
}

// On scan failure
function onScanFailure(error) {
    // Ignore continuous scanning errors
}

// Show scan error
function showScanError(message) {
    document.getElementById('scanResult').innerHTML = `
        <div style="color: #e74c3c; padding: 20px; background: #fee; border-radius: 8px;">
            <h3>❌ Scan Failed</h3>
            <p style="margin-top: 10px;">${message}</p>
            <button class="btn btn-primary" onclick="retryScan()" style="margin-top: 15px;">
                🔄 Try Again
            </button>
        </div>
    `;
}

// Retry scan
function retryScan() {
    document.getElementById('scanResult').innerHTML = '';
    showQRScannerModal();
}

// Close QR Scanner
function closeQRScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode = null;
        }).catch(err => {
            console.error('Error stopping scanner:', err);
        });
    }
    
    if (scanMonitorInterval) {
        clearInterval(scanMonitorInterval);
    }
    
    document.getElementById('qrScannerModal').classList.remove('active');
    document.getElementById('modalOverlay').classList.remove('active');
}

// Initialize QR system on page load
initQRStorage();

console.log('✅ QR Code Attendance System initialized!');
