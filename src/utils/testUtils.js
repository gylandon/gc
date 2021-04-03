/**
 * Until a condition is met, update the wrapper while wait.
 *
 * @param {ReactWrapper} wrapper - the wrapper of an react component
 * @param {function(ReactWrapper):Boolean} resolveCondition - a function to return a boolean,
 *  marking whether the condition to resolve is met. It should receive wrapper as a parameter
 * @return {Promise} - a promise with the response when resolved
 */
function updateWrapperUntil(wrapper, resolveCondition) {
  return new Promise((resolve, reject) => {
    (function waiting() {
      if (resolveCondition(wrapper)) {
        return resolve(null);
      } else {
        // need to manually update the wrapper, otherwise its props will never be updated
        wrapper.update();
        setTimeout(waiting, 50);
      }
    })();
  });
}

/**
 * Extract the texts from the selected, return a joined string.
 *
 * @param {ReactWrapper} wrapper - the wrapper of an react component
 * @param {String} selector - selector used to find targets
 * @param {String} separator - separator used to join the results
 * @return {String} - the joined texts
 */
function findAndJoinText(wrapper, selector, separator = '-') {
  const textResults = wrapper.find(selector).map((result) => {
    return result.text();
  });
  return textResults.join(separator);
}

/**
 * A debug function, returning a promise that will wait for some time before resolve.
 *
 * Don't leave the usage of this function in final test code.
 * Used to get the fully loaded wrapper, in order to determine resolve condition
 *  for updateWrapperUntil. An example is:
 *
 *    debugWait(1000).then(() => {
 *      wrapper.update();
 *      done();  // set the break point here to check the wrapper in debugger
 *    } )
 *
 * please remember to wrapper.update() in the .then() block to view the new wrapper
 * @param {number} time - how long to wait, in milliseconds
 * @return {Promise} - a promise that will resolve after some time
 */
function debugWait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Ensure ag-grid is ready to be tested
 *
 * @author - ag-grid
 * @see - https://www.ag-grid.com/javascript-grid-testing-react/
 * @param {object} component - ag-grid component from wrapper.find('DataGridComponent')
 * @return {Promise} - a promise, which resolves after ag-grid is ready to be tested, or rejected if timeout
 */
const ensureGridApiHasBeenSet = (component) => {
  return waitForAsyncCondition(() => {
    return component.instance().api !== undefined;
  }, 5);
};

/**
 * Wait for an async condition to be met
 *
 * @author - ag-grid
 * @see - https://www.ag-grid.com/javascript-grid-testing-react/
 * @param {function} condition - condition to wait to become true
 * @param {number} maxAttempts - max number to attempt (each will take 50ms)
 * @param {number} attempts - used internally to count the attempts
 * @return {Promise} - a promise to be waited or to attach .then()
 */
const waitForAsyncCondition = (condition, maxAttempts = 100, attempts = 0) => {
  return new Promise(function (resolve, reject) {
    (function waitForCondition() {
      // we need to wait for the gridReady event before we can start interacting with the grid
      // in this case we're looking at the api property in our App component, but it could be
      // anything (ie a boolean flag)
      if (condition()) {
        // once our condition has been met we can start the tests
        return resolve();
      }
      attempts++;

      if (attempts >= maxAttempts) {
        reject(new Error('Max timeout waiting for condition'));
      }

      // not set - wait a bit longer
      setTimeout(waitForCondition, 50);
    })();
  });
};

export {
  debugWait,
  ensureGridApiHasBeenSet,
  findAndJoinText,
  updateWrapperUntil,
  waitForAsyncCondition,
};
