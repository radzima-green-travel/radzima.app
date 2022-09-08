const fs = require("fs");
const path = require("path");
const {
  getReviewsAppleStoreData,
  getReviewsGooglePlayData,
  preProcess,
} = require("../utils/reviews");

module.exports = function () {
  const cacheFilename = "feedbacks.json";
  const isServing = process.env.ELEVENTY_SERVE === "true";
  const cacheFilePath = path.resolve(__dirname, "_cache/" + cacheFilename);
  if (isServing && fs.existsSync(cacheFilePath)) {
    return Promise.resolve(require(cacheFilePath));
  }
  preProcess(path.resolve(__dirname, "../images/reviews/"));

  return Promise.all([
    getReviewsAppleStoreData(),
    getReviewsGooglePlayData(),
  ]).then(([appleStoreReviews, googlePlayReviews]) => {
    preProcess(path.resolve(__dirname, "_cache/"));

    fs.writeFileSync(
      cacheFilePath,
      JSON.stringify([...appleStoreReviews, ...googlePlayReviews].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)))
    );
    return [...appleStoreReviews, ...googlePlayReviews];
  });
};
