import helloError from './hello-ts-error';
import helloSuccess from './hello-success';
import newrelic from 'newrelic';

describe('NewRelic Lambda', () => {

  describe('given a lambda that executes successfully', () => {
    let spyStartBackgroundTransaction;
    beforeEach(async () => {
      spyStartBackgroundTransaction = jest.spyOn(newrelic, 'startBackgroundTransaction');
    });

    afterEach(async () => {
      spyStartBackgroundTransaction.mockRestore();
    });

    it('should run successfully with response', async () => {
      const response = await helloSuccess({});
      expect(response).toMatchSnapshot();
    });

    it('should call "startBackgroundTransaction" ', async () => {
      await helloSuccess({});
      expect(spyStartBackgroundTransaction).toHaveBeenCalled();
    });

  });

  describe('given a lambda that executes with an exception', () => {

    let spyNoticeError;

    beforeEach(async () => {
      spyNoticeError = jest.spyOn(newrelic, 'noticeError');
    });

    afterEach(async () => {
      spyNoticeError.mockRestore();
    });

    it('should execute and throw an exception', async () => {
      let response;
      let err;

      try {
        response = await helloError();
      }
      catch (error) {
        err = error;
      }

      expect(err.message).toEqual("Error with unsent");

    });

    it('should call "noticeError" when an exception occurs', async () => {
      let response;
      let err;

      try {
        response = await helloError();
      }
      catch (error) {
        err = error;
      }

      expect(spyNoticeError).toHaveBeenCalled();

    });

  });

});
