// @ts-check
const exec = require(`x-exec`).default;
const cloud = require(`@friends-library/cloud`);

require(`dotenv`).config({ path: `.env` });

const BIN = `./node_modules/.bin/qrcode`;

const urls = [
  // create user
  `gertrude.app/cu-cl`,
  `gertrude.app/cu-bs`,
  `gertrude.app/cu-mr`,
  `gertrude.app/cu-vt`,
  `gertrude.app/cu-sn`,
  `gertrude.app/cu-sq`,
  // demote user
  `gertrude.app/du-cl`,
  `gertrude.app/du-bs`,
  `gertrude.app/du-mr`,
  `gertrude.app/du-vt`,
  `gertrude.app/du-sn`,
  `gertrude.app/du-sq`,
  // switch user
  `gertrude.app/su-cl`,
  `gertrude.app/su-bs`,
  `gertrude.app/su-mr`,
  `gertrude.app/su-vt`,
  `gertrude.app/su-sn`,
  `gertrude.app/su-sq`,
];

async function main() {
  for (const url of urls) {
    const encoded = url.replace(/\//g, `__`);
    exec(`${BIN} "https://${url}" --output out/${encoded}.png --width 400 --qzone 4`);
    await cloud.uploadFile(
      `out/${encoded}.png`,
      `appview-assets/onboarding-v2.5.0/qr-codes/${encoded}.png`,
      { acl: `public-read` },
    );
  }
}

main();
