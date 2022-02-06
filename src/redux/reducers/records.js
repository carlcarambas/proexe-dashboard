import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import makeAPIRequest from '../../services/api';

const recordsInitialState = {
  loading: true,
  order: 'desc',
  recordsList: [],
  recordForEdit: null,
  isOpenModal: false,
  onQuery: false,
  modalOpen: false,
  modalDeleteOpen: false,
  modalTitle: '',
};

export const getRecordsList = createAsyncThunk('records/list', async () => {
  const result = await makeAPIRequest(
    'get',
    `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`
  );

  return result;
});

export const updateRecord = createAsyncThunk(
  'records/update',
  async (newRecord, { getState }) => {
    const state = getState().records;
    let recordsListClone = cloneDeep(state.recordsList);

    return recordsListClone.map((record) => {
      if (record.id === newRecord.id) {
        return { ...record, ...newRecord };
      }
      return record;
    });
  }
);

export const deleteRecord = createAsyncThunk(
  'records/delete',
  async (recordForDelete, { getState }) => {
    const state = getState().records;

    let recordsListClone = cloneDeep(state.recordsList);

    return recordsListClone.filter((record) => {
      return record.id !== recordForDelete.id;
    });
  }
);

const attendance = createSlice({
  name: 'records',
  initialState: recordsInitialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setModal(state, { payload }) {
      state.modalOpen = payload?.modalOpen;
      state.modalTitle = payload.modalTitle;
    },
    setDeleteModal(state, { payload }) {
      state.modalDeleteOpen = payload?.modalDeleteOpen;
      state.modalTitle = payload.modalTitle;
    },
    setRecordForEdit(state, { payload }) {
      state.recordForEdit = payload?.recordForEdit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecordsList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRecordsList.fulfilled, (state, action) => {
      state.loading = false;
      state.recordsList = action.payload;
    });
    // update
    builder.addCase(updateRecord.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.recordsList = action.payload;
    });
    // delete
    builder.addCase(deleteRecord.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.recordsList = action.payload;
    });
  },
});

export const {
  setModal,
  setDeleteModal,
  setLoading,
  setRecordForEdit,
  name,
  actions,
} = attendance.actions;

export default attendance.reducer;
