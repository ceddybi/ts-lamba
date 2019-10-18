import { successResponse, runWarm } from './utils';
import addNewRelic from './utils/newrelic-lambda';

const helloTs: Function = async (event: AWSLambda.APIGatewayEvent) => {
  // successResponse handles wrapping the response in an API Gateway friendly
  // format (see other responses, including CORS, in `./utils/lambda-response.js)
  const response = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  // await sendNewRelicError(new Error("Some random error"))

  return response;
};

// runWarm function handles pings from the scheduler so you don't
// Add newrelic monitoring
// have to put that boilerplate in your function.

export default runWarm(addNewRelic(helloTs));
