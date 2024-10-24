export const ComponentThemes: Record<ComponentTheme, ComponentTheme> = {
    primary: 'primary',
    secondary: 'secondary',
    neutral: 'neutral',
    accent: 'accent',
    info: 'info',
    error: 'error',
    success: 'success'
};

export type ComponentTheme =
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'error'
    | 'success';

export const ComponentSizes: Record<ComponentSize, ComponentSize> = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl'
};

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
