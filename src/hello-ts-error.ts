import { NewLambdaHandler } from './utils/newrelic-lambda';
const { runNewRelicInTheBackground } = NewLambdaHandler;

const helloTsError: Function = async (args: any): Promise<any> => {
  console.log('args', JSON.stringify(args))

  const er = new Error("Error with unsent");
  return Promise.reject(er);
};

export default runNewRelicInTheBackground(helloTsError);
