import loadEnv from "./load";

export default async function runLoadEnv() {
  try {
    await loadEnv();
  } catch (error) {
    console.error(`Error running loadEnv: ${error}`);
  }
}

runLoadEnv();
