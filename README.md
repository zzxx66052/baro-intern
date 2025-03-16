📌 프로젝트 이름
이 프로젝트는 투두 리스트(Todo List) 애플리케이션입니다. Next.js와 React를 활용하여 할 일을 추가, 수정, 삭제할 수 있는 기능을 제공합니다.

📂 폴더 구조
python
복사
편집
📦src
 ┣ 📂api
 ┃ ┗ 📜todo.ts                # 투두 리스트 관련 API 함수 정의
 ┣ 📂app
 ┃ ┣ 📂todo
 ┃ ┃ ┣ 📂_components          # 투두 리스트 관련 컴포넌트 모음
 ┃ ┃ ┃ ┣ 📜Spinner.tsx        # 로딩 스피너 컴포넌트
 ┃ ┃ ┃ ┣ 📜TodoActions.tsx    # 개별 투두 아이템에 대한 액션 버튼 (수정, 삭제 등)
 ┃ ┃ ┃ ┣ 📜TodoCheckbox.tsx   # 투두 완료 여부 체크박스 컴포넌트
 ┃ ┃ ┃ ┣ 📜TodoEditForm.tsx   # 투두 수정 폼
 ┃ ┃ ┃ ┣ 📜TodoForm.tsx       # 투두 추가 폼
 ┃ ┃ ┃ ┣ 📜TodoHome.tsx       # 투두 리스트 홈 화면
 ┃ ┃ ┃ ┣ 📜TodoItem.tsx       # 개별 투두 아이템
 ┃ ┃ ┃ ┗ 📜TodoList.tsx       # 투두 리스트 컴포넌트
 ┃ ┃ ┗ 📜page.tsx             # 투두 페이지 라우트 설정
 ┃ ┣ 📜favicon.ico            # 파비콘 이미지
 ┃ ┣ 📜globals.css            # 전역 스타일 파일
 ┃ ┣ 📜layout.tsx             # 애플리케이션 레이아웃 설정
 ┃ ┣ 📜page.tsx               # 메인 페이지
 ┃ ┗ 📜todoQueryProvider.tsx  # React Query Provider 설정
 ┣ 📂components
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜DeleteIcon.tsx       # 삭제 아이콘 컴포넌트
 ┃ ┃ ┗ 📜UpdateIcon.tsx       # 수정 아이콘 컴포넌트
 ┃ ┗ 📜TodoMoveButton.tsx     # 투두 이동 버튼
 ┗ 📂types
 ┃ ┗ 📜todoType.ts            # 투두 관련 타입 정의

🚀 주요 기능
--할 일 추가: 새로운 할 일을 작성하여 리스트에 추가
--할 일 수정: 기존 할 일을 수정
--할 일 삭제: 필요 없는 할 일을 삭제
--할 일 완료 체크: 완료된 할 일 체크 가능
--투두 리스트 정렬 및 이동: 할 일 순서를 변경 가능

🛠️ 기술 스택
--프론트엔드: Next.js, React, TypeScript
--스타일링: CSS (globals.css)
--상태 관리: React Query
--아이콘: 커스텀 SVG 아이콘
