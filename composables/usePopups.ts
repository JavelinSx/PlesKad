export type PopupId = 'glossary' | 'faq' | 'laws' | 'privacy' | null;

export const useActivePopup = () => useState<PopupId>('activePopup', () => null);

export const usePopups = () => {
  const activePopup = useActivePopup();

  const open = (id: Exclude<PopupId, null>) => {
    activePopup.value = id;
  };

  const close = () => {
    activePopup.value = null;
  };

  return { activePopup, open, close };
};
