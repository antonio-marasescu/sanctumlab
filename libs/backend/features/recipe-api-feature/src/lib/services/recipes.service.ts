import {
    RecipeModel,
    RecipesRepository,
    RecipesRepositoryInstance
} from '@sanctumlab/be/data-access';
import {
    InvalidPayloadException,
    NotFoundException
} from '@sanctumlab/be/shared';

export class RecipesService {
    constructor(private readonly recipesRepository: RecipesRepository) {}

    public async retrieveAll(): Promise<RecipeModel[]> {
        return this.recipesRepository.retrieveAll();
    }

    public async retrieveById(id: string): Promise<RecipeModel> {
        const item = await this.recipesRepository.retrieveById(id);
        if (!item) {
            throw new NotFoundException();
        }
        return item;
    }

    public async create(
        recipe: Required<RecipeModel>
    ): Promise<Required<RecipeModel>> {
        try {
            return await this.recipesRepository.create(recipe);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }

    public async update(
        id: string,
        recipe: RecipeModel
    ): Promise<Required<RecipeModel>> {
        try {
            return await this.recipesRepository.update(id, recipe);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }

    public async removeById(id: string): Promise<boolean> {
        try {
            return await this.recipesRepository.removeById(id);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }
}

export const RecipesServiceInstance = new RecipesService(
    RecipesRepositoryInstance
);
