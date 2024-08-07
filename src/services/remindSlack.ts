import schedule from 'node-schedule';
import sendSlackMessage from './sendSlackMessege';
import {pool} from '../config/db'; 
import RequestRepo from '../repositories/requestRepo';

async function scheduleNotifications() {
try{
    const dateRanges= await RequestRepo.getDateRange();
    dateRanges.forEach(range => {
        const { request_start: start, request_end: end } = range;
  
        const endDate = new Date(end);
        const twoWeeksBefore = new Date(endDate);
        twoWeeksBefore.setDate(endDate.getDate() - 14);
        const threeDaysBefore = new Date(endDate);
        threeDaysBefore.setDate(endDate.getDate() - 3);
        schedule.scheduleJob(twoWeeksBefore, () => {
            sendSlackMessage(`Reminder: The request period ends in two weeks on ${endDate.toLocaleDateString()}.`);
          });
    
          schedule.scheduleJob(threeDaysBefore, () => {
            sendSlackMessage(`Reminder: The request period ends in three days on ${endDate.toLocaleDateString()}.`);
          });
    
          console.log(`Scheduled notifications for ${endDate.toLocaleDateString()} - 2 weeks and 3 days prior.`);
        });
      } catch (error) {
        console.error('Error scheduling notifications:', error);
      }
    }
    
    scheduleNotifications();

