import { PROFILE } from '@types';

const initalState = [
  {
    status: '',
  },
];

const ProfileReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE.PROFILE_PENDING:
    case PROFILE.PROFILE_REJECT:
      return [
        {
          status: payload.status,
        },
      ];
    case PROFILE.PROFILE_SUCCESS:
      return [
        {
          status: payload.status,
        },
      ];
    default:
      return state;
  }
  return state;
};

export { ProfileReducer };
