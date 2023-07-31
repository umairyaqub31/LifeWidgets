import { combineReducers } from "redux";
import PopupReducers from "./PopupReducers";
import { reducer as UserReducer } from "./UserRedux";
import { reducer as PostReducer } from "./PostRedux";
import { reducer as PeopleRedux } from "./PeopleRedux";
import { reducer as BarRedux } from "./BarRedux";
import { reducer as ProgressReducer } from "./ProgressRedux";
import { reducer as ProfileRedux } from "./ProfileRedux";
import { reducer as CommentRedux } from "./CommentRedux";
import { reducer as NotificationRedux } from "./NotificationRedux";
import { reducer as GroupRedux } from "./GroupRedux";
import { reducer as CollectionRedux } from "./CollectionRedux";
import { reducer as FlirtRedux } from "./FlirtRedux";
import { reducer as CompanyRedux } from "./CompanyRedux";
import { reducer as FeedRedux } from "./FeedRedux";
import { reducer as EventRedux } from "./EventRedux";
import { reducer as ChatRedux } from "./ChatRedux";

const appReducer = combineReducers({
  PopupReducers: PopupReducers,
  User: UserReducer,
  Post: PostReducer,
  People: PeopleRedux,
  Progress: ProgressReducer,
  Profile:ProfileRedux,
  Bar: BarRedux,
  Comment:CommentRedux,
  Notification:NotificationRedux,
  Group:GroupRedux,
  Collection:CollectionRedux,
  Flirt:FlirtRedux,
  Company:CompanyRedux,
  Feed:FeedRedux,
  Event: EventRedux,
  Message:ChatRedux

});

const rootReducer = (state, action) => {

  // Clear all data in redux store to initial.
  if (action.type === "LOGOUT_RESETSTATE") state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
