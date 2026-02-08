# Tabs

탭 컴포넌트입니다. 여러 컨텐츠를 탭으로 전환하며, 다양한 스타일을 지원합니다.

## 사용 방법

### 기본 사용법

```tsx
import { Tabs } from "./Tabs";

function App() {
  const tabs = [
    {
      id: "tab1",
      label: "탭 1",
      content: <div>첫 번째 탭 내용</div>,
    },
    {
      id: "tab2",
      label: "탭 2",
      content: <div>두 번째 탭 내용</div>,
    },
    {
      id: "tab3",
      label: "탭 3",
      content: <div>세 번째 탭 내용</div>,
    },
  ];

  return <Tabs tabs={tabs} />;
}
```

## 예시 1: 아이콘이 있는 탭

```tsx
import { Tabs } from "./Tabs";

function TabsWithIcons() {
  const tabs = [
    {
      id: "profile",
      label: "프로필",
      icon: <span>👤</span>,
      content: (
        <div>
          <h3>프로필 정보</h3>
          <p>이름: 홍길동</p>
          <p>이메일: hong@example.com</p>
        </div>
      ),
    },
    {
      id: "settings",
      label: "설정",
      icon: <span>⚙️</span>,
      content: (
        <div>
          <h3>설정</h3>
          <label>
            <input type="checkbox" />
            알림 받기
          </label>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "알림",
      icon: <span>🔔</span>,
      content: (
        <div>
          <h3>알림</h3>
          <p>새로운 알림이 없습니다.</p>
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
```

## 예시 2: 비활성화된 탭

```tsx
import { Tabs } from "./Tabs";

function TabsWithDisabled() {
  const tabs = [
    {
      id: "available",
      label: "사용 가능",
      content: <div>이 탭은 사용할 수 있습니다.</div>,
    },
    {
      id: "disabled",
      label: "비활성화됨",
      content: <div>이 내용은 보이지 않습니다.</div>,
      disabled: true,
    },
    {
      id: "premium",
      label: "프리미엄 전용",
      icon: <span>⭐</span>,
      content: <div>프리미엄 기능입니다.</div>,
      disabled: true,
    },
  ];

  return <Tabs tabs={tabs} />;
}
```

## 예시 3: Pills 스타일

```tsx
import { Tabs } from "./Tabs";

function PillsTabs() {
  const tabs = [
    { id: "all", label: "전체", content: <div>전체 아이템</div> },
    { id: "active", label: "활성", content: <div>활성 아이템</div> },
    { id: "archived", label: "보관됨", content: <div>보관된 아이템</div> },
  ];

  return <Tabs tabs={tabs} variant="pills" />;
}
```

## 예시 4: Underline 스타일

```tsx
import { Tabs } from "./Tabs";

function UnderlineTabs() {
  const tabs = [
    { id: "overview", label: "개요", content: <div>개요 내용</div> },
    { id: "specs", label: "사양", content: <div>사양 내용</div> },
    { id: "reviews", label: "리뷰", content: <div>리뷰 내용</div> },
  ];

  return <Tabs tabs={tabs} variant="underline" />;
}
```

## 예시 5: 탭 변경 이벤트

```tsx
import { useState } from "react";
import { Tabs } from "./Tabs";

function TabsWithCallback() {
  const [currentTab, setCurrentTab] = useState("tab1");

  const tabs = [
    { id: "tab1", label: "탭 1", content: <div>탭 1 내용</div> },
    { id: "tab2", label: "탭 2", content: <div>탭 2 내용</div> },
    { id: "tab3", label: "탭 3", content: <div>탭 3 내용</div> },
  ];

  const handleTabChange = (tabId: string) => {
    console.log("탭 변경:", tabId);
    setCurrentTab(tabId);
  };

  return (
    <div>
      <p>현재 탭: {currentTab}</p>
      <Tabs tabs={tabs} onChange={handleTabChange} />
    </div>
  );
}
```

## 예시 6: 제품 상세 페이지

```tsx
import { Tabs } from "./Tabs";

function ProductTabs() {
  const tabs = [
    {
      id: "description",
      label: "상세 설명",
      content: (
        <div>
          <h3>제품 설명</h3>
          <p>이 제품은 고품질 소재로 만들어졌습니다.</p>
          <ul>
            <li>내구성이 뛰어남</li>
            <li>세련된 디자인</li>
            <li>합리적인 가격</li>
          </ul>
        </div>
      ),
    },
    {
      id: "specs",
      label: "사양",
      content: (
        <table>
          <tbody>
            <tr>
              <td>크기</td>
              <td>30 x 20 x 10 cm</td>
            </tr>
            <tr>
              <td>무게</td>
              <td>1.5kg</td>
            </tr>
            <tr>
              <td>재질</td>
              <td>스테인리스 스틸</td>
            </tr>
          </tbody>
        </table>
      ),
    },
    {
      id: "reviews",
      label: "리뷰",
      content: (
        <div>
          <h4>★★★★☆ 4.5 / 5.0</h4>
          <p>총 128개의 리뷰</p>
        </div>
      ),
    },
    {
      id: "qa",
      label: "Q&A",
      content: (
        <div>
          <h4>자주 묻는 질문</h4>
          <p>Q: 배송 기간은 얼마나 걸리나요?</p>
          <p>A: 2-3일 소요됩니다.</p>
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
```

## 예시 7: 대시보드 탭

```tsx
import { Tabs } from "./Tabs";

function DashboardTabs() {
  const tabs = [
    {
      id: "analytics",
      label: "분석",
      icon: <span>📊</span>,
      content: (
        <div>
          <h3>분석 대시보드</h3>
          <p>방문자: 1,234명</p>
          <p>페이지뷰: 5,678회</p>
        </div>
      ),
    },
    {
      id: "reports",
      label: "리포트",
      icon: <span>📈</span>,
      content: (
        <div>
          <h3>리포트</h3>
          <p>월간 리포트를 확인하세요.</p>
        </div>
      ),
    },
    {
      id: "users",
      label: "사용자",
      icon: <span>👥</span>,
      content: (
        <div>
          <h3>사용자 관리</h3>
          <p>총 사용자: 1,000명</p>
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} variant="pills" />;
}
```

## 예시 8: AsyncBoundary와 함께 사용

```tsx
import { Tabs } from "./Tabs";
import { AsyncBoundary } from "../AsyncBoundary/AsyncBoundary";

function DataTabs() {
  const tabs = [
    {
      id: "users",
      label: "사용자",
      content: (
        <AsyncBoundary
          url="https://api.example.com/users"
          method="GET"
        >
          {(users: User[]) => (
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          )}
        </AsyncBoundary>
      ),
    },
    {
      id: "posts",
      label: "게시글",
      content: (
        <AsyncBoundary
          url="https://api.example.com/posts"
          method="GET"
        >
          {(posts: Post[]) => (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </AsyncBoundary>
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
```

## Props

- `tabs`: `TabItem[]` (필수) - 탭 아이템 배열
  - `id`: `string` - 고유 ID
  - `label`: `string` - 탭 레이블
  - `content`: `ReactNode` - 탭 내용
  - `icon`: `ReactNode` (선택사항) - 아이콘
  - `disabled`: `boolean` (선택사항) - 비활성화 여부
- `defaultActiveTab`: `string` (선택사항) - 기본 활성 탭 ID
- `onChange`: `(tabId: string) => void` (선택사항) - 탭 변경 콜백
- `variant`: `"default" | "pills" | "underline"` (기본값: "default") - 스타일
- `className`: `string` (선택사항) - 추가 CSS 클래스

## Variants

- **default**: 하단 border가 있는 기본 스타일
- **pills**: 둥근 버튼 스타일
- **underline**: 하단 언더라인만 있는 스타일

## 접근성

- `role="tablist"`: 탭 목록 역할
- `role="tab"`: 각 탭 역할
- `role="tabpanel"`: 탭 패널 역할
- `aria-selected`: 선택된 탭 표시
- `aria-controls`: 탭과 패널 연결

## 다크모드 지원

`.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## 장점

- 3가지 스타일 variant
- 아이콘 지원
- 비활성화 탭 지원
- 탭 변경 콜백
- 다크모드 지원
- 접근성 고려
