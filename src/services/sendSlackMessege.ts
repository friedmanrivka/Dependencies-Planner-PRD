
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

if (!slackWebhookUrl) {
  throw new Error('SLACK_WEBHOOK_URL is not defined in environment variables');
}

console.log('Slack Webhook URL:', slackWebhookUrl);

export const sendSlackMessage = async (message: string) => {
  try {
    await axios.post(slackWebhookUrl, {
      text: message,
    });
    console.log('Message sent to Slack');
  } catch (error) {
    console.error('Error sending message to Slack:', (error as any).response?.data || (error as any).message);
  }
};

export default sendSlackMessage;
