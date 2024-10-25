import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';
import { MenuAvatarComponent } from '../../molecules/menu-avatar/menu-avatar.component';
import { ThemeChangerComponent } from '../../atoms/theme-changer/theme-changer.component';

const meta: Meta<SidebarComponent> = {
    component: SidebarComponent,
    title: 'Organisms/Sidebar',
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [MenuAvatarComponent, ThemeChangerComponent]
        })
    ],
    render: args => ({
        template: `
          <ngx-clib-sidebar [logoUrl]="logoUrl" [title]="title" [itemCategories]="itemCategories">
            <div theme>
                <ngx-clib-theme-changer />
            </div>
            <div avatar>
                <ngx-clib-menu-avatar [isPlaceholder]="true" placeholder="AM" size="xs" [items]="avatarItems" [rightSide]="true"/>
            </div>
            <div style="width: 100%; height: 360px; background: #0fa6ec; display: flex; justify-content: center; align-items: center; color: #e8e7e7" content>Content</div>
          </ngx-clib-sidebar>
        `,
        props: {
            ...args,
            avatarItems: [
                { id: 'login', label: 'Login' },
                { id: 'logout', label: 'Logout' }
            ]
        }
    })
};
export default meta;
type Story = StoryObj<SidebarComponent>;

export const Primary: Story = {
    args: {
        logoUrl: 'assets/logo-bg.png',
        title: 'Sanctum Lab',
        itemCategories: [
            {
                id: 'menus',
                label: 'Menus',
                items: [
                    {
                        id: 'nav-cocktail',
                        icon: 'matLocalBar',
                        label: 'Cocktails'
                    },
                    {
                        id: 'nav-snacks',
                        icon: 'matLocalGroceryStoreRound',
                        label: 'Snacks'
                    }
                ]
            }
        ]
    }
};
