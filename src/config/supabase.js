// Supabase DB 연결 전용 (이외의 로직 포함 금지)
// 스키마: wedding_halls (id, name, base_price, hidden_cost, created_at)

export const supabaseConfig = {
  url: "https://your-project-id.supabase.co",
  key: "your-anon-key"
};

// 실제 DB 연동 시 아래 주석 해제 및 Supabase JS SDK 활용
/*
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(supabaseConfig.url, supabaseConfig.key);
*/
