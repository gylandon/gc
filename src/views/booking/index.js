import React, { useState, useEffect } from 'react';
import { ToastContainer, toastify } from '@utils';
import { HeaderLogged } from '@header';
import { BookingTableComponent, EditBookingModal } from '@components/booking';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.less';
import { booking as bookingActions } from '@actions/index';
import { TagErrorPlaceholder } from '@components/placeholders';
import { Spin } from 'antd';
import { users as usersActions } from '@actions';
import { FORMAT, STRINGS, TAGS } from '@constants';

/**
 * Booking view.
 *
 * @param {object} props - props
 * @return {JSX} booking view
 */
const BookingView = (props) => {
  const dispatch = useDispatch();
  // Loading status
  const [loading, setLoading] = useState(false);
  // Booking modal visibility
  const [editModalVisible, setEditModalVisible] = useState(false);
  // Booking modal parameter, isNew -> new booking mode, !isNew -> edit booking mode
  const [isNew, setIsNew] = useState(true);
  // Record the booking to be edited
  const [currentBooking, setCurrentBooking] = useState(undefined);
  // A map from booking's dataId to the booking item, to speed up queries
  let bookingMap = null;

  // Fetch booking and customer data
  useEffect(() => {
    dispatch(bookingActions.getBookings()).catch((error) => {
      toastify.toastError(STRINGS.TOAST_BOOKINGS_LOAD_ERROR);
    });
    dispatch(usersActions.getCustomers()).catch((error) => {
      toastify.toastError(STRINGS.TOAST_CUSTOMERS_LOAD_ERROR);
    });
  }, []);

  // Reference to store states
  const bookings = useSelector((state) => state.booking.bookings);
  const customers = useSelector((state) => state.users.customers);
  const creatingBooking = useSelector((state) => state.booking.creatingBooking);
  const deletingBooking = useSelector((state) => state.booking.deletingBooking);

  /**
   * Handle create booking.
   */
  const createBooking = () => {
    setIsNew(true);
    setEditModalVisible(true);
  };

  /**
   * Handle delete booking.
   *
   * @param {array} bookingIds - ids of the bookings to delete
   */
  const deleteBookings = (bookingIds) => {
    // If there are collected bookings selected, abort deletion
    if (
      bookingIds.some((id) => bookingMap[id].status.includes(TAGS.COLLECTED))
    ) {
      toastify.toastWarn(STRINGS.TOAST_BOOKING_DELETE_CANNOT_DELETE_COLLECTED);
      return;
    }

    setLoading(true);
    dispatch(bookingActions.deleteBookings(bookingIds))
      .then(() => {
        dispatch(bookingActions.getBookings())
          .then(() => {
            toastify.toastSuccess(STRINGS.TOAST_BOOKING_DELETE_SUCCESS);
          })
          .catch((error) => {
            toastify.toastError(STRINGS.TOAST_BOOKINGS_LOAD_ERROR);
          });
      })
      .catch((error) => {
        toastify.toastError(STRINGS.TOAST_BOOKING_DELETE_ERROR);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Handle edit booking (by double click on row).
   *
   * @param {string} bookingId - id of the booking to edit
   */
  const editBooking = (bookingId) => {
    if (bookingMap === null) {
      return;
    }
    setIsNew(false);
    setCurrentBooking(bookingMap[bookingId]);
    setEditModalVisible(true);
  };

  /**
   * Handle the close (cancel) action of modal.
   */
  const onModalClose = () => {
    setCurrentBooking(undefined);
    setEditModalVisible(false);
  };

  /**
   * Handle the create/save action of modal.
   * @param {object} data - form date from modal
   */
  const onModalSave = (data) => {
    setEditModalVisible(false);
    setLoading(true);
    console.log('+++ booking data on save: ', data);
    if (isNew) {
      dispatch(
        bookingActions.createBooking({
          bookingDate:
            data.bookingDate === null
              ? ''
              : data.bookingDate.format(FORMAT.DATE),
          collectionDate: data.collectionDate.format(FORMAT.DATE),
          customerId: data.customerNew,
          sid: data.siteNew,
          note: data.note,
        })
      )
        .then(() => {
          dispatch(bookingActions.getBookings())
            .then(() => {
              toastify.toastSuccess(STRINGS.TOAST_BOOKING_CREATE_SUCCESS);
            })
            .catch((error) => {
              toastify.toastError(STRINGS.TOAST_BOOKINGS_LOAD_ERROR);
            });
        })
        .catch((error) => {
          toastify.toastError(STRINGS.TOAST_BOOKING_CREATE_ERROR);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(
        bookingActions.updateBooking({
          dataId: data.dataId,
          bookingDate:
            data.bookingDate === null
              ? ''
              : data.bookingDate.format(FORMAT.DATE),
          collectionDate: data.collectionDate.format(FORMAT.DATE),
          customerId: data.customerEdit,
          sid: data.siteEdit,
          note: data.note,
        })
      )
        .then(() => {
          dispatch(bookingActions.getBookings())
            .then(() => {
              toastify.toastSuccess(STRINGS.TOAST_BOOKING_UPDATE_SUCCESS);
            })
            .catch((error) => {
              toastify.toastError(STRINGS.TOAST_BOOKINGS_LOAD_ERROR);
            });
        })
        .catch((error) => {
          toastify.toastError(STRINGS.TOAST_BOOKING_UPDATE_ERROR);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  /**
   * Render header.
   *
   * @return {JSX} - header
   */
  const renderHeader = () => {
    return <HeaderLogged />;
  };

  /**
   * Render body.
   *
   * @return {JSX} - body
   */
  const renderBody = () => {
    // Errors while fetching data
    if (bookings.error !== null || customers.error !== null) {
      return <TagErrorPlaceholder />;
    }

    // Update loading status
    const pending =
      bookings.isPending ||
      customers.isPending ||
      creatingBooking.isPending ||
      deletingBooking.isPending;
    if (loading !== pending) {
      setLoading(pending);
    }

    // Build booking map after booking data loaded
    if (
      bookingMap === null &&
      Array.isArray(bookings.data) &&
      bookings.data.length > 0
    ) {
      bookingMap = {};
      bookings.data.forEach((item) => {
        bookingMap[item.dataId] = item;
      });
    }

    return (
      <Spin size={'large'} spinning={loading}>
        {editModalVisible && (
          <EditBookingModal
            isNew={isNew}
            onSave={onModalSave}
            onClose={onModalClose}
            customerData={customers.data}
            bookingData={currentBooking}
          />
        )}
        <div id={styles['booking-grid-wrapper']}>
          <BookingTableComponent
            bookingData={bookings.data === null ? [] : bookings.data}
            createBooking={createBooking}
            deleteBookings={deleteBookings}
            editBooking={editBooking}
          />
        </div>
      </Spin>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderBody()}
      <ToastContainer />
    </div>
  );
};

export { BookingView };
