import * as actionTypes from '../action-types';

export const dropElement = (payload) => ({
    type: actionTypes.DROP_ELEMENT,
    payload
});

export const prevousState = (payload) => ({
    type: actionTypes.PREVOUS_STATE,
    payload
})