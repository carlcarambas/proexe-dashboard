import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Edit, Delete } from '@mui/icons-material';
import useTable from '../../components/useTable';
import PageHeader from '../../components/PageHeader';
import Popup from '../../components/Popup';
import DashboardForm from './DashboardForm';
import DashboardModal from './DashboardModal';
import {
  getRecordsList,
  updateRecord,
  deleteRecord,
  setRecordForEdit,
  setModal,
  setDeleteModal,
} from '../../redux/reducers/records';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 4,
  },
  pageContent: {
    margin: 'auto',
    padding: '3em',
  },
  searchInput: {
    width: '75%',
  },
  editButton: {
    color: '#ed7b09',
  },
  deleteButton: {
    color: '#ef0909',
  },
}));

const headCells = [
  { id: 'recordId', label: 'Id', disableSorting: true },
  { id: 'name', label: 'Name', disableSorting: true },
  { id: 'username', label: 'Username' },
  { id: 'email', label: 'Email', disableSorting: true },
  { id: 'cityAddress', label: 'City', disableSorting: true },
  { id: 'edit', label: 'Edit', disableSorting: true },
  { id: 'delete', label: 'Delete', disableSorting: true },
];

export default function Dashboard() {
  const classes = useStyles();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const {
    recordsList,
    modalOpen,
    modalDeleteOpen,
    modalTitle,
    recordForEdit,
    loading,
  } = useSelector((state) => state.records);

  // eslint-disable-next-line
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    dispatch(getRecordsList({}));
  }, [dispatch]);

  const { TblContainer, TblHead, recordsAfterPagingAndSorting } = useTable(
    recordsList,
    headCells,
    filterFn
  );

  const setOpenPopup = (modalOpen, modalTitle = '') => {
    dispatch(setModal({ modalOpen, modalTitle }));
  };

  const setOpenDeletePopup = (modalDeleteOpen, modalTitle = '') => {
    dispatch(setDeleteModal({ modalDeleteOpen, modalTitle }));
  };

  const handleClickEdit = (item) => {
    dispatch(
      setRecordForEdit({
        recordForEdit: item,
      })
    );
    setOpenPopup(true, 'Edit');
  };

  const handleClickDelete = (item) => {
    dispatch(
      setRecordForEdit({
        recordForEdit: item,
      })
    );
    setOpenDeletePopup(true, 'Delete');
  };

  const handleUpdate = (newRecord, resetForm) => {
    dispatch(updateRecord(newRecord));
    resetForm();
    dispatch(setRecordForEdit(null));
    setOpenPopup(false);
  };

  const handleDelete = (recordForDelete) => {
    dispatch(deleteRecord(recordForDelete));
    dispatch(setRecordForEdit(null));
    setOpenDeletePopup(false);
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.pageContent}>
        <PageHeader title="Dashboard" />

        {loading ? (
          <CircularProgress />
        ) : (
          <TblContainer>
            <TblHead />

            <TableBody>
              {recordsList.length > 0 ? (
                recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.address.city}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleClickEdit(item)}
                        >
                          <Edit className={classes.editButton} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleClickDelete(item)}
                        >
                          <Delete className={classes.deleteButton} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell style={{ textAlign: 'center' }} colSpan={7}>
                    <span>No records to show</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TblContainer>
        )}
      </Paper>

      <Popup title={modalTitle} openPopup={modalOpen}>
        <DashboardForm
          recordForEdit={recordForEdit}
          onUpdate={handleUpdate}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Popup title={modalTitle} openPopup={modalDeleteOpen}>
        <DashboardModal
          recordForDelete={recordForEdit}
          setOpenPopup={setOpenDeletePopup}
          onDelete={() => handleDelete(recordForEdit)}
        />
      </Popup>
    </div>
  );
}
