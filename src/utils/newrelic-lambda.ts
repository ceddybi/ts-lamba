import newrelic from 'newrelic';
import '@newrelic/aws-sdk';


export const sendNewRelicError = (error: Error) => {
    return newrelic.noticeError(error);
}


export class NewLambdaHandler {
    static setLambdaErrorHandler(lambdaFunc: Function): AWSLambda.Handler {
        return async (event: any, context: any) => {
            if (event && event.source === 'serverless-plugin-warmup') {
                return 'pinged';
            }

            try {
                return await lambdaFunc(event, context);
            }
            catch (error) {
                // const customError = Object.assign({}, error);
                // customError.message = "error with the class";
                newrelic.noticeError(error);
                throw error;
            }
        }
    }

    static setLambdaHandler(lambdaFunc: any) :AWSLambda.Handler{
        return async (args: any) =>  newrelic.setLambdaHandler(lambdaFunc(args))
    }

    static startBackground(lambdaFunc: any) : Promise<any> {
        return newrelic.startBackgroundTransaction('XXX Test transactions', lambdaFunc)
    }
}