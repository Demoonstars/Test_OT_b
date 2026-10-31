# Итоговый тест по вводному инструктажу по охране труда

SPA для прохождения итогового теста. Результаты сохраняются в Google Таблицу через Google Apps Script.

## Структура проекта

```
/
├── index.html   — разметка всех 5 сцен
├── styles.css   — стили, CSS-переменные, адаптивность, анимации
├── app.js       — логика SPA, вопросы, состояние, отправка данных
└── README.md    — настройка и деплой
```

## Быстрый старт

1. Скопируйте файлы в одну папку.
2. Настройте Google Apps Script (см. ниже).
3. Вставьте URL в `app.js` в переменную `GOOGLE_SCRIPT_URL`.
4. Откройте `index.html` в браузере (рекомендуется через локальный сервер).

---

## Настройка Google Apps Script

### Шаг 1. Создайте Google Таблицу

1. Перейдите на [sheets.google.com](https://sheets.google.com) и создайте новую таблицу.
2. (Необязательно) Добавьте заголовки в первую строку:

```
A: Дата/время | B: ФИО | C: Организация | D: Должность |
E: Подразделение | F: Дата рождения | G: Дата трудоустройства |
H: Правильных ответов | I: Результат (%) | J: Статус
```

### Шаг 2. Откройте Apps Script

В меню таблицы: **Расширения → Apps Script**. Удалите весь существующий код.

### Шаг 3. Вставьте код (Code.gs)

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.fullName,
      data.organization,
      data.position,
      data.department,
      data.birthDate,
      data.hireDate,
      data.correctAnswers,
      data.percent + '%',
      data.passed ? 'Сдал' : 'Не сдал'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Тестовая функция — запустите из редактора для проверки записи
function testWrite() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(), 'Тест Тестов', 'ООО Тест', 'Инженер',
    'Производство', '1990-01-01', '2024-01-01', 18, '90%', 'Сдал'
  ]);
}
```

### Шаг 4. Сохраните и разверните

1. Нажмите **Ctrl+S**, введите имя проекта (например, `QuizOT`).
2. Нажмите **Развернуть → Новое развёртывание**.
3. Тип: **Веб-приложение**.
4. Параметры:
   - **Выполнять как:** `Я`
   - **Кто имеет доступ:** `Все`
5. Нажмите **Развернуть**, разрешите запрошенные права.
6. **Скопируйте URL** (вида `https://script.google.com/macros/s/.../exec`).

### Шаг 5. Вставьте URL в app.js

Найдите в `app.js` строку:

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_DEPLOYED_APPS_SCRIPT_URL';
```

Замените на:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ВАША_ССЫЛКА/exec';
```

### Шаг 6. Проверьте

1. Пройдите тест до конца.
2. На странице результатов появится «✅ Результаты сохранены».
3. Откройте таблицу — новая строка с данными должна появиться.
4. Для отладки используйте DevTools → Console (F12).

---

## Примечания по CORS

Приложение использует `fetch` с `mode: 'no-cors'`:
- CORS не требует дополнительной настройки на стороне сервера.
- Ответ сервера недоступен JS, но данные **доходят** до таблицы.
- При изменении кода Apps Script создавайте **новое развёртывание** и обновляйте URL.

---

## Параметры теста

| Параметр | Значение |
|----------|----------|
| Вопросов | 20 |
| Порог сдачи | 85% (17 из 20) |
| Нормативная база | ПП РФ № 2464 от 24.12.2021 (ред. 30.06.2026), ТК РФ |

## Сцены приложения

| # | Сцена | Описание |
|---|-------|----------|
| 1 | Приветствие | Заголовок, описание, кнопка «Начать» |
| 2 | Согласие на ПДн | Текст согласия, чекбокс, кнопка «Продолжить» |
| 3 | Персональные данные | 6 полей, валидация |
| 4 | Тест | 20 вопросов, прогресс-бар |
| 5 | Результат | Счёт, статус, отправка в Google Sheets |
