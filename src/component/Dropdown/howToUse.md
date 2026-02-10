# Dropdown 컴포넌트 사용법

검색, 단일/다중 선택, 항목 생성 기능을 지원하는 드롭다운 컴포넌트입니다.

## 기본 사용법

### 예시 1: 기본 드롭다운

```tsx
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

const items: DropdownItem[] = [
  { label: "프로필", value: "profile" },
  { label: "설정", value: "settings" },
  { label: "로그아웃", value: "logout" },
];

function BasicDropdown() {
  const handleSelect = (value: string) => {
    console.log("선택된 값:", value);
  };

  return (
    <Dropdown
      items={items}
      onSelect={handleSelect}
      placeholder="메뉴 선택"
    />
  );
}
```

### 예시 2: 커스텀 트리거

```tsx
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

const items: DropdownItem[] = [
  { label: "수정", value: "edit", icon: "✏️" },
  { label: "삭제", value: "delete", icon: "🗑️" },
  { label: "공유", value: "share", icon: "📤" },
];

function CustomTriggerDropdown() {
  return (
    <Dropdown
      trigger={
        <button className="custom-button">
          작업 ▼
        </button>
      }
      items={items}
      onSelect={(value) => console.log(value)}
    />
  );
}
```

## 검색 기능

### 예시 3: 검색 가능한 드롭다운

```tsx
import { useState } from "react";
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

const countries: DropdownItem[] = [
  { label: "대한민국", value: "kr" },
  { label: "미국", value: "us" },
  { label: "일본", value: "jp" },
  { label: "중국", value: "cn" },
  { label: "영국", value: "uk" },
  { label: "프랑스", value: "fr" },
  { label: "독일", value: "de" },
  { label: "캐나다", value: "ca" },
];

function SearchableDropdown() {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div>
      <Dropdown
        items={countries}
        searchable={true}
        searchPlaceholder="국가 검색..."
        placeholder="국가 선택"
        value={selectedCountry}
        onChange={(value) => setSelectedCountry(value as string)}
      />
      {selectedCountry && (
        <p>선택된 국가: {countries.find(c => c.value === selectedCountry)?.label}</p>
      )}
    </div>
  );
}
```

## 단일 선택

### 예시 4: 제어 컴포넌트 (단일 선택)

```tsx
import { useState } from "react";
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

const languages: DropdownItem[] = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
  { label: "Java", value: "java" },
  { label: "Go", value: "go" },
];

function ControlledDropdown() {
  const [language, setLanguage] = useState("js");

  return (
    <div>
      <h3>선호하는 프로그래밍 언어</h3>
      <Dropdown
        items={languages}
        searchable={true}
        value={language}
        onChange={(value) => setLanguage(value as string)}
        placeholder="언어 선택"
      />
      <p>선택된 언어: {language}</p>
    </div>
  );
}
```

## 다중 선택

### 예시 5: 다중 선택 드롭다운

```tsx
import { useState } from "react";
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

const skills: DropdownItem[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Node.js", value: "nodejs" },
  { label: "Express", value: "express" },
  { label: "MongoDB", value: "mongodb" },
  { label: "PostgreSQL", value: "postgresql" },
];

function MultiSelectDropdown() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <div>
      <h3>보유 기술</h3>
      <Dropdown
        items={skills}
        multiple={true}
        searchable={true}
        value={selectedSkills}
        onChange={(value) => setSelectedSkills(value as string[])}
        placeholder="기술 선택 (다중 선택 가능)"
        closeOnSelect={false}
      />
      <div>
        <strong>선택된 기술 ({selectedSkills.length}개):</strong>
        {selectedSkills.length > 0 ? (
          <ul>
            {selectedSkills.map((skill) => (
              <li key={skill}>
                {skills.find(s => s.value === skill)?.label}
              </li>
            ))}
          </ul>
        ) : (
          <p>선택된 기술이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
```

### 예시 6: 태그 형태의 다중 선택

```tsx
import { useState } from "react";
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

const tags: DropdownItem[] = [
  { label: "긴급", value: "urgent" },
  { label: "중요", value: "important" },
  { label: "버그", value: "bug" },
  { label: "기능", value: "feature" },
  { label: "문서", value: "docs" },
  { label: "테스트", value: "test" },
];

function TagsDropdown() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["urgent"]);

  return (
    <Dropdown
      items={tags}
      multiple={true}
      searchable={true}
      value={selectedTags}
      onChange={(value) => setSelectedTags(value as string[])}
      placeholder="태그 선택"
      maxHeight={250}
    />
  );
}
```

## 항목 생성 기능

### 예시 7: 새 항목 생성 가능한 드롭다운

```tsx
import { useState } from "react";
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

function CreatableDropdown() {
  const [items, setItems] = useState<DropdownItem[]>([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
  ]);
  const [selected, setSelected] = useState("");

  const handleCreateItem = (inputValue: string) => {
    const newItem: DropdownItem = {
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\s+/g, "-"),
    };
    setItems([...items, newItem]);
    setSelected(newItem.value);
    console.log("새 항목 생성:", newItem);
  };

  return (
    <div>
      <h3>과일 선택 (없으면 추가 가능)</h3>
      <Dropdown
        items={items}
        searchable={true}
        creatable={true}
        value={selected}
        onChange={(value) => setSelected(value as string)}
        onCreateItem={handleCreateItem}
        createItemLabel={(input) => `"${input}" 추가하기`}
        placeholder="과일 선택 또는 추가"
      />
    </div>
  );
}
```

### 예시 8: 다중 선택 + 항목 생성

```tsx
import { useState } from "react";
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

function MultiCreatableDropdown() {
  const [items, setItems] = useState<DropdownItem[]>([
    { label: "프론트엔드", value: "frontend" },
    { label: "백엔드", value: "backend" },
    { label: "데브옵스", value: "devops" },
  ]);
  const [selected, setSelected] = useState<string[]>(["frontend"]);

  const handleCreateItem = (inputValue: string) => {
    const newItem: DropdownItem = {
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\s+/g, "-"),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setSelected([...selected, newItem.value]);
  };

  return (
    <div>
      <h3>관심 분야</h3>
      <Dropdown
        items={items}
        multiple={true}
        searchable={true}
        creatable={true}
        value={selected}
        onChange={(value) => setSelected(value as string[])}
        onCreateItem={handleCreateItem}
        createItemLabel={(input) => `"${input}" 새로 추가`}
        placeholder="분야 선택 또는 추가"
        searchPlaceholder="검색 또는 추가..."
      />
    </div>
  );
}
```

## 고급 기능

### 예시 9: 아이콘과 비활성화

```tsx
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

const actions: DropdownItem[] = [
  { label: "저장", value: "save", icon: "💾" },
  { label: "다운로드", value: "download", icon: "⬇️" },
  { label: "인쇄", value: "print", icon: "🖨️", disabled: true },
  { label: "공유", value: "share", icon: "📤" },
  { label: "삭제", value: "delete", icon: "🗑️" },
];

function IconDropdown() {
  return (
    <Dropdown
      items={actions}
      searchable={true}
      placeholder="작업 선택"
      onSelect={(value) => console.log("실행:", value)}
    />
  );
}
```

### 예시 10: 종합 예시

```tsx
import { useState } from "react";
import { Dropdown, type DropdownItem } from "./Dropdown/Dropdown";

function ComprehensiveExample() {
  const [items, setItems] = useState<DropdownItem[]>([
    { label: "React", value: "react", icon: "⚛️" },
    { label: "Vue", value: "vue", icon: "🟢" },
    { label: "Angular", value: "angular", icon: "🔴" },
    { label: "Svelte", value: "svelte", icon: "🟠" },
    { label: "Next.js", value: "nextjs", icon: "▲" },
    { label: "Nuxt", value: "nuxt", icon: "💚" },
  ]);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
  ]);

  const handleCreateItem = (inputValue: string) => {
    const newItem: DropdownItem = {
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\s+/g, "-"),
      icon: "🆕",
    };
    setItems([...items, newItem]);
    setSelectedFrameworks([...selectedFrameworks, newItem.value]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>프레임워크 선택</h2>
      <p>사용해본 프레임워크를 모두 선택하세요. 목록에 없으면 추가할 수 있습니다.</p>

      <Dropdown
        items={items}
        multiple={true}
        searchable={true}
        creatable={true}
        value={selectedFrameworks}
        onChange={(value) => setSelectedFrameworks(value as string[])}
        onCreateItem={handleCreateItem}
        placeholder="프레임워크 선택..."
        searchPlaceholder="검색 또는 추가..."
        createItemLabel={(input) => `+ "${input}" 추가`}
        maxHeight={400}
      />

      <div style={{ marginTop: "20px" }}>
        <h3>선택된 프레임워크 ({selectedFrameworks.length}개)</h3>
        {selectedFrameworks.length > 0 ? (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {selectedFrameworks.map((fw) => {
              const item = items.find((i) => i.value === fw);
              return (
                <div
                  key={fw}
                  style={{
                    padding: "8px 12px",
                    background: "#e7f1ff",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {item?.icon && <span>{item.icon}</span>}
                  <span>{item?.label}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p>선택된 프레임워크가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
```

## Props 설명

### DropdownProps

| Prop                | Type                                      | Default           | 설명                                        |
| ------------------- | ----------------------------------------- | ----------------- | ------------------------------------------- |
| `trigger`           | `ReactNode`                               | `undefined`       | 커스텀 트리거 (없으면 기본 트리거 사용)     |
| `items`             | `DropdownItem[]`                          | required          | 드롭다운 항목 배열                          |
| `onSelect`          | `(value: string) => void`                 | `undefined`       | 항목 선택 시 콜백                           |
| `position`          | `"left" \| "right" \| "center"`           | `"left"`          | 드롭다운 메뉴 위치                          |
| `closeOnSelect`     | `boolean`                                 | `true`            | 선택 시 드롭다운 닫기 (다중 선택 시 false 권장) |
| `className`         | `string`                                  | `""`              | 추가 CSS 클래스                             |
| `searchable`        | `boolean`                                 | `false`           | 검색 기능 활성화                            |
| `searchPlaceholder` | `string`                                  | `"검색..."`       | 검색 입력창 placeholder                     |
| `multiple`          | `boolean`                                 | `false`           | 다중 선택 모드                              |
| `value`             | `string \| string[]`                      | `undefined`       | 선택된 값 (제어 컴포넌트)                   |
| `onChange`          | `(value: string \| string[]) => void`     | `undefined`       | 값 변경 시 콜백                             |
| `creatable`         | `boolean`                                 | `false`           | 항목 생성 기능 활성화                       |
| `onCreateItem`      | `(inputValue: string) => void`            | `undefined`       | 새 항목 생성 시 콜백                        |
| `createItemLabel`   | `(inputValue: string) => string`          | `"${input}" 생성` | 항목 생성 버튼 텍스트 생성 함수             |
| `placeholder`       | `string`                                  | `"선택하세요"`    | 트리거 placeholder                          |
| `maxHeight`         | `number`                                  | `300`             | 드롭다운 메뉴 최대 높이 (px)                |

### DropdownItem

| Prop       | Type        | Default     | 설명                     |
| ---------- | ----------- | ----------- | ------------------------ |
| `label`    | `string`    | required    | 표시할 텍스트            |
| `value`    | `string`    | required    | 항목의 고유 값           |
| `icon`     | `ReactNode` | `undefined` | 항목 앞에 표시할 아이콘  |
| `disabled` | `boolean`   | `false`     | 비활성화 여부            |

## 키보드 단축키

- **Escape**: 드롭다운 닫기
- **Enter/Space** (트리거): 드롭다운 열기/닫기
- **Enter** (검색창): 새 항목 생성 (creatable이 true일 때)

## 스타일 커스터마이징

CSS 클래스를 통해 스타일을 커스터마이징할 수 있습니다.

```css
/* 커스텀 드롭다운 스타일 */
.my-dropdown .dropdown-default-trigger {
  border-radius: 12px;
  border-color: #007bff;
}

.my-dropdown .dropdown-item:hover {
  background-color: #007bff;
  color: white;
}

.my-dropdown .dropdown-tag {
  background-color: #28a745;
  color: white;
}
```

```tsx
<Dropdown
  className="my-dropdown"
  items={items}
  // ...
/>
```

## 주의사항

1. **다중 선택 시**: `closeOnSelect={false}` 설정 권장
2. **제어 컴포넌트**: `value`와 `onChange`를 함께 사용
3. **항목 생성**: `creatable={true}` 사용 시 `onCreateItem` 필수
4. **검색 + 생성**: 두 기능을 함께 사용하면 검색 후 Enter로 항목 생성 가능
5. **다크 모드**: `.dark` 클래스가 부모에 있으면 자동으로 다크 모드 적용

## 장점

- 검색 기능으로 많은 항목에서 빠르게 찾기
- 단일/다중 선택 모드 지원
- 새로운 항목을 즉시 추가 가능
- 태그 형태의 시각적 피드백
- 키보드 단축키 지원
- 외부 클릭 감지
- 다크 모드 지원
- 반응형 디자인
