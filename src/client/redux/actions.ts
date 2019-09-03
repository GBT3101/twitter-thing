export enum Actions {
  sortByName = 'sortByName',
  sortByScreenName = 'sortByScreenName',
  addFollowers = 'addFollowers',
  initFollowers = 'initFollowers',
  setCursor = 'setCursor',
  setUser = 'setUser',
}

// Define action for each type.

export const sortFollowersByName = () => ({
  type: Actions.sortByName,
});

export const sortFollowersByScreenName = () => ({
  type: Actions.sortByScreenName,
});

export const addFollowers = newFollowers => ({
  type: Actions.addFollowers,
  followers: newFollowers,
});

export const initFollowers = firstFollowers => ({
  type: Actions.initFollowers,
  followers: firstFollowers,
});

export const setCursor = newCursor => ({
  type: Actions.setCursor,
  cursor: newCursor,
});

export const setUser = newUser => ({
  type: Actions.setUser,
  user: newUser,
});
