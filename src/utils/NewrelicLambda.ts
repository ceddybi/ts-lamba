import newrelic from 'newrelic';

const TEST_TRANS = 'TEST_TRANS_1';

export default class NewLambdaHandler {
  static setLambdaHandler(lambdaFunc: any): AWSLambda.Handler {
    return async (...args: any) => newrelic.setLambdaHandler(lambdaFunc(args));
  }

  static runNewRelicInTheBackground(lambdaFunc: any): AWSLambda.Handler {
    return async (event: any, context: any) => {
      return newrelic.startBackgroundTransaction(event && event.source ? event.source : TEST_TRANS, async () => await lambdaFunc(event, context));
    };
  }

  // static runNewRelicInTheBackground(lambdaFunc: any): AWSLambda.Handler {
  //   return async (event: any, context: any) => {
  //     try {
  //       return await newrelic.startBackgroundTransaction(event && event.source ? event.source : TEST_TRANS, async () => await lambdaFunc(event, context));
  //     } catch (error) {
  //       newrelic.noticeError(error);
  //       throw error;
  //     }
  //   };
  // }
}
