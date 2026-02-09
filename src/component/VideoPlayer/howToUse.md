### 예시 1: 기본 비디오 플레이어

```tsx
import { VideoPlayer } from "./VideoPlayer";

function BasicVideoPlayer() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>기본 비디오 플레이어</h2>
      <VideoPlayer
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        poster="https://via.placeholder.com/800x450?text=Video+Poster"
      />
    </div>
  );
}
```

### 예시 2: 자동재생 & 반복

```tsx
import { VideoPlayer } from "./VideoPlayer";

function AutoPlayLoopVideo() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>자동재생 & 반복 재생</h2>
      <VideoPlayer
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        loop
        muted
        width="100%"
        height="400px"
      />
    </div>
  );
}
```

### 예시 3: 이벤트 핸들러

```tsx
import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

function VideoWithEvents() {
  const [playbackTime, setPlaybackTime] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  const handleTimeUpdate = (currentTime: number) => {
    setPlaybackTime(currentTime);
  };

  const handleEnded = () => {
    setHasEnded(true);
    alert("비디오가 종료되었습니다!");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>이벤트 핸들러 예제</h2>
      <VideoPlayer
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <div style={{ marginTop: "20px" }}>
        <p>현재 재생 시간: {playbackTime.toFixed(2)}초</p>
        <p>재생 완료: {hasEnded ? "예" : "아니오"}</p>
      </div>
    </div>
  );
}
```

### 예시 4: 커스텀 재생 속도

```tsx
import { VideoPlayer } from "./VideoPlayer";

function CustomPlaybackRates() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>커스텀 재생 속도</h2>
      <VideoPlayer
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        playbackRates={[0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4]}
      />
    </div>
  );
}
```

### 예시 5: 컨트롤 없는 플레이어

```tsx
import { VideoPlayer } from "./VideoPlayer";

function NoControlsVideo() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>컨트롤 없는 비디오</h2>
      <p>비디오를 클릭하면 재생/일시정지됩니다</p>
      <VideoPlayer
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        showControls={false}
        autoPlay
        loop
        muted
      />
    </div>
  );
}
```

### 예시 6: 여러 비디오 플레이리스트

```tsx
import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

function VideoPlaylist() {
  const videos = [
    {
      id: 1,
      title: "Big Buck Bunny",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "https://via.placeholder.com/800x450?text=Big+Buck+Bunny",
    },
    {
      id: 2,
      title: "Sample Video 2",
      src: "https://www.w3schools.com/html/movie.mp4",
      poster: "https://via.placeholder.com/800x450?text=Video+2",
    },
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

  const handleVideoEnd = () => {
    if (currentVideo < videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>비디오 플레이리스트</h2>
      <VideoPlayer
        key={videos[currentVideo].id}
        src={videos[currentVideo].src}
        poster={videos[currentVideo].poster}
        onEnded={handleVideoEnd}
      />
      <div style={{ marginTop: "20px" }}>
        <h3>플레이리스트</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => setCurrentVideo(index)}
              style={{
                padding: "10px 20px",
                background: index === currentVideo ? "#007bff" : "#ccc",
                color: index === currentVideo ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {video.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 예시 7: 반응형 비디오

```tsx
import { VideoPlayer } from "./VideoPlayer";

function ResponsiveVideo() {
  return (
    <div>
      <h2>반응형 비디오 플레이어</h2>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <VideoPlayer
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          width="100%"
          height="auto"
        />
      </div>
    </div>
  );
}
```

### 예시 8: 고정 비율 비디오 (16:9)

```tsx
import { VideoPlayer } from "./VideoPlayer";

function AspectRatioVideo() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>16:9 비율 비디오</h2>
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%", // 16:9 비율
          height: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <VideoPlayer
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}
```

### 예시 9: 로컬 비디오 파일

```tsx
import { VideoPlayer } from "./VideoPlayer";

function LocalVideoPlayer() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>로컬 비디오 재생</h2>
      <VideoPlayer
        src="/videos/my-video.mp4"
        poster="/images/video-poster.jpg"
      />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | 비디오 파일 URL (필수) |
| `poster` | `string` | - | 비디오 포스터 이미지 URL |
| `autoPlay` | `boolean` | `false` | 자동 재생 여부 |
| `loop` | `boolean` | `false` | 반복 재생 여부 |
| `muted` | `boolean` | `false` | 음소거 여부 |
| `showControls` | `boolean` | `true` | 컨트롤 바 표시 여부 |
| `width` | `string \| number` | `"100%"` | 비디오 플레이어 너비 |
| `height` | `string \| number` | `"auto"` | 비디오 플레이어 높이 |
| `onTimeUpdate` | `(currentTime: number) => void` | - | 재생 시간 업데이트 콜백 |
| `onEnded` | `() => void` | - | 재생 종료 콜백 |
| `playbackRates` | `number[]` | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | 재생 속도 옵션 |
| `className` | `string` | `""` | 추가 CSS 클래스 |

### 기능

- ▶/⏸ 재생/일시정지
- 🔇/🔉/🔊 볼륨 조절 및 음소거
- ⏱ 재생 시간 표시 및 탐색
- 📊 버퍼링 표시
- ⚡ 재생 속도 조절
- ⛶ 전체화면 모드
- 키보드 단축키 지원
- 반응형 디자인
- 다크 모드 지원

### 지원 비디오 포맷

- MP4 (H.264)
- WebM
- Ogg
- 브라우저에 따라 지원되는 포맷이 다를 수 있습니다

### 주의사항

- `autoPlay`를 사용할 때는 대부분의 브라우저에서 `muted`를 함께 설정해야 합니다
- 전체화면 기능은 사용자 인터랙션(클릭 등)이 있어야 작동합니다
- 외부 비디오 URL을 사용할 때는 CORS 설정을 확인하세요
