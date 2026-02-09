### 예시 1: 기본 자동완성

```tsx
import { useState } from "react";
import { Autocomplete } from "./Autocomplete";

function BasicAutocomplete() {
  const [value, setValue] = useState("");
  const options = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ];

  return (
    <div>
      <h2>과일 선택</h2>
      <Autocomplete
        options={options}
        value={value}
        onChange={setValue}
        placeholder="과일을 검색하세요..."
      />
      {value && <p>선택된 값: {value}</p>}
    </div>
  );
}
```

### 예시 2: 새 항목 생성 기능

```tsx
import { useState } from "react";
import { Autocomplete } from "./Autocomplete";

function CreatableAutocomplete() {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([
    "React",
    "TypeScript",
    "JavaScript",
    "CSS",
  ]);

  const handleCreateOption = (newTag: string) => {
    setTags((prev) => [...prev, newTag]);
    alert(`새 태그 생성: ${newTag}`);
  };

  return (
    <div>
      <h2>태그 선택 또는 생성</h2>
      <Autocomplete
        options={tags}
        value={value}
        onChange={setValue}
        onCreateOption={handleCreateOption}
        placeholder="태그를 검색하거나 생성하세요..."
        allowCreate
      />
      <div style={{ marginTop: "20px" }}>
        <h3>모든 태그:</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tags.map((tag, index) => (
            <span
              key={index}
              style={{
                padding: "4px 12px",
                background: "#e0e0e0",
                borderRadius: "16px",
                fontSize: "14px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 예시 3: 커스텀 필터링

```tsx
import { useState } from "react";
import { Autocomplete } from "./Autocomplete";

function CustomFilterAutocomplete() {
  const [value, setValue] = useState("");
  const countries = [
    "South Korea",
    "United States",
    "United Kingdom",
    "Japan",
    "China",
    "Germany",
    "France",
  ];

  // 시작하는 문자열만 매칭하는 커스텀 필터
  const customFilter = (options: string[], inputValue: string) => {
    const searchValue = inputValue.toLowerCase();
    return options.filter((option) =>
      option.toLowerCase().startsWith(searchValue)
    );
  };

  return (
    <div>
      <h2>국가 선택 (시작 문자 매칭)</h2>
      <Autocomplete
        options={countries}
        value={value}
        onChange={setValue}
        filterOptions={customFilter}
        placeholder="국가를 검색하세요..."
        allowCreate={false}
      />
    </div>
  );
}
```

### 예시 4: 이메일 입력 자동완성

```tsx
import { useState } from "react";
import { Autocomplete } from "./Autocomplete";

function EmailAutocomplete() {
  const [email, setEmail] = useState("");
  const emailDomains = [
    "@gmail.com",
    "@naver.com",
    "@kakao.com",
    "@daum.net",
    "@yahoo.com",
    "@outlook.com",
  ];

  const filterEmails = (options: string[], inputValue: string) => {
    const atIndex = inputValue.indexOf("@");
    if (atIndex === -1) {
      // @ 없으면 모든 도메인 표시
      return options.map((domain) => inputValue + domain);
    }
    // @ 있으면 도메인 필터링
    const username = inputValue.slice(0, atIndex);
    const domainPart = inputValue.slice(atIndex);
    return options
      .filter((domain) => domain.startsWith(domainPart))
      .map((domain) => username + domain);
  };

  return (
    <div>
      <h2>이메일 입력</h2>
      <Autocomplete
        options={emailDomains}
        value={email}
        onChange={setEmail}
        filterOptions={filterEmails}
        placeholder="이메일을 입력하세요..."
        allowCreate
      />
    </div>
  );
}
```

### 예시 5: 대소문자 구분 & 최대 제안 수 제한

```tsx
import { useState } from "react";
import { Autocomplete } from "./Autocomplete";

function CaseSensitiveAutocomplete() {
  const [value, setValue] = useState("");
  const programmingLanguages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C",
    "C++",
    "C#",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "Ruby",
  ];

  return (
    <div>
      <h2>프로그래밍 언어 (대소문자 구분, 최대 3개 제안)</h2>
      <Autocomplete
        options={programmingLanguages}
        value={value}
        onChange={setValue}
        placeholder="언어를 검색하세요..."
        caseSensitive
        maxSuggestions={3}
        allowCreate={false}
      />
    </div>
  );
}
```

### 예시 6: 비활성화 상태

```tsx
import { useState } from "react";
import { Autocomplete } from "./Autocomplete";

function DisabledAutocomplete() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div>
      <h2>로딩 중 비활성화</h2>
      <Autocomplete
        options={options}
        value={value}
        onChange={setValue}
        disabled={isLoading}
        placeholder="검색하세요..."
      />
      <button onClick={() => setIsLoading(!isLoading)}>
        {isLoading ? "활성화" : "비활성화"}
      </button>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `string[]` | - | 자동완성 옵션 목록 |
| `value` | `string` | - | 현재 입력 값 |
| `onChange` | `(value: string) => void` | - | 값 변경 시 호출되는 콜백 |
| `onCreateOption` | `(value: string) => void` | - | 새 옵션 생성 시 호출되는 콜백 |
| `placeholder` | `string` | `"입력하세요..."` | 입력 필드 플레이스홀더 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `allowCreate` | `boolean` | `true` | 새 옵션 생성 허용 여부 |
| `filterOptions` | `(options: string[], inputValue: string) => string[]` | - | 커스텀 필터 함수 |
| `caseSensitive` | `boolean` | `false` | 대소문자 구분 여부 |
| `maxSuggestions` | `number` | `5` | 최대 제안 수 |
| `className` | `string` | `""` | 추가 CSS 클래스 |

### 키보드 단축키

- `↑` / `↓`: 옵션 탐색
- `Enter`: 선택된 옵션 선택
- `Escape`: 드롭다운 닫기
- `Tab`: 드롭다운 닫기 및 다음 요소로 이동
