import { describe, expect, it } from 'vitest';
import { transformYoptaReact } from '../plugins/yoptaTransform.js';
import { vitePluginYopta } from '../plugins/vitePluginYopta.js';

describe('transformYoptaReact', () => {
  it('translates the control example into valid React code', () => {
    const input = `йопта импорт React, { useState } из 'react'

базарю App() {
  ёпта [count, setCount] = useState(0)

  базарю жмяк() {
    setCount(count + 1)
  }

  внатуре отвечаю (
    <div className="app">
      <h1>{count}</h1>
      <button onClick={жмяк}>Жмяк</button>
    </div>
  )
}

йопта экспорт по-братски App
`;

    const result = transformYoptaReact(input, { filename: 'App.yopta.jsx' });

    expect(result.code).toContain(`import React, { useState } from 'react'`);
    expect(result.code).toContain('function App()');
    expect(result.code).toContain('const [count, setCount] = useState(0)');
    expect(result.code).toContain('return (');
    expect(result.code).toContain('export default App');
    expect(result.map).toBeTruthy();
  });

  it('leaves strings, comments, JSX text, and prop names unchanged', () => {
    const input = `йопта импорт React из 'react'

базарю Demo() {
  // базарю отвечаю из
  ёпта label = "базарю отвечаю из"

  отвечаю (
    <Widget отвечаю={label} базарю="из">
      базарю отвечаю из
    </Widget>
  )
}

йопта экспорт по-братски Demo
`;

    const result = transformYoptaReact(input, { filename: 'Demo.yopta.jsx' });

    expect(result.code).toContain('// базарю отвечаю из');
    expect(result.code).toContain('"базарю отвечаю из"');
    expect(result.code).toContain('<Widget отвечаю={label} базарю="из">');
    expect(result.code).toMatch(/<Widget отвечаю=\{label\} базарю="из">\s*базарю отвечаю из\s*<\/Widget>/);
  });

  it('translates Yopta keywords inside JSX expressions', () => {
    const input = `базарю Demo() {
  ёпта count = 1

  отвечаю (
    <div>
      {(() => { отвечаю count + 1 })()}
    </div>
  )
}
`;

    const result = transformYoptaReact(input, { filename: 'Expr.yopta.jsx' });

    expect(result.code).toContain('{(() => { return count + 1 })()}');
  });

  it('accepts mixed normal JavaScript and Yopta keywords in the same file', () => {
    const input = `import React from 'react'

базарю Demo() {
  const items = ['раз', 'два']

  if (items.length > 0) {
    отвечаю <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
  }

  return null
}

йопта экспорт по-братски Demo
`;

    const result = transformYoptaReact(input, { filename: 'Mixed.yopta.jsx' });

    expect(result.code).toContain("import React from 'react'");
    expect(result.code).toContain('function Demo()');
    expect(result.code).toContain('if (items.length > 0)');
    expect(result.code).toContain('{items.map((item) => <li key={item}>{item}</li>)}');
    expect(result.code).toContain('export default Demo');
  });

  it('reports syntax errors against the original .yopta.jsx filename', () => {
    const input = `базарю Demo() {
  отвечаю (
    <div>
  )
}
`;

    expect(() => transformYoptaReact(input, { filename: 'Broken.yopta.jsx' })).toThrow(
      /Broken\.yopta\.jsx:\d+:\d+/,
    );
  });
});

describe('vitePluginYopta', () => {
  it('transforms only .yopta.jsx files', async () => {
    const plugin = vitePluginYopta();
    const transformed = await plugin.transform('базарю App() { отвечаю null }', '/tmp/App.yopta.jsx');
    const untouched = await plugin.transform('export default function App() { return null }', '/tmp/App.jsx');

    expect(transformed.code).toContain('function App() { return null }');
    expect(untouched).toBeNull();
  });
});
