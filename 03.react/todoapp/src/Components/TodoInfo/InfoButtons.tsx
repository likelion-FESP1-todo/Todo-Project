import React from 'react';

const InfoButtons = function () {
  // function editEvent() {
  //   const queryString = `?_id=${data._id}`;
  //   history.pushState({}, 'update', queryString);
  //   linkTo(`update${queryString}`);
  // }

  return (
    <>
      <div className="TodoInfo-btnGroup">
        {/* <Button
        find="editButton"
        text="수정하기"
        event={editEvent}
      />

      <Button
        find="deleteButton"
        text="삭제하기"
        event={() => _id && DeleteEvent(_id)}
      />

      <Button
        className="backButton"
        find="backButton"
        text="뒤로가기"
        event={BackEvent}
      /> */}
        <button>수정하기</button>
        <button>삭제하기</button>
      </div>
      <button className="backButton">뒤로가기</button>
    </>
  );
};

export default InfoButtons;
