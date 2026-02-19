// Test Teacher Creation Script
// Run this to test if teacher creation works

const db = require('./server/config/db');
const bcrypt = require('bcryptjs');

async function testTeacherCreation() {
    console.log('=== Testing Teacher Creation ===\n');

    try {
        // Step 1: Create user
        console.log('Step 1: Creating user...');
        const hashedPassword = await bcrypt.hash('teacher123', 10);
        const [userResult] = await db.query(
            'INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
            ['Test Teacher', 'test.teacher@example.com', hashedPassword, 'teacher', '1234567890']
        );
        const userId = userResult.insertId;
        console.log('✓ User created with ID:', userId);

        // Step 2: Create teacher record
        console.log('\nStep 2: Creating teacher record...');
        const [teacherResult] = await db.query(
            'INSERT INTO teachers (userId, teacherId, contactNo) VALUES (?, ?, ?)',
            [userId, 'TCH001', '9876543210']
        );
        const teacherId = teacherResult.insertId;
        console.log('✓ Teacher created with ID:', teacherId);

        // Step 3: Verify user exists
        console.log('\nStep 3: Verifying user...');
        const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        console.log('User:', users[0]);

        // Step 4: Verify teacher exists
        console.log('\nStep 4: Verifying teacher...');
        const [teachers] = await db.query('SELECT * FROM teachers WHERE id = ?', [teacherId]);
        console.log('Teacher:', teachers[0]);

        // Step 5: Get complete profile (as the app does)
        console.log('\nStep 5: Getting complete profile...');
        const [profile] = await db.query(`
            SELECT t.*, u.name, u.email, u.phone, u.address
            FROM teachers t
            JOIN users u ON t.userId = u.id
            WHERE t.id = ?
        `, [teacherId]);
        console.log('Complete Profile:', profile[0]);

        // Step 6: Get all teachers (as admin panel does)
        console.log('\nStep 6: Getting all teachers...');
        const [allTeachers] = await db.query(`
            SELECT t.*, u.name, u.email, u.phone, u.address
            FROM teachers t
            JOIN users u ON t.userId = u.id
        `);
        console.log('Total teachers found:', allTeachers.length);
        console.log('Teachers:', allTeachers);

        console.log('\n=== SUCCESS! Teacher creation works correctly ===');

    } catch (error) {
        console.error('\n=== ERROR ===');
        console.error('Error details:', error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            console.error('\nThis email or teacher ID already exists!');
            console.error('Try changing the email or teacherId in the script.');
        }
    } finally {
        await db.end();
    }
}

// Run the test
testTeacherCreation();
