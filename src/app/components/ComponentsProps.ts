// Containers

export interface WeeklyGrowthProps {
  className?: string;
  weeklyGrowth: SkillGrowProps[];
}
export interface HomeworksProps {
  className?: string;
  homeworks: HomeworkProps[];
}

export interface KeepPlayingProps {
  className?: string;
  games: KeepPlayingItemProps[];
}

// Components

export interface KeepPlayingItemProps {
  title: string;
  minutesLeft: number;
  colorTheme: string;
  id: number;
}
export interface HomeworkProps {
  className?: string;
  gameTitle: string;
  description: {
    minutesLeft: number;
    needToDo: string;
    tips: {
      text: string;
      id: number;
    }[];
  };
  id: number;
}
export interface SkillGrowProps {
  skillTitle: string;
  color: string;
  percents: number;
  id: number;
}
export interface PanelProps {
  children: string;
  className?: string;
}
