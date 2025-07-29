export const getIsActive = (includeInactive: boolean) => {
  if (includeInactive) {
    return undefined;
  }
  return true;
};
