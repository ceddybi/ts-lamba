import { NewLambdaHandler } from './utils/newrelic-lambda';
const { setLambdaErrorHandler, startBackground }  = NewLambdaHandler;

const helloTsError: Function = async () => {
  const er = new Error("Error with unsent");
  throw er;
};

// runWarm function handles pings from the scheduler so you don't
// Add newrelic monitoring
// have to put that boilerplate in your function.


// export default addNewRelic(NewRelicWrapper((helloTsError)));
// export default setLambdaErrorHandler(() => startBackground(helloTsError))
export default setLambdaErrorHandler(() => startBackground(helloTsError))
// export default addNewRelic(NewRelicWrapper(helloTsError));
