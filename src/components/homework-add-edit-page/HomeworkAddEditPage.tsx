import { useEffect, useState } from 'react';

import worksStore from '@app/stores/WorksStore';
import { HomeworkType } from '@app/types/HomeworkTypes';
import { PresetT } from '@app/types/WorkTypes';
import CustomButton from '@components/custom-button/CustomButton';
import SampleBlock, { OptionsT } from '@components/homework-add-edit-page/SampleBlock/SampleBlock';
import InformationItem from '@components/information-item/InformationItem';
import { groupLevel, pattern } from '@components/moks-data/moks-data-addHomeWork';
import Step from '@components/step/Step';
import TextEditor from '@components/text-editor/TextEditor';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { SingleValue } from 'react-select';

import styles from './HomeworkAddEditPage.module.scss';

enum GroupLevels {
  Low = 'Младшая группа',
  Middle = 'Средняя группа',
  High = 'Старшая группа',
}
const levelOptions = Object.values(GroupLevels).map(el => ({ value: el, label: el }));

const games = [
  { label: 'Game 1', value: '1ecf31fb-222b-6204-8413-076f8e3360c0' },
  { label: 'Game 2', value: '1ecf31bd-b244-6f90-bb56-97d57702980c' },
];

const HomeworkAddEditPage = observer(() => {
  const { getPresets, presets } = worksStore;

  const router = useRouter();
  const [title, setTitle] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const onLoad = async () => {
    // запрос за играми и пресетами
    await getPresets();
    setIsLoaded(true);
  };
  const ar: (SingleValue<OptionsT> & { index: number })[] = [];
  const handleSelectLevel = (value: SingleValue<OptionsT>) => {
    value && setLevel(value.value);
  };
  const onSelectPattern = (value: SingleValue<OptionsT> & { index: number }) => {
    if (value) {
      const searchedIndex = ar.findIndex(el => el.index === value.index);
      if (searchedIndex !== -1) {
        ar.splice(searchedIndex, 1);
      }
      ar.push(value);
    }
  };
  const onSubmit = () => {
    const res: HomeworkType = {
      title,
      description,
      groupLevel: level,
      gameTemplates: ar.map(el => el.value),
    };
    // request
    console.log(res);
  };
  useEffect(() => {
    onLoad();
  }, []);
  return !isLoaded ? (
    <>Loading...</>
  ) : (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.homeWork}>
          <h1>Домашнее задание</h1>
          <div>
            <InformationItem
              title="Название"
              variant="input"
              placeholder="Младшая"
              value={title}
              onChange={setTitle}
            />
          </div>
          <div className={styles.level}>
            <InformationItem
              title="Уровень группы*"
              variant="select"
              option={levelOptions}
              placeholder="Младшая"
              onChangeSelect={handleSelectLevel}
            />
          </div>
          <div className={styles.editorWrapper}>
            {/* <h3>Описание</h3> */}
            <InformationItem
              title="Описание"
              variant="input"
              placeholder="Младшая"
              value={description}
              onChange={setDescription}
            />
            {/* <TextEditor /> */}
          </div>
        </div>
        <div className={styles.sample}>
          <div className={styles.sampleChoice}>
            <SampleBlock
              games={games}
              patterns={presets}
              onSelectPattern={onSelectPattern}
              index={0}
            />
            <SampleBlock
              games={games}
              patterns={presets}
              onSelectPattern={onSelectPattern}
              index={1}
            />
          </div>
          <div className={styles.sampleChoice}>
            <SampleBlock
              games={games}
              patterns={presets}
              onSelectPattern={onSelectPattern}
              index={2}
            />
            <div className={`${styles.sampleBlock} ${styles.sampleAdd}`}>
              <div>
                <button onClick={() => console.log('заглушка')}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeBtn}>
        <CustomButton onClick={onSubmit}>Сохранить</CustomButton>
        <div>
          <Step countStep={7} />
        </div>
      </div>
    </div>
  );
});

export default HomeworkAddEditPage;
