import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xywevilqwfxfvpelfbam.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5d2V2aWxxd2Z4ZnZwZWxmYmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NDA5ODYsImV4cCI6MjA5MDIxNjk4Nn0.0_3ciY2WQ_3-H4G-djFgaj9tLF8ycRY-lohwuNg-pQA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);