### 예시 1: 기본 툴팁

```tsx
import { Tooltip } from "./Tooltip";

function BasicTooltip() {
  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <Tooltip content="이것은 기본 툴팁입니다">
        <button>마우스를 올려보세요</button>
      </Tooltip>
    </div>
  );
}
```

### 예시 2: 다양한 위치

```tsx
import { Tooltip } from "./Tooltip";

function PositionTooltips() {
  const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
  };

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <div>
        <Tooltip content="위쪽 툴팁" position="top">
          <button style={buttonStyle}>Top</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="왼쪽 툴팁" position="left">
          <button style={buttonStyle}>Left</button>
        </Tooltip>
        <Tooltip content="오른쪽 툴팁" position="right">
          <button style={buttonStyle}>Right</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="아래쪽 툴팁" position="bottom">
          <button style={buttonStyle}>Bottom</button>
        </Tooltip>
      </div>
    </div>
  );
}
```

### 예시 3: 클릭 트리거

```tsx
import { Tooltip } from "./Tooltip";

function ClickTooltip() {
  return (
    <div style={{ padding: "100px" }}>
      <Tooltip
        content="클릭하면 나타나고 다시 클릭하거나 바깥을 클릭하면 사라집니다"
        trigger="click"
        position="bottom"
      >
        <button>클릭하세요</button>
      </Tooltip>
    </div>
  );
}
```

### 예시 4: 포커스 트리거

```tsx
import { Tooltip } from "./Tooltip";

function FocusTooltip() {
  return (
    <div style={{ padding: "50px" }}>
      <h2>폼 입력 도움말</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>
          이메일:
          <Tooltip
            content="유효한 이메일 주소를 입력하세요 (예: user@example.com)"
            trigger="focus"
            position="right"
          >
            <input
              type="email"
              placeholder="email@example.com"
              style={{ marginLeft: "10px", padding: "8px" }}
            />
          </Tooltip>
        </label>
      </div>
      <div>
        <label>
          비밀번호:
          <Tooltip
            content="8자 이상, 대문자, 소문자, 숫자 포함"
            trigger="focus"
            position="right"
          >
            <input
              type="password"
              placeholder="비밀번호"
              style={{ marginLeft: "10px", padding: "8px" }}
            />
          </Tooltip>
        </label>
      </div>
    </div>
  );
}
```

### 예시 5: 리치 컨텐츠 툴팁

```tsx
import { Tooltip } from "./Tooltip";

function RichContentTooltip() {
  const richContent = (
    <div>
      <strong>사용자 정보</strong>
      <div style={{ marginTop: "8px" }}>
        <div>이름: 홍길동</div>
        <div>직급: 개발자</div>
        <div>이메일: hong@example.com</div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "100px" }}>
      <Tooltip content={richContent} maxWidth={300}>
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#007bff",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          홍
        </div>
      </Tooltip>
    </div>
  );
}
```

### 예시 6: 지연 시간 조정

```tsx
import { Tooltip } from "./Tooltip";

function DelayedTooltip() {
  return (
    <div style={{ padding: "100px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Tooltip content="즉시 나타남" delay={0}>
          <button>지연 없음 (0ms)</button>
        </Tooltip>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Tooltip content="기본 지연" delay={200}>
          <button>기본 지연 (200ms)</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="긴 지연" delay={1000}>
          <button>긴 지연 (1000ms)</button>
        </Tooltip>
      </div>
    </div>
  );
}
```

### 예시 7: 화살표 없는 툴팁

```tsx
import { Tooltip } from "./Tooltip";

function NoArrowTooltip() {
  return (
    <div style={{ padding: "100px" }}>
      <Tooltip content="화살표가 없는 툴팁" arrow={false}>
        <button>No Arrow</button>
      </Tooltip>
    </div>
  );
}
```

### 예시 8: 비활성화 상태

```tsx
import { useState } from "react";
import { Tooltip } from "./Tooltip";

function DisabledTooltip() {
  const [disabled, setDisabled] = useState(false);

  return (
    <div style={{ padding: "100px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
          툴팁 비활성화
        </label>
      </div>
      <Tooltip content="이 툴팁은 비활성화될 수 있습니다" disabled={disabled}>
        <button>마우스를 올려보세요</button>
      </Tooltip>
    </div>
  );
}
```

### 예시 9: 아이콘과 함께 사용

```tsx
import { Tooltip } from "./Tooltip";

function IconTooltip() {
  return (
    <div style={{ padding: "50px" }}>
      <h2>
        제목
        <Tooltip content="이 항목에 대한 추가 정보입니다" position="right">
          <span
            style={{
              marginLeft: "8px",
              cursor: "help",
              color: "#666",
              fontSize: "16px",
            }}
          >
            ⓘ
          </span>
        </Tooltip>
      </h2>
      <p>
        여기는 본문 내용입니다.
        <Tooltip content="이 용어에 대한 설명" position="top">
          <span
            style={{
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              cursor: "help",
            }}
          >
            중요한 용어
          </span>
        </Tooltip>
        를 포함하고 있습니다.
      </p>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | - | 툴팁에 표시될 내용 |
| `children` | `ReactNode` | - | 툴팁이 적용될 요소 |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | 툴팁 표시 위치 |
| `trigger` | `"hover" \| "click" \| "focus"` | `"hover"` | 툴팁 표시 트리거 방식 |
| `delay` | `number` | `200` | 툴팁이 나타나기까지의 지연 시간(ms) |
| `arrow` | `boolean` | `true` | 화살표 표시 여부 |
| `maxWidth` | `number` | `250` | 툴팁의 최대 너비(px) |
| `className` | `string` | `""` | 트리거 요소에 추가할 CSS 클래스 |
| `disabled` | `boolean` | `false` | 툴팁 비활성화 여부 |

### 특징

- 자동 위치 조정: 화면 밖으로 나가지 않도록 자동으로 위치 조정
- 부드러운 애니메이션
- 다양한 트리거 방식 지원
- 리치 컨텐츠 지원
- 다크 모드 지원
- 접근성 고려 (키보드 포커스 지원)
