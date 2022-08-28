import React, { FC, useEffect, useState } from 'react';

import { PresetT } from 'app/types/WorkTypes';
import { PresetWithOrderT } from 'components/homework-add-edit-page/HomeworkAddEditPage';
import styles from 'components/homework-add-edit-page/HomeworkAddEditPage.module.scss';
import CustomSelect from 'components/select/CustomSelect';
import { OptionT } from 'app/types/OptionT';

type Props = {
  index: number;
  games: OptionT[];
  patterns: PresetT[];
  onSelectPattern: (patternId: PresetWithOrderT) => void;
};

const SampleBlock: FC<Props> = props => {
  const { patterns, games, onSelectPattern, index } = props;
  const [templates, setTemplates] = useState<OptionT[]>();
  const [currentGame, setCurrentGame] = useState(games[0]);
  const [currentPattern, setCurrentPattern] = useState<OptionT>();
  const onSelectGame = (value: OptionT) => {
    setCurrentGame(value);
    const result = patterns
      .filter(el => el.gameId === value.value)
      .map(el => ({ value: el.id, label: el.name }));
    setTemplates(result);
  };
  const handleSelectPattern = (value: OptionT) => {
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
