// ignore-loader.js
import React, { Component } from 'react';

import { PropsDefault as Game2048PropsDefault, Component as Game2048Component } from './games/2048';
import { PropsDefault as MentalPropsDefault, Component as MentalComponent } from './games/mental';
import {
  PropsDefault as SchultePropsDefault,
  Component as SchulteComponent,
} from './games/schulte';
import {
  PropsDefault as ShiftVerticalPropsDefault,
  Component as ShiftVerticalComponent,
} from './games/shift-vertical';

export const GameList = {
  shulte: {
    name: 'Таблица Шульте',
    component: SchulteComponent,
    props: SchultePropsDefault,
  },
  '2048': {
    name: 'Игра 2048',
    component: Game2048Component,
    props: Game2048PropsDefault,
  },
  mental: {
    name: 'Ментальный счет',
    component: MentalComponent,
    props: MentalPropsDefault,
  },
  verticalShift: {
    name: 'Сдвиг по вертикали',
    component: ShiftVerticalComponent,
    props: ShiftVerticalPropsDefault,
  },
};

export function factory(name: any) {
  const TempGameList: any = GameList;

  if (typeof TempGameList[name] === 'undefined') {
    throw 'Not found game';
  }

  const GameInstance = TempGameList[name];
  const GameInstanceComponent = GameInstance.component;

  return (props: any) => {
    const propsFull = {
      ...GameInstance.props,
      ...props,
    };

    return <GameInstanceComponent {...propsFull} />;
  };
}
