# Бомжграмм

`Бомжграмм` это пародийная web-копия Instagram, собранная не ради пользы человечеству, а ради чистого, бессовестного и абсолютно бессмысленного смеха.

Тут есть:

- лента района
- кружки у подъезда
- дворовый luxury
- жинка-core
- чекушечная философия
- и React-компоненты, написанные на `.yopta.jsx`, потому что обычная реальность показалась слишком скучной

## Для чего это вообще

Это проект для смеха ради.

Серьёзных KPI здесь нет.  
Цель одна: открыть сайт, увидеть `Бомжграмм`, прочитать подписи, посмотреть на `.yopta.jsx` и спросить себя, зачем это существует.  
Ответ простой: потому что смешно.

## Лайв и ссылки

- Бомжграмм: [https://legich13.github.io/bomjgram.github.io/](https://legich13.github.io/bomjgram.github.io/)
- GavTech: [https://legich13.github.io/gavtech.github.io/](https://legich13.github.io/gavtech.github.io/)
- Telegram: [@GavTech116](https://t.me/GavTech116)

## В чём прикол

Проект работает на `React + Vite`, но почти весь UI написан на Yopta-диалекте:

- `йопта импорт`
- `базарю`
- `ёпта`
- `отвечаю`
- `йопта экспорт по-братски`

То есть в репозитории лежит не только готовая шутка, но и сам механизм шутки:

- UI-компоненты на Yopta: [`src/`](./src)
- Yopta-транспайлер: [`plugins/yoptaTransform.js`](./plugins/yoptaTransform.js)
- Vite plugin: [`plugins/vitePluginYopta.js`](./plugins/vitePluginYopta.js)

Можно поржать и с интерфейса, и с того, как это вообще собирается.

## Что внутри

- адаптивный layout для desktop и mobile
- левый sidebar, stories, feed и правый rail
- seed-контент для постов и сторис
- локальный интерактив без бэкенда: лайки, сейвы, выбор stories и активная навигация
- GitHub Pages деплой через GitHub Actions

## Где править контент

Все мок-данные лежат в [`src/content/bomzhgramData.yopta.jsx`](./src/content/bomzhgramData.yopta.jsx).

Там можно менять:

- `stories`
- `posts`
- `profile`
- `suggestions`

Если потом захочется закинуть свои мемы и картинки, достаточно заменить `imageSrc`, `alt` и подписи.

## Команды

```bash
npm install
npm run dev
npm test
npm run build
```

## GitHub Pages

Проект подготовлен под GitHub Pages репозиторий `Legich13/bomjgram.github.io`.

- Vite собирается с `base: '/bomjgram.github.io/'`
- деплой идёт через GitHub Actions
- публикуется содержимое `dist/`

На GitHub нужно только включить `Settings -> Pages -> Source: GitHub Actions`.
