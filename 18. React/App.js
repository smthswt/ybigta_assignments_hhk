import './App.css'
import React, { useState } from 'react';

function App() {

  const [title, setTitle] = useState([
    "8월 일상 모음",
    "YBIGTA 교육세션 끝",
    "YBIGTA 신입기수 프로젝트",
  ]);
  const [good, setGood] = useState([0, 0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [changeTitle, setChangeTitle] = useState(0);
  const [inputValue, setInputValue] = useState("");
  // 초기값으로 빈 문자열로 시작하는 입력 필드. 업데이트가 있을시 상태 변수에 저장됩니다.
  const [activeColor, setActiveColor] = useState(Array(title.length).fill(false));
  //Array(title.length).fill(false)는 글 제목의 개수(title 배열의 길이)와 동일한 길이를 가지며, 
  //모든 요소가 false인 배열을 생성합니다. 
  //이 배열은 각 글 제목의 활성화 여부를 관리하기 위해 사용됩니다. 
  //활성화된 글 제목의 인덱스는 true로 표시되며, 해당 글 제목의 배경색을 변경하는 데 사용됩니다.

  return (
    <div className="App">
      <div className="black-nav" style={{backgroundColor: 'lightblue'}}> {/*배경색 다른색으로 수정*/}
        <div>
          <h4 style={{ color: "white", fontSize: "16px" }}>Blog</h4>
        </div>
        <div className="submit">
          {/*글 발행 버튼 누르면 작성한 내용이 작성내용 상태관리 변수에 업데이트 되는 코드 작성*/}
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <button
            onClick={() => {
              let copy = [...title];
              copy.unshift(inputValue);
              setTitle(copy);
            }}
          >
            글 발행
          </button>
        </div>
      </div>
      {title.map(function (a, i) {
        return (
          <div className="list">
            <h4
              onClick={() => {
                setModal(!modal);
                setChangeTitle(i);
                // 글 제목을 클릭하면 모달 창이 열리거나 닫히며, 선택된 글의 인덱스를 
                // changeTitle로 설정하여 모달 창에서 해당 글의 상세 정보를 보여줍니다.
                const newActiveColor = [...activeColor];
                newActiveColor[i] = !newActiveColor[i];
                setActiveColor(newActiveColor);
                // 글 제목을 클릭할 때마다 해당 글 제목의 활성화 상태를 토글하여 배경색을 변경합니다. activeColor 배열은 글 제목들의 활성화 여부에 따라 관리되며, 
                // 클릭한 글의 인덱스에 해당하는 값이 반전되어 업데이트됩니다.
              }}
     
              style={activeColor[i] ? { color: "Yellow" } : null}
            >
              {title[i]}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...good];
                  copy[i] = copy[i] + 1;
                  setGood(copy);
                  return copy;
                }}
              >
                {" "}
                👍{" "}
              </span>
              {good[i]}
            </h4>
          </div>
        );
      })}
      {modal == true ? (
        <Modal
          title={title}
          changeTitle={changeTitle}
        ></Modal>
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.title[props.changeTitle]}</h4>
    </div>
  );
}

export default App;