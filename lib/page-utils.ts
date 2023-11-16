export const generatePageTitle = (entity: string, action?: string) => {
  const baseTitle =
    entity.toLowerCase() === "property" ? "le bien" : "l'option";

  switch (action) {
    case "create":
      return `Créer ${baseTitle}`;
    case "edit":
      return `Editer ${baseTitle}`;
    default:
      if (!action) {
        if (entity == "property") return `Tous les biens`;
        return `Toutes les options`;
      }
  }
};
