// src/components/Dashboard.js
// 화면 렌더링을 담당하는 메인 UI 컴포넌트

import { supabaseClient } from '../config/supabase.js';

export async function fetchAndRenderWeddingHalls() {
  const container = document.getElementById('wedding-hall-list');
  if (!container) return;

  if (!supabaseClient) {
    container.innerHTML = `<div style="padding: 10px; background: #FEF2F2; border-radius: 8px; color: #DC2626; font-size: 14px; font-weight: 500;">🚨 [설정 필요] Supabase 클라이언트가 초기화되지 않았습니다.</div>`;
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from('wedding_halls')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      container.innerHTML = `<div style="padding: 10px; background: #F8FAFC; border-radius: 8px; color: #64748B; font-size: 14px;">불러올 데이터가 없습니다. Supabase에 테이블을 만들고 데이터를 추가해주세요.</div>`;
      return;
    }

    container.innerHTML = ''; // 기존 로딩 텍스트 제거
    data.forEach(hall => {
      const el = document.createElement('div');
      el.style.cssText = "padding: 15px; border: 1px solid #E2E8F0; border-radius: 8px; background: #F8FAFC; display: flex; justify-content: space-between; align-items: center;";
      
      const title = document.createElement('div');
      title.style.cssText = "font-weight: 700; color: #1E293B; font-size: 16px;";
      title.textContent = hall.name;
      
      const priceWrapper = document.createElement('div');
      priceWrapper.style.cssText = "text-align: right;";
      
      const base = document.createElement('div');
      base.style.cssText = "font-size: 13px; color: #64748B;";
      base.textContent = `기본가: ${Number(hall.base_price).toLocaleString()}원`;
      
      const hidden = document.createElement('div');
      hidden.style.cssText = "font-size: 13px; color: #EF4444; font-weight: 700;";
      hidden.textContent = `추가금: +${Number(hall.hidden_cost).toLocaleString()}원`;
      
      priceWrapper.appendChild(base);
      priceWrapper.appendChild(hidden);
      
      el.appendChild(title);
      el.appendChild(priceWrapper);
      
      container.appendChild(el);
    });

  } catch (error) {
    console.error("데이터 불러오기 실패:", error);
    container.innerHTML = `<div style="padding: 10px; background: #FEF2F2; border-radius: 8px; color: #DC2626; font-size: 14px;">데이터를 불러오는 중 오류가 발생했습니다: ${error.message}</div>`;
  }
}
