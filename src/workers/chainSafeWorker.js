// src/workers/chainSafeWorker.js
self.importScripts('https://unpkg.com/chainsafe/dist/chainsafe.min.js');

self.addEventListener('message', async (e) => {
  try {
    const { code } = e.data;
    const result = self.chainsafe.addOptionalChaining(code);
    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
});