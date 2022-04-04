import CustomCalendar from '@components/calendar/CustomCalendar';
import styles from './TextFieldCalendar.module.scss';

const TextFieldCalendar = () => {
  return (
    <div className={styles.textFieldCalendar}>
      <div>
        <input type={'text'} />
      </div>
      <div>
        <CustomCalendar />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
