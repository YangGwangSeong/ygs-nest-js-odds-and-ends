import dotenv from 'dotenv';
import typia from 'typia';

const init = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      dotenv.config({ path: '.env' });
      break;
    case 'test':
      dotenv.config({ path: '.env.test' });
      break;
    case 'production':
    default:
      dotenv.config({ path: '.env.production' });
      break;
  }

  return process.env.NODE_ENV === 'test'
    ? ({ ...process.env } as unknown as IEnv)
    : {
        ...typia.assert<IEnv>(process.env),
      };
};
export const Configuration: IEnv = init();

interface IEnv {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly PORT: string | number;

  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly GOOGLE_REDIRECT_URI: string;
}
