// src/config/supabase.js
// Supabase 초기화 및 연결 로직 담당

const SUPABASE_URL = 'https://cijtcujmjdmliretmrkk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpanRjdWptamRtbGlyZXRtcmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NDc2ODksImV4cCI6MjA5OTIyMzY4OX0.g0eJYH-OoSwQNk2qbFeSwsdeSFaSZrM_2loKZTIXVjg';

let supabaseClient = null;

if (window.supabase) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch(e) {
    console.error("Supabase 초기화 실패: 키가 유효하지 않습니다.", e);
  }
} else {
  console.error("Supabase 라이브러리를 찾을 수 없습니다. index.html에 CDN이 추가되었는지 확인하세요.");
}

export { supabaseClient, SUPABASE_URL };
