import { successResponse, delayExecution } from './utils';
import NewLambdaHandler from './utils/NewrelicLambda';

const { runNewRelicInTheBackground } = NewLambdaHandler;

const helloSuccess: Function = async (event: any, context: any): Promise<any> => {
  const data = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  console.log('Variables from hello success', { event, context });

  // return data;
  return delayExecution(3000, data)

}

export default runNewRelicInTheBackground(helloSuccess);
