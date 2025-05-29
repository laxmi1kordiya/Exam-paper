import { deleteMany, find } from "../Model/common.js";

const setupCronJobs = async () => {
  console.log("Cron jobs scheduled.");

  try {
    const papers = await find("paper", {});
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    for (let i = 0; i < papers.length; i++) {
      const element = papers[i];
      const createdDate = new Date(element.created);
      if (createdDate <= thirtyDaysAgo) {
        await deleteMany("paper", { _id: element._id });
        console.log(`Deleted paper created on ${createdDate}`);
      }
    }
  } catch (error) {
    console.error("Error in cron job:", error);
    throw error;
  }
};
export default setupCronJobs;