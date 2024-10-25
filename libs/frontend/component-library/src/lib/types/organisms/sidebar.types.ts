export type SidebarItem = {
    id: string;
    label: string;
    icon: string;
};

export type SidebarCategoryItem = {
    id: string;
    label: string;
    items: SidebarItem[];
};
