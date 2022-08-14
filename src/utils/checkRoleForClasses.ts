import { Roles } from 'app/stores/appStore';

export const checkRoleForClasses = (role: Roles) => {
  switch (role) {
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
      return true;
    default:
      return false;
  }
  // return !!(role === Roles.Admin || Roles.FranchiseeAdmin || Roles.Franchisee);
};
