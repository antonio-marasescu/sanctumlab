import { Model } from 'dynamodb-onetable';
import { IngredientModel } from '../domain/database-types.domain';
import { DatabaseClientInstance } from '../clients/database.client';

export class IngredientsRepository {
    constructor(private readonly table: Model<IngredientModel>) {}

    public async retrieveAll(): Promise<IngredientModel[]> {
        return this.table.find();
    }

    public async retrieveById(
        id: string
    ): Promise<IngredientModel | undefined> {
        const response = await this.table.get({ id });
        if (!response) {
            return undefined;
        }
        return response;
    }

    public async create(
        payload: IngredientModel
    ): Promise<Required<IngredientModel>> {
        const response = await this.table.create({
            ...payload
        });
        return response as Required<IngredientModel>;
    }

    public async update(
        id: string,
        payload: IngredientModel
    ): Promise<Required<IngredientModel>> {
        const response = await this.table.upsert({
            ...payload,
            id
        });
        return response as Required<IngredientModel>;
    }

    public async removeById(id: string): Promise<boolean> {
        const response = await this.table.remove({
            id
        });
        return response !== undefined;
    }
}
export const IngredientsRepositoryInstance = new IngredientsRepository(
    DatabaseClientInstance.ingredientsTable
);
