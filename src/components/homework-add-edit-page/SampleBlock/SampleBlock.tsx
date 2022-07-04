import React, { FC, useEffect, useState } from 'react';

import { PresetT } from 'app/types/WorkTypes';
import { PresetWithOrderT } from 'components/homework-add-edit-page/HomeworkAddEditPage';
import styles from 'components/homework-add-edit-page/HomeworkAddEditPage.module.scss';
import CustomSelect, { Option } from 'components/select/CustomSelect';

type Props = {
  index: number;
  games: Option[];
  patterns: PresetT[];
  onSelectPattern: (patternId: PresetWithOrderT) => void;
};

const SampleBlock: FC<Props> = props => {
  const { patterns, games, onSelectPattern, index } = props;
  const [templates, setTemplates] = useState<Option[]>();
  const [currentGame, setCurrentGame] = useState(games[0]);
  const [currentPattern, setCurrentPattern] = useState<Option>();
  const onSelectGame = (value: Option) => {
    setCurrentGame(value);
    const result = patterns
      .filter(el => el.gameId === value.value)
      .map(el => ({ value: el.id, label: el.name }));
    setTemplates(result);
  };
  const handleSelectPattern = (value: Option) => {
    onSelectPattern({ ...value, index });
    setCurrentPattern(value);
  };
  useEffect(() => {
    onSelectGame(games[0]);
  }, []);
  useEffect(() => {
    onSelectGame(games[0]);
    setCurrentGame(games[0]);
    setCurrentPattern(undefined);
  }, [games]);

  return (
    <div className={styles.sampleBlock}>
      <CustomSelect
        onChange={onSelectGame}
        options={games}
        title="Игра"
        value={currentGame}
        placeholder="Память и ритм"
      />
      <CustomSelect
        onChange={handleSelectPattern}
        options={templates || []}
        title="Шаблон"
        value={currentPattern}
        placeholder="Память и ритм"
      />
    </div>
  );
};

export default SampleBlock;
