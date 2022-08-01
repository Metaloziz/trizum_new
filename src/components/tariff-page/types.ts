import { TariffsType } from '../../app/types/TariffTypes';

export type StoreTariffType = {
  tariffs: TariffsType[];
  isDialogOpen: boolean;
  editingEntity: TariffsType;
  addOrEdit: Function;
  getTariffs: Function;
  openDialog: () => void;
  closeDialog: () => void;
};
