

import ProductManagerRepo from '../repositories/authenticationRepo';

export default class ProductManagerService {
   
    static async checkUserDetails(email: string) {
        console.log('entering to service')
        return await ProductManagerRepo.getProductManagerByEmail(email);
    }
}
