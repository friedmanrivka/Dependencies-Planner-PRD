import axios from 'axios';

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || '';

export const sendSlackMessage = async (message: string) => {
  try {
    console.log(`Attempting to send message to Slack: ${message}`); // Debug log
    const response = await axios.post(slackWebhookUrl, {
      text: message,
    });
    console.log('Message sent to Slack:', response.data); // Debug log
  } catch (error) {
    const err = error as any; // Cast error to any
    console.error('Error sending message to Slack:', err.response?.data || err.message);
  }
};

export default sendSlackMessage;
