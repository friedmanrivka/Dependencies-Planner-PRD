

import ProductManagerRepo from '../repositories/authenticationRepo';

export default class ProductManagerService {
   
    static async checkUserDetails(email: string) {
        return await ProductManagerRepo.getProductManagerByEmail(email);
    }
}
