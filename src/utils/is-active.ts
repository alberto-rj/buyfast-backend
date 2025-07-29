export const canIncludeInactive = (includeInactive?: boolean) => {
  if (includeInactive) {
    return undefined;
  }
  return true;
};

export const canExcludeInactive = (excludeActive?: boolean) => {
  if (excludeActive) {
    return undefined;
  }
  return false;
};
