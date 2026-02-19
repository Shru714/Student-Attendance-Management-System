// Complete diagnostic for database save issues
const db = require('./server/config/db');
const bcrypt = require('bcryptjs');

async function diagnose() {
    console.log('\n' + '='.repeat(60));
    console.log('🔍 DIAGNOSING DATABASE SAVE ISSUE');
    console.log('='.repeat(60) + '\n');

    try {
        // Step 1: Test connection
        console.log('Step 1: Testing database connection...');
        const [testResult] = await db.query('SELECT 1 + 1 AS result');
        console.log('✅ Connection works! Result:', testResult[0].result);

        // Step 2: Check which database we're using
        console.log('\nStep 2: Checking current database...');
        const [currentDb] = await db.query('SELECT DATABASE() as db_name');
        console.log('📊 Current database:', currentDb[0].db_name);
        
        if (!currentDb[0].db_name) {
            console.log('❌ ERROR: No database selected!');
            console.log('   Fix: Update your .env file to include DB_NAME=attendance_system');
            process.exit(1);
        }

        // Step 3: Check if tables exist
        console.log('\nStep 3: Checking if tables exist...');
        const [tables] = await db.query('SHOW TABLES');
        console.log(`✅ Found ${tables.length} tables`);
        
        if (tables.length === 0) {
            console.log('❌ ERROR: No tables found!');
            console.log('   Fix: Import schema.sql file');
            process.exit(1);
        }

        // Step 4: Test INSERT into users table
        console.log('\nStep 4: Testing INSERT into users table...');
        const testEmail = `test_${Date.now()}@example.com`;
        const hashedPassword = await bcrypt.hash('test123', 10);
        
        const [insertResult] = await db.query(
            'INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
            ['Test User', testEmail, hashedPassword, 'teacher', '1234567890']
        );
        
        console.log('✅ INSERT successful! User ID:', insertResult.insertId);

        // Step 5: Verify the data was saved
        console.log('\nStep 5: Verifying data was saved...');
        const [users] = await db.query('SELECT * FROM users WHERE id = ?', [insertResult.insertId]);
        
        if (users.length > 0) {
            console.log('✅ Data verified in database!');
            console.log('   User:', users[0]);
        } else {
            console.log('❌ ERROR: Data not found after insert!');
        }

        // Step 6: Test INSERT into teachers table
        console.log('\nStep 6: Testing INSERT into teachers table...');
        const teacherId = `TCH_${Date.now()}`;
        
        const [teacherResult] = await db.query(
            'INSERT INTO teachers (userId, teacherId, contactNo) VALUES (?, ?, ?)',
            [insertResult.insertId, teacherId, '9876543210']
        );
        
        console.log('✅ Teacher INSERT successful! Teacher ID:', teacherResult.insertId);

        // Step 7: Verify teacher was saved
        console.log('\nStep 7: Verifying teacher was saved...');
        const [teachers] = await db.query('SELECT * FROM teachers WHERE id = ?', [teacherResult.insertId]);
        
        if (teachers.length > 0) {
            console.log('✅ Teacher verified in database!');
            console.log('   Teacher:', teachers[0]);
        } else {
            console.log('❌ ERROR: Teacher not found after insert!');
        }

        // Step 8: Check complete profile (as app does)
        console.log('\nStep 8: Testing JOIN query (as app does)...');
        const [profile] = await db.query(`
            SELECT t.*, u.name, u.email, u.phone
            FROM teachers t
            JOIN users u ON t.userId = u.id
            WHERE t.id = ?
        `, [teacherResult.insertId]);
        
        if (profile.length > 0) {
            console.log('✅ JOIN query works!');
            console.log('   Profile:', profile[0]);
        } else {
            console.log('❌ ERROR: JOIN query returned no results!');
        }

        // Step 9: Check all teachers
        console.log('\nStep 9: Getting all teachers (as admin panel does)...');
        const [allTeachers] = await db.query(`
            SELECT t.*, u.name, u.email, u.phone
            FROM teachers t
            JOIN users u ON t.userId = u.id
            ORDER BY t.created_at DESC
        `);
        
        console.log(`✅ Found ${allTeachers.length} total teachers`);
        console.log('\nAll teachers:');
        allTeachers.forEach((teacher, index) => {
            console.log(`   ${index + 1}. ${teacher.name} (${teacher.teacherId}) - ${teacher.email}`);
        });

        // Step 10: Clean up test data
        console.log('\nStep 10: Cleaning up test data...');
        await db.query('DELETE FROM teachers WHERE id = ?', [teacherResult.insertId]);
        await db.query('DELETE FROM users WHERE id = ?', [insertResult.insertId]);
        console.log('✅ Test data cleaned up');

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('✅ ALL TESTS PASSED!');
        console.log('='.repeat(60));
        console.log('\nYour database is working correctly!');
        console.log('\nIf teachers are not showing in your app:');
        console.log('1. Check if you\'re looking at the correct database in phpMyAdmin');
        console.log('2. Refresh phpMyAdmin page after creating data');
        console.log('3. Check server console for errors when creating teachers');
        console.log('4. Make sure your app is using the same database');
        console.log('\n');

    } catch (error) {
        console.error('\n' + '='.repeat(60));
        console.error('❌ ERROR DETECTED!');
        console.error('='.repeat(60));
        console.error('\nError:', error.message);
        console.error('\nError Code:', error.code);
        console.error('\nSQL State:', error.sqlState);
        
        if (error.code === 'ER_NO_DB_ERROR') {
            console.error('\n🔧 FIX: Database does not exist');
            console.error('   Run: mysql -u root -p < server/database/schema.sql');
        } else if (error.code === 'ER_NO_SUCH_TABLE') {
            console.error('\n🔧 FIX: Table does not exist');
            console.error('   Import schema.sql to create tables');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('\n🔧 FIX: Cannot connect to MySQL');
            console.error('   1. Start MySQL in XAMPP/WAMP');
            console.error('   2. Check .env file credentials');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n🔧 FIX: Wrong username or password');
            console.error('   Update .env file with correct credentials');
        }
        
        console.error('\n');
    } finally {
        await db.end();
    }
}

// Run diagnosis
diagnose();
