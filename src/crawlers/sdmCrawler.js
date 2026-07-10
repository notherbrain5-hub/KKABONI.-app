// src/crawlers/sdmCrawler.js
// 스드메(스튜디오/드레스/메이크업) 전용 크롤러

import { fetchHtml } from './utils.js';

export async function fetchSdmData(url) {
  return await fetchHtml(url);
}

export function parseSdmHiddenCosts(rawData) {
  if (!rawData) return { expectedHiddenCost: 0, foundKeywords: [] };
  
  let expectedHiddenCost = 0;
  let foundKeywords = [];
  
  // 스드메 특화 숨겨진 추가금 키워드 정규식
  const keywordMap = [
    { regex: /원본\s*(파일)?\s*(구매)?\s*필수/g, cost: 300000, name: "원본 구매 필수" },
    { regex: /헬퍼비\s*별도/g, cost: 250000, name: "헬퍼비 별도" },
    { regex: /피팅비/g, cost: 50000, name: "피팅비" },
    { regex: /수정본\s*별도/g, cost: 150000, name: "수정본 별도" },
    { regex: /얼리\s*스타트/g, cost: 100000, name: "얼리 스타트 비용" },
    { regex: /지정비/g, cost: 100000, name: "지정비 별도" },
    { regex: /혼주\s*메이크업\s*별도/g, cost: 200000, name: "혼주 메이크업 별도" }
  ];

  keywordMap.forEach(item => {
    if (item.regex.test(rawData)) {
      expectedHiddenCost += item.cost;
      foundKeywords.push(item.name);
    }
  });

  return { expectedHiddenCost, foundKeywords };
}
