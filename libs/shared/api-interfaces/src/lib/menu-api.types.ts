export enum MenuItemType {
    Cocktail = 'Cocktail'
}

export type MenuItem = {
    id: string;
    name: string;
    description: string;
    type: MenuItemType;
};
