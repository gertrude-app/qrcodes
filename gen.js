// @ts-check
const exec = require(`x-exec`).default;
const cloud = require(`@friends-library/cloud`);

require(`dotenv`).config({ path: `.env` });

const BIN = `./node_modules/.bin/qrcode`;

const urls = [
  `parents.gertrude.app/signup`,
  `gertrude.app/cu-v`,
  `gertrude.app/cu-b`,
  `gertrude.app/cu-c`,
  `gertrude.app/du-v`,
  `gertrude.app/du-b`,
  `gertrude.app/du-c`,
  `gertrude.app/su-v`,
  `gertrude.app/su-b`,
  `gertrude.app/su-c`,
];

async function main() {
  for (const url of urls) {
    const encoded = url.replace(/\//g, `__`);
    exec(`${BIN} "https://${url}" --output out/${encoded}.png --width 400 --qzone 4`);
    await cloud.uploadFile(
      `out/${encoded}.png`,
      `appview-assets/onboarding/qr-codes/${encoded}.png`,
      { acl: `public-read` },
    );
  }
}

main();
