import { AUTH } from '@types';

export const logoutAction = (dispatch) => {
  dispatch({
    type: AUTH.LOGOUT_ACTION,
    payload: {
      signed: false,
      status: AUTH.LOGOUT_ACTION,
      data: {
        name:'',
        role:[
          {
            rid: -1
          }
        ]
      },
    },
  });
};
