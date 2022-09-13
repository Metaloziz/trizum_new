import gamesStore from 'app/stores/gamesStore';
import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import { InputRadio } from 'components/inputRadio/InputRadio';
import { Dialog } from 'components/rate/ui/Dialog';
import TextEditor from 'components/text-editor/TextEditor';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './gameModal.module.scss';

type PropsT = {
  open: boolean;
  onClose: (value: boolean) => void;
};
const defaultInputTextReader =
  'И нет сомнений, что некоторые особенности внутренней политики, превозмогая сложившуюся непростую экономическую ситуацию, ограничены исключительно образом мышления. Вот вам яркий пример современных тенденций - существующая теория позволяет оценить значение системы массового участия!';

export const GameModal: FC<PropsT> = observer(props => {
  const { open, onClose } = props;
  const { createPresets, gamePreset, editPreset, game, getPreset } = gamesStore;

  const settings = gamePreset?.gamePreset?.settings[0];
  const gamePresetName = gamePreset?.gamePreset?.name;
  const [template, setTemplate] = useState<string>(gamePresetName || '');
  const [timeComplete, setTimeComplete] = useState<string>(
    settings?.timeComplete?.toString() || '0',
  );
  const [elementsTotal, setElementsTotal] = useState<string>(
    settings?.elementsTotal?.toString() || '0',
  );
  const [description, setDescription] = useState<string>(defaultInputTextReader);
  const [currentRadio, setCurrentRadio] = useState<string>('eachLevel');

  useEffect(() => {
    setTemplate(gamePresetName);
    setTimeComplete(settings?.timeComplete?.toString());
    setElementsTotal(settings?.elementsTotal?.toString());
  }, [gamePreset]);

  const onCreatePreset = () => {
    createPresets({
      gameCode: game.code,
      name: template,
      settings: [
        {
          timeComplete: Number(timeComplete),
          elementsTotal: Number(elementsTotal),
        },
      ],
    });
  };

  const onEditPreset = () => {
    editPreset({
      name: template,
      settings: [
        {
          timeComplete: Number(timeComplete),
          elementsTotal: Number(elementsTotal),
        },
      ],
    });
  };

  const savePreset = () => {
    if (gamePreset.gamePreset.id) {
      onEditPreset();
    } else {
      onCreatePreset();
    }
    onClose(false);
  };
  return (
    <Dialog maxWidth="xl" fullWidth onClose={() => onClose(false)} open={open}>
      <div className={styles.gameModalWrapper}>
        <div className={styles.gameModalWrapper_settings}>
          <section>
            <span className={styles.title}>
              Наименование шаблона
              <div className={styles.inputBlock}>
                <InformationItem
                  variant="input"
                  value={template}
                  className={styles.presetNameInput}
                  onChange={setTemplate}
                  placeholder="Шаблон 1"
                />
              </div>
            </span>
            <span className={styles.title}>Настройка уровней</span>
            <div className={styles.inputBlock}>
              <div>
                <InformationItem
                  title="Необходимое количество баллов"
                  variant="numberInput"
                  value={elementsTotal}
                  onChange={setElementsTotal}
                />
              </div>
            </div>
            <div className={styles.inputBlock}>
              <div>
                <InformationItem
                  title="Время выполнения"
                  variant="numberInput"
                  value={timeComplete}
                  onChange={setTimeComplete}
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
                onChange={() => setCurrentRadio('eachLevel')}
                checked={currentRadio === 'eachLevel'}
              />

              <InputRadio
                value="success"
                id="success"
                name="currentRadioValue"
                onChange={() => setCurrentRadio('success')}
                checked={currentRadio === 'success'}
                label="Баллы за прыжок (начисляется если был прыжок и уровень пройден после прыжка)"
              />

              <InputRadio
                value="error"
                id="error"
                name="currentRadioValue"
                onChange={() => setCurrentRadio('error')}
                checked={currentRadio === 'error'}
                label="Если ошибка, после прыжка, игру возвращаем на предыдущий уровень (штрафа нет)"
              />
            </div>
            <div className={styles.conditionBlock}>
              <div>
                Если выполняет <InformationItem variant="numberInput" /> уровня подряд за
                <InformationItem variant="numberInput" />
              </div>
              <div>
                и <InformationItem variant="numberInput" />% ошибок, то система ПРЕДЛАГАЕТ поднять
                на
              </div>
              <div>
                <InformationItem variant="numberInput" />
                уровней один раз.
              </div>
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
              setDescription(allText);
            }}
            defaultText={description}
          />
        </div>
      </div>
      <div className={styles.btn}>
        <Button
          disabled={gamePreset.gamePreset.status === 'active' || template.length < 1}
          onClick={savePreset}
        >
          Сохранить
        </Button>
      </div>
    </Dialog>
  );
});
