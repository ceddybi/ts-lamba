import newrelic from 'newrelic';
import '@newrelic/aws-sdk';

const addNewRelic = (lambdaFunc: any): AWSLambda.Handler => async (args) => newrelic.setLambdaHandler(lambdaFunc(args));
export default addNewRelic;