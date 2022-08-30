import InformationItem from 'components/information-item/InformationItem';
import { InputRadio } from 'components/inputRadio/InputRadio';
import { Dialog } from 'components/rate/ui/Dialog';
import TextEditor from 'components/text-editor/TextEditor';
import React, { FC, useState } from 'react';
import styles from './gameModal.module.scss';

type PropsT = {
  open: boolean;
  onClose: (value: boolean) => void;
};
export const GameModal: FC<PropsT> = props => {
  const { open, onClose } = props;
  const [template, setTemplate] = useState<string>('');
  const [level, setLevel] = useState<string[]>(['0', '1']);

  return (
    <Dialog maxWidth="xl" fullWidth onClose={() => onClose(false)} open={open}>
      <div className={styles.gameModalWrapper}>
        <div className={styles.gameModalWrapper_settings}>
          <section>
            <div>
              <span className={styles.title}>
                Наименование шаблона
                <div className={styles.inputBlock}>
                  <InformationItem
                    variant="input"
                    value={template}
                    onChange={setTemplate}
                    placeholder="Шаблон 1"
                  />
                </div>
              </span>
            </div>
            <div>
              <span className={styles.title}>Настройка уровней</span>
            </div>
            <div className={styles.inputBlock}>
              <div>
                <InformationItem
                  title="Уровней от"
                  variant="numberInput"
                  value={level[0]}
                  onChange={e => setLevel([e, level[1]])}
                />
              </div>
              <div>
                <InformationItem
                  title="до"
                  variant="numberInput"
                  value={level[1]}
                  onChange={e => setLevel([level[0], e])}
                />
              </div>
            </div>
            <div className={styles.inputBlock}>
              <div>
                <InformationItem
                  title="Шариков от"
                  variant="numberInput"
                  value="1234"
                  // onChange={}
                />
              </div>
              <div>
                <InformationItem
                  title="до"
                  variant="numberInput"
                  value="1234"
                  // onChange={}
                />
              </div>
            </div>
            <div className={styles.inputBlock}>
              <div>
                <InformationItem
                  title="Миганий от"
                  variant="numberInput"
                  value="1234"
                  // onChange={}
                />
              </div>
              <div>
                <InformationItem
                  title="до"
                  variant="numberInput"
                  value="1234"
                  // onChange={}
                />
              </div>
            </div>
            <div className={styles.inputBlock}>
              <div>
                <InformationItem
                  title="Скорость от"
                  variant="numberInput"
                  value="1234"
                  // onChange={}
                />
              </div>
              <div>
                <InformationItem
                  title="до"
                  variant="numberInput"
                  value="1234"
                  // onChange={}
                />
              </div>
            </div>
            <div className={styles.inputBlock}>
              <div>
                <InformationItem
                  title="Время выполнения"
                  variant="numberInput"
                  value="1234"
                  // onChange={}
                />
              </div>
              <div>
                <InformationItem
                  title=" "
                  variant="numberInput"
                  value="1234"
                  // onChange={}
                />
              </div>
            </div>
          </section>

          <section>
            <span className={styles.title}>Начисление баллов</span>
            <div className={styles.choiceInput}>
              <InputRadio
                value="eachLevel"
                id="eachLevel"
                name="currentRadioValue"
                label="За каждый пройденный уровень"
                // onChange={handlerRadioChange}
                // checked={currentRadioValue === 'twoChildren'}
              />

              <InputRadio
                value="success"
                id="success"
                name="currentRadioValue"
                // onChange={handlerRadioChange}
                // checked={currentRadioValue === 'firstPayment'}
                label="Баллы за прыжок (начисляется если был прыжок и уровень пройден после прыжка)"
              />

              <InputRadio
                value="error"
                id="error"
                name="currentRadioValue"
                // onChange={handlerRadioChange}
                // checked={currentRadioValue === 'registration'}
                label="Если ошибка, после прыжка, игру возвращаем на предыдущий уровень (штрафа нет)"
              />
            </div>
          </section>
        </div>

        <div className={styles.descriptionBlock}>
          <span className={styles.descriptionBlock_header}>память и ритм</span>
          <TextEditor
            onChange={date => {
              let allText = '';
              date?.blocks?.forEach((item: any) => {
                allText += item.text;
              });
              // setDescriptions(allText);
            }}
            // defaultText={description}
          />
        </div>
      </div>
    </Dialog>
  );
};
