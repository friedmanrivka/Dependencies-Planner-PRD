import ProductManagerRepo from '../repositories/deleteRepo';

export default class ProductManagerService {
    static async deleteRequest(id: number): Promise<void> {
        try {
            await ProductManagerRepo.deleteRequestById(id);
        } catch (err) {
            console.error('Error in ProductManagerService.deleteProductManager:', err);
            throw err;
        }
    }

    static async requestExists(id: number): Promise<boolean> {
        try {
            return await ProductManagerRepo.requestExists(id);
        } catch (err) {
            console.error('Error in ProductManagerService.requestExists:', err);
            throw err;
        }
    }
}
