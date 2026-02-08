# useHover

요소의 호버 상태를 추적하는 훅입니다. 마우스가 요소 위에 있을 때를 감지하여 상호작용을 구현할 때 유용합니다.

## 사용 방법

### 기본 사용법

```tsx
import { useHover } from "./useHover";

function HoverCard() {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div
      ref={hoverRef}
      style={{
        padding: "20px",
        backgroundColor: isHovered ? "#e0e0e0" : "#ffffff",
        transition: "background-color 0.2s",
      }}
    >
      {isHovered ? "마우스가 올라가 있어요!" : "마우스를 올려보세요"}
    </div>
  );
}
```

## 예시 1: 이미지 확대 효과

```tsx
import { useHover } from "./useHover";

function ImageCard({ src, alt }: { src: string; alt: string }) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div ref={hoverRef} style={{ overflow: "hidden" }}>
      <img
        src={src}
        alt={alt}
        style={{
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
      />
    </div>
  );
}
```

## 예시 2: 툴팁 표시

```tsx
import { useHover } from "./useHover";

function TooltipButton({ label, tooltip }: { label: string; tooltip: string }) {
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();

  return (
    <div style={{ position: "relative" }}>
      <button ref={hoverRef}>{label}</button>
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#333",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}
```

## 예시 3: 카드 애니메이션

```tsx
import { useHover } from "./useHover";

interface CardProps {
  title: string;
  description: string;
  image: string;
}

function Card({ title, description, image }: CardProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div
      ref={hoverRef}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 8px 16px rgba(0,0,0,0.2)"
          : "0 2px 4px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <img src={image} alt={title} style={{ width: "100%" }} />
      <h3>{title}</h3>
      <p style={{ color: isHovered ? "#007bff" : "#666" }}>{description}</p>
    </div>
  );
}
```

## 예시 4: 메뉴 아이템

```tsx
import { useHover } from "./useHover";

interface MenuItem {
  label: string;
  subItems?: string[];
}

function MenuItem({ label, subItems }: MenuItem) {
  const [hoverRef, isHovered] = useHover<HTMLLIElement>();

  return (
    <li ref={hoverRef} style={{ position: "relative" }}>
      <a href="#">{label}</a>
      {isHovered && subItems && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            listStyle: "none",
            padding: "8px 0",
          }}
        >
          {subItems.map((item) => (
            <li key={item} style={{ padding: "4px 16px" }}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
```

## 예시 5: 미리보기 표시

```tsx
import { useHover } from "./useHover";

function VideoThumbnail({ thumbnail, preview }: { thumbnail: string; preview: string }) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div ref={hoverRef} style={{ position: "relative" }}>
      {isHovered ? (
        <video src={preview} autoPlay muted loop style={{ width: "100%" }} />
      ) : (
        <img src={thumbnail} alt="Video thumbnail" style={{ width: "100%" }} />
      )}
    </div>
  );
}
```

## 예시 6: 버튼 스타일

```tsx
import { useHover } from "./useHover";

function CustomButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();

  return (
    <button
      ref={hoverRef}
      onClick={onClick}
      style={{
        backgroundColor: isHovered ? "#0056b3" : "#007bff",
        color: "#fff",
        padding: "12px 24px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}
```

## 예시 7: 정보 표시

```tsx
import { useHover } from "./useHover";

function InfoIcon({ info }: { info: string }) {
  const [hoverRef, isHovered] = useHover<HTMLSpanElement>();

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        ref={hoverRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: isHovered ? "#007bff" : "#ccc",
          color: "#fff",
          fontSize: "12px",
          cursor: "help",
          transition: "background-color 0.2s",
        }}
      >
        i
      </span>
      {isHovered && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#333",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "4px",
            marginBottom: "8px",
            whiteSpace: "nowrap",
          }}
        >
          {info}
        </div>
      )}
    </span>
  );
}
```

## 반환값

- `[ref, isHovered]`: `[React.RefObject<T>, boolean]`
  - `ref`: 요소에 연결할 ref
  - `isHovered`: 마우스가 요소 위에 있으면 true, 아니면 false

## 타입 매개변수

- `T extends HTMLElement`: ref가 연결될 요소의 타입 (기본값: HTMLElement)

## 사용 시나리오

- 호버 시 스타일 변경
- 툴팁 표시
- 드롭다운 메뉴
- 이미지 효과
- 미리보기 표시
- 정보 아이콘

## 장점

- 간단한 API
- 타입 안전성
- 자동 이벤트 리스너 정리
- 재사용 가능
