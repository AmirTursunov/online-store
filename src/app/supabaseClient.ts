import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tnknuoqpsqazddkdrnfe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua251b3Fwc3FhemRka2RybmZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDUxODgsImV4cCI6MjA1OTc4MTE4OH0.vIhaJqLkD0oIQPqfEKd7o4WEb61QyIxFSOf5i2UvhBA";
export const supabase = createClient(supabaseUrl, supabaseKey);
