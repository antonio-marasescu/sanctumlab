import { FormControlStatus } from '@angular/forms';

export const InputState: Record<FormControlStatus, FormControlStatus> = {
    VALID: 'VALID',
    INVALID: 'INVALID',
    PENDING: 'PENDING',
    DISABLED: 'DISABLED'
};
