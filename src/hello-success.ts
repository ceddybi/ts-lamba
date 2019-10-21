import { successResponse, delayExecution } from './utils';
import NewLambdaHandler from './utils/NewrelicLambda';

const { runNewRelicInTheBackground } = NewLambdaHandler;

// @ts-ignore
const helloSuccess: Function = async (event: any, context: any): Promise<any> => {
  const data = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  // return data;

  // emulate an api call
  return delayExecution(1000, data)

}

export default runNewRelicInTheBackground(helloSuccess);
