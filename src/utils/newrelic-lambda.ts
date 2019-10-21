import { Callback } from 'aws-lambda';
import newrelic from 'newrelic';
import '@newrelic/aws-sdk';

const TEST_TRANS = "TEST_TRANS"

function wrapNewRelicWithErrorHandler(lambdaFunc: Function): AWSLambda.Handler {
    return async (event: any, context: any) => {
        try {
            const handler = lambdaFunc(event, context);
            return await newrelic.startBackgroundTransaction(event ? event.source : TEST_TRANS, await handler);
        }
        catch (error) {
            newrelic.noticeError(error);
            throw error;
        }

    }
}
export class NewLambdaHandler {

    static setLambdaHandler(lambdaFunc: any): AWSLambda.Handler {
        return async (...args: any) => newrelic.setLambdaHandler(lambdaFunc(args))
    }

    static runNewRelicInTheBackground(lambdaFunc: any): AWSLambda.Handler {
        return async (event: any, context: any, callback: Callback<any>) => {
            const withError = wrapNewRelicWithErrorHandler(lambdaFunc);
            return withError(event, context, callback);
        }
    }
}