import { DatabaseClientInstance } from '../clients/database.client';
import { ProductModel } from '../domain/database-types.domain';
import { Model } from 'dynamodb-onetable';

export class ProductsRepository {
    constructor(private readonly table: Model<ProductModel>) {}

    public async retrieveAll(): Promise<ProductModel[]> {
        return this.table.find();
    }

    public async retrieveById(id: string): Promise<ProductModel | undefined> {
        const response = await this.table.get({ id });
        if (!response) {
            return undefined;
        }
        return response;
    }

    public async create(
        payload: ProductModel
    ): Promise<Required<ProductModel>> {
        const response = await this.table.create({
            ...payload
        });
        return response as Required<ProductModel>;
    }

    public async update(
        id: string,
        payload: ProductModel
    ): Promise<Required<ProductModel>> {
        const response = await this.table.upsert({
            ...payload,
            id
        });
        return response as Required<ProductModel>;
    }

    public async removeById(id: string): Promise<boolean> {
        const response = await this.table.remove({
            id
        });
        return response !== undefined;
    }
}

export const ProductsRepositoryInstance = new ProductsRepository(
    DatabaseClientInstance.productsTable
);
