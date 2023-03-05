# Тестовое задание для стажировки в VK

В данном репозитории содержится решение для тестового задания на должность стажера в VK

Для запуска приложения, необходимо склонировать репозиторий, а также выполнить:
`npm install`
После того как зависимости установлены:
`npm start`

Также приложение доступно на Vercel:
[https://minesweeper-flax.vercel.app/](https://minesweeper-flax.vercel.app/)

## Мотивация выбора технологий
Я решила выбрать React, потому что эта библиотека в наше время является стандартом в индустрии, более того, в VK React также используется во многих проектах, и поэтому я решила что это будет хороший выбор чтобы облегчить задачи рендеринга

Также, React часто идет в связке с библиотеками для управления состоянием, поэтому я также решила выбрать Redux

## Общие комментарии по заданию
Для написания бизнес-логики я решила использовать обыкновенные функции, они хранятся на уровне редьюсера игры, возможно стоило вынести эти функции в какое-либо другое место.
Также, я написала несколько тестов чтобы убедиться что ключевой набор функций нужных для игры работает правильно и предсказуемо.
