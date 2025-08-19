// Test script to check database connection and tables
const { createClient } = require('@supabase/supabase-js');

// Manual environment variables (from your .env file)
const supabaseUrl = 'https://shajcapyndghdmjpdzex.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoYWpjYXB5bmRnaGRtanBkemV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1MjE0MzMsImV4cCI6MjA0MjA5NzQzM30.xtdfOikcVmuI9uI640QSeRBIZUFQSpTvSuV14ZxTFvA';

console.log('🔍 Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n📊 Testing basic connection...');
    const { data, error } = await supabase.from('workouts').select('count(*)', { count: 'exact' });
    
    if (error) {
      console.error('❌ Database Error:', error.message);
      console.error('Details:', error.details);
      console.error('Code:', error.code);
      
      // Try to get table info
      console.log('\n🔍 Checking available tables...');
      const { data: tables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
      
      if (tablesError) {
        console.error('Cannot access table information:', tablesError.message);
      } else {
        console.log('Available tables:', tables?.map(t => t.table_name) || 'None found');
      }
    } else {
      console.log('✅ Connection successful!');
      console.log('Workouts count:', data);
      
      // Try to fetch actual workouts
      console.log('\n📋 Fetching workouts...');
      const { data: workouts, error: workoutsError } = await supabase
        .from('workouts')
        .select('*')
        .limit(5);
      
      if (workoutsError) {
        console.error('❌ Error fetching workouts:', workoutsError.message);
      } else {
        console.log('✅ Sample workouts:', workouts);
      }
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testConnection();