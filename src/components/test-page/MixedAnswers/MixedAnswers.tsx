import { ChangeEvent, FC } from 'react';

import { observer } from 'mobx-react-lite';

import { VariantAnswer } from 'pages/testing/variantAnswer/VariantAnswer';

type MixedAnswersPropsT = {
  mixedAnswer: string[];
  setCurrentRadioValue: (value: string) => void;
  currentRadioValue: string;
};
export const MixedAnswers: FC<MixedAnswersPropsT> = observer(
  ({ mixedAnswer, setCurrentRadioValue, currentRadioValue }) => {
    const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentRadioValue(e.currentTarget.value);
    };

    return (
      <div>
        {mixedAnswer.map(variant => (
          <VariantAnswer
            key={variant}
            onChange={handlerRadioChange}
            currentRadioValue={currentRadioValue}
            value={variant}
          />
        ))}
      </div>
    );
  },
);
