export const navScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId.replace('#', ''));
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
    });
  }
};
