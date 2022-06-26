import React, { FC, useState } from 'react';

import { PresetT } from '@app/types/WorkTypes';
import styles from '@components/homework-add-edit-page/HomeworkAddEditPage.module.scss';
import InformationItem from '@components/information-item/InformationItem';
import { Option } from '@components/select/CustomSelect';
import { SingleValue } from 'react-select';

export type OptionsT = { value: string; label: string };

type Props = {
  index: number;
  games: OptionsT[];
  patterns: PresetT[];
  onSelectPattern: (patternId: Option & { index: number }) => void;
};

const SampleBlock: FC<Props> = props => {
  const { patterns, games, onSelectPattern, index } = props;
  const [templates, setTemplates] = useState<OptionsT[]>();
  const [currentGame, setCurrentGame] = useState('');
  const [currentPattern, setCurrentPattern] = useState('');
  const onSelectGame = (value: SingleValue<OptionsT>) => {
    value && setCurrentGame(value.label);
    const qwe = value ? patterns.filter(el => el.gameId === value.value) : [];
    const res = qwe.map(el => ({ value: el.id, label: el.name }));
    setTemplates(res);
  };
  const handleSelectPattern = (value: SingleValue<OptionsT>) => {
    value && onSelectPattern({ ...value, index });
    value && setCurrentPattern(value.label);
  };
  return (
    <div className={styles.sampleBlock}>
      <InformationItem
        title="Игра"
        variant="select"
        option={games}
        value={currentGame}
        placeholder="Память и ритм"
        onChangeSelect={onSelectGame}
      />
      <InformationItem
        title="Шаблон"
        variant="select"
        value={currentPattern}
        option={templates}
        placeholder="Память и ритм"
        onChangeSelect={handleSelectPattern}
      />
    </div>
  );
};

export default SampleBlock;
