import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

const SERVER_PORT = 4000;

function* register(action) {
  try {
    const response = yield axios.post(
      `http://localhost:${SERVER_PORT}/api/users/register`,
      action.payload
    );
    if (response.message === "Login success") {
      yield put({ type: "LOGIN_SUCCESS", payload: response.data });
    }
  } catch (error) {
    console.error("Failed to add a new user:", error);
  }
}

function* login(action) {
  try {
    const response = yield axios.post(
      `http://localhost:${SERVER_PORT}/api/users/login/`,
      action.payload
    );
    console.log(response);
    yield put({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Failed to login:", error);
  }
}

function* userWatcherSaga() {
  yield takeLatest("REGISTER", register);
  yield takeLatest("LOGIN", login);
}

export default userWatcherSaga;
