export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false;
  if (user.roles?.includes('super_admin')) return true;
  return user.permissions.includes(permission);
};

export const hasAnyPermission = (user, permissions) => {
  if (!user || !user.permissions) return false;
  if (user.roles?.includes('super_admin')) return true;
  return permissions.some(p => user.permissions.includes(p));
};

export const filterMenuByPermission = (menuSections, user) => {
  return menuSections
    .map(section => ({
      ...section,
      items: section.items.filter(item => hasPermission(user, item.permission))
    }))
    .filter(section => section.items.length > 0);
};