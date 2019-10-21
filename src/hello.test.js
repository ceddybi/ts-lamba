import helloError from './hello-ts-error';
import newrelic from 'newrelic';

describe('hello', () => {

  let spyStartBackgroundTransaction;
  let spyNoticeError;

  beforeEach(async () => {
    spyStartBackgroundTransaction = jest.spyOn(newrelic, 'startBackgroundTransaction');
    spyNoticeError = jest.spyOn(newrelic, 'noticeError');
  });

  afterEach(async () => {
    spyStartBackgroundTransaction.mockRestore();
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
      response = await helloError({ name: 'event' });
    }
    catch (error) {
      err = error;
    }

    // expect(err.message).toEqual("Error with unsent");
    expect(spyNoticeError).toHaveBeenCalled();
    // expect(spyStartBackgroundTransaction).toHaveBeenCalled();

  });

  // it('should run noticeError once', async () => {
  //   let response;
  //   let err;

  //   try {
  //     response = await helloError({});
  //   }
  //   catch (error) {
  //     err = error;
  //   }

  //   expect(spyNoticeError).toHaveBeenCalled();
  // });

});
