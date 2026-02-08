# Modal

모달(대화상자) 컴포넌트입니다. 오버레이, 키보드 지원, 다양한 크기를 제공합니다.

## 사용 방법

### 기본 사용법

```tsx
import { useState } from "react";
import { Modal } from "./Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="모달 제목"
      >
        <p>모달 내용입니다.</p>
      </Modal>
    </div>
  );
}
```

## 예시 1: Footer가 있는 모달

```tsx
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

function ConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log("확인됨");
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>확인 모달</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="삭제 확인"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              삭제
            </Button>
          </>
        }
      >
        <p>정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
      </Modal>
    </div>
  );
}
```

## 예시 2: 크기 조절

```tsx
import { useState } from "react";
import { Modal } from "./Modal";

function ModalSizes() {
  const [size, setSize] = useState<"small" | "medium" | "large" | "fullscreen">("medium");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => { setSize("small"); setIsOpen(true); }}>
        Small 모달
      </button>
      <button onClick={() => { setSize("medium"); setIsOpen(true); }}>
        Medium 모달
      </button>
      <button onClick={() => { setSize("large"); setIsOpen(true); }}>
        Large 모달
      </button>
      <button onClick={() => { setSize("fullscreen"); setIsOpen(true); }}>
        Fullscreen 모달
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${size} 모달`}
        size={size}
      >
        <p>이것은 {size} 크기의 모달입니다.</p>
      </Modal>
    </div>
  );
}
```

## 예시 3: 폼 모달

```tsx
import { useState } from "react";
import { Modal } from "./Modal";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>사용자 추가</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="새 사용자 추가"
        size="medium"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="이름"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            required
          />
          <Input
            label="이메일"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            required
            style={{ marginTop: "16px" }}
          />
          <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button type="submit">추가</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
```

## 예시 4: 외부 클릭으로 닫히지 않는 모달

```tsx
import { Modal } from "./Modal";

function PersistentModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="중요한 알림"
      closeOnOverlayClick={false}
    >
      <p>이 모달은 X 버튼을 눌러야만 닫힙니다.</p>
    </Modal>
  );
}
```

## 예시 5: 닫기 버튼 없는 모달

```tsx
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

function NoCloseButtonModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="알림"
      showCloseButton={false}
      footer={
        <Button onClick={() => setIsOpen(false)} fullWidth>
          확인
        </Button>
      }
    >
      <p>작업이 완료되었습니다.</p>
    </Modal>
  );
}
```

## 예시 6: 이미지 갤러리 모달

```tsx
import { useState } from "react";
import { Modal } from "./Modal";

function ImageGalleryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const images = [
    "https://via.placeholder.com/600x400/FF6B6B",
    "https://via.placeholder.com/600x400/4ECDC4",
    "https://via.placeholder.com/600x400/45B7D1",
  ];

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt="Gallery"
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="large"
      >
        <img src={selectedImage} alt="Preview" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
}
```

## 예시 7: 스크롤 가능한 컨텐츠

```tsx
import { Modal } from "./Modal";

function ScrollableModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="긴 내용"
      size="medium"
    >
      {Array.from({ length: 50 }, (_, i) => (
        <p key={i}>
          이것은 {i + 1}번째 단락입니다. 모달 내용이 길어지면 자동으로 스크롤됩니다.
        </p>
      ))}
    </Modal>
  );
}
```

## Props

- `isOpen`: `boolean` (필수) - 모달 열림 상태
- `onClose`: `() => void` (필수) - 닫기 핸들러
- `title`: `string` (선택사항) - 모달 제목
- `children`: `ReactNode` (필수) - 모달 내용
- `size`: `"small" | "medium" | "large" | "fullscreen"` (기본값: "medium") - 모달 크기
- `showCloseButton`: `boolean` (기본값: true) - 닫기 버튼 표시 여부
- `closeOnOverlayClick`: `boolean` (기본값: true) - 오버레이 클릭 시 닫기
- `footer`: `ReactNode` (선택사항) - 푸터 영역 (버튼 등)
- `className`: `string` (선택사항) - 추가 CSS 클래스

## 크기

- **small**: 최대 너비 400px
- **medium**: 최대 너비 600px
- **large**: 최대 너비 900px
- **fullscreen**: 전체 화면

## 키보드 지원

- `Escape` 키를 누르면 모달이 닫힙니다

## 스크롤 잠금

모달이 열리면 `body`의 스크롤이 자동으로 잠기고, 닫히면 해제됩니다.

## 애니메이션

- 페이드 인/아웃
- 스케일 효과
- 0.3초 애니메이션

## 다크모드 지원

`.dark` 클래스를 감지하여 자동으로 다크모드 스타일을 적용합니다.

## 접근성

- `aria-label`: 닫기 버튼에 레이블 제공
- 포커스 트랩 권장: react-focus-lock 등의 라이브러리 사용 권장

## 장점

- 다양한 크기 옵션
- 키보드 지원 (Escape)
- 오버레이 클릭 감지
- 스크롤 잠금
- 부드러운 애니메이션
- 다크모드 지원
- Footer 영역 지원
