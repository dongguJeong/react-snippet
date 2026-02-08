# Button

다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.

## 사용 방법

### 기본 사용법

```tsx
import { Button } from "./Button";

function App() {
  return (
    <div>
      <Button>기본 버튼</Button>
      <Button variant="secondary">보조 버튼</Button>
      <Button variant="outline">외곽선 버튼</Button>
    </div>
  );
}
```

## 예시 1: Variants (스타일)

```tsx
import { Button } from "./Button";

function ButtonVariants() {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
```

## 예시 2: Sizes (크기)

```tsx
import { Button } from "./Button";

function ButtonSizes() {
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
}
```

## 예시 3: 아이콘

```tsx
import { Button } from "./Button";

function ButtonWithIcons() {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Button leftIcon={<span>📧</span>}>이메일 보내기</Button>
      <Button rightIcon={<span>→</span>}>다음</Button>
      <Button leftIcon={<span>💾</span>} rightIcon={<span>✓</span>}>
        저장하기
      </Button>
    </div>
  );
}
```

## 예시 4: 로딩 상태

```tsx
import { useState } from "react";
import { Button } from "./Button";

function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <Button loading={isLoading} onClick={handleClick}>
      {isLoading ? "로딩 중..." : "클릭하세요"}
    </Button>
  );
}
```

## 예시 5: 비활성화

```tsx
import { Button } from "./Button";

function DisabledButtons() {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Button disabled>비활성화</Button>
      <Button variant="secondary" disabled>
        비활성화
      </Button>
      <Button variant="outline" disabled>
        비활성화
      </Button>
    </div>
  );
}
```

## 예시 6: 전체 너비

```tsx
import { Button } from "./Button";

function FullWidthButton() {
  return (
    <div style={{ width: "100%" }}>
      <Button fullWidth>전체 너비 버튼</Button>
      <Button fullWidth variant="secondary" style={{ marginTop: "12px" }}>
        전체 너비 버튼
      </Button>
    </div>
  );
}
```

## 예시 7: 폼 제출

```tsx
import { Button } from "./Button";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // API 호출
    await fetch("/api/login", { method: "POST" });

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="이메일" />
      <input type="password" placeholder="비밀번호" />
      <Button type="submit" loading={isLoading} fullWidth>
        로그인
      </Button>
    </form>
  );
}
```

## 예시 8: 버튼 그룹

```tsx
import { Button } from "./Button";

function ButtonGroup() {
  const [selected, setSelected] = useState("option1");

  return (
    <div style={{ display: "flex", gap: "0" }}>
      <Button
        variant={selected === "option1" ? "primary" : "outline"}
        onClick={() => setSelected("option1")}
        style={{ borderRadius: "4px 0 0 4px" }}
      >
        옵션 1
      </Button>
      <Button
        variant={selected === "option2" ? "primary" : "outline"}
        onClick={() => setSelected("option2")}
        style={{ borderRadius: "0", marginLeft: "-1px" }}
      >
        옵션 2
      </Button>
      <Button
        variant={selected === "option3" ? "primary" : "outline"}
        onClick={() => setSelected("option3")}
        style={{ borderRadius: "0 4px 4px 0", marginLeft: "-1px" }}
      >
        옵션 3
      </Button>
    </div>
  );
}
```

## 예시 9: Modal과 함께 사용

```tsx
import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "../Modal/Modal";

function ModalWithButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="확인"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setIsOpen(false)}>확인</Button>
          </>
        }
      >
        <p>작업을 계속하시겠습니까?</p>
      </Modal>
    </div>
  );
}
```

## Props

모든 `<button>` HTML 속성을 지원하며, 추가 Props는 다음과 같습니다:

- `variant`: `"primary" | "secondary" | "outline" | "danger" | "ghost"` (기본값: "primary")
- `size`: `"small" | "medium" | "large"` (기본값: "medium")
- `fullWidth`: `boolean` (기본값: false) - 전체 너비 사용
- `loading`: `boolean` (기본값: false) - 로딩 상태
- `leftIcon`: `ReactNode` - 왼쪽 아이콘
- `rightIcon`: `ReactNode` - 오른쪽 아이콘
- `className`: `string` - 추가 CSS 클래스

## Variants 설명

- **primary**: 기본 강조 버튼 (파란색)
- **secondary**: 보조 버튼 (회색)
- **outline**: 외곽선만 있는 버튼
- **danger**: 위험한 작업 버튼 (빨간색)
- **ghost**: 배경 없는 텍스트 버튼

## forwardRef 지원

`ref`를 전달하여 button 요소에 직접 접근할 수 있습니다.

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);

<Button ref={buttonRef}>버튼</Button>
```

## 다크모드 지원

`.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## 장점

- 다양한 스타일과 크기
- 로딩 상태 지원
- 아이콘 지원
- 전체 너비 옵션
- 다크모드 지원
- forwardRef 지원
- 타입 안전성
