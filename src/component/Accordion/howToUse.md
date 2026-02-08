# Accordion

아코디언 컴포넌트입니다. 여러 섹션을 접고 펼칠 수 있으며, 하나만 열거나 여러 개를 동시에 열 수 있습니다.

## 사용 방법

### 기본 사용법

```tsx
import { Accordion } from "./Accordion";

function FAQ() {
  const faqItems = [
    {
      id: "1",
      title: "배송은 얼마나 걸리나요?",
      content: "일반적으로 주문 후 2-3일 내에 배송됩니다.",
    },
    {
      id: "2",
      title: "반품은 어떻게 하나요?",
      content: "상품 수령 후 7일 이내에 반품 신청이 가능합니다.",
    },
    {
      id: "3",
      title: "교환이 가능한가요?",
      content: "네, 상품 수령 후 7일 이내에 교환 신청이 가능합니다.",
    },
  ];

  return <Accordion items={faqItems} />;
}
```

## 예시 1: 여러 개 동시에 열기

```tsx
import { Accordion } from "./Accordion";

function MultipleOpenAccordion() {
  const items = [
    {
      id: "1",
      title: "섹션 1",
      content: "첫 번째 섹션의 내용입니다.",
    },
    {
      id: "2",
      title: "섹션 2",
      content: "두 번째 섹션의 내용입니다.",
    },
    {
      id: "3",
      title: "섹션 3",
      content: "세 번째 섹션의 내용입니다.",
    },
  ];

  return (
    <Accordion
      items={items}
      allowMultiple={true}
    />
  );
}
```

## 예시 2: 기본으로 열린 항목

```tsx
import { Accordion } from "./Accordion";

function DefaultOpenAccordion() {
  const items = [
    {
      id: "1",
      title: "소개",
      content: "저희 서비스를 소개합니다.",
      defaultOpen: true, // 기본으로 열림
    },
    {
      id: "2",
      title: "기능",
      content: "다양한 기능을 제공합니다.",
    },
    {
      id: "3",
      title: "가격",
      content: "합리적인 가격으로 제공됩니다.",
    },
  ];

  return <Accordion items={items} />;
}
```

## 예시 3: 복잡한 내용

```tsx
import { Accordion } from "./Accordion";

function ComplexAccordion() {
  const items = [
    {
      id: "1",
      title: "사용자 정보",
      content: (
        <div>
          <p><strong>이름:</strong> 홍길동</p>
          <p><strong>이메일:</strong> hong@example.com</p>
          <p><strong>가입일:</strong> 2024-01-01</p>
        </div>
      ),
    },
    {
      id: "2",
      title: "주문 내역",
      content: (
        <table>
          <thead>
            <tr>
              <th>주문번호</th>
              <th>상품명</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1234</td>
              <td>상품 A</td>
              <td>10,000원</td>
            </tr>
          </tbody>
        </table>
      ),
    },
  ];

  return <Accordion items={items} />;
}
```

## 예시 4: FAQ 페이지

```tsx
import { Accordion } from "./Accordion";

function FAQPage() {
  const generalFAQ = [
    {
      id: "g1",
      title: "서비스는 무료인가요?",
      content: "기본 기능은 무료이며, 프리미엄 기능은 유료입니다.",
    },
    {
      id: "g2",
      title: "계정은 어떻게 만드나요?",
      content: "상단의 '회원가입' 버튼을 클릭하여 계정을 만들 수 있습니다.",
    },
  ];

  const billingFAQ = [
    {
      id: "b1",
      title: "결제 방법은 무엇인가요?",
      content: "신용카드, 계좌이체, 간편결제를 지원합니다.",
    },
    {
      id: "b2",
      title: "환불은 가능한가요?",
      content: "구매 후 7일 이내에 환불 신청이 가능합니다.",
    },
  ];

  return (
    <div>
      <h2>일반 질문</h2>
      <Accordion items={generalFAQ} allowMultiple />

      <h2 style={{ marginTop: "40px" }}>결제 관련</h2>
      <Accordion items={billingFAQ} allowMultiple />
    </div>
  );
}
```

## 예시 5: 설정 패널

```tsx
import { Accordion } from "./Accordion";

function SettingsPanel() {
  const settings = [
    {
      id: "account",
      title: "계정 설정",
      content: (
        <div>
          <label>
            이메일
            <input type="email" defaultValue="user@example.com" />
          </label>
          <label>
            <input type="checkbox" defaultChecked />
            이메일 알림 받기
          </label>
        </div>
      ),
    },
    {
      id: "privacy",
      title: "개인정보 설정",
      content: (
        <div>
          <label>
            <input type="checkbox" />
            프로필 공개
          </label>
          <label>
            <input type="checkbox" defaultChecked />
            활동 내역 공개
          </label>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "알림 설정",
      content: (
        <div>
          <label>
            <input type="checkbox" defaultChecked />
            푸시 알림
          </label>
          <label>
            <input type="checkbox" />
            SMS 알림
          </label>
        </div>
      ),
    },
  ];

  return <Accordion items={settings} allowMultiple />;
}
```

## 예시 6: 제품 상세 정보

```tsx
import { Accordion } from "./Accordion";

function ProductDetails() {
  const details = [
    {
      id: "specs",
      title: "제품 사양",
      content: (
        <ul>
          <li>크기: 30 x 20 x 10 cm</li>
          <li>무게: 1.5kg</li>
          <li>재질: 스테인리스 스틸</li>
        </ul>
      ),
      defaultOpen: true,
    },
    {
      id: "shipping",
      title: "배송 정보",
      content: (
        <p>
          평일 오후 2시 이전 주문 시 당일 발송됩니다.
          배송은 2-3일 소요됩니다.
        </p>
      ),
    },
    {
      id: "returns",
      title: "반품/교환",
      content: (
        <div>
          <p>상품 수령 후 7일 이내 반품 가능</p>
          <p>단순 변심의 경우 배송비 고객 부담</p>
          <p>불량품의 경우 무료 교환</p>
        </div>
      ),
    },
  ];

  return <Accordion items={details} />;
}
```

## Props

- `items`: `AccordionItemData[]` (필수) - 아코디언 아이템 배열
  - `id`: `string` - 고유 ID
  - `title`: `string` - 제목
  - `content`: `ReactNode` - 내용
  - `defaultOpen`: `boolean` (선택사항) - 기본으로 열려있는지 여부
- `allowMultiple`: `boolean` (선택사항, 기본값: false) - 여러 개 동시에 열기 허용
- `className`: `string` (선택사항) - 추가 CSS 클래스

## 동작 방식

- `allowMultiple={false}` (기본값): 하나만 열림 (탭 방식)
- `allowMultiple={true}`: 여러 개 동시에 열 수 있음

## 스타일 클래스

- `.accordion` - 전체 컨테이너
- `.accordion-item` - 각 아이템
- `.accordion-header` - 헤더 버튼
- `.accordion-header.open` - 열린 헤더
- `.accordion-title` - 제목
- `.accordion-icon` - +/- 아이콘
- `.accordion-content` - 내용 컨테이너
- `.accordion-content.open` - 열린 내용
- `.accordion-content-inner` - 내용 영역

## 애니메이션

- 열기/닫기 애니메이션: 0.3초
- `max-height`를 사용한 부드러운 전환

## 접근성

- `aria-expanded`: 열림/닫힘 상태 표시
- 버튼으로 구현되어 키보드 접근 가능

## 다크모드 지원

`.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## 장점

- 하나만 열기/여러 개 열기 모드 지원
- 기본 열림 상태 설정 가능
- 부드러운 애니메이션
- 복잡한 내용 (JSX) 지원
- 다크모드 지원
- 접근성 고려
