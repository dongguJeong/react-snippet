# Input

입력 컴포넌트입니다. 레이블, 에러 메시지, 도움말, 아이콘 등을 지원하는 풀 기능 인풋입니다.

## 사용 방법

### 기본 사용법

```tsx
import { Input } from "./Input";

function BasicInput() {
  return (
    <Input
      label="이메일"
      type="email"
      placeholder="이메일을 입력하세요"
    />
  );
}
```

## 예시 1: 에러 메시지

```tsx
import { useState } from "react";
import { Input } from "./Input";

function FormWithValidation() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.includes("@")) {
      setError("올바른 이메일 형식이 아닙니다");
    } else {
      setError("");
    }
  };

  return (
    <Input
      label="이메일"
      type="email"
      value={email}
      onChange={handleChange}
      error={error}
      required
    />
  );
}
```

## 예시 2: 도움말 텍스트

```tsx
import { Input } from "./Input";

function InputWithHelper() {
  return (
    <Input
      label="사용자 이름"
      helperText="영문, 숫자, 언더스코어만 사용 가능합니다"
      placeholder="username"
    />
  );
}
```

## 예시 3: 아이콘

```tsx
import { Input } from "./Input";

function InputWithIcons() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {/* 왼쪽 아이콘 */}
      <Input
        label="검색"
        leftIcon={<span>🔍</span>}
        placeholder="검색어를 입력하세요"
      />

      {/* 오른쪽 아이콘 */}
      <Input
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        }
      />

      {/* 양쪽 아이콘 */}
      <Input
        leftIcon={<span>💰</span>}
        rightIcon={<span>원</span>}
        placeholder="금액을 입력하세요"
      />
    </div>
  );
}
```

## 예시 4: 전체 너비

```tsx
import { Input } from "./Input";

function FullWidthInput() {
  return (
    <div style={{ width: "100%" }}>
      <Input
        label="주소"
        placeholder="주소를 입력하세요"
        fullWidth
      />
    </div>
  );
}
```

## 예시 5: 폼 예시

```tsx
import { useState } from "react";
import { Input } from "./Input";

function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="email"
        label="이메일"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
        fullWidth
      />

      <Input
        id="name"
        label="이름"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        helperText="실명을 입력해주세요"
        required
        fullWidth
      />

      <Input
        id="password"
        label="비밀번호"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
        helperText="8자 이상, 영문/숫자 혼합"
        required
        fullWidth
      />

      <Input
        id="confirmPassword"
        label="비밀번호 확인"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        error={errors.confirmPassword}
        required
        fullWidth
      />

      <button type="submit">가입하기</button>
    </form>
  );
}
```

## 예시 6: useRef 사용

```tsx
import { useRef } from "react";
import { Input } from "./Input";

function RefExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <Input
        ref={inputRef}
        label="이름"
        placeholder="이름을 입력하세요"
      />
      <button onClick={handleFocus}>포커스</button>
    </div>
  );
}
```

## 예시 7: 검색 입력

```tsx
import { useState } from "react";
import { Input } from "./Input";
import { useDebounce } from "../../hook/useDebounce/useDebounce";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API 호출
      console.log("검색:", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <Input
      leftIcon={<span>🔍</span>}
      placeholder="검색..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
    />
  );
}
```

## 예시 8: 비활성화 상태

```tsx
import { Input } from "./Input";

function DisabledInput() {
  return (
    <div>
      <Input
        label="이메일"
        value="user@example.com"
        disabled
      />

      <Input
        label="변경 불가"
        value="고정된 값"
        helperText="이 필드는 수정할 수 없습니다"
        disabled
      />
    </div>
  );
}
```

## Props

모든 `<input>` HTML 속성을 지원하며, 추가 Props는 다음과 같습니다:

- `label`: `string` (선택사항) - 레이블 텍스트
- `error`: `string` (선택사항) - 에러 메시지
- `helperText`: `string` (선택사항) - 도움말 텍스트
- `leftIcon`: `ReactNode` (선택사항) - 왼쪽 아이콘
- `rightIcon`: `ReactNode` (선택사항) - 오른쪽 아이콘
- `fullWidth`: `boolean` (선택사항, 기본값: false) - 전체 너비 사용
- `className`: `string` (선택사항) - input 요소에 추가할 CSS 클래스

## 스타일 클래스

- `.input-wrapper` - 전체 컨테이너
- `.input-wrapper.full-width` - 전체 너비
- `.input-label` - 레이블
- `.input-required` - 필수 표시 (*)
- `.input-container` - 입력 영역 컨테이너
- `.input-container.error` - 에러 상태
- `.input-container.disabled` - 비활성화 상태
- `.input` - 실제 input 요소
- `.input-icon` - 아이콘
- `.input-message` - 메시지 (에러/도움말)

## 접근성

- `aria-invalid`: 에러 상태 표시
- `aria-describedby`: 에러/도움말 텍스트 연결
- `htmlFor`: 레이블과 input 연결
- 필수 필드에 * 표시

## 다크모드 지원

`.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## forwardRef 지원

`ref`를 전달하여 input 요소에 직접 접근할 수 있습니다.

## 장점

- 풀 기능 입력 컴포넌트
- 에러/도움말 텍스트 지원
- 아이콘 지원
- 다크모드 지원
- 접근성 고려
- forwardRef 지원
- 타입 안전성
