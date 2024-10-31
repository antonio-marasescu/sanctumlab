import { FormControl } from '@angular/forms';

export type GuestForm = {
    code: FormControl<string>;
};

export type AdminForm = {
    username: FormControl<string>;
    password: FormControl<string>;
};
