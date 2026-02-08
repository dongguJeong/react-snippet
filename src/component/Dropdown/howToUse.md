# Dropdown

드롭다운 메뉴 컴포넌트입니다. 버튼 클릭 시 메뉴를 표시하고, 외부 클릭이나 Escape 키로 닫을 수 있습니다.

## 사용 방법

### 기본 사용법

```tsx
import { Dropdown } from "./Dropdown";

function UserMenu() {
  const menuItems = [
    { label: "프로필", value: "profile" },
    { label: "설정", value: "settings" },
    { label: "로그아웃", value: "logout" },
  ];

  const handleSelect = (value: string) => {
    console.log("선택:", value);
    if (value === "logout") {
      // 로그아웃 처리
    }
  };

  return (
    <Dropdown
      trigger={<button>계정</button>}
      items={menuItems}
      onSelect={handleSelect}
    />
  );
}
```

## 예시 1: 아이콘이 있는 드롭다운

```tsx
import { Dropdown } from "./Dropdown";

function ActionMenu() {
  const items = [
    {
      label: "수정",
      value: "edit",
      icon: "✏️",
    },
    {
      label: "복사",
      value: "copy",
      icon: "📋",
    },
    {
      label: "삭제",
      value: "delete",
      icon: "🗑️",
    },
  ];

  const handleAction = (value: string) => {
    switch (value) {
      case "edit":
        // 수정 로직
        break;
      case "copy":
        // 복사 로직
        break;
      case "delete":
        // 삭제 로직
        break;
    }
  };

  return (
    <Dropdown
      trigger={<button>작업</button>}
      items={items}
      onSelect={handleAction}
    />
  );
}
```

## 예시 2: 비활성화된 항목

```tsx
import { Dropdown } from "./Dropdown";

function RestrictedMenu() {
  const items = [
    { label: "보기", value: "view" },
    { label: "수정", value: "edit", disabled: true },
    { label: "삭제", value: "delete", disabled: true },
  ];

  return (
    <Dropdown
      trigger={<button>메뉴</button>}
      items={items}
      onSelect={(value) => console.log(value)}
    />
  );
}
```

## 예시 3: 위치 조정

```tsx
import { Dropdown } from "./Dropdown";

function PositionedDropdowns() {
  const items = [
    { label: "옵션 1", value: "1" },
    { label: "옵션 2", value: "2" },
  ];

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* 왼쪽 정렬 */}
      <Dropdown
        trigger={<button>왼쪽</button>}
        items={items}
        onSelect={console.log}
        position="left"
      />

      {/* 가운데 정렬 */}
      <Dropdown
        trigger={<button>가운데</button>}
        items={items}
        onSelect={console.log}
        position="center"
      />

      {/* 오른쪽 정렬 */}
      <Dropdown
        trigger={<button>오른쪽</button>}
        items={items}
        onSelect={console.log}
        position="right"
      />
    </div>
  );
}
```

## 예시 4: 선택 후 열린 상태 유지

```tsx
import { Dropdown } from "./Dropdown";

function MultiSelectDropdown() {
  const [selected, setSelected] = useState<string[]>([]);

  const items = [
    { label: "옵션 1", value: "1" },
    { label: "옵션 2", value: "2" },
    { label: "옵션 3", value: "3" },
  ];

  const handleSelect = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <Dropdown
      trigger={<button>선택: {selected.length}개</button>}
      items={items}
      onSelect={handleSelect}
      closeOnSelect={false}
    />
  );
}
```

## 예시 5: 언어 선택기

```tsx
import { Dropdown } from "./Dropdown";

function LanguageSelector() {
  const [language, setLanguage] = useState("ko");

  const languages = [
    { label: "한국어", value: "ko", icon: "🇰🇷" },
    { label: "English", value: "en", icon: "🇺🇸" },
    { label: "日本語", value: "ja", icon: "🇯🇵" },
    { label: "中文", value: "zh", icon: "🇨🇳" },
  ];

  const currentLanguage = languages.find((l) => l.value === language);

  return (
    <Dropdown
      trigger={
        <button>
          {currentLanguage?.icon} {currentLanguage?.label}
        </button>
      }
      items={languages}
      onSelect={setLanguage}
    />
  );
}
```

## 예시 6: 정렬 드롭다운

```tsx
import { Dropdown } from "./Dropdown";

function SortDropdown() {
  const [sortBy, setSortBy] = useState("date");

  const sortOptions = [
    { label: "최신순", value: "date" },
    { label: "인기순", value: "popular" },
    { label: "이름순", value: "name" },
    { label: "가격 낮은순", value: "price-asc" },
    { label: "가격 높은순", value: "price-desc" },
  ];

  return (
    <Dropdown
      trigger={
        <button>
          정렬: {sortOptions.find((o) => o.value === sortBy)?.label}
        </button>
      }
      items={sortOptions}
      onSelect={setSortBy}
    />
  );
}
```

## 예시 7: 커스텀 트리거

```tsx
import { Dropdown } from "./Dropdown";

function CustomTrigger() {
  const items = [
    { label: "공유", value: "share" },
    { label: "다운로드", value: "download" },
    { label: "즐겨찾기", value: "favorite" },
  ];

  return (
    <Dropdown
      trigger={
        <div style={{
          padding: "8px 12px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          cursor: "pointer",
        }}>
          <span>더보기</span>
          <span style={{ marginLeft: "8px" }}>▼</span>
        </div>
      }
      items={items}
      onSelect={console.log}
    />
  );
}
```

## Props

- `trigger`: `ReactNode` (필수) - 드롭다운을 여는 요소
- `items`: `DropdownItem[]` (필수) - 메뉴 아이템 배열
  - `label`: `string` - 표시될 텍스트
  - `value`: `string` - 값
  - `icon`: `ReactNode` (선택사항) - 아이콘
  - `disabled`: `boolean` (선택사항) - 비활성화 여부
- `onSelect`: `(value: string) => void` (필수) - 선택 핸들러
- `position`: `"left" | "right" | "center"` (선택사항, 기본값: "left") - 메뉴 위치
- `closeOnSelect`: `boolean` (선택사항, 기본값: true) - 선택 시 자동으로 닫기
- `className`: `string` (선택사항) - 추가 CSS 클래스

## 키보드 지원

- `Escape` 키를 누르면 드롭다운이 닫힙니다

## 외부 클릭 감지

드롭다운 외부를 클릭하면 자동으로 닫힙니다.

## 스타일 클래스

- `.dropdown` - 전체 컨테이너
- `.dropdown-trigger` - 트리거 요소
- `.dropdown-menu` - 메뉴 컨테이너
- `.dropdown-item` - 메뉴 아이템
- `.dropdown-item.disabled` - 비활성화된 아이템
- `.dropdown-icon` - 아이콘
- `.dropdown-label` - 레이블

## 다크모드 지원

`.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## 장점

- 외부 클릭 감지
- 키보드 지원 (Escape)
- 위치 조정 가능
- 아이콘 지원
- 비활성화 항목 지원
- 다크모드 지원
- 커스터마이징 가능
