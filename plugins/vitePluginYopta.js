import { transformYoptaReact } from './yoptaTransform.js';

export function vitePluginYopta() {
  return {
    name: 'vite-plugin-yopta-react',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.yopta.jsx')) {
        return null;
      }

      return transformYoptaReact(code, { filename: id });
    },
  };
}
