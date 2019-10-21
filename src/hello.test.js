import newrelic from 'newrelic';
import helloError, { TEST_ERROR_TEXT } from './hello-error';
import helloSuccess from './hello-success';

describe('NewRelic Lambda', () => {

  let spyStartBackgroundTransaction;
  let spyNoticeError;
  let results;

  beforeEach(async () => {
    spyStartBackgroundTransaction = jest.spyOn(newrelic, 'startBackgroundTransaction');
    spyNoticeError = jest.spyOn(newrelic, 'noticeError');
  });

  afterEach(async () => {
    spyStartBackgroundTransaction.mockRestore();
    spyNoticeError.mockRestore();
  });

  describe('given a lambda that executes successfully', () => {
  
    test('should run successfully with response', async () => {
      results = await helloSuccess({});
      expect(results).toMatchSnapshot();
    });

    test('should call "startBackgroundTransaction" ', async () => {
      results = await helloSuccess({});
      expect(spyStartBackgroundTransaction).toHaveBeenCalled();
    });
  });

  describe('given a lambda that executes with an exception', () => {
  
    test('should execute and throw an exception', async () => {
      let err;

      try {
        results = await helloError();
      } catch (error) {
        err = error;
      }

      expect(err.message).toEqual(TEST_ERROR_TEXT);
    });

    test('should call "noticeError" when an exception occurs', async () => {
      let err;

      try {
        results = await helloError();
      } catch (error) {
        err = error;
      }

      expect(spyNoticeError).toHaveBeenCalled();
    });
  });
});
