export const userDTO = (user) => {
  if (!user) return null;

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company ? { id: user.company._id, name: user.company.name } : null,
    createdAt: user.createdAt,
  };
};
