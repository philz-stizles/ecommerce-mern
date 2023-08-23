import { IConfig } from '@src/interfaces/IConfig';

const config = (): IConfig => {
  let dbUri: string | undefined = process.env.MONGODB_URI;

  return { dbUri: dbUri as string };
};

export default config;
