// src/crawlers/hallCrawler.js
// 웨딩홀 전용 크롤러

import { fetchHtml } from './utils.js';

export async function fetchHallData(url) {
  return await fetchHtml(url);
}

export function parseHallHiddenCosts(rawData) {
  if (!rawData) return { expectedHiddenCost: 0, foundKeywords: [] };
  
  let expectedHiddenCost = 0;
  let foundKeywords = [];
  
  // 웨딩홀 특화 숨겨진 추가금 키워드 정규식
  const keywordMap = [
    { regex: /대관료\s*외\s*별도/g, cost: 2000000, name: "대관료 외 부대비용" },
    { regex: /꽃장식\s*추가\s*필수/g, cost: 1200000, name: "꽃장식 필수 추가" },
    { regex: /음향\s*연출비/g, cost: 300000, name: "음향 연출비" },
    { regex: /폐백실\s*수모비/g, cost: 100000, name: "폐백실 수모비" },
    { regex: /식대\s*음주류\s*별도/g, cost: 500000, name: "음주류 별도 정산" }
  ];

  keywordMap.forEach(item => {
    if (item.regex.test(rawData)) {
      expectedHiddenCost += item.cost;
      foundKeywords.push(item.name);
    }
  });

  return { expectedHiddenCost, foundKeywords };
}
