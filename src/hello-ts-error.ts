import { NewLambdaHandler } from './utils/newrelic-lambda';
const { runNewRelicInTheBackground }  = NewLambdaHandler;

const helloTsError: Function = async (args: any) => {
  console.log('arguments from run newRelic', JSON.stringify(args))
  const er = new Error("Error with unsent");
  throw er;
};

// runWarm function handles pings from the scheduler so you don't
// Add newrelic monitoring
// have to put that boilerplate in your function.


// export default addNewRelic(NewRelicWrapper((helloTsError)));
// export default setLambdaErrorHandler(() => startBackground(helloTsError))
export default runNewRelicInTheBackground(helloTsError);
// export default addNewRelic(NewRelicWrapper(helloTsError));
