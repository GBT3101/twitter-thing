import * as React from 'react';
import { Link } from 'react-router-dom';
import {fetchUser} from '../../utils/api-facade';
import {inject, observer} from 'mobx-react';
import {useState} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
const css = require('../../styles/stalk-form.css');

function usePreviousScreenName(screenName) {
  const previousScreenNameRef = useRef();
  useEffect(() => {
    previousScreenNameRef.current = screenName;
  });
  return previousScreenNameRef.current;
}

/*
    5. SOLUTION
    Inject the store on the component.
    Define the component as Observer.
    hint: imports are already here, you don't need anything else.
 */
export const StalkForm = inject('mobxAppStore')(observer(props => { // HERE
  const { mobxAppStore } = props;
  const [screenName, setScreenName] = useState('');
  const [showSortingButtons, setShowSortingButtons] = useState(false);

  function submitUser() {
    const userAlreadyFetched = previousScreenName === screenName;
    if (!userAlreadyFetched) {
      fetchUser(screenName).then(response => {
        const user = response.data;
        /*
          6. SOLUTION
          Reset follower batch index
         */
        mobxAppStore.setFollowersBatchIndex(-1);
        /*
          7. SOLUTION
          set the user using the store.
         */
        mobxAppStore.setUser(user);
        // UNTIL HERE
        setShowSortingButtons(true);
      }).catch(e => alert(`${screenName} is not an existing user, please put an existing user name`));
    }
  }

  function SortingButtons() {
    /*
        10. SOLUTION
        Define the sorting functions using the mobxAppStore.
     */
    const sortByName = () => mobxAppStore.sortFollowersByName(); // HERE
    const sortByScreenName = () => mobxAppStore.sortFollowersByScreenName(); // HERE
    return (
      <div className={css.sortingButtonsContainer}>
        <button onClick={sortByName} className={css.sortingButton}>Sort by name</button>
        <button onClick={sortByScreenName} className={css.sortingButton}>Sort by screen name</button>
      </div>);
  }

  const previousScreenName = usePreviousScreenName(screenName);

  return (
    <div className={css.root}>
      <h2 className={css.title}>Which user would you like to stalk?</h2>
      <div className={css.formStyle}>
        <input onChange={e => setScreenName(e.target.value)} value={screenName} className={css.fieldStyle} type='text' name='username' placeholder='User Name' required />
        <button onClick={submitUser} className={`${css.pushButton} ${css.blue}`}>Who Follows Him</button>
        {showSortingButtons && <SortingButtons/>}
      </div>
    </div>
  );
}));
