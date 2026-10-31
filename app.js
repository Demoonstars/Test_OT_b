/**
 * app.js — SPA «Итоговый тест по вводному инструктажу по охране труда»
 * Vanilla JS ES6+, без фреймворков
 */

/* ════════════════════════════════════════════════════════════
   1. БАНК ВОПРОСОВ (20 вопросов)
   Источники: ПП РФ № 2464 от 24.12.2021 (ред. 30.06.2026), ТК РФ
   correctIndex — индекс правильного ответа (0-based)
════════════════════════════════════════════════════════════ */
const QUESTIONS = [
  {
    text: 'Кто обязан проводить вводный инструктаж по охране труда с вновь принятыми работниками?',
    options: [
      'Непосредственный руководитель работника (мастер, начальник участка)',
      'Специалист по охране труда или уполномоченное руководителем лицо',
      'Главный бухгалтер организации',
      'Руководитель отдела кадров'
    ],
    correctIndex: 1
  },
  {
    text: 'Когда проводится вводный инструктаж по охране труда с новым работником?',
    options: [
      'В течение первого месяца после начала работы',
      'На следующий день после оформления трудового договора',
      'До начала самостоятельного выполнения трудовых функций',
      'После прохождения испытательного срока'
    ],
    correctIndex: 2
  },
  {
    text: 'С какими категориями лиц в обязательном порядке проводится вводный инструктаж?',
    options: [
      'Только со штатными работниками, принятыми на постоянную работу',
      'Только с работниками, занятыми на работах с вредными условиями труда',
      'Со всеми вновь принятыми, командированными, практикантами и иными лицами, участвующими в деятельности организации',
      'Только с работниками, впервые поступающими на работу'
    ],
    correctIndex: 2
  },
  {
    text: 'Какой вид инструктажа проводится непосредственно на рабочем месте до начала самостоятельной работы?',
    options: [
      'Вводный инструктаж',
      'Целевой инструктаж',
      'Первичный инструктаж на рабочем месте',
      'Повторный инструктаж'
    ],
    correctIndex: 2
  },
  {
    text: 'С какой периодичностью проводится повторный инструктаж по охране труда для большинства работников?',
    options: [
      'Не реже одного раза в год',
      'Не реже одного раза в три месяца',
      'Не реже одного раза в шесть месяцев',
      'Один раз в два года'
    ],
    correctIndex: 2
  },
  {
    text: 'При выполнении каких работ проводится целевой инструктаж по охране труда?',
    options: [
      'При поступлении на работу в новую организацию',
      'При разовых работах, не связанных с прямыми обязанностями работника, при ликвидации аварий и стихийных бедствий',
      'При возвращении работника из отпуска',
      'При переводе работника в другой отдел'
    ],
    correctIndex: 1
  },
  {
    text: 'Что обязан сделать работник при обнаружении неисправности оборудования или угрозы жизни и здоровью?',
    options: [
      'Самостоятельно устранить неисправность, не прерывая работу',
      'Продолжить работу и сообщить руководителю в конце смены',
      'Немедленно известить непосредственного руководителя и не приступать к работе до устранения нарушения',
      'Письменно уведомить специалиста по охране труда в течение суток'
    ],
    correctIndex: 2
  },
  {
    text: 'Имеет ли работник право отказаться от выполнения работы, если она непосредственно угрожает его жизни или здоровью?',
    options: [
      'Нет, отказ от работы является нарушением трудовой дисциплины',
      'Да, работник вправе отказаться; работодатель обязан предоставить другую работу или оплатить время простоя',
      'Да, но только при наличии письменного заключения медицинской комиссии',
      'Нет, только профсоюзный представитель может принять такое решение'
    ],
    correctIndex: 1
  },
  {
    text: 'Что должен сделать работник при несчастном случае на производстве в первую очередь?',
    options: [
      'Составить акт произвольной формы и передать его в бухгалтерию',
      'Дождаться конца рабочей смены и сообщить руководителю',
      'Немедленно известить непосредственного руководителя и по возможности сохранить обстановку места происшествия',
      'Самостоятельно покинуть рабочее место и обратиться в больницу'
    ],
    correctIndex: 2
  },
  {
    text: 'Что обязан сделать работник при обнаружении пострадавшего на производстве?',
    options: [
      'Немедленно оказать первую помощь, вызвать скорую медицинскую помощь и сообщить руководителю',
      'Ждать прихода специалиста по охране труда, не прикасаясь к пострадавшему',
      'Сфотографировать место происшествия и продолжить работу',
      'Эвакуировать пострадавшего самостоятельно за пределы организации'
    ],
    correctIndex: 0
  },
  {
    text: 'Каков первый шаг при оказании помощи пострадавшему от поражения электрическим током?',
    options: [
      'Немедленно начать делать искусственное дыхание',
      'Обесточить пострадавшего (отключить источник тока), не касаясь его незащищёнными руками',
      'Облить пострадавшего холодной водой',
      'Дать пострадавшему успокоительные препараты'
    ],
    correctIndex: 1
  },
  {
    text: 'По какому номеру следует вызывать пожарную охрану при обнаружении возгорания?',
    options: [
      '102 или 112',
      '103 или 112',
      '101 или 112',
      '104 или 112'
    ],
    correctIndex: 2
  },
  {
    text: 'Каков правильный порядок действий работника при обнаружении пожара?',
    options: [
      'Начать самостоятельно тушить пожар любыми подручными средствами, не вызывая пожарную охрану',
      'Покинуть здание, закрыв за собой все двери и окна, и позвонить в пожарную охрану снаружи',
      'Сообщить о пожаре в пожарную охрану, оповестить людей, по возможности приступить к эвакуации и тушению в соответствии с инструкцией',
      'Ждать указаний руководителя, не предпринимая самостоятельных действий'
    ],
    correctIndex: 2
  },
  {
    text: 'Какой метод применяется для остановки сильного артериального кровотечения из конечности?',
    options: [
      'Прикладывание льда к месту ранения',
      'Наложение жгута или закрутки выше места ранения с обязательным указанием времени наложения',
      'Обильное промывание раны водой',
      'Придание конечности горизонтального положения без каких-либо повязок'
    ],
    correctIndex: 1
  },
  {
    text: 'Какую ответственность несёт работник за нарушение требований охраны труда?',
    options: [
      'Только моральную — путём объявления выговора',
      'Дисциплинарную, административную и уголовную ответственность в зависимости от тяжести нарушения',
      'Только материальную — обязан возместить ущерб организации',
      'Работник не несёт ответственности — это исключительная обязанность работодателя'
    ],
    correctIndex: 1
  },
  {
    text: 'Обязан ли работник применять выданные ему средства индивидуальной защиты (СИЗ)?',
    options: [
      'Нет, применение СИЗ — право, а не обязанность работника',
      'Да, только если об этом прямо написано в трудовом договоре',
      'Да, работник обязан правильно применять СИЗ, выданные в установленном порядке',
      'Нет, СИЗ применяются только при проверках контролирующих органов'
    ],
    correctIndex: 2
  },
  {
    text: 'Что понимается под микроповреждением (микротравмой) на производстве и как оно учитывается?',
    options: [
      'Только переломы и вывихи; учёт ведётся в общем журнале травматизма',
      'Ссадины, кровоподтёки, ушибы и иные незначительные повреждения без потери трудоспособности; работодатель обязан их рассматривать и учитывать',
      'Профессиональные заболевания, возникшие через годы работы; учёт не предусмотрен',
      'Микроповреждения законодательно не определены и не подлежат учёту'
    ],
    correctIndex: 1
  },
  {
    text: 'Каков порядок проведения обучения работников по использованию средств индивидуальной защиты (СИЗ)?',
    options: [
      'Обучение не обязательно — достаточно вложить инструкцию в упаковку СИЗ',
      'Работник самостоятельно изучает инструкцию по применению СИЗ без участия работодателя',
      'Работодатель обязан организовать обучение работников правилам применения СИЗ до начала их использования',
      'Обучение проводится только для работников с особо опасными условиями труда'
    ],
    correctIndex: 2
  },
  {
    text: 'Какие меры обязан принять работодатель для санитарно-бытового обеспечения работников?',
    options: [
      'Только оборудовать место для курения за пределами здания',
      'Обеспечить работников питьевой водой, санитарно-бытовыми помещениями (туалеты, умывальники, душевые, гардеробы) согласно санитарным нормам',
      'Предоставить работникам горячее питание за счёт работодателя',
      'Достаточно наличия одного туалета на всё здание независимо от численности работников'
    ],
    correctIndex: 1
  },
  {
    text: 'Каковы признаки психоэмоциональных перегрузок у работника и как их предупредить?',
    options: [
      'Признаки: повышение работоспособности и концентрации; профилактика не требуется',
      'Признаки: хроническая усталость, раздражительность, снижение концентрации; профилактика — рациональный режим труда и отдыха, психологическая поддержка, регулярные перерывы',
      'Признаки: физические травмы конечностей; профилактика — применение СИЗ',
      'Психоэмоциональные перегрузки не относятся к сфере охраны труда'
    ],
    correctIndex: 1
  }
];

/* ════════════════════════════════════════════════════════════
   2. КОНФИГУРАЦИЯ
════════════════════════════════════════════════════════════ */

/**
 * URL развёрнутого Google Apps Script Web App.
 * Замените на реальный URL после деплоя (см. README.md).
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz72mduUFCnAf5QhPHmnU47ZVpa1nCXqMnWh3ayhlNoUWoPwvmYF4ONYDpzKNs1zvC23g/exec';

/** Порог прохождения: 85% = 17 правильных из 20 */
const PASS_THRESHOLD = 0.85;
const TOTAL_QUESTIONS = QUESTIONS.length; // 20

/* ════════════════════════════════════════════════════════════
   3. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
════════════════════════════════════════════════════════════ */

/**
 * Централизованный объект состояния SPA.
 * Все данные хранятся здесь до финальной отправки.
 */
const state = {
  currentScene: 1,
  consentGiven: false,
  userData: {
    fullName:     '',
    organization: '',
    position:     '',
    department:   '',
    birthDate:    '',
    hireDate:     ''
  },
  answers: [],              // массив выбранных индексов ответов (по одному на вопрос)
  currentQuestionIndex: 0   // текущий вопрос (0-based)
};

/* ════════════════════════════════════════════════════════════
   4. DOM-ССЫЛКИ
════════════════════════════════════════════════════════════ */

// Сцены
const sceneMap = {
  1: document.getElementById('scene-welcome'),
  2: document.getElementById('scene-consent'),
  3: document.getElementById('scene-form'),
  4: document.getElementById('scene-quiz'),
  5: document.getElementById('scene-result')
};

// Кнопки
const btnStart       = document.getElementById('btn-start');
const btnConsentCont = document.getElementById('btn-consent-continue');
const btnFormSubmit  = document.getElementById('btn-form-submit');
const btnNext        = document.getElementById('btn-next');
const btnNextLabel   = document.getElementById('btn-next-label');
const btnRetry       = document.getElementById('btn-retry');

// Сцена 2: Согласие
const consentCheckbox = document.getElementById('consent-checkbox');

// Сцена 3: Форма
const inputFullname   = document.getElementById('input-fullname');
const inputOrg        = document.getElementById('input-org');
const inputPosition   = document.getElementById('input-position');
const inputDepartment = document.getElementById('input-department');
const inputBirthdate  = document.getElementById('input-birthdate');
const inputHiredate   = document.getElementById('input-hiredate');

// Сцена 4: Тест
const quizCounter      = document.getElementById('quiz-counter');
const progressBarFill  = document.getElementById('progress-bar-fill');
const progressBarTrack = document.getElementById('progress-bar-track');
const questionCard     = document.getElementById('question-card');
const questionNumber   = document.getElementById('question-number');
const questionText     = document.getElementById('question-text');
const optionsList      = document.getElementById('options-list');

// Сцена 5: Результат
const resultIconWrap = document.getElementById('result-icon-wrap');
const resultTitle    = document.getElementById('result-title');
const resultText     = document.getElementById('result-text');
const scoreNumber    = document.getElementById('score-number');
const scoreRingFill  = document.getElementById('score-ring-fill');
const statCorrect    = document.getElementById('stat-correct');
const statPercent    = document.getElementById('stat-percent');
const statStatus     = document.getElementById('stat-status');
const submitStatus   = document.getElementById('submit-status');

/* ════════════════════════════════════════════════════════════
   5. УПРАВЛЕНИЕ СЦЕНАМИ
════════════════════════════════════════════════════════════ */

/**
 * showScene(n) — активирует сцену n (1–5), скрывает остальные.
 * Переход через CSS-класс .active с анимацией sceneIn.
 * @param {number} n — номер целевой сцены
 */
function showScene(n) {
  Object.entries(sceneMap).forEach(([idx, scene]) => {
    if (!scene) return;
    if (Number(idx) === n) {
      scene.classList.add('active');
      scene.removeAttribute('aria-hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scene.classList.remove('active');
      scene.setAttribute('aria-hidden', 'true');
    }
  });
  state.currentScene = n;
}

/* ════════════════════════════════════════════════════════════
   6. СЦЕНА 2: СОГЛАСИЕ НА ОБРАБОТКУ ПДн
════════════════════════════════════════════════════════════ */

/**
 * Включает/выключает кнопку «Продолжить»
 * в зависимости от состояния чекбокса.
 */
function updateConsentButton() {
  const checked = consentCheckbox.checked;
  state.consentGiven = checked;
  btnConsentCont.disabled = !checked;
  btnConsentCont.setAttribute('aria-disabled', String(!checked));
}

consentCheckbox.addEventListener('change', updateConsentButton);

/* ════════════════════════════════════════════════════════════
   7. СЦЕНА 3: ВАЛИДАЦИЯ ФОРМЫ
════════════════════════════════════════════════════════════ */

const formFields = [
  inputFullname, inputOrg, inputPosition,
  inputDepartment, inputBirthdate, inputHiredate
];

/**
 * validateForm() — проверяет все поля (непустое значение после trim).
 * Активирует кнопку «Перейти к тесту» только если все поля заполнены.
 */
function validateForm() {
  const allFilled = formFields.every(f => f.value.trim() !== '');
  btnFormSubmit.disabled = !allFilled;
  btnFormSubmit.setAttribute('aria-disabled', String(!allFilled));
}

formFields.forEach(field => {
  field.addEventListener('input', validateForm);
  field.addEventListener('change', validateForm);
});

/**
 * collectFormData() — сохраняет данные формы в state.userData.
 */
function collectFormData() {
  state.userData.fullName     = inputFullname.value.trim();
  state.userData.organization = inputOrg.value.trim();
  state.userData.position     = inputPosition.value.trim();
  state.userData.department   = inputDepartment.value.trim();
  state.userData.birthDate    = inputBirthdate.value;
  state.userData.hireDate     = inputHiredate.value;
}

/* ════════════════════════════════════════════════════════════
   8. СЦЕНА 4: ЛОГИКА ТЕСТА
════════════════════════════════════════════════════════════ */

/**
 * startQuiz() — сбрасывает состояние теста и показывает первый вопрос.
 */
function startQuiz() {
  state.answers = [];
  state.currentQuestionIndex = 0;
  renderQuestion(0);
}

/**
 * renderQuestion(index) — отрисовывает вопрос и варианты ответа.
 * Обновляет прогресс-бар, счётчик и текст кнопки «Далее».
 * @param {number} index — индекс вопроса (0-based)
 */
function renderQuestion(index) {
  const q = QUESTIONS[index];
  const num = index + 1;

  // Счётчик и прогресс-бар
  quizCounter.textContent = `Вопрос ${num} из ${TOTAL_QUESTIONS}`;
  const pct = (index / TOTAL_QUESTIONS) * 100;
  progressBarFill.style.width = pct + '%';
  progressBarTrack.setAttribute('aria-valuenow', String(index));

  // Номер вопроса
  questionNumber.textContent = 'Вопрос ' + String(num).padStart(2, '0');

  // Текст вопроса
  questionText.textContent = q.text;

  // Варианты ответа
  optionsList.innerHTML = '';
  q.options.forEach((optText, optIdx) => {
    const label = document.createElement('label');
    label.className = 'option-label';
    label.setAttribute('for', `opt-${index}-${optIdx}`);

    const radio = document.createElement('input');
    radio.type      = 'radio';
    radio.name      = `q${index}`;
    radio.id        = `opt-${index}-${optIdx}`;
    radio.value     = String(optIdx);
    radio.className = 'option-radio';
    if (state.answers[index] === optIdx) radio.checked = true;

    radio.addEventListener('change', () => onOptionSelect(index, optIdx));

    const marker = document.createElement('span');
    marker.className = 'option-marker';
    marker.setAttribute('aria-hidden', 'true');

    const textSpan = document.createElement('span');
    textSpan.className   = 'option-text';
    textSpan.textContent = optText;

    label.appendChild(radio);
    label.appendChild(marker);
    label.appendChild(textSpan);
    optionsList.appendChild(label);
  });

  // Кнопка навигации
  updateNextButton(index);
  btnNextLabel.textContent = (index === TOTAL_QUESTIONS - 1) ? 'Завершить тест' : 'Далее';
}

/**
 * onOptionSelect(qIdx, optIdx) — обработчик выбора варианта ответа.
 * @param {number} qIdx   — индекс вопроса
 * @param {number} optIdx — индекс варианта
 */
function onOptionSelect(qIdx, optIdx) {
  state.answers[qIdx] = optIdx;
  updateNextButton(qIdx);
}

/**
 * updateNextButton(index) — активирует «Далее» если ответ выбран.
 * @param {number} index — индекс текущего вопроса
 */
function updateNextButton(index) {
  const answered = state.answers[index] !== undefined;
  btnNext.disabled = !answered;
  btnNext.setAttribute('aria-disabled', String(!answered));
}

/**
 * goToNextQuestion() — переход к следующему вопросу с анимацией,
 * либо показ результатов если вопросы закончились.
 */
function goToNextQuestion() {
  const cur = state.currentQuestionIndex;

  if (cur < TOTAL_QUESTIONS - 1) {
    // Анимация ухода текущего вопроса
    questionCard.classList.add('leaving');
    setTimeout(() => {
      questionCard.classList.remove('leaving');
      state.currentQuestionIndex = cur + 1;
      renderQuestion(state.currentQuestionIndex);
    }, 250);
  } else {
    // Все вопросы пройдены — показываем результат
    showResults();
  }
}

/* ════════════════════════════════════════════════════════════
   9. СЦЕНА 5: РЕЗУЛЬТАТЫ
════════════════════════════════════════════════════════════ */

/**
 * calculateResult() — подсчитывает количество правильных ответов.
 * @returns {{ correct: number, percent: number, passed: boolean }}
 */
function calculateResult() {
  let correct = 0;
  QUESTIONS.forEach((q, idx) => {
    if (state.answers[idx] === q.correctIndex) correct++;
  });
  const percent = Math.round((correct / TOTAL_QUESTIONS) * 100);
  const passed  = (correct / TOTAL_QUESTIONS) >= PASS_THRESHOLD;
  return { correct, percent, passed };
}

/**
 * showResults() — вычисляет результат, обновляет Сцену 5,
 * анимирует круговой прогресс и запускает отправку данных.
 */
function showResults() {
  const { correct, percent, passed } = calculateResult();

  showScene(5);

  resultIconWrap.textContent = passed ? '🎉' : '😔';

  resultTitle.className   = 'result-title ' + (passed ? 'success' : 'failure');
  resultTitle.textContent = passed
    ? 'Поздравляем! Тест сдан успешно.'
    : 'Тест не сдан.';

  resultText.textContent = passed
    ? 'Вы успешно прошли итоговый тест по вводному инструктажу. Ваши результаты сохранены в системе.'
    : `Вы ответили правильно на ${correct} из ${TOTAL_QUESTIONS} вопросов. ` +
      'Рекомендуем освежить знания по материалам вводного инструктажа и попробовать ещё раз. ' +
      'У вас обязательно получится!';

  scoreNumber.textContent = String(correct);
  statCorrect.textContent = `${correct} из ${TOTAL_QUESTIONS}`;
  statPercent.textContent = percent + '%';
  statStatus.textContent  = passed ? 'Сдал / Сдала' : 'Не сдан';
  statStatus.className    = 'stat-value stat-status ' + (passed ? 'success' : 'failure');

  // Анимация кольца (окружность = 2π × 50 ≈ 314)
  const offset = 314 - (percent / 100) * 314;
  scoreRingFill.className = 'score-ring-fill ' + (passed ? 'success' : 'failure');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scoreRingFill.style.strokeDashoffset = String(offset);
    });
  });

  progressBarFill.style.width = '100%';
  progressBarTrack.setAttribute('aria-valuenow', String(TOTAL_QUESTIONS));

  submitStatus.textContent = '';
  submitStatus.className   = 'submit-status';

  const payload = {
    fullName:       state.userData.fullName,
    organization:   state.userData.organization,
    position:       state.userData.position,
    department:     state.userData.department,
    birthDate:      state.userData.birthDate,
    hireDate:       state.userData.hireDate,
    correctAnswers: correct,
    totalQuestions: TOTAL_QUESTIONS,
    percent:        percent,
    passed:         passed,
    timestamp:      new Date().toISOString()
  };

  sendResultsToGoogleSheets(payload);
}

/* ════════════════════════════════════════════════════════════
   10. ОТПРАВКА ДАННЫХ В GOOGLE SHEETS
════════════════════════════════════════════════════════════ */

/**
 * sendResultsToGoogleSheets(payload) — отправляет результаты
 * через fetch POST к Google Apps Script Web App.
 * mode: 'no-cors' обходит CORS без серверной настройки.
 * Ошибки не блокируют интерфейс — только логируются.
 * @param {object} payload — данные для записи в таблицу
 */
async function sendResultsToGoogleSheets(payload) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_DEPLOYED_APPS_SCRIPT_URL') {
    console.warn('[Quiz] Google Apps Script URL не настроен. Данные не отправлены.');
    submitStatus.textContent = '⚠ URL Google Sheets не настроен (см. README.md)';
    submitStatus.className   = 'submit-status error';
    return;
  }

  submitStatus.textContent = '⏳ Сохранение результатов...';
  submitStatus.className   = 'submit-status sending';

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });
    console.log('[Quiz] Данные отправлены в Google Sheets:', payload);
    submitStatus.textContent = '✅ Результаты сохранены в системе';
    submitStatus.className   = 'submit-status sent';
  } catch (error) {
    console.error('[Quiz] Ошибка отправки данных:', error);
    submitStatus.textContent = '⚠ Не удалось сохранить результаты. Обратитесь к ответственному за ОТ.';
    submitStatus.className   = 'submit-status error';
  }
}

/* ════════════════════════════════════════════════════════════
   11. СБРОС И ПЕРЕЗАПУСК
════════════════════════════════════════════════════════════ */

/**
 * resetApp() — полный сброс состояния.
 * Возвращает на Сцену 1 для полного перепрохождения.
 */
function resetApp() {
  state.consentGiven         = false;
  state.userData             = { fullName: '', organization: '', position: '', department: '', birthDate: '', hireDate: '' };
  state.answers              = [];
  state.currentQuestionIndex = 0;

  // Очистить форму
  [inputFullname, inputOrg, inputPosition, inputDepartment, inputBirthdate, inputHiredate]
    .forEach(f => { f.value = ''; });
  validateForm();

  // Сбросить чекбокс
  consentCheckbox.checked = false;
  updateConsentButton();

  // Сбросить кольцо
  scoreRingFill.style.strokeDashoffset = '314';
  scoreRingFill.className = 'score-ring-fill';

  showScene(1);
}

/* ════════════════════════════════════════════════════════════
   12. ОБРАБОТЧИКИ СОБЫТИЙ
════════════════════════════════════════════════════════════ */

btnStart.addEventListener('click', () => showScene(2));

btnConsentCont.addEventListener('click', () => {
  if (state.consentGiven) showScene(3);
});

btnFormSubmit.addEventListener('click', () => {
  collectFormData();
  startQuiz();
  showScene(4);
});

btnNext.addEventListener('click', () => {
  if (!btnNext.disabled) goToNextQuestion();
});

btnRetry.addEventListener('click', resetApp);

document.getElementById('user-form').addEventListener('submit', e => e.preventDefault());

/* ════════════════════════════════════════════════════════════
   13. ИНИЦИАЛИЗАЦИЯ
════════════════════════════════════════════════════════════ */

/**
 * init() — запускается после загрузки DOM.
 * Устанавливает начальное состояние интерфейса.
 */
function init() {
  showScene(1);
  updateConsentButton();
  validateForm();
  btnNext.disabled = true;
  btnNext.setAttribute('aria-disabled', 'true');
  console.log('[Quiz] Приложение инициализировано. Вопросов:', TOTAL_QUESTIONS);
}

document.addEventListener('DOMContentLoaded', init);
