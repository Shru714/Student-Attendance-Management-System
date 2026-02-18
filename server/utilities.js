/**
 * CONSOLIDATED UTILITY SCRIPTS
 * Student Attendance Management System
 * 
 * This file contains all utility and test scripts consolidated.
 * Run specific functions using: node utilities.js <function-name>
 */

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'attendance_system'
};

// ============================================
// 1. TEST DATABASE CONNECTION
// ============================================
async function testConnection() {
  console.log('🔄 Testing database connection...\n');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected successfully!');
    
    const [dbName] = await connection.query('SELECT DATABASE() as db_name');
    console.log(`   Database: ${dbName[0].db_name}`);
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   User: ${dbConfig.user}`);
    
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`   Tables: ${tables.length} tables found\n`);
    
    // Get data counts
    const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
    const [teachers] = await connection.query('SELECT COUNT(*) as count FROM teachers');
    const [students] = await connection.query('SELECT COUNT(*) as count FROM students');
    const [classes] = await connection.query('SELECT COUNT(*) as count FROM classes');
    
    console.log('📈 Current Data:');
    console.log(`   Users: ${users[0].count}`);
    console.log(`   Teachers: ${teachers[0].count}`);
    console.log(`   Students: ${students[0].count}`);
    console.log(`   Classes: ${classes[0].count}`);
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('   Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if MySQL is running (XAMPP/WAMP)');
    console.error('   2. Verify database credentials');
    console.error('   3. Ensure database "attendance_system" exists');
    process.exit(1);
  }
}

// ============================================
// 2. CREATE ADMIN USER
// ============================================
async function createAdmin() {
  console.log('🔧 Creating Admin User...\n');
  
  const adminData = {
    name: 'System Administrator',
    email: 'admin@example.com',
    password: 'Admin@143',
    role: 'admin',
    phone: '1234567890',
    address: 'Admin Office'
  };
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Check if admin exists
    const [existing] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [adminData.email]
    );
    
    if (existing.length > 0) {
      console.log('⚠️  Admin user already exists!');
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Created: ${existing[0].created_at}`);
      console.log('\n💡 To reset password, use: node utilities.js resetAdminPassword');
      await connection.end();
      process.exit(0);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    
    // Insert admin
    await connection.query(
      'INSERT INTO users (name, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
      [adminData.name, adminData.email, hashedPassword, adminData.role, adminData.phone, adminData.address]
    );
    
    console.log('✅ Admin user created successfully!\n');
    console.log('📋 Login Credentials:');
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Password: ${adminData.password}`);
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

// ============================================
// 3. RESET ADMIN PASSWORD
// ============================================
async function resetAdminPassword() {
  console.log('🔧 Resetting Admin Password...\n');
  
  const newPassword = 'Admin@143';
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await connection.query(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, 'admin@example.com']
    );
    
    console.log('✅ Admin password reset successfully!\n');
    console.log('📋 New Credentials:');
    console.log('   Email: admin@example.com');
    console.log(`   Password: ${newPassword}`);
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting password:', error.message);
    process.exit(1);
  }
}

// ============================================
// 4. CHECK TEACHER IDs
// ============================================
async function checkTeacherIds() {
  console.log('📋 Checking existing teacher IDs...\n');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [teachers] = await connection.query(`
      SELECT t.id, t.teacher_id, t.contact_no, t.phone, u.name, u.email
      FROM teachers t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.teacher_id
    `);
    
    if (teachers.length === 0) {
      console.log('No teachers found in database.');
    } else {
      console.log(`Found ${teachers.length} teacher(s):\n`);
      console.log('ID | Teacher ID | Name                | Email');
      console.log('---|------------|---------------------|------------------------');
      
      teachers.forEach(t => {
        console.log(`${t.id.toString().padEnd(2)} | ${t.teacher_id.padEnd(10)} | ${t.name.padEnd(19)} | ${t.email}`);
      });
    }
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// ============================================
// 5. CHECK DATABASE SCHEMA
// ============================================
async function checkSchema() {
  console.log('🔍 Checking database schema...\n');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`Found ${tables.length} tables:\n`);
    
    for (const table of tables) {
      const tableName = Object.values(table)[0];
      const [columns] = await connection.query(`DESCRIBE ${tableName}`);
      
      console.log(`\n📊 Table: ${tableName}`);
      console.log('   Columns:');
      columns.forEach(col => {
        console.log(`   - ${col.Field} (${col.Type}) ${col.Key ? '[' + col.Key + ']' : ''}`);
      });
    }
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// ============================================
// 6. CHECK DATA COUNTS
// ============================================
async function checkData() {
  console.log('📊 Checking data in all tables...\n');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const tables = [
      'users', 'teachers', 'students', 'classes', 'subjects',
      'teacher_years', 'teacher_classes', 'teacher_subjects',
      'teacher_assignments', 'attendance', 'notifications'
    ];
    
    for (const table of tables) {
      try {
        const [result] = await connection.query(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`${table.padEnd(20)}: ${result[0].count} records`);
      } catch (err) {
        console.log(`${table.padEnd(20)}: Table not found`);
      }
    }
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// ============================================
// 7. DIAGNOSE SYSTEM
// ============================================
async function diagnose() {
  console.log('🔍 Running System Diagnostics...\n');
  console.log('='.repeat(50));
  
  // Check Node.js version
  console.log('\n1. Node.js Version:');
  console.log(`   ${process.version}`);
  
  // Check database connection
  console.log('\n2. Database Connection:');
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('   ✅ Connected');
    
    const [dbName] = await connection.query('SELECT DATABASE() as db_name');
    console.log(`   Database: ${dbName[0].db_name}`);
    
    await connection.end();
  } catch (error) {
    console.log('   ❌ Failed:', error.message);
  }
  
  // Check tables
  console.log('\n3. Database Tables:');
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`   ✅ ${tables.length} tables found`);
    await connection.end();
  } catch (error) {
    console.log('   ❌ Failed:', error.message);
  }
  
  // Check admin user
  console.log('\n4. Admin User:');
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [admin] = await connection.query('SELECT * FROM users WHERE role = "admin"');
    if (admin.length > 0) {
      console.log(`   ✅ Found (${admin[0].email})`);
    } else {
      console.log('   ⚠️  No admin user found');
    }
    await connection.end();
  } catch (error) {
    console.log('   ❌ Failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ Diagnostics complete!\n');
  process.exit(0);
}

// ============================================
// 8. TEST PASSWORD HASHING
// ============================================
async function testPassword() {
  console.log('🔐 Testing Password Hashing...\n');
  
  const password = 'Admin@143';
  
  try {
    // Generate hash
    const hash = await bcrypt.hash(password, 10);
    console.log('Password:', password);
    console.log('Generated Hash:', hash);
    
    // Test comparison
    const isMatch = await bcrypt.compare(password, hash);
    console.log('Hash matches:', isMatch ? '✅ Yes' : '❌ No');
    
    // Test against the hash in SQL file
    const sqlHash = '$2a$10$ZHVFgKDbP8x1pk.1uemMw.dgBsohvQWY14di85wSb7sq4yTj6xrra';
    const sqlMatch = await bcrypt.compare(password, sqlHash);
    console.log('\nSQL Hash Test:');
    console.log('Password:', password);
    console.log('SQL Hash:', sqlHash);
    console.log('Matches:', sqlMatch ? '✅ Yes' : '❌ No');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// ============================================
// 9. CHECK NOTIFICATIONS SCHEMA
// ============================================
async function checkNotificationsSchema() {
  console.log('📋 Checking notifications table schema...\n');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [cols] = await connection.query('DESCRIBE notifications');
    
    console.log('notifications columns:');
    cols.forEach(c => console.log(`  - ${c.Field} (${c.Type})`));
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// ============================================
// 10. CHECK TEACHERS TABLE
// ============================================
async function checkTeachersTable() {
  console.log('============================================');
  console.log('Checking teachers table structure');
  console.log('============================================\n');

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Show all columns
    const [columns] = await connection.query('SHOW COLUMNS FROM teachers');
    
    console.log('Current columns in teachers table:');
    columns.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type})`);
    });
    
    console.log('\n============================================');
    
    // Check if phone column exists
    const hasPhone = columns.some(col => col.Field === 'phone');
    
    if (hasPhone) {
      console.log('✅ Phone column EXISTS');
    } else {
      console.log('❌ Phone column MISSING');
      console.log('\nAdding phone column now...');
      await connection.query('ALTER TABLE teachers ADD COLUMN phone VARCHAR(15) AFTER contact_no');
      console.log('✅ Phone column added!');
    }
    
    console.log('============================================\n');
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

// ============================================
// 11. CHECK USERS SCHEMA
// ============================================
async function checkUsersSchema() {
  console.log('📋 Checking users table schema...\n');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [columns] = await connection.query('DESCRIBE users');
    console.log('Columns in users table:');
    columns.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type}) ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    
    console.log('\nChecking if phone column exists...');
    const phoneColumn = columns.find(col => col.Field === 'phone');
    if (phoneColumn) {
      console.log('✅ phone column EXISTS');
    } else {
      console.log('❌ phone column DOES NOT EXIST');
      console.log('\nNote: Phone column is not required in users table.');
      console.log('Contact information is stored in teachers/students tables.');
    }
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// ============================================
// 12. TEST TEACHER FETCH
// ============================================
async function testTeacherFetch() {
  console.log('🧪 Testing Teacher Data Fetch\n');
  console.log('='.repeat(60));
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Test database connection
    console.log('\n1. Testing database connection...');
    const [result] = await connection.query('SELECT 1 + 1 AS result');
    console.log('   ✅ Database connected');
    
    // Fetch all teachers
    console.log('\n2. Fetching all teachers...');
    const [teachers] = await connection.query(`
      SELECT t.*, u.name, u.email
      FROM teachers t
      JOIN users u ON t.user_id = u.id
    `);
    console.log(`   ✅ Found ${teachers.length} teachers\n`);
    
    if (teachers.length === 0) {
      console.log('   ⚠️  No teachers found in database!');
      console.log('   Run: manage.bat → Option 2 to import teacher data');
      await connection.end();
      process.exit(1);
    }
    
    // Display teacher details
    console.log('='.repeat(60));
    console.log('TEACHER DETAILS:');
    console.log('='.repeat(60));
    
    teachers.forEach((teacher, index) => {
      console.log(`\n${index + 1}. ${teacher.name}`);
      console.log(`   ID: ${teacher.id}`);
      console.log(`   Teacher ID: ${teacher.teacher_id}`);
      console.log(`   Email: ${teacher.email}`);
      console.log(`   Contact: ${teacher.contact_no}`);
      console.log(`   User ID: ${teacher.user_id}`);
    });
    
    // Check for email field
    console.log('\n' + '='.repeat(60));
    console.log('EMAIL FIELD CHECK:');
    console.log('='.repeat(60));
    
    const allHaveEmail = teachers.every(t => t.email);
    if (allHaveEmail) {
      console.log('✅ All teachers have email field');
    } else {
      console.log('❌ Some teachers missing email field!');
      teachers.forEach((t, i) => {
        if (!t.email) {
          console.log(`   Teacher ${i + 1} (${t.name}): NO EMAIL`);
        }
      });
    }
    
    // Get teacher assignments
    console.log('\n' + '='.repeat(60));
    console.log('TEACHER ASSIGNMENTS:');
    console.log('='.repeat(60));
    
    for (const teacher of teachers) {
      const [years] = await connection.query(
        'SELECT year FROM teacher_years WHERE teacher_id = ?',
        [teacher.id]
      );
      const [classes] = await connection.query(
        'SELECT * FROM teacher_classes WHERE teacher_id = ?',
        [teacher.id]
      );
      const [subjects] = await connection.query(
        'SELECT * FROM teacher_subjects WHERE teacher_id = ?',
        [teacher.id]
      );
      
      console.log(`\n${teacher.name} (${teacher.email}):`);
      console.log(`   Years: ${years.map(y => y.year).join(', ') || 'None'}`);
      console.log(`   Classes: ${classes.length} assigned`);
      console.log(`   Subjects: ${subjects.length} assigned`);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ TEST COMPLETE - All teachers can be fetched!');
    console.log('='.repeat(60));
    
    await connection.end();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

// ============================================
// MAIN FUNCTION
// ============================================
async function main() {
  const command = process.argv[2];
  
  if (!command) {
    console.log('📚 Available Commands:\n');
    console.log('  node utilities.js testConnection           - Test database connection');
    console.log('  node utilities.js createAdmin              - Create admin user');
    console.log('  node utilities.js resetAdminPassword       - Reset admin password');
    console.log('  node utilities.js checkTeacherIds          - List all teacher IDs');
    console.log('  node utilities.js checkSchema              - Show database schema');
    console.log('  node utilities.js checkData                - Show data counts');
    console.log('  node utilities.js diagnose                 - Run system diagnostics');
    console.log('  node utilities.js testPassword             - Test password hashing');
    console.log('  node utilities.js checkNotificationsSchema - Check notifications table');
    console.log('  node utilities.js checkTeachersTable       - Check teachers table');
    console.log('  node utilities.js checkUsersSchema         - Check users table');
    console.log('  node utilities.js testTeacherFetch         - Test teacher data fetch');
    console.log('\nExample: node utilities.js testConnection\n');
    process.exit(0);
  }
  
  const commands = {
    testConnection,
    createAdmin,
    resetAdminPassword,
    checkTeacherIds,
    checkSchema,
    checkData,
    diagnose,
    testPassword,
    checkNotificationsSchema,
    checkTeachersTable,
    checkUsersSchema,
    testTeacherFetch
  };
  
  if (commands[command]) {
    await commands[command]();
  } else {
    console.error(`❌ Unknown command: ${command}`);
    console.log('Run "node utilities.js" to see available commands.');
    process.exit(1);
  }
}

// Run main function
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = {
  testConnection,
  createAdmin,
  resetAdminPassword,
  checkTeacherIds,
  checkSchema,
  checkData,
  diagnose,
  testPassword,
  checkNotificationsSchema,
  checkTeachersTable,
  checkUsersSchema,
  testTeacherFetch
};
