import helloError from './hello-ts-error';
import newrelic from 'newrelic';

describe('hello', () => {

  let startBackgroundTransaction;
  let spyNoticeError;

  beforeEach(async () => {
    startBackgroundTransaction = jest.spyOn(newrelic, 'startBackgroundTransaction');
    spyNoticeError = jest.spyOn(newrelic, 'noticeError');
  });

  afterEach(async () => {
    startBackgroundTransaction.mockRestore();
    spyNoticeError.mockRestore();
  });


  // it('executes as expected', async () => {
  //   const response = await hello({});
  //   expect(response).toMatchSnapshot();
  // });

  it('executes as error', async () => {
    let response;
    let err;

    try {
      response = await helloError({});
    }
    catch (error) {
      err = error;
    }

    expect(err.message).toEqual("Error with unsent");
  });

  it('should run noticeError once', async () => {
    let response;
    let err;

    try {
      response = await helloError({});
    }
    catch (error) {
      err = error;
    }

    expect(spyNoticeError).toHaveBeenCalled();
  });

});
