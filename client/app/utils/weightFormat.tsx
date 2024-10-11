export const formatWeight = (grams: number): string => {
    return `${grams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} g`;
  };
  