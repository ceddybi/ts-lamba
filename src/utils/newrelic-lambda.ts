import newrelic from 'newrelic';
import '@newrelic/aws-sdk';


export const sendNewRelicError = (error: Error) => {
    return newrelic.noticeError(error);
}

export const NewRelicWrapper = (lambdaFunc: Function): AWSLambda.Handler => async (
    event,
    context
) => {
    // Detect the keep-alive ping from CloudWatch and exit early. This keeps our
    // lambda function running hot.
    if (event && event.source === 'serverless-plugin-warmup') {
        return 'pinged';
    }

    try {
        return await lambdaFunc(event, context);
    }
    catch (error) {
        const customError = Object.assign({}, error);
        customError.message = "newRelic custom";
        newrelic.noticeError(customError);
        throw error;
    }

};

const addNewRelic = (lambdaFunc: any): AWSLambda.Handler => async (args) => newrelic.setLambdaHandler(lambdaFunc(args));
export default addNewRelic;