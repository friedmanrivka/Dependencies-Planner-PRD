import QuarterRepo from '../repositories/quarterDatesRepo';

export default class QuarterService {
  static async setCurrentQuarter(year: number, quarter: string): Promise<void> {
    try {
      await QuarterRepo.setCurrentQuarter(year, quarter);
      console.log(`Service: Successfully set current quarter to ${year} ${quarter}`);
    } catch (err) {
      console.error('Service: Error setting current quarter:', err);
      throw err;
    }
  }
}
