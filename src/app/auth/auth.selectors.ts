import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const salectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
    salectAuthState,
    (auth) => !!auth.user
)

export const isLoggedOut = createSelector(
    isLoggedIn,
    (isLoggedIn) => !isLoggedIn
)