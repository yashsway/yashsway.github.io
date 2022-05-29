export default function sleep(timeInMs) {
  return new Promise((resolve, reject) => {
    if (!timeInMs || typeof timeInMs !== 'number') {
      rej('Invalid time argument provided.');
    }

    setTimeout(() => resolve(), Math.abs(timeInMs));
  });
}