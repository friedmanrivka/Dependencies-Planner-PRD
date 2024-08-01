import ProductManagerRepo from '../repositories/productManagerRepo';
import { TransformedProductManager } from '../models/transformedProductManager ';

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
    static async deleteProductManagerByEmail(email: string): Promise<void> {
        try {
            await ProductManagerRepo.deleteProductManagerByEmail(email);
        } catch (err) {
            console.error('Service: Error deleting product manager:', err);
            throw err;
        }
    }
    static async getAllProductManagers(): Promise<TransformedProductManager[]> {
        return ProductManagerRepo.getAllProductManagers();
    }
    static async updateProductManagerName(email: string, productManagerName: string): Promise<void> {
        try {
          await ProductManagerRepo.updateProductManagerName(email, productManagerName);
        } catch (err) {
          console.error('Service: Error updating product manager name:', err);
          throw err;
        }
      }
      static async addAdmin(email: string, productManagerName: string): Promise<void> {
        try {
            await ProductManagerRepo.addAdmin(email, productManagerName);
        } catch (err) {
            console.error('Service: Error adding admin:', err);
            throw err;
        }
    }
}
