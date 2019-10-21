import { successResponse } from './utils';
import { NewLambdaHandler } from './utils/newrelic-lambda';
const { runNewRelicInTheBackground } = NewLambdaHandler;

const helloSuccess: Function = async (event: any): Promise<any> => successResponse({
  message: 'Go Serverless! Your function executed successfully!',
  input: event,
});

export default runNewRelicInTheBackground(helloSuccess);
