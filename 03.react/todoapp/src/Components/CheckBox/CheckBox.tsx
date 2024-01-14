import axios from 'axios';
import styles from '../CheckBox/CheckBox.module.css';

interface CheckBoxProps {
  data: TodoItem;
  onCheckChange: (checked: boolean) => void;
}

const CheckBox = function ({ data, onCheckChange }: CheckBoxProps) {
  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    try {
      const body = {
        title: data.title,
        content: data.content,
        done: target.checked,
      };
      const respons = await axios.patch(`http://localhost:33088/api/todolist/${data._id}`, body);
      const done = respons.data.item.done;
      onCheckChange(done);
    } catch (err) {
      alert('수정 실패');
      console.error(err);
    }
  };

  return (
    <label className={styles['TodoList-checkLabel']}>
      <input
        className={styles['TodoList-todoCheck']}
        type="checkBox"
        onChange={handleCheck}
        // id={data._id}
      />
      <span className={styles['TodoList-checkSpan']} />
    </label>
  );
};

export default CheckBox;
