const db = require('./config/db');

async function testConnection() {
    console.log('=== Testing Database Connection ===\n');
    
    try {
        // Test basic connection
        console.log('1. Testing basic connection...');
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('   ✓ Connection successful!');
        console.log('   Test query result:', rows[0].result);
        
        // Check current database
        console.log('\n2. Checking current database...');
        const [currentDb] = await db.query('SELECT DATABASE() as db_name');
        console.log('   Current database:', currentDb[0].db_name || 'NONE');
        
        // List all databases
        console.log('\n3. Available databases:');
        const [databases] = await db.query('SHOW DATABASES');
        databases.forEach(db => {
            const dbName = db.Database;
            if (dbName === 'attendance_system') {
                console.log('   ✓', dbName, '(TARGET DATABASE)');
            } else {
                console.log('   -', dbName);
            }
        });
        
        // Check if attendance_system exists
        const hasAttendanceDb = databases.some(db => db.Database === 'attendance_system');
        
        if (!hasAttendanceDb) {
            console.log('\n   ⚠ WARNING: attendance_system database not found!');
            console.log('   Please import schema.sql first.');
            process.exit(1);
        }
        
        // List tables in attendance_system
        console.log('\n4. Tables in attendance_system:');
        const [tables] = await db.query('SHOW TABLES FROM attendance_system');
        if (tables.length === 0) {
            console.log('   ⚠ No tables found! Please import schema.sql');
        } else {
            tables.forEach(table => {
                console.log('   ✓', Object.values(table)[0]);
            });
            console.log(`   Total: ${tables.length} tables`);
        }
        
        // Check for data
        console.log('\n5. Checking for existing data:');
        const [userCount] = await db.query('SELECT COUNT(*) as count FROM attendance_system.users');
        const [teacherCount] = await db.query('SELECT COUNT(*) as count FROM attendance_system.teachers');
        const [studentCount] = await db.query('SELECT COUNT(*) as count FROM attendance_system.students');
        const [classCount] = await db.query('SELECT COUNT(*) as count FROM attendance_system.classes');
        const [subjectCount] = await db.query('SELECT COUNT(*) as count FROM attendance_system.subjects');
        
        console.log('   Users:', userCount[0].count);
        console.log('   Teachers:', teacherCount[0].count);
        console.log('   Students:', studentCount[0].count);
        console.log('   Classes:', classCount[0].count);
        console.log('   Subjects:', subjectCount[0].count);
        
        // Show recent teachers
        if (teacherCount[0].count > 0) {
            console.log('\n6. Recent teachers:');
            const [teachers] = await db.query(`
                SELECT t.id, t.teacherId, u.name, u.email, t.created_at
                FROM attendance_system.teachers t
                JOIN attendance_system.users u ON t.userId = u.id
                ORDER BY t.created_at DESC
                LIMIT 5
            `);
            teachers.forEach(teacher => {
                console.log(`   - ${teacher.name} (${teacher.teacherId}) - ${teacher.email}`);
            });
        }
        
        console.log('\n=== ✓ ALL CHECKS PASSED ===');
        console.log('Your database is properly configured and connected!');
        
        process.exit(0);
        
    } catch (error) {
        console.error('\n=== ✗ CONNECTION FAILED ===');
        console.error('Error:', error.message);
        console.error('\nPossible issues:');
        console.error('1. MySQL is not running (check XAMPP/WAMP)');
        console.error('2. Wrong credentials in .env file');
        console.error('3. Database "attendance_system" does not exist');
        console.error('4. Port 3306 is blocked or in use');
        console.error('\nCheck your .env file:');
        console.error('   DB_HOST=localhost');
        console.error('   DB_USER=root');
        console.error('   DB_PASSWORD= (empty for XAMPP)');
        console.error('   DB_NAME=attendance_system');
        
        process.exit(1);
    }
}

testConnection();
