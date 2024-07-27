import ProductManagerRepo from '../repositories/productManagerRepo';


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
    static async addProductManager ( email: string,productmanagername: string): Promise<void> {
        try {
            await ProductManagerRepo.addProductManager( email,productmanagername);
        } catch (err) {
            console.error('Service: Error adding product manager:', err);
            throw err;
        }
    }
}
