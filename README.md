# NieR:Automata YoRHa Next.js Blog template

## Elements

- [Next.js](https://nextjs.org/)
- [Emotion](https://emotion.sh/docs/introduction)
- [Markdown](https://www.markdownguide.org/cheat-sheet/)

## Live demo

https://next-playground.vercel.app

![Preview](./e2e-test/e2e-test.spec.ts-snapshots/Snapshot-index-page-1-Desktop-Chrome-darwin.png)

## Development

There are two ways to set up a local development environment.
Read below and choose the one you prefer.

### Setup with Node.js

Please install Node.js first.

After installation is complete, follow the steps below:

```sh
npm i

npm run dev
```

Access following link to check the app is working:

http://localhost:3000/

### Setup with Docker

Please install Node.js first.

After installation is complete, execute the command below:

```sh
docker-compose up
```

After a while, access following link to check the app is working:

http://localhost:3000/

## E2E Testing

The E2E testing is executed by [Playwright Test](https://playwright.dev/).

Detailed in `playwright.config.ts` and `e2e-test/e2e-test.spec.ts`.

To run the E2E test, do the following:

```sh
npx playwright test
```

Or

```sh
npm run test:e2e
```

See [Playwright Docs](https://playwright.dev/docs/intro) for more details.

## Update or add your own contents

To update the contents of your own blog, you can update the contents in `contents/blog`.

You can write articles in markdown by referring to the following:

https://www.markdownguide.org/cheat-sheet/
