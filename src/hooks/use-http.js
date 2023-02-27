import { useState, useCallback } from "react";

const useHttp = () => {
  // here is our custom hook
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    // this requestConfig is our object with url, and applyData (from new task) is our createTask (but this createTask is pre configured only with taskText)
    // this hook should be able to send any kind of request to any kind of url, and do any kind of data transformation
    setIsLoading(true);
    // once a request is sent, setisLoading to true since now we are loading that request(get/post)
    setError(null);
    // clear any older errors
    try {
      // try this block of code first
      const response = await fetch(requestConfig.url, {
        // the fetch can be get or post (fetch gets or sends(post) this data - default is get)
        method: requestConfig.method ? requestConfig.method : "GET",
        // checking if there is a method, then apply it here, otherwise set 'GET' as default
        headers: requestConfig.headers ? requestConfig.headers : {},
        // checking if there is a header, then apply is here, otherwise leave as empty object - since headers are usually an object
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        // checking if theres a body, then apply it here and convert to JSON to be sent to backend, otherwise leave as null
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      // successful responses have the ok code, hence if !ok, then throw error

      const mealObjectData = await response.json();
      // parsing/transforming the JSON object into a JS object via the json method
      // console.log(taskObjectData);
      applyData(mealObjectData);
      // for our get request in App.js, this applyData is transformedMeals, and arg passed in here (mealObjectData) is the expected param (mealsObjectData) inside transformedTasks

      // so this gets sent back to createTask as taskData
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
    // once transformation is done, loading is done
  }, []);
  //   these are what we are using in the above function, both are objects, requestConfig is typical JS object
  // and applyData is a function - which are objects
  return {
    // isLoading: isLoading,
    // error: error,
    // sendRequest: sendRequest,
    isLoading,
    error,
    sendRequest,
    // we can shorten as both sides have same name - new JS feature
  };
};

export default useHttp;
