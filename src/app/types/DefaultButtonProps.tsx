import React from 'react';

export type DefaultButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'AnimationEvent' | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref' // todo нужны ли стандартные свойства кнопки и можно ли заменить на что-то красивое ? как передать компоненте дефолтные свойства из motion.button ?
>;
