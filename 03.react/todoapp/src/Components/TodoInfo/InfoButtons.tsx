import React from 'react';
import Button from '../Utils/Button';
import { useDeleteEvent, useBackEvent } from 'Components/Utils/utilsFunction';
import { useNavigate } from 'react-router-dom';

const InfoButtons = function ({ id }: { id: number }) {
  const navigate = useNavigate();
  const deleteEvent = useDeleteEvent();
  const backEvent = useBackEvent();
  const editEvent = function () {
    navigate({
      pathname: '/update',
      search: `?_id=${id}`,
    });
  };

  return (
    <>
      <div className="TodoInfo-btnGroup">
        <Button
          svg="editButton"
          alt="수정하기"
          btnEvent={editEvent}
        />

        <Button
          svg="deleteButton"
          alt="삭제하기"
          btnEvent={() => id && deleteEvent(id)}
        />
      </div>
      <Button
        className="backButton"
        svg="backButton"
        alt="뒤로가기"
        btnEvent={backEvent}
      />
    </>
  );
};

export default InfoButtons;
