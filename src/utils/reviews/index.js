const jwt = require("jsonwebtoken");
const axios = require("axios");
const { google } = require("googleapis");
const { parse } = require("csv-parse/sync");
const { Storage } = require("@google-cloud/storage");
const { GoogleAuth } = require("google-auth-library");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const APP_ID = process.env.APP_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;
const ISSUE_ID = process.env.ISSUE_ID;
const BUCKET = process.env.BUCKET;
const PACKAGE_NAME = process.env.PACKAGE_NAME;
const CREDENTIALS = process.env.CREDENTIALS;

const REVIEWS_TEMP =
  process.env.REVIEWS_TEMP || path.resolve(__dirname, `temp/`);

function preProcess(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir);
}

function getBearerToken(issuerId, apiKey, privateKey) {
  const now = Math.round(new Date().getTime() / 1000);
  const tokenExpiresInSeconds = 1200;

  const payload = {
    iss: issuerId,
    exp: now + tokenExpiresInSeconds,
    aud: "appstoreconnect-v1",
  };

  const signOptions = {
    algorithm: "ES256",
    header: {
      alg: "ES256",
      kid: apiKey,
      typ: "JWT",
    },
  };

  const bearerToken = jwt.sign(payload, privateKey, signOptions);
  return bearerToken;
}

async function retry(request, retries) {
  return request().catch((e) => {
    if (retries) {
      return retry(request, --retries);
    } else {
      throw e;
    }
  });
}
async function getReviewsAppleStoreData() {
  const token = getBearerToken(ISSUE_ID, API_KEY, PRIVATE_KEY);
  return retry(() => {
    var req = {
      url: `https://api.appstoreconnect.apple.com/v1/apps/${APP_ID}/customerReviews`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    };

    return axios(req);
  }, 5).then(({ data }) => {
    return Promise.all(
      data.data.map(async (it) => {
        const imageName = await saveAuthorIcon(it.attributes.reviewerNickname);
        return {
          author: it.attributes.reviewerNickname,
          source: "app store",
          rate: it.attributes.rating,
          body: it.attributes.body,
          image: imageName,
        };
      })
    );
  });
}

const auth = new GoogleAuth({
  credentials: JSON.parse(CREDENTIALS),
  scopes: [
    "https://www.googleapis.com/auth/devstorage.read_only",
    "https://www.googleapis.com/auth/androidpublisher",
  ],
});

const storage = new Storage({
  authClient: auth,
});

async function downloadFile(destination, bucketName, fileName) {
  const options = {
    destination,
    auth,
  };

  await storage.bucket(bucketName).file(fileName).download(options);
}

async function downloadAll() {
  preProcess(REVIEWS_TEMP);
  return google
    .storage("v1")
    .objects.list({
      auth,
      bucket: BUCKET,
      prefix: "reviews/",
    })

    .then(async ({ data }) => {
      for (let item of data.items) {
        if (item.name.indexOf(PACKAGE_NAME) >= 0) {
          await downloadFile(
            `${REVIEWS_TEMP}/${item.md5Hash}.csv`,
            BUCKET,
            item.name
          );
        }
      }
    });
}

async function saveAuthorIcon(authorName) {
  const imageName = `${crypto
    .createHash("md5")
    .update(authorName)
    .digest("hex")}.svg`;

  fs.writeFileSync(
    path.resolve(__dirname, "../../images/reviews", imageName),
    (
      await axios.get(
        `https://eu.ui-avatars.com/api/?background=random&name=${encodeURIComponent(
          authorName
        )}&size=48`
      )
    ).data
  );
  return imageName;
}

async function getReviewsGooglePlayData() {
  const result = [];
  return downloadAll().then(async () => {
    const files = fs.readdirSync(REVIEWS_TEMP);
    const reviews = files
      .reduce((acc, it) => {
        const reviews = parse(
          fs
            .readFileSync(`${REVIEWS_TEMP}/${it}`, {
              encoding: "utf16le",
            })
            .toString(),
          {
            columns: true,
            skip_empty_lines: true,
          }
        );
        return [...acc, ...reviews];
      }, [])
      .filter((it) => it["Review Text"]);
    for (let review of reviews) {
      const reviewId = /reviewId=(.*)&/.exec(review["Review Link"])[1];
      const { data } = await google.androidpublisher("v3").reviews.get({
        auth,
        packageName: PACKAGE_NAME,
        reviewId: reviewId,
      });
      const imageName = await saveAuthorIcon(data.authorName);

      result.push({
        author: data.authorName,
        source: "google play",
        rate: data.comments[0].userComment.starRating,
        body: review["Review Text"],
        image: imageName,
      });
    }
    return result;
  });
}

module.exports = {
  getReviewsAppleStoreData,
  getReviewsGooglePlayData,
  preProcess,
};
