# useDebounce

값의 변경을 지연시켜 불필요한 API 호출이나 렌더링을 줄이는 훅입니다.

## 사용 방법

### 기본 사용법

```tsx
import { useDebounce } from "./useDebounce";

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <p>실제 검색어: {debouncedSearchTerm}</p>
    </div>
  );
}
```

## 예시 1: 검색 API 호출

```tsx
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { useFetch } from "../useFetch/useFetch";

interface SearchResult {
  id: number;
  title: string;
  description: string;
}

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { result, isLoading } = useFetch<SearchResult[]>(
    debouncedSearchTerm
      ? `https://api.example.com/search?q=${debouncedSearchTerm}`
      : "",
    { method: "GET" }
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
      />

      {isLoading && <div>검색 중...</div>}

      {result && (
        <ul>
          {result.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## 예시 2: AsyncBoundary와 함께 사용

```tsx
import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { AsyncBoundary } from "../../component/AsyncBoundary/AsyncBoundary";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  if (!debouncedSearchTerm) {
    return (
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="사용자 이름을 입력하세요"
        />
        <p>검색어를 입력하세요</p>
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="사용자 이름을 입력하세요"
      />

      <AsyncBoundary<User[]>
        url={`https://api.example.com/users?name=${debouncedSearchTerm}`}
        method="GET"
        loadingFallback={<div>검색 중...</div>}
      >
        {(users) => (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        )}
      </AsyncBoundary>
    </div>
  );
}
```

## 예시 3: 폼 자동 저장

```tsx
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

interface FormData {
  title: string;
  content: string;
}

function AutoSaveForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const debouncedFormData = useDebounce(formData, 1000);

  useEffect(() => {
    if (debouncedFormData.title || debouncedFormData.content) {
      // 자동 저장 로직
      fetch("https://api.example.com/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(debouncedFormData),
      }).then(() => {
        setLastSaved(new Date());
      });
    }
  }, [debouncedFormData]);

  return (
    <div>
      <input
        type="text"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="제목"
      />
      <textarea
        value={formData.content}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, content: e.target.value }))
        }
        placeholder="내용"
      />
      {lastSaved && (
        <p>마지막 저장: {lastSaved.toLocaleTimeString()}</p>
      )}
    </div>
  );
}
```

## 예시 4: 실시간 입력 검증

```tsx
import { useState } from "react";
import { useDebounce } from "./useDebounce";

function UsernameInput() {
  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const debouncedUsername = useDebounce(username, 500);

  useEffect(() => {
    if (!debouncedUsername) {
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);
    fetch(`https://api.example.com/check-username?username=${debouncedUsername}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAvailable(data.available);
        setIsChecking(false);
      });
  }, [debouncedUsername]);

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="사용자 이름"
      />
      {isChecking && <span>확인 중...</span>}
      {!isChecking && isAvailable === true && (
        <span style={{ color: "green" }}>사용 가능한 이름입니다</span>
      )}
      {!isChecking && isAvailable === false && (
        <span style={{ color: "red" }}>이미 사용 중인 이름입니다</span>
      )}
    </div>
  );
}
```

## 매개변수

- `value`: `T` - debounce할 값
- `delay`: `number` - 지연 시간 (밀리초, 기본값: 500)

## 반환값

- `debouncedValue`: `T` - delay 시간이 지난 후 업데이트되는 값

## 동작 원리

1. 값이 변경될 때마다 타이머를 설정합니다
2. delay 시간 내에 값이 다시 변경되면 이전 타이머를 취소하고 새 타이머를 설정합니다
3. delay 시간 동안 값이 변경되지 않으면 debounced 값을 업데이트합니다

## 사용 시나리오

- **검색 입력**: 사용자가 입력을 완료할 때까지 기다렸다가 API 호출
- **자동 저장**: 사용자가 입력을 멈춘 후 자동으로 저장
- **실시간 검증**: 입력 값의 유효성을 서버에서 확인
- **윈도우 리사이즈**: 리사이즈 이벤트가 끝난 후 처리
- **스크롤 이벤트**: 스크롤이 멈춘 후 처리

## 장점

- 불필요한 API 호출 감소
- 성능 최적화
- 사용자 경험 개선
- 서버 부하 감소
