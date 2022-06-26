import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';

import coursesStore from '@app/stores/coursesStore';
import worksStore from '@app/stores/WorksStore';
import { HomeworkType } from '@app/types/HomeworkTypes';
import { CourseObjT, WorkObjT } from '@app/types/UserTypes';
import { PresetT } from '@app/types/WorkTypes';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import SampleBlock, { OptionsT } from '@components/homework-add-edit-page/SampleBlock/SampleBlock';
import InformationItem from '@components/information-item/InformationItem';
import { groupLevel, pattern } from '@components/moks-data/moks-data-addHomeWork';
import CustomSelect, { Option } from '@components/select/CustomSelect';
import Step from '@components/step/Step';
import TextEditor from '@components/text-editor/TextEditor';
import TextField from '@components/text-field/TextField';
import { Routes } from '@constants/Routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { ActionMeta, GroupBase, SingleValue } from 'react-select';
import * as yup from 'yup';

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
type DefaultValues = {
  title: string;
  level: Option;
};

const defaultValues: DefaultValues = {
  title: '',
  level: levelOptions[0],
};

const HomeworkAddEditPage = observer(() => {
  const { getPresets, presets } = worksStore;

  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(!coursesStore.newCourse);
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [index, setIndex] = useState(0);
  const hwAr: MutableRefObject<WorkObjT[]> = useRef([]);
  const schema = yup.object().shape({
    title: yup.string().required('Обязательное поле'),
    level: yup.object().required('Обязательное поле'),
  });
  const {
    register,
    handleSubmit,
    control,
    resetField,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });
  const onChangeVisibility = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeLevel = (option: Option) => {
    setLevel(option.label);
  };
  const onAddHWClick = () => {
    coursesStore.setNewCourse({ level, title });
    router.push(`${Routes.Homework}/add`);
  };

  const onLoad = async () => {
    // запрос за играми и пресетами
    await getPresets();
    setIsLoaded(true);
  };
  let presetsAr: (SingleValue<OptionsT> & { index: number })[] = [];

  const onSelectPattern = (value: SingleValue<OptionsT> & { index: number }) => {
    if (value) {
      const searchedIndex = presetsAr.findIndex(el => el.index === value.index);
      if (searchedIndex !== -1) {
        presetsAr.splice(searchedIndex, 1);
      }
      presetsAr.push(value);
    }
  };

  const onSave = (values: DefaultValues) => {
    const qwe = {
      type: 'homework',
      index,
      work: {
        title: values.title,
        groupLevel: values.level.label,
        description,
        gamePresets: presetsAr.map(el => el.value),
      },
    };
    hwAr.current.push(qwe);
    setDescription('');
    setIndex(idx => idx + 1);
    presetsAr = [];
    reset({});
    console.log(qwe);
  };
  const onSubmit = () => {
    if (coursesStore.newCourse) {
      const qwe: CourseObjT = {
        title: coursesStore.newCourse.title,
        groupLevel: coursesStore.newCourse.level,
        creationDate: moment(new Date()).format('DD.MM.yyyy'),
        description: '',
        hw: hwAr.current,
      };
      console.log(qwe);
    }
  };
  useEffect(() => {
    onLoad();
  }, []);
  return !isLoaded ? (
    <>Loading...</>
  ) : (
    <div className={styles.content}>
      {!coursesStore.newCourse && (
        <BasicModal visibility={isModalOpen} changeVisibility={onChangeVisibility}>
          <div className={styles.modalWrapper}>
            <TextField
              onChange={onTitleChange}
              placeholder="Название курса..."
              value={title}
              label="Название курса"
            />
            <CustomSelect
              value={levelOptions[0]}
              options={levelOptions}
              placeholder="Уровень группы"
              onChange={onChangeLevel}
            />
            <CustomButton onClick={onAddHWClick}>Добвить домашку</CustomButton>
          </div>
        </BasicModal>
      )}
      {coursesStore.newCourse && (
        <>
          <h3>Курс: {coursesStore.newCourse.title}</h3>
          <div className={styles.innerContent}>
            <div className={styles.homeWork}>
              <h1>Домашнее задание</h1>
              <Controller
                name="title"
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Название..."
                    label="Название"
                    error={errors.title?.message}
                  />
                )}
                control={control}
              />
              <Controller
                name="level"
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={levelOptions}
                    title="Уровень группы*"
                    placeholder="Младшая"
                    error={errors.level?.label as unknown as string}
                  />
                )}
                control={control}
              />
              <div className={styles.editorWrapper}>
                {/* <h3>Описание</h3> */}
                <TextField
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Описание..."
                  label="Описание"
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
                  index={2}
                />
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
            <CustomButton onClick={handleSubmit(onSave)}>Сохранить</CustomButton>
            <CustomButton onClick={onSubmit}>Отправить</CustomButton>
            <div>
              <Step countStep={7} />
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default HomeworkAddEditPage;
