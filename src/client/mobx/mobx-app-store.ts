import {action, observable} from 'mobx';
import {IUser} from '../../shared/user';
import {IFollower} from '../../shared/follower';
import {fetchFollowers} from '../utils/api-facade';

export class MobxAppStore {

  /**
   * observable - only an action can change it, and it will trigger new rendering for everyone who's watching the store.
   **/

  /*
      1. SOLUTION
      define the observables you need: (first one is free!)
   */
  @observable
  public user: IUser;

  @observable
  public followers: IFollower[];
  // UNTIL HERE
  @observable
  public followersBatchIndex: number;

  constructor(user, followersBatchIndex) {
    /*
      2. SOLUTION
      set the initial state of your observables.
     */
    this.user = user;
    this.followersBatchIndex = followersBatchIndex;
    // UNTIL HERE
  }

  /**
   * action - a function that changes an observable, can be called from any component that have the store injected.
   **/

  /*
      3. SOLUTION
      Define the actions you need: (first one is free!)
     */

  @action
  public setUser(user: IUser) {
    this.user = user;
  }

  @action
  public setFollowersBatchIndex(newFollowersBatchIndex: number) {
    this.followersBatchIndex = newFollowersBatchIndex;
  }

  @action
  public sortFollowersByName() {
    this.followers = this.followers.sort((follower1: IFollower, follower2: IFollower) => follower1.name > follower2.name ? 1 : -1);
  }

  @action
  public sortFollowersByScreenName() {
    this.followers = this.followers.sort((follower1: IFollower, follower2: IFollower) => follower1.screenName > follower2.screenName ? 1 : -1);
  }

  @action
  public loadFollowers() {
    fetchFollowers(this.user.screenName, this.followersBatchIndex).then(response => {
      const {data} = response;
      if (data.followers) {
        this.followersBatchIndex === -1 ? this.setFollowers(data.followers) : this.addFollowers(data.followers.slice(1));
        this.setFollowersBatchIndex(data.nextFollowersBatchIndex);
      } else {
        console.error('Something went wrong, no followers found');
        alert('Problematic user, please refresh');
      }
    });
  }

  @action
  private setFollowers(followers: IFollower[]) {
    this.followers = followers;
  }

  @action
  private addFollowers(followers: IFollower[]) {
    this.followers = [...this.followers, ...followers];
  }

  // UNTIL HERE
}
