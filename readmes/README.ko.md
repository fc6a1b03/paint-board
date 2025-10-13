<div align="center">
  <img width="240" src="https://raw.githubusercontent.com/LHRUN/file-store/main/paint-board/logo.png" alt="logo"/>
</div>

<h4 align="center">
  오픈소스 웹 기반 크리에이티브 보드
</h4>

<div align="center">
  <a href="https://github.com/LHRUN/paint-board/stargazers"><img src="https://img.shields.io/github/stars/LHRUN/paint-board" alt="Stars Badge"/></a>
  <a href="https://github.com/LHRUN/paint-board"><img src="https://img.shields.io/github/forks/LHRUN/paint-board" alt="Forks Badge"/></a>
  <a href="https://github.com/LHRUN/paint-board/blob/master/LICENSE"><img src="https://img.shields.io/github/license/LHRUN/paint-board" alt="License Badge"/></a>
  <a href="https://github.com/LHRUN/paint-board"><img src="https://img.shields.io/badge/Made%20with-React%20%26%20Vite-pink" alt="Next&Prisma" /></a>
  <a href="https://github.com/LHRUN/paint-board/releases"><img alt="release" src="https://img.shields.io/github/package-json/v/LHRUN/paint-board" /></a>
</div>

<br>

<p align="center">
  <strong>한국어</strong> / 
  <a href="./README.zh_cn.md">中文(简体)</a> / 
  <a href="./README.zh_tw.md">中文(繁体)</a> / 
  <a href="./README.ja.md">日本語</a> / 
  <a href="../README.md">English</a>
</p>


## 미리 보기
Link: [https://songlh.top/paint-board/](https://songlh.top/paint-board/)

<div align="center" style="width: 100%;">
  <img style="width: 100%" src="https://raw.githubusercontent.com/LHRUN/file-store/main/paint-board/preview_device.png" alt="preview"/>
</div>

## 기능 소개
+ 그리기 모드
  - 자유 그리기: 기본 브러시, 무지개 브러시, 다중 모양 브러시, 다중 소재 브러시, 픽셀 브러시, 다색 브러시, 텍스트 브러시, 다중 선 연결 브러시, 그물 브러시, 다중 점 연결 브러시, 물결 곡선 브러시, 가시 브러시 등 12가지 스타일의 브러시를 제공합니다. 다양한 그림 요구를 충족시킵니다.
  - 도형 그리기: 내장 도형과 Lucide 아이콘 라이브러리 도형을 포함해 풍부한 도형 그리기를 지원하며, 클릭 한 번으로 추가하여 사용할 수 있습니다. 선 너비, 선 스타일, 채우기 색상 및 채우기 스타일을 설정할 수 있습니다.
+ 지우개 모드: 모든 내용을 선형으로 지울 수 있으며 선형 너비 설정을 지원합니다.
+ 선택 모드: 클릭 또는 박스 선택으로 콘텐츠 편집 가능. 선택 후 핸들을 통해 드래그, 확대/축소, 회전 조작 및 다양한 사용자 지정 설정 가능.
+ 드로잉 보드 모드: 드로잉 보드 배경, 사용자 지정 크기 및 글로벌 그리기 설정 지원.
+ 작업 모음: 왼쪽부터 오른쪽 순서로 기능은 다음과 같습니다: 실행 취소, 실행 취소 취소, 현재 선택 내용 복사, 현재 선택 내용 삭제, 텍스트 그리기, 이미지 업로드, 그리기 내용 지우기, 이미지로 저장, 파일 목록 열기.
+ 다중 파일 설정: 여러 캔버스 전환 지원, 각 캔버스별 제목 사용자 정의, 추가/삭제 가능, 정렬 및 업로드/다운로드 기능 제공.
+ 국제화: 中文(简体), 中文(繁体), English, 日本語, 한국어.

## V1.3.0 Video Demo

<a href="https://www.bilibili.com/video/BV1dJ4m1h7vg">
  <img width="500" src="https://raw.githubusercontent.com/LHRUN/file-store/main/paint-board/v1.3.0_demo_bilibili.png"/>
</a>

## 빠른 시작
```
git clone https://github.com/LHRUN/paint-board.git
pnpm install
pnpm dev
```

### Docker

1. Build a Docker image with the name `paint-board`.
```sh
docker build -t paint-board .
```

2. Start a docker container.
```sh
docker run -d -p 8080:80 --name paint-board paint-board
```

3. Accessed by opening `http://localhost:8080/paint-board/` in your browser.

## 브라우저 지원

최신 버전의 Google 크롬을 사용하는 것이 좋으며, 최소 지원 버전은 다음과 같습니다.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :--: | :--: | :--: | :--: |
| 80+ | 80+ | 70+ | 13+ |

## 문의하기

제안이나 좋은 아이디어가 있으시면 언제든지 저에게 연락해 주세요!

+ Email: song.lhlh@gmail.com
+ Telegram: https://t.me/longhao_song
+ Twiter: https://twitter.com/Song_LongHao
+ WeChat:
<img style="width: 300px" src="https://github.com/user-attachments/assets/719265e1-dbfa-4760-9482-aa0823b72df8" alt="wechat"/>

## Contributing

페인트보드에 기여해 주셔서 감사합니다. 버그를 발견하여 수정하고 싶으시면 먼저 이슈로 제출해 주세요. 새로운 기능 추가에 대해서는 토론을 통해 또는 위에 제공된 연락처로 직접 문의해 주시고, 아래의 기여 가이드라인을 읽어보신 후 기여해 주세요. 여러분의 지원에 감사드립니다!

[Contribution Guidelines](./CONTRIBUTING.md)

## Document
+ After refactoring with Fabric.js
  - [Exploring the Canvas Series: combined with Transformers.js to achieve intelligent image processing](https://songlh.top/2024/11/23/Exploring-the-Canvas-Series-combined-with-Transformers-js-to-achieve-intelligent-image-processing/)
  - [Exploring the Canvas Series: The Art of Time Reversal in the Canvas](https://songlh.top/2024/01/10/Exploring-the-Canvas-Series-The-Art-of-Time-Reversal-in-the-Canvas/)
  - [Exploring the Canvas Series: Creative Brushes Part 1](https://songlh.top/2024/04/14/Exploring-the-Canvas-Series-Creative-Brushes-Part-1/)
  - [Exploring the Canvas Series: Creative Brushes Part 2](https://songlh.top/2024/04/15/Exploring-the-Canvas-Series-Creative-Brushes-Part-2/)
  - [Exploring the Canvas Series: Creative Brushes Part 3](https://songlh.top/2024/04/16/Exploring-the-Canvas-Series-Creative-Brushes-Part-3/)
  - writing...
+ Before refactoring with Fabric.js
  - [Canvas Artistry：Mastering Selection, Dragging, and Scaling](https://songlh.top/2023/11/30/Canvas-Artistry1)
  - [Canvas Artistry：Drawing magic with multiple effects](https://songlh.top/2023/12/01/Canvas-Artistry2)

## License

MIT License. See the [LICENSE](https://github.com/LHRUN/paint-board/blob/main/LICENSE) file.
