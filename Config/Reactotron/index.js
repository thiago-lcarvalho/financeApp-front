import Reactotron from 'reactotron-react-native';
  const tron = Reactotron.configure({host:"192.168.15.6"})
                  .useReactNative()
                  .connect();

  // we are getting the global variable `console` and creating new property called tron
  // so we can call this command now in order to use Reactotron for debugging tool
  console.tron = tron;

  // cleaning the timeline every moment that we refresh our application
  tron.clear();