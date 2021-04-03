import { PROFILE, AUTH } from '@types';

const profilePending = (dispatch) => {
  dispatch({
    type: PROFILE.PROFILE_PENDING,
    payload: {
      status: PROFILE.PROFILE_PENDING,
    },
  });
};

const profileSuccess = (dispatch, data) => {
  dispatch({
    type: AUTH.PROFILE_SUCCESS,
    payload: {
      data: data,
      status: AUTH.PROFILE_SUCCESS,
    },
  });
};

const profileReject = (dispatch) => {
  dispatch({
    type: PROFILE.PROFILE_REJECT,
    payload: {
      status: PROFILE.PROFILE_REJECT,
    },
  });
};

export default { profilePending, profileReject, profileSuccess };
