export default function asyncMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, optimisticPromise, type, ...rest } = action;

      // if action does not have a promise property then "next" it and stop executing
      if (!promise && !optimisticPromise)
        return next(action);

      // else "next" everything besides promise property
      next({type, ...rest});

      const promiseToUse = promise || optimisticPromise;

      const actionPromise = promiseToUse(client);
      actionPromise.then(
        response => promiseToUse !== optimisticPromise && next({...rest, response, type: `${type}_SUCCESS`}), // allow optimistic async interaction
        error => next({...rest, response: error, type: `${type}_FAIL`})
      ).catch(error => {
        console.error('MIDDLEWARE ERROR:', error, `from ${action.type}: `, action);
        next({...rest, error, type: `${type}_FAIL`});
      });

      return actionPromise;
    };
  };
}
