### 예시 1: 기본 난수 생성

```tsx
import { useRandomNumber } from "./useRandomNumber";

function BasicRandomNumber() {
  const { randomNumber, generate } = useRandomNumber({
    min: 0,
    max: 100,
  });

  return (
    <div>
      <h2>기본 난수 생성기</h2>
      <p>범위: 0 ~ 100</p>
      <div>
        {randomNumber !== null ? (
          <h3>생성된 난수: {randomNumber}</h3>
        ) : (
          <p>버튼을 클릭하여 난수를 생성하세요</p>
        )}
      </div>
      <button onClick={generate}>난수 생성</button>
    </div>
  );
}
```

### 예시 2: 자릿수 지정 난수 생성

```tsx
import { useState } from "react";
import { useRandomNumber } from "./useRandomNumber";

function DigitRandomNumber() {
  const [digits, setDigits] = useState(4);
  const { randomNumber, generateByDigits } = useRandomNumber();

  const handleGenerate = () => {
    generateByDigits(digits);
  };

  return (
    <div>
      <h2>자릿수 난수 생성기</h2>
      <div>
        <label>
          자릿수:
          <input
            type="number"
            min="1"
            max="15"
            value={digits}
            onChange={(e) => setDigits(Number(e.target.value))}
            style={{ marginLeft: "10px", width: "60px" }}
          />
        </label>
      </div>
      <div style={{ margin: "20px 0" }}>
        {randomNumber !== null ? (
          <h3 style={{ fontSize: "32px", color: "#007bff" }}>
            {randomNumber.toLocaleString()}
          </h3>
        ) : (
          <p>버튼을 클릭하여 난수를 생성하세요</p>
        )}
      </div>
      <button onClick={handleGenerate}>
        {digits}자리 난수 생성
      </button>
    </div>
  );
}
```

### 예시 3: 복권 번호 생성기

```tsx
import { useRandomNumber } from "./useRandomNumber";

function LotteryNumberGenerator() {
  const { randomNumber, generateInRange, reset } = useRandomNumber();

  const generateLotteryNumber = () => {
    generateInRange(1, 45);
  };

  return (
    <div>
      <h2>로또 번호 생성기</h2>
      <p>1 ~ 45 사이의 번호</p>
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "#007bff",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          fontWeight: "bold",
          margin: "20px auto",
        }}
      >
        {randomNumber ?? "?"}
      </div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={generateLotteryNumber}>번호 생성</button>
        <button onClick={reset}>초기화</button>
      </div>
    </div>
  );
}
```

### 예시 4: 주사위 굴리기

```tsx
import { useRandomNumber } from "./useRandomNumber";

function DiceRoller() {
  const { randomNumber, generateInRange } = useRandomNumber();

  const rollDice = () => {
    generateInRange(1, 6);
  };

  const getDiceFace = (num: number | null) => {
    const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return num ? faces[num - 1] : "🎲";
  };

  return (
    <div>
      <h2>주사위 굴리기</h2>
      <div
        style={{
          fontSize: "120px",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        {getDiceFace(randomNumber)}
      </div>
      {randomNumber && (
        <p style={{ textAlign: "center", fontSize: "24px" }}>
          결과: {randomNumber}
        </p>
      )}
      <button
        onClick={rollDice}
        style={{
          display: "block",
          margin: "0 auto",
          padding: "12px 24px",
          fontSize: "16px",
        }}
      >
        🎲 주사위 굴리기
      </button>
    </div>
  );
}
```

### 예시 5: 비밀번호 PIN 생성기

```tsx
import { useState } from "react";
import { useRandomNumber } from "./useRandomNumber";

function PinGenerator() {
  const [pins, setPins] = useState<number[]>([]);
  const { generateByDigits } = useRandomNumber();

  const generatePin = (digits: number) => {
    const pin = Math.floor(
      Math.random() * (Math.pow(10, digits) - Math.pow(10, digits - 1)) +
        Math.pow(10, digits - 1)
    );
    setPins((prev) => [...prev, pin]);
  };

  const clearPins = () => {
    setPins([]);
  };

  return (
    <div>
      <h2>PIN 번호 생성기</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => generatePin(4)}>4자리 PIN</button>
        <button onClick={() => generatePin(6)}>6자리 PIN</button>
        <button onClick={() => generatePin(8)}>8자리 PIN</button>
        <button onClick={clearPins}>전체 삭제</button>
      </div>
      <div>
        <h3>생성된 PIN 목록:</h3>
        <ul>
          {pins.map((pin, index) => (
            <li
              key={index}
              style={{
                fontFamily: "monospace",
                fontSize: "18px",
                padding: "8px",
                background: "#f5f5f5",
                margin: "5px 0",
                borderRadius: "4px",
              }}
            >
              {pin.toString().padStart(4, "0")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### 예시 6: 자동 생성

```tsx
import { useRandomNumber } from "./useRandomNumber";

function AutoGeneratedNumber() {
  const { randomNumber, generate } = useRandomNumber({
    min: 1,
    max: 1000,
    autoGenerate: true, // 컴포넌트 마운트 시 자동 생성
  });

  return (
    <div>
      <h2>자동 생성 난수</h2>
      <p>페이지 로드 시 자동으로 생성됩니다</p>
      <h3>현재 난수: {randomNumber}</h3>
      <button onClick={generate}>다시 생성</button>
    </div>
  );
}
```

### API

#### Parameters

```typescript
interface UseRandomNumberOptions {
  min?: number;        // 최소값 (기본값: 0)
  max?: number;        // 최대값 (기본값: 100)
  autoGenerate?: boolean; // 자동 생성 여부 (기본값: false)
}
```

#### Returns

```typescript
interface UseRandomNumberReturn {
  randomNumber: number | null;  // 생성된 난수
  generate: () => void;         // 기본 범위에서 난수 생성
  generateByDigits: (digits: number) => void;  // 자릿수로 난수 생성
  generateInRange: (min: number, max: number) => void;  // 범위 지정 생성
  reset: () => void;            // 초기화
}
```

### 함수 설명

| 함수 | 설명 | 예시 |
|------|------|------|
| `generate()` | 기본 min~max 범위에서 난수 생성 | `generate()` |
| `generateByDigits(digits)` | 지정된 자릿수의 난수 생성 (1~15) | `generateByDigits(5)` → 10000~99999 |
| `generateInRange(min, max)` | 지정된 범위에서 난수 생성 | `generateInRange(1, 100)` |
| `reset()` | 난수를 null로 초기화 | `reset()` |

### 주의사항

- `generateByDigits`는 1~15 자릿수만 지원합니다 (JavaScript Number 안전 범위)
- `generateInRange`에서 min은 max보다 작아야 합니다
- 모든 난수는 정수입니다
