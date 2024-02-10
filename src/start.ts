import loadEnv from "./index";

loadEnv().then(() => {
  console.log('env loaded');
  console.log(process.env.title)
});
