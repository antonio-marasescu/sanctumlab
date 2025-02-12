import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createMockDataAccessInitialState } from '../state/_mocks/state.mocks';
import { IngredientsApiService } from './ingredients-api.service';
import { IngredientsSelectors } from '../state/ingredients/ingredients.selectors';
import {
    createMockCreateIngredientDto,
    createMockIngredientDto,
    createMockUpdateIngredientDto,
    IngredientDto
} from '@sanctumlab/api-interfaces';
import { cold } from 'jest-marbles';
import { IngredientsActions } from '../state/ingredients/ingredients.actions';

describe('IngredientApiService', () => {
    const initialState = createMockDataAccessInitialState();
    let service: IngredientsApiService;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState
                }),
                IngredientsApiService
            ]
        });
        service = TestBed.inject(IngredientsApiService);
        store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve ingredients', () => {
        const expectedIngredients: IngredientDto[] = [
            createMockIngredientDto({ id: '1234' })
        ];

        const mockSelect = IngredientsSelectors.selectIngredients();
        jest.spyOn(
            IngredientsSelectors,
            'selectIngredients'
        ).mockImplementation(() => mockSelect);
        store.overrideSelector(mockSelect, expectedIngredients);
        store.refreshState();

        const expected = cold('(a)', { a: expectedIngredients });
        expect(service.retrieveIngredientsStream()).toBeObservable(expected);
    });

    it('should retrieve ingredients is loading stream', () => {
        const expectedResponse = false;

        const mockSelect = IngredientsSelectors.selectIngredientsStateLoading();
        jest.spyOn(
            IngredientsSelectors,
            'selectIngredientsStateLoading'
        ).mockImplementation(() => mockSelect);
        store.overrideSelector(mockSelect, expectedResponse);
        store.refreshState();

        const expected = cold('(a)', { a: expectedResponse });
        expect(service.retrieveIngredientsIsLoadingStream()).toBeObservable(
            expected
        );
    });

    it('should retrieve ingredient by id stream', () => {
        const targetId = '1234';
        const expectedResponse = createMockIngredientDto({ id: targetId });

        const mockSelect = IngredientsSelectors.selectIngredientById(targetId);
        jest.spyOn(
            IngredientsSelectors,
            'selectIngredientById'
        ).mockImplementation(() => mockSelect);
        store.overrideSelector(mockSelect, expectedResponse);
        store.refreshState();

        const expected = cold('(a)', { a: expectedResponse });
        expect(service.retrieveIngredientByIdStream(targetId)).toBeObservable(
            expected
        );
    });

    it('should retrieve current ingredient stream', () => {
        const expectedResponse = createMockIngredientDto();

        const mockSelect = IngredientsSelectors.selectCurrentIngredient();
        jest.spyOn(
            IngredientsSelectors,
            'selectCurrentIngredient'
        ).mockImplementation(() => mockSelect);
        store.overrideSelector(mockSelect, expectedResponse);
        store.refreshState();

        const expected = cold('(a)', { a: expectedResponse });
        expect(service.retrieveCurrentIngredientStream()).toBeObservable(
            expected
        );
    });

    it('should dispatch retrieve ingredient list', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendRetrieveIngredientList();
        expect(dispatchSpy).toHaveBeenCalledWith(
            IngredientsActions.getIngredientList()
        );
    });

    it('should dispatch retrieve ingredient by id', () => {
        const payload = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendRetrieveIngredientById(payload);
        expect(dispatchSpy).toHaveBeenCalledWith(
            IngredientsActions.getIngredientById({ id: payload })
        );
    });

    it('should dispatch create ingredient', () => {
        const payload = createMockCreateIngredientDto();
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendCreateIngredient(payload);
        expect(dispatchSpy).toHaveBeenCalledWith(
            IngredientsActions.createIngredient({ ingredient: payload })
        );
    });

    it('should dispatch update ingredient', () => {
        const payloadId = '1234';
        const payloadBody = createMockUpdateIngredientDto();
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendUpdateIngredient(payloadId, payloadBody);
        expect(dispatchSpy).toHaveBeenCalledWith(
            IngredientsActions.updateIngredient({
                ingredient: payloadBody,
                id: payloadId
            })
        );
    });

    it('should dispatch remove ingredient', () => {
        const payloadId = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendRemoveIngredient(payloadId);
        expect(dispatchSpy).toHaveBeenCalledWith(
            IngredientsActions.removeIngredient({
                id: payloadId
            })
        );
    });

    it('should dispatch set current ingredient', () => {
        const payloadId = '1234';
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendSetCurrentIngredient(payloadId);
        expect(dispatchSpy).toHaveBeenCalledWith(
            IngredientsActions.setCurrentIngredient({
                id: payloadId
            })
        );
    });

    it('should dispatch unset current ingredient', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation();
        service.sendUnsetCurrentIngredient();
        expect(dispatchSpy).toHaveBeenCalledWith(
            IngredientsActions.unsetCurrentIngredient()
        );
    });
});
