import { schedule } from 'node-cron';
import { deleteExpiredPapers } from '../Model/common.js';

const setupCronJobs = () => {
  // Cron job to delete papers older than 30 days
  schedule('0 15 * * *', async () => {
    console.log('Running 30-day paper deletion cron job...');
    // Calculate 30 days in milliseconds
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

    try {
      // Pass the NUMBER (milliseconds) to deleteExpiredPapers
      const result = await deleteExpiredPapers(thirtyDaysInMs);
      console.log(`${result.deletedCount} papers deleted older than 30 days.`);
    } catch (error) {
      console.error('Error deleting 30-day old papers:', error);
    }
  });

  schedule('*/5 * * * * *', async () => {
    console.log('Running 2-minute paper deletion (testing) cron job...');
    const twoMinutesInMs = 2 * 60 * 1000;

    try {
      const result = await deleteExpiredPapers(twoMinutesInMs);
    } catch (error) {
      console.error('Error deleting 2-minute old papers (testing):', error);
    }
  });

  console.log('Cron jobs scheduled.');
};


setupCronJobs();

export default setupCronJobs;