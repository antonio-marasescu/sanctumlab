import { Model } from 'dynamodb-onetable';
import { RecipeModel } from '../domain/database-types.domain';
import { DatabaseClientInstance } from '../clients/database.client';

export class RecipesRepository {
    constructor(private readonly table: Model<RecipeModel>) {}

    public async retrieveAll(): Promise<RecipeModel[]> {
        return this.table.find();
    }

    public async retrieveById(id: string): Promise<RecipeModel | undefined> {
        const response = await this.table.get({ id });
        if (!response) {
            return undefined;
        }
        return response;
    }

    public async create(payload: RecipeModel): Promise<Required<RecipeModel>> {
        const response = await this.table.create({
            ...payload
        });
        return response as Required<RecipeModel>;
    }

    public async update(
        id: string,
        payload: RecipeModel
    ): Promise<Required<RecipeModel>> {
        const response = await this.table.upsert({
            ...payload,
            id
        });
        return response as Required<RecipeModel>;
    }

    public async removeById(id: string): Promise<boolean> {
        const response = await this.table.remove({
            id
        });
        return response !== undefined;
    }
}
export const RecipesRepositoryInstance = new RecipesRepository(
    DatabaseClientInstance.recipesTable
);
