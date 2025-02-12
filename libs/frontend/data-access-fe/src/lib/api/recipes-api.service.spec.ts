import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createMockDataAccessInitialState } from '../state/_mocks/state.mocks';
import { RecipesApiService } from './recipes-api.service';
import { RecipesSelectors } from '../state/recipes/recipes.selectors';
import {
    createMockCreateRecipeDto,
    createMockRecipeDto,
    createMockUpdateRecipeDto,
    RecipeDto
} from '@sanctumlab/api-interfaces';
import { cold } from 'jest-marbles';
import { RecipesActions } from '../state/recipes/recipes.actions';

describe('RecipeApiService', () => {
    const initialState = createMockDataAccessInitialState();
    let service: RecipesApiService;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState
                }),
                RecipesApiService
            ]
        });
        service = TestBed.inject(RecipesApiService);
        store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve recipes', () => {
        const expectedRecipes: RecipeDto[] = [
            createMockRecipeDto({ id: '1234' })
        ];

        const mockSelect = RecipesSelectors.selectRecipes();
        jest.spyOn(RecipesSelectors, 'selectRecipes').mockImplementation(
            () => mockSelect
        );
        store.overrideSelector(mockSelect, expectedRecipes);
        store.refreshState();

        const expected = cold('(a)', { a: expectedRecipes });
        expect(service.retrieveRecipesStream()).toBeObservable(expected);
    });

    it('should retrieve recipes is loading stream', () => {
        const expectedResponse = false;

        const mockSelect = RecipesSelectors.selectRecipesStateLoading();
        jest.spyOn(
            RecipesSelectors,
            'selectRecipesStateLoading'
        ).mockImplementation(() => mockSelect);
        store.overrideSelector(mockSelect, expectedResponse);
        store.refreshState();

        const expected = cold('(a)', { a: expectedResponse });
        expect(service.retrieveRecipesIsLoadingStream()).toBeObservable(
            expected
        );
    });

    it('should retrieve recipe by id stream', () => {
        const targetId = '1234';
        const expectedResponse = createMockRecipeDto({ id: targetId });

        const mockSelect = RecipesSelectors.selectRecipeById(targetId);
        jest.spyOn(RecipesSelectors, 'selectRecipeById').mockImplementation(
            () => mockSelect
        );
        store.overrideSelector(mockSelect, expectedResponse);
        store.refreshState();

        const expected = cold('(a)', { a: expectedResponse });
        expect(service.retrieveRecipeByIdStream(targetId)).toBeObservable(
            expected
        );
    });

    it('should retrieve current recipe stream', () => {
        const expectedResponse = createMockRecipeDto();

        const mockSelect = RecipesSelectors.selectCurrentRecipe();
        jest.spyOn(RecipesSelectors, 'selectCurrentRecipe').mockImplementation(
            () => mockSelect
        );
        store.overrideSelector(mockSelect, expectedResponse);
        store.refreshState();

        const expected = cold('(a)', { a: expectedResponse });
        expect(service.retrieveCurrentRecipeStream()).toBeObservable(expected);
    });

    it('should dispatch retrieve recipe list', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendRetrieveRecipeList();
        expect(dispatchSpy).toHaveBeenCalledWith(
            RecipesActions.getRecipeList()
        );
    });

    it('should dispatch retrieve recipe by id', () => {
        const payload = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendRetrieveRecipeById(payload);
        expect(dispatchSpy).toHaveBeenCalledWith(
            RecipesActions.getRecipeById({ id: payload })
        );
    });

    it('should dispatch create recipe', () => {
        const payload = createMockCreateRecipeDto();
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendCreateRecipe(payload);
        expect(dispatchSpy).toHaveBeenCalledWith(
            RecipesActions.createRecipe({ recipe: payload })
        );
    });

    it('should dispatch update recipe', () => {
        const payloadId = '1234';
        const payloadBody = createMockUpdateRecipeDto();
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendUpdateRecipe(payloadId, payloadBody);
        expect(dispatchSpy).toHaveBeenCalledWith(
            RecipesActions.updateRecipe({
                recipe: payloadBody,
                id: payloadId
            })
        );
    });

    it('should dispatch remove recipe', () => {
        const payloadId = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendRemoveRecipe(payloadId);
        expect(dispatchSpy).toHaveBeenCalledWith(
            RecipesActions.removeRecipe({
                id: payloadId
            })
        );
    });

    it('should dispatch set current recipe', () => {
        const payloadId = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendSetCurrentRecipe(payloadId);
        expect(dispatchSpy).toHaveBeenCalledWith(
            RecipesActions.setCurrentRecipe({
                id: payloadId
            })
        );
    });

    it('should dispatch unset current recipe', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendUnsetCurrentRecipe();
        expect(dispatchSpy).toHaveBeenCalledWith(
            RecipesActions.unsetCurrentRecipe()
        );
    });
});
