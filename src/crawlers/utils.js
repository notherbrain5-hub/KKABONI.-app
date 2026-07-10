// src/crawlers/utils.js
// 공통 도우미 함수 모음 (정규식, 데이터 정제 등)

/**
 * 텍스트에서 숫자만 추출하여 반환합니다.
 */
export function extractNumbers(text) {
  if (!text) return 0;
  const match = text.match(/\d+/g);
  return match ? parseInt(match.join(''), 10) : 0;
}

/**
 * 리뷰나 콘텐츠가 광고성인지 필터링합니다. (단순 버전)
 */
export function isAdvertisement(content) {
  const excessivePraiseCount = (content.match(/너무|최고|완벽|친절|진짜/g) || []).length;
  if (excessivePraiseCount >= 4) {
    return true; // 광고 의심
  }
  return false;
}

/**
 * 공통 웹 데이터 Fetch (HTML 문서 가져오기)
 */
export async function fetchHtml(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.error("[Crawling Failed] 대상 사이트 접속 실패:", error);
    return null;
  }
}
