import { defineConfig } from 'vite';
import { energyPlusVersion, wasmFile } from '@idfkit/engine-assets';

const requiredVersion = '26.1.0';
if (String(energyPlusVersion) !== requiredVersion) {
  throw new Error(
    `A-01 expects EnergyPlus assets ${requiredVersion}, but the installed package reports ${energyPlusVersion}.`
  );
}

export default defineConfig({
  base: './',
  define: {
    __A01_ENGINE_WASM_FILE__: JSON.stringify(wasmFile),
    __A01_ENGINE_VERSION__: JSON.stringify(requiredVersion),
  },
  server: {
    host: '127.0.0.1',
    port: 4179,
    strictPort: true
  },
  preview: {
    host: '127.0.0.1',
    port: 4179,
    strictPort: true
  }
});
