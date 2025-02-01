import { matLocalGroceryStoreRound } from '@ng-icons/material-icons/round';
import {
    matClose,
    matDelete,
    matLocalBar,
    matMenu,
    matPlus,
    matQrCode,
    matWarning,
    matCake,
    matLocalCafe,
    matEgg,
    matRamenDining,
    matSoupKitchen,
    matKebabDining,
    matLiquor,
    matEco,
    matSetMeal,
    matLocalDining,
    matDinnerDining,
    matLunchDining,
    matQuestionMark
} from '@ng-icons/material-icons/baseline';

export type LibraryIcon = {
    id: string;
    label: string;
};

export const LibraryIcons: Record<string, string> = {
    matLocalGroceryStoreRound,
    matLocalBar,
    matMenu,
    matClose,
    matDelete,
    matPlus,
    matWarning,
    matQrCode,
    matCake,
    matLocalCafe,
    matEgg,
    matRamenDining,
    matSoupKitchen,
    matKebabDining,
    matLiquor,
    matEco,
    matSetMeal,
    matLocalDining,
    matDinnerDining,
    matLunchDining,
    matQuestionMark
};

export const SpecialIcons: Record<string, string> = {
    matQuestionMark
};

export const LibraryIconsOptions: LibraryIcon[] = Object.keys(LibraryIcons)
    .filter(key => SpecialIcons[key] !== undefined)
    .map(key => ({
        id: key,
        label: key.replace('mat', '')
    }));
