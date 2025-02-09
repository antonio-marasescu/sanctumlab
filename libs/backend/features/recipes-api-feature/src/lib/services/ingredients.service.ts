import {
    IngredientModel,
    IngredientsRepository,
    IngredientsRepositoryInstance
} from '@sanctumlab/be/data-access';
import {
    InvalidPayloadException,
    NotFoundException
} from '@sanctumlab/be/shared';

export class IngredientsService {
    constructor(
        private readonly ingredientsRepository: IngredientsRepository
    ) {}

    public async retrieveAll(): Promise<IngredientModel[]> {
        return this.ingredientsRepository.retrieveAll();
    }

    public async retrieveById(id: string): Promise<IngredientModel> {
        const item = await this.ingredientsRepository.retrieveById(id);
        if (!item) {
            throw new NotFoundException();
        }
        return item;
    }

    public async create(
        ingredient: Required<IngredientModel>
    ): Promise<Required<IngredientModel>> {
        try {
            return await this.ingredientsRepository.create(ingredient);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }

    public async update(
        id: string,
        ingredient: IngredientModel
    ): Promise<Required<IngredientModel>> {
        try {
            return await this.ingredientsRepository.update(id, ingredient);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }

    public async removeById(id: string): Promise<boolean> {
        try {
            return await this.ingredientsRepository.removeById(id);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }
}

export const IngredientsServiceInstance = new IngredientsService(
    IngredientsRepositoryInstance
);
