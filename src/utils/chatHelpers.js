export const generateSideButtonClass = isActive => {
  return `
    w-16 h-16 transition-all duration-300 ease-in shadow-lg shadow-primary/30 rounded-full relative
    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
  `;
};
