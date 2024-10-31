import {
    ProductModel,
    ProductsRepositoryInstance
} from '@sanctumlab/be/data-access';
import {
    InvalidPayloadException,
    NotFoundException
} from '@sanctumlab/be/shared';

export class ProductsService {
    public async retrieveAll(): Promise<ProductModel[]> {
        return ProductsRepositoryInstance.retrieveAll();
    }

    public async retrieveById(id: string): Promise<ProductModel> {
        const item = await ProductsRepositoryInstance.retrieveById(id);
        if (!item) {
            throw new NotFoundException();
        }
        return item;
    }

    public async create(
        product: Required<ProductModel>
    ): Promise<Required<ProductModel>> {
        try {
            return ProductsRepositoryInstance.create(product);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }

    public async update(
        id: string,
        product: ProductModel
    ): Promise<Required<ProductModel>> {
        try {
            return ProductsRepositoryInstance.update(id, product);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }

    public async removeById(id: string): Promise<boolean> {
        try {
            return ProductsRepositoryInstance.removeById(id);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }
}

export const ProductsServiceInstance = new ProductsService();
