import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import Image from 'components/image/Image';
import { observer } from 'mobx-react-lite';
import React, { Component } from 'react';

import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';

import { Factory } from '../../games';

import styles from './Game.module.scss';
import Schulte from '../../assets/images/game/shulte.png';
import Play from '../../assets/images/game/play.svg';
import Two048 from '../../assets/images/game/2048.jpg';
import VerticalShift from '../../assets/images/game/vertical-shift.jpg';

type Props = Record<string, unknown>;

const Games = [
  {
    title: 'Сдвиг по вертикали',
    name: 'shift-vertical',
    prevImg: VerticalShift,
  },
  {
    title: 'Ментальный счет',
    name: 'mental',
    prevImg: Schulte,
  },
  {
    title: 'Таблица Шульте',
    name: 'schulte',
    prevImg: Schulte,
  },
  {
    title: '2048',
    name: 'Game2048',
    prevImg: Two048,
  },
];

class Game extends Component<any, any> {
  gameComponent: any;

  game: any;

  constructor(props: any) {
    super(props);
    const game = [Games[0].name];

    this.gameComponent = Factory(game);

    this.state = {
      started: false,
      game,
    };
  }

  onEnd = (result: any) => {
    this.setState(
      {
        started: false,
      },
      () => {
        const message = [`Ваше время: ${result.time} секунд`];

        if (result?.timeDiff) {
          message.push(`Среднее время: ${result.timeDiff} секунд`);
        }

        if (result?.score) {
          message.push(`Ваш результат: ${result.score}`);
        }

        if (result?.success) {
          message.push(`Правильных ответов: ${result.success}`);
        }

        if (result?.failed) {
          message.push(`Допущено ошибок: ${result.failed}`);
        }

        /* eslint-disable no-alert */
        alert(message.join('\n'));
      },
    );
  };

  onStart = () => {
    this.setState(
      {
        started: true,
      },
      () => {
        this.game?.start();
      },
    );
  };

  onRefGame = (ref: any) => {
    this.game = ref;
  };

  setGame = (game: string) => () => {
    this.gameComponent = Factory(game);
    this.setState({
      started: false,
      game,
    });
  };

  render() {
    const { started = false, game } = this.state;
    const GameComponent = this.gameComponent;
    return (
      <div className={styles.innerContent}>
        <div className={styles.gameList}>
          {Games.map(gam => (
            <NavLink key={`game-${gam.name}`} to={gam.name}>
              <div className={styles.gameItem} onClick={this.setGame(gam.name)}>
                <div className={styles.gameItem_header}>
                  <span className={styles.gameItem_header_title}>{gam.title}</span>
                </div>
                <svg
                  className={styles.gameItem_settings}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.40466 1.05039C8.99186 -0.350129 7.00814 -0.350128 6.59534 1.05039L6.49523 1.39003C6.23147 2.2849 5.20935 2.70827 4.39008 2.26201L4.07913 2.09264C2.79692 1.39422 1.39422 2.79693 2.09264 4.07913L2.26201 4.39008C2.70827 5.20935 2.2849 6.23147 1.39003 6.49523L1.05039 6.59534C-0.350129 7.00814 -0.350128 8.99186 1.05039 9.40466L1.39003 9.50477C2.2849 9.76853 2.70827 10.7906 2.26201 11.6099L2.09264 11.9209C1.39422 13.2031 2.79692 14.6058 4.07913 13.9074L4.39008 13.738C5.20935 13.2917 6.23147 13.7151 6.49523 14.61L6.59534 14.9496C7.00814 16.3501 8.99186 16.3501 9.40466 14.9496L9.50477 14.61C9.76853 13.7151 10.7906 13.2917 11.6099 13.738L11.9209 13.9074C13.2031 14.6058 14.6058 13.2031 13.9074 11.9209L13.738 11.6099C13.2917 10.7906 13.7151 9.76853 14.61 9.50477L14.9496 9.40466C16.3501 8.99186 16.3501 7.00814 14.9496 6.59534L14.61 6.49523C13.7151 6.23147 13.2917 5.20935 13.738 4.39008L13.9074 4.07913C14.6058 2.79692 13.2031 1.39422 11.9209 2.09264L11.6099 2.26201C10.7906 2.70827 9.76853 2.2849 9.50477 1.39003L9.40466 1.05039ZM8 10.9288C6.38246 10.9288 5.07119 9.61754 5.07119 8C5.07119 6.38246 6.38246 5.07119 8 5.07119C9.61754 5.07119 10.9288 6.38246 10.9288 8C10.9288 9.61754 9.61754 10.9288 8 10.9288Z"
                    fill="#2E8DFD"
                  />
                </svg>

                <img className={styles.gameItem_play} src={Play} alt="" />
                {gam.prevImg && (
                  <Image
                    className={styles.gameItem_prevImg}
                    src={gam.prevImg}
                    alt="Previous Games"
                  />
                )}
              </div>
            </NavLink>
          ))}
        </div>
        <Routes>
          {Games.map(gam => (
            <Route
              key={gam.name}
              path={gam.name}
              element={
                <div className={styles.wrapGameBlock}>
                  <div className={styles.wrapGame}>
                    <GameComponent onRef={this.onRefGame} width={800} onEnd={this.onEnd} />
                    {!started && (
                      <div className={styles.overlay}>
                        <div className={styles.playButton} onClick={this.onStart}>
                          <span className={styles.playButtonText}>ИГРАТЬ</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.wrapGameBlock_footer}>
                    <span className={styles.wrapGameBlock_footer_title}>{gam.title}</span>
                    <span className={styles.wrapGameBlock_footer_desc}>
                      Сейчас ты увидишь таблицу. <br />
                      На ней будут расположены числа от 1 до 25. <br />
                      Абсолютно случайным образом! Кликни мышкой на все числа по порядку от 1 до 25
                      <br />
                      <br />
                      Постарайся делать быстро и без ошибок. <br />
                      Если ошибешься - цифра подсветится красным. <br />
                      Сверху от таблицы есть подсказка – какое число нужно найти следующим.
                    </span>
                  </div>
                </div>
              }
            />
          ))}
        </Routes>
      </div>
    );
  }
}

const GameWrapper = observer(() => {
  switch (appStore.role) {
    case Roles.Teacher:
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
    case Roles.Methodist:
    case Roles.Student:
      return <Game />;
    case Roles.TeacherEducation:
    case Roles.Tutor:
    case Roles.Unauthorized:
    default:
      return <Navigate to={AppRoutes.Index} />;
  }
});

export default GameWrapper;
