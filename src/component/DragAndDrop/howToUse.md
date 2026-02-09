### 예시 1: 기본 파일 드롭 존

```tsx
import { DragAndDrop } from "./DragAndDrop";

function FileUploader() {
  const handleFilesDropped = (files: FileList) => {
    console.log("드롭된 파일:", files);
    Array.from(files).forEach((file) => {
      console.log(`- ${file.name} (${file.size} bytes)`);
    });
  };

  return (
    <div>
      <h2>파일 업로드</h2>
      <DragAndDrop onFilesDropped={handleFilesDropped} />
    </div>
  );
}
```

### 예시 2: 이미지만 허용하는 드롭 존

```tsx
import { useState } from "react";
import { DragAndDrop } from "./DragAndDrop";

function ImageUploader() {
  const [images, setImages] = useState<string[]>([]);

  const handleFilesDropped = (files: FileList) => {
    const imageUrls: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          imageUrls.push(e.target.result as string);
          if (imageUrls.length === files.length) {
            setImages((prev) => [...prev, ...imageUrls]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <h2>이미지 업로드</h2>
      <DragAndDrop
        onFilesDropped={handleFilesDropped}
        accept="image/*"
        maxSize={5 * 1024 * 1024} // 5MB
        multiple
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Upload ${index}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
}
```

### 예시 3: 정렬 가능한 리스트

```tsx
import { useState } from "react";
import { DragAndDrop } from "./DragAndDrop";

function SortableList() {
  const [items, setItems] = useState([
    "첫 번째 항목",
    "두 번째 항목",
    "세 번째 항목",
    "네 번째 항목",
    "다섯 번째 항목",
  ]);

  const handleReorder = (newItems: string[]) => {
    setItems(newItems);
  };

  return (
    <div>
      <h2>드래그하여 순서 변경</h2>
      <DragAndDrop
        mode="sortable"
        items={items}
        onItemsReorder={handleReorder}
      />
    </div>
  );
}
```

### 예시 4: 커스텀 UI

```tsx
import { DragAndDrop } from "./DragAndDrop";

function CustomFileDropZone() {
  const handleFilesDropped = (files: FileList) => {
    console.log("Files:", files);
  };

  return (
    <DragAndDrop onFilesDropped={handleFilesDropped}>
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3>📤 커스텀 드롭 존</h3>
        <p>파일을 여기에 끌어다 놓으세요</p>
      </div>
    </DragAndDrop>
  );
}
```

### 예시 5: 비활성화 상태

```tsx
import { useState } from "react";
import { DragAndDrop } from "./DragAndDrop";

function DisableableUploader() {
  const [isUploading, setIsUploading] = useState(false);

  const handleFilesDropped = async (files: FileList) => {
    setIsUploading(true);
    // 업로드 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("업로드 완료:", files);
    setIsUploading(false);
  };

  return (
    <div>
      <h2>파일 업로드</h2>
      <DragAndDrop
        onFilesDropped={handleFilesDropped}
        disabled={isUploading}
      />
      {isUploading && <p>업로드 중...</p>}
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"file" \| "sortable"` | `"file"` | 파일 드롭 모드 또는 정렬 모드 |
| `onFilesDropped` | `(files: FileList) => void` | - | 파일이 드롭되었을 때 호출되는 콜백 |
| `onItemsReorder` | `(items: string[]) => void` | - | 정렬 모드에서 항목이 재정렬될 때 호출 |
| `items` | `string[]` | `[]` | 정렬 모드에서 표시할 항목들 |
| `accept` | `string` | - | 허용할 파일 타입 (예: "image/*", ".pdf,.doc") |
| `multiple` | `boolean` | `true` | 여러 파일 선택 허용 여부 |
| `maxSize` | `number` | - | 최대 파일 크기 (bytes) |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `className` | `string` | `""` | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 커스텀 드롭 존 UI |
