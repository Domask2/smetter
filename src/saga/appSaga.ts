import { takeLatest } from 'redux-saga/effects';
import { AppActionsEnum } from '../redux/app/app.action.types';

const initApp = function* (): any {
    try {
        yield true;
    } catch (e: any) {
        console.log(e);
    }
};

function* appSaga() {
    yield takeLatest(AppActionsEnum.APP_INITIALIZE, initApp);
}

export default appSaga;
