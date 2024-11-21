export type InputStateType = 'Valid' | 'Invalid' | 'Disabled';

export const InputState: Record<InputStateType, InputStateType> = {
    Valid: 'Valid',
    Invalid: 'Invalid',
    Disabled: 'Disabled'
};
