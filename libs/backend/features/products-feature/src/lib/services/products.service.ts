import {
    ProductModel,
    ProductsRepository,
    ProductsRepositoryInstance
} from '@sanctumlab/be/data-access';
import {
    InvalidPayloadException,
    NotFoundException
} from '@sanctumlab/be/shared';

export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    public async retrieveAll(): Promise<ProductModel[]> {
        return this.productsRepository.retrieveAll();
    }

    public async retrieveById(id: string): Promise<ProductModel> {
        const item = await this.productsRepository.retrieveById(id);
        if (!item) {
            throw new NotFoundException();
        }
        return item;
    }

    public async create(
        product: Required<ProductModel>
    ): Promise<Required<ProductModel>> {
        try {
            return await this.productsRepository.create(product);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }

    public async update(
        id: string,
        product: ProductModel
    ): Promise<Required<ProductModel>> {
        try {
            return await this.productsRepository.update(id, product);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }

    public async removeById(id: string): Promise<boolean> {
        try {
            return await this.productsRepository.removeById(id);
        } catch (error) {
            throw new InvalidPayloadException();
        }
    }
}

export const ProductsServiceInstance = new ProductsService(
    ProductsRepositoryInstance
);
