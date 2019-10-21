import NewLambdaHandler from './utils/NewrelicLambda';

const { runNewRelicInTheBackground } = NewLambdaHandler;

export const TEST_ERROR_TEXT = 'TEST_ERROR';

const helloTsError: Function = async (): Promise<any> => {
  const er = new Error(TEST_ERROR_TEXT);
  return Promise.reject(er);
};

export default runNewRelicInTheBackground(helloTsError);
