import { createContext } from 'react'
import CurrentUserSelect from './player/header/currentUserSelect/CurrentUserSelect';

export const CurrentUserContext = createContext();

CurrentUserSelect.displayName = 'CurrentUser';
