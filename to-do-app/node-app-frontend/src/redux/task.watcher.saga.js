import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const SERVER_PORT = 4000;

function* getTasks() {
  try {
    const res = yield axios.get(`http://localhost:${SERVER_PORT}/api/tasks`);
    yield put({ type: 'SET_TASK_LIST', payload: res.data });
  } catch (error) {
    console.error('Failed to get task list:', error);
  }
}

function* addTask(action) {
  try {
    yield axios.post(`http://localhost:${SERVER_PORT}/api/tasks`, action.payload);
    yield put({ type: 'GET_TASKS' });
  } catch (error) {
    console.error('Failed to add a task:', error);
  }
}

function* updateTask(action) {
  try {
    yield axios.put(`http://localhost:${SERVER_PORT}/api/tasks/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_TASKS', payload: action.payload });
  } catch (error) {
    console.error('Failed to update task:', error);
  }
}

function* deleteTask(action) {
  try {
    yield axios.delete(`http://localhost:${SERVER_PORT}/api/tasks/${action.payload.id}`);
    yield put({ type: 'GET_TASKS' });
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
}

function* taskWatcherSaga() {
  yield takeLatest('GET_TASKS', getTasks);
  yield takeLatest('ADD_TASK', addTask);
  yield takeLatest('DELETE_TASK', deleteTask);
  yield takeLatest('UPDATE_TASK', updateTask);
}

export default taskWatcherSaga;