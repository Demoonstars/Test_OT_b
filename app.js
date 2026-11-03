/**
 * app.js — SPA «Итоговый тест по вводному инструктажу по охране труда»
 * Vanilla JS ES6+, без фреймворков
 * Версия: 2.0 (Обучающий режим + Рандомизация + Множественный выбор)
 */

/* ════════════════════════════════════════════════════════════
   1. БАНК ВОПРОСОВ (40 вопросов)
   Источники: ПП РФ № 2464, ТК РФ, 426-ФЗ, 125-ФЗ, 294-ФЗ, 
   приказы Минтруда № 776н, № 36, № 766н, № 767н, 
   приказ Минздрава № 29н, № 220н, 52-ФЗ, 247-ФЗ.
   correctIndex — индекс правильного ответа (0-based) или массив индексов.
════════════════════════════════════════════════════════════ */
const QUESTION_BANK = [
  {
    id: 'q1',
    text: 'Кто проводит вводный инструктаж по охране труда в организации?',
    options: [
      'Непосредственный руководитель работника',
      'Специалист по охране труда или иной уполномоченный работник',
      'Главный бухгалтер',
      'Руководитель отдела кадров'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Вводный инструктаж проводит специалист по охране труда или иной уполномоченный работник, на которого приказом возложена эта обязанность. ❌ Неверно: непосредственный руководитель проводит первичный инструктаж на рабочем месте, а не вводный.'
  },
  {
    id: 'q2',
    text: 'Когда проводится вводный инструктаж с вновь принятым работником?',
    options: [
      'В течение первого месяца работы',
      'На следующий день после оформления',
      'До начала самостоятельного выполнения трудовых функций',
      'После испытательного срока'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Вводный инструктаж проводится до того, как работник приступит к работе. Это гарантирует, что он знает базовые правила безопасности с первого дня. ❌ Неверно: откладывать инструктаж на месяц или день — грубое нарушение.'
  },
  {
    id: 'q3',
    text: 'С какими категориями лиц обязательно проводится вводный инструктаж?',
    options: [
      'Только со штатными работниками',
      'Только с работниками вредных производств',
      'Со всеми вновь принятыми, командированными, практикантами и иными лицами, участвующими в деятельности организации',
      'Только с теми, кто впервые работает'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Вводный инструктаж проходят не только новые сотрудники, но и командированные, студенты-практиканты, а также другие лица, допущенные к производственной деятельности. ❌ Неверно: ограничивать список только штатными сотрудниками — значит нарушать ПП РФ № 2464.'
  },
  {
    id: 'q4',
    text: 'Какой нормативный акт закрепляет право работника на безопасный труд?',
    options: [
      'Трудовой кодекс РФ',
      'Конституция РФ',
      'КоАП РФ',
      'Уголовный кодекс РФ'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Пункт 1 статьи 37 Конституции РФ закрепляет право на труд в условиях, отвечающих требованиям безопасности и гигиены. ❌ Неверно: ТК РФ конкретизирует это право, но базовое право закреплено именно в Конституции.'
  },
  {
    id: 'q5',
    text: 'Какой документ устанавливает порядок обучения по охране труда и проверки знаний?',
    options: [
      'Приказ Минтруда № 776н',
      'Постановление Правительства РФ № 2464',
      'Федеральный закон № 426-ФЗ',
      'Приказ Минздрава № 29н'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. ПП РФ от 24.12.2021 № 2464 регламентирует порядок обучения по охране труда и проверки знаний, включая виды инструктажей. ❌ Неверно: приказ № 776н — это примерное положение о СУОТ, а 426-ФЗ — закон о СОУТ.'
  },
  {
    id: 'q6',
    text: 'Какие обязательные элементы включает в себя система управления охраной труда (СУОТ)?',
    options: [
      'Политика, организация, планирование, оценка, меры по совершенствованию',
      'Инструктаж, обучение, СИЗ, медосмотры, СОУТ',
      'Пожарная безопасность, электробезопасность, первая помощь',
      'Правила, нормы, стандарты, инструкции'
    ],
    correctIndex: 0,
    explanation: '✅ Верно. СУОТ состоит из 5 элементов: политика, организация, планирование и внедрение, оценка, меры по совершенствованию. ❌ Неверно: перечисленные процессы (СОУТ, медосмотры) — это мероприятия внутри системы, а не её базовые элементы.'
  },
  {
    id: 'q7',
    text: 'Что регулирует Федеральный закон от 28.12.2013 № 426-ФЗ?',
    options: [
      'Обязательное социальное страхование',
      'Специальную оценку условий труда (СОУТ)',
      'Защиту прав юридических лиц при проверках',
      'Порядок проведения медосмотров'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. 426-ФЗ — это закон о специальной оценке условий труда. Он нужен для выявления вредных и опасных факторов на рабочих местах. ❌ Неверно: страхование — это 125-ФЗ, защита прав — 294-ФЗ.'
  },
  {
    id: 'q8',
    text: 'Кто в организации обязан создать и обеспечить функционирование СУОТ?',
    options: [
      'Специалист по охране труда',
      'Профсоюзный орган',
      'Работодатель',
      'Государственный инспектор труда'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Согласно ст. 217 ТК РФ, именно работодатель обязан создать и обеспечивать функционирование системы управления охраной труда. ❌ Неверно: специалист по ОТ — это исполнитель, а не гарант создания СУОТ.'
  },
  {
    id: 'q9',
    text: 'На каких уровнях осуществляется регулирование трудовых отношений в России?',
    options: [
      'Федеральном, региональном, местном, локальном, договорном',
      'Федеральном, муниципальном, корпоративном',
      'Только федеральном и региональном',
      'Государственном и частном'
    ],
    correctIndex: 0,
    explanation: '✅ Верно. Регулирование происходит на пяти уровнях: федеральном, региональном, местном, локальном и договорном. ❌ Неверно: система гораздо шире, чем просто два уровня.'
  },
  {
    id: 'q10',
    text: 'Какой нормативный акт применяется при противоречии между Трудовым кодексом и иным федеральным законом о труде?',
    options: [
      'Конституция РФ',
      'Трудовой кодекс РФ',
      'Указ Президента',
      'Постановление Правительства'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Согласно ст. 5 ТК РФ, при противоречии между ТК и иными федеральными законами применяется именно Трудовой кодекс. ❌ Неверно: указы и постановления стоят ниже в иерархии.'
  },
  {
    id: 'q11',
    text: 'Что из перечисленного относится к обязанностям работодателя в области охраны труда (ст. 214 ТК РФ)?',
    options: [
      'Обеспечение безопасных условий труда и приобретение СИЗ за свой счет',
      'Соблюдение требований охраны труда на своем рабочем месте',
      'Прохождение обучения и инструктажей',
      'Правильное применение СИЗ'
    ],
    correctIndex: 0,
    explanation: '✅ Верно. Работодатель обязан обеспечить безопасность, приобретать СИЗ, проводить обучение и медосмотры за свой счет. ❌ Неверно: соблюдать требования и применять СИЗ — это обязанности самого работника (ст. 215 ТК РФ).'
  },
  {
    id: 'q12',
    text: 'Что из перечисленного является обязанностью работника в области охраны труда (ст. 215 ТК РФ)?',
    options: [
      'Проведение СОУТ',
      'Приобретение спецодежды',
      'Соблюдение требований охраны труда и правильное применение СИЗ',
      'Организация медосмотров'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Работник обязан соблюдать требования ОТ, правильно применять СИЗ, проходить обучение и медосмотры. ❌ Неверно: приобретение СИЗ и проведение СОУТ — прерогатива и обязанность работодателя.'
  },
  {
    id: 'q13',
    text: 'Какая статья КоАП РФ предусматривает ответственность за допуск к работе без обучения и медосмотров?',
    options: [
      'Ст. 5.27.1 ч. 1',
      'Ст. 5.27.1 ч. 3',
      'Ст. 5.27.1 ч. 4',
      'Ст. 6.3'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Часть 3 статьи 5.27.1 КоАП РФ наказывает за допуск к работе лиц, не прошедших обучение, инструктаж или обязательные медосмотры. Штраф для компаний — до 130 000 руб. ❌ Неверно: ч. 1 — общие нарушения, ч. 4 — необеспечение СИЗ 2-го класса.'
  },
  {
    id: 'q14',
    text: 'Какие опасности относятся к физическим?',
    options: [
      'Воздействие микроорганизмов',
      'Шум, вибрация, электрический ток, радиация',
      'Неудобная рабочая поза',
      'Воздействие токсичных химических веществ'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Физические опасности — это шум, вибрация, электричество, ионизирующее излучение, механические факторы и т.д. ❌ Неверно: микроорганизмы — биологические, токсины — химические, неудобная поза — эргономические.'
  },
  {
    id: 'q15',
    text: 'Какие опасности вызваны несоответствием рабочего места физическим особенностям работника?',
    options: [
      'Химические',
      'Биологические',
      'Эргономические',
      'Природные'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Эргономические опасности связаны с тяжестью и напряженностью труда, а также с неудобной позой или несоответствием оборудования антропометрии. ❌ Неверно: остальные категории описывают другие источники угроз.'
  },
  {
    id: 'q16',
    text: 'Какой правильный порядок действий при пожаре?',
    options: [
      'Тушить самостоятельно, не вызывая спасателей',
      'Покинуть здание и позвонить снаружи',
      'Сообщить в пожарную охрану, оповестить людей и эвакуироваться согласно инструкции',
      'Ждать указаний руководства'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. При обнаружении пожара нужно сообщить по номеру 101/112, оповестить людей, приступить к эвакуации и тушению (если это безопасно). ❌ Неверно: паника или бездействие часто приводят к трагедии.'
  },
  {
    id: 'q17',
    text: 'По каким номерам можно вызвать пожарную охрану?',
    options: [
      '101 или 112',
      '102 или 112',
      '103 или 112',
      '104 или 112'
    ],
    correctIndex: 0,
    explanation: '✅ Верно. Пожарная охрана — 101, единый номер вызова экстренных служб — 112. ❌ Неверно: 102 — полиция, 103 — скорая, 104 — газовая служба.'
  },
  {
    id: 'q18',
    text: 'Что означает сигнал «Внимание всем!»?',
    options: [
      'Призыв к немедленной эвакуации',
      'Предупредительный сигнал перед текстовым сообщением о ЧС',
      'Сигнал о начале рабочего дня',
      'Сигнал о проверке связи'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. После звука сирен «Внимание всем!» следует текстовое сообщение с указаниями. Его нужно внимательно прослушать и выполнить. ❌ Неверно: это не команда «бежать», а предупреждение о необходимости получить информацию.'
  },
  {
    id: 'q19',
    text: 'С чего начинается алгоритм оказания первой помощи пострадавшему?',
    options: [
      'С вызова скорой помощи',
      'С осмотра места происшествия и устранения угрожающих факторов',
      'С сердечно-легочной реанимации',
      'С опроса пострадавшего'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Первый шаг — убедиться, что вам и пострадавшему ничего не угрожает, устранить опасность (например, обесточить провода) и только потом действовать. ❌ Неверно: бросаться спасать без оценки обстановки — риск стать вторым пострадавшим.'
  },
  {
    id: 'q20',
    text: 'Какой метод остановки кровотечения применяется при сильном артериальном кровотечении из конечности?',
    options: [
      'Прикладывание льда',
      'Наложение жгута выше места ранения с указанием времени',
      'Промывание раны водой',
      'Придание конечности горизонтального положения'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Артериальное кровотечение (алая, фонтанная кровь) требует немедленного наложения жгута выше раны. Обязательно фиксируется время наложения. ❌ Неверно: жгут нельзя держать дольше 1-1,5 часа (зимой — 30-60 минут), иначе наступит омертвение тканей.'
  },
  {
    id: 'q21',
    text: 'Кто утверждает программу вводного инструктажа в организации?',
    options: [
      'Специалист по охране труда',
      'Работодатель с учетом мнения профсоюза',
      'Государственный инспектор труда',
      'Общее собрание работников'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Работодатель разрабатывает и утверждает программу с учетом мнения профсоюзного или иного уполномоченного органа (п. 11 ПП РФ № 2464). ❌ Неверно: инспектор ГИТ не утверждает локальные документы компании.'
  },
  {
    id: 'q22',
    text: 'Обязан ли работник проходить психиатрическое освидетельствование?',
    options: [
      'Нет, это добровольно',
      'Да, если это предусмотрено законодательством для его должности',
      'Только по желанию работодателя',
      'Только при работе с деньгами'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Для некоторых видов деятельности (например, связанных с повышенной опасностью) психиатрическое освидетельствование обязательно. ❌ Неверно: отказ от обязательного освидетельствования может повлечь недопуск к работе.'
  },
  {
    id: 'q23',
    text: 'Какой нормативный акт регулирует обеспечение работников средствами индивидуальной защиты (СИЗ)?',
    options: [
      'Приказ Минздрава № 29н',
      'Приказ Минтруда № 766н',
      'Приказ Минтруда № 776н',
      'Федеральный закон № 52-ФЗ'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Приказ Минтруда от 29.10.2021 № 766н утверждает правила обеспечения работников спецодеждой, спецобувью и другими СИЗ. ❌ Неверно: 29н — медосмотры, 776н — СУОТ, 52-ФЗ — санитарное благополучие.'
  },
  {
    id: 'q24',
    text: 'Какие меры включает санитарно-бытовое обслуживание работников?',
    options: [
      'Только наличие туалета',
      'Гардеробные, душевые, умывальные, помещения для приема пищи и отдыха',
      'Только обеспечение питьевой водой',
      'Только аптечка первой помощи'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Согласно СП 44.13330.2011, к санитарно-бытовым помещениям относятся гардеробные, душевые, умывальные, туалеты, комнаты для отдыха и приема пищи. ❌ Неверно: перечисленные пункты — лишь малая часть требований.'
  },
  {
    id: 'q25',
    text: 'На каком расстоянии от рабочих мест должны находиться туалеты в производственных зданиях?',
    options: [
      'Не дальше 75 метров',
      'Не дальше 150 метров',
      'Не дальше 200 метров',
      'Расстояние не регламентируется'
    ],
    correctIndex: 0,
    explanation: '✅ Верно. Согласно СП 44.13330.2011, расстояние от рабочих мест до туалетов, помещений для обогрева и устройств питья не должно превышать 75 м (для инвалидов — 60 м). ❌ Неверно: 150 м — это предельное расстояние для площадок на территории предприятия.'
  },
  {
    id: 'q26',
    text: 'Что относится к ТОП-5 нарушений работников, приводящих к травматизму?',
    options: [
      'Неправильное применение СИЗ, нарушение правил работы с оборудованием, нарушение дисциплины',
      'Опоздание на работу, курение в неположенном месте',
      'Использование личного транспорта',
      'Отказ от сверхурочной работы'
    ],
    correctIndex: 0,
    explanation: '✅ Верно. К частым нарушениям относятся: неправильное применение СИЗ, несоблюдение правил передвижения (лестницы, разметка), нарушение правил работы с оборудованием и дисциплины труда. ❌ Неверно: опоздания и курение тоже нарушения, но они не входят в ТОП-5 причин тяжелого травматизма.'
  },
  {
    id: 'q27',
    text: 'Какое действие необходимо выполнить при обнаружении неисправного электрооборудования?',
    options: [
      'Попытаться починить самостоятельно',
      'Не прикасаться и сообщить непосредственному руководителю',
      'Продолжать работу, соблюдая осторожность',
      'Обесточить всё здание'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. При обнаружении неисправности нужно сообщить руководителю и не приступать к работе до устранения нарушения. ❌ Неверно: самостоятельный ремонт или игнорирование проблемы может привести к электротравме.'
  },
  {
    id: 'q28',
    text: 'Какой вид инструктажа проводится при выполнении разовых работ, не связанных с прямыми обязанностями?',
    options: [
      'Вводный',
      'Повторный',
      'Целевой',
      'Первичный'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Целевой инструктаж проводится при разовых работах, ликвидации аварий, стихийных бедствий и т.д. ❌ Неверно: вводный — при приеме, повторный — по графику, первичный — на рабочем месте в начале трудовой деятельности.'
  },
  {
    id: 'q29',
    text: 'С какой периодичностью проводится повторный инструктаж на рабочем месте?',
    options: [
      'Не реже 1 раза в год',
      'Не реже 1 раза в 6 месяцев',
      'Не реже 1 раза в 3 месяца',
      'Раз в 2 года'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. По общему правилу повторный инструктаж проводится не реже одного раза в 6 месяцев. ❌ Неверно: 1 раз в 3 месяца — для работ повышенной опасности, 1 раз в год — для некоторых категорий, но базовый срок — полгода.'
  },
  {
    id: 'q30',
    text: 'Какая ответственность предусмотрена за нарушение требований охраны труда, повлекшее по неосторожности смерть человека?',
    options: [
      'Административная (штраф)',
      'Дисциплинарная (выговор)',
      'Уголовная (лишение свободы до 4 лет)',
      'Материальная'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. По ст. 143 УК РФ нарушение требований ОТ, повлекшее смерть человека, наказывается принудительными работами или лишением свободы на срок до 4 лет. ❌ Неверно: штрафом здесь не ограничатся, это тяжкое последствие.'
  },
  {
    id: 'q31',
    text: 'Что нужно сделать перед оказанием первой помощи, если пострадавший в сознании?',
    options: [
      'Дать обезболивающее',
      'Сказать, что вы готовы и умеете оказывать помощь',
      'Уложить его на живот',
      'Дать воды'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Перед началом помощи нужно представиться и сказать пострадавшему, что вы готовы помочь. Если он не отказывается, помощь можно оказывать без согласия. ❌ Неверно: давать лекарства и воду без показаний (особенно при травме живота) опасно.'
  },
  {
    id: 'q32',
    text: 'Какова последовательность осмотра пострадавшего при подробном осмотре?',
    options: [
      'Сначала конечности, затем голова и туловище',
      'Голова, шея, грудь, спина, живот, затем конечности',
      'Сначала спина, затем ноги',
      'Только по жалобам пострадавшего'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. При подробном осмотре сначала проверяют голову, шею, грудь, спину и живот, и только в последнюю очередь — конечности. ❌ Неверно: начинать с конечностей — ошибка, можно пропустить скрытое кровотечение или травму внутренних органов.'
  },
  {
    id: 'q33',
    text: 'Можно ли помогать пострадавшему принять лекарство, которое назначил ему врач?',
    options: [
      'Нет, это запрещено',
      'Да, это разрешено приказом Минздрава № 220н',
      'Только если есть рецепт',
      'Только если пострадавший попросит'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Согласно Приказу Минздрава от 03.05.2024 № 220н, вы вправе помочь пострадавшему принять лекарство, назначенное ему врачом. ❌ Неверно: это разрешено и может спасти жизнь (например, при приступе астмы).'
  },
  {
    id: 'q34',
    text: 'Какие действия необходимо предпринять при обнаружении признаков террористической угрозы?',
    options: [
      'Обезвредить преступника самостоятельно',
      'Сообщить в полицию и действовать по указаниям спецслужб',
      'Снять на видео и выложить в сеть',
      'Продолжать работу'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. При террористической угрозе главное — сообщить в полицию и четко следовать инструкциям правоохранительных органов и спецслужб. ❌ Неверно: геройство и паника снижают шансы на спасение.'
  },
  {
    id: 'q35',
    text: 'Какие условия труда считаются безопасными?',
    options: [
      'При которых отсутствует воздействие вредных факторов',
      'При которых уровень воздействия вредных факторов не превышает установленных нормативов',
      'При которых работник использует СИЗ',
      'При которых нет несчастных случаев'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Безопасные условия труда — это условия, при которых воздействие вредных и опасных факторов не превышает допустимых уровней. ❌ Неверно: полное отсутствие факторов — не всегда возможно, главное — соблюдение гигиенических нормативов.'
  },
  {
    id: 'q36',
    text: 'Кто несет ответственность за жизнь и здоровье работника во время его работы?',
    options: [
      'Только сам работник',
      'Только профсоюз',
      'Работодатель',
      'Государство'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Обязанность по обеспечению безопасных условий и охраны труда возлагается на работодателя (ст. 214 ТК РФ). ❌ Неверно: работник тоже обязан соблюдать правила, но именно работодатель несет основную ответственность за организацию безопасности.'
  },
  {
    id: 'q37',
    text: 'Какие из перечисленных средств защиты являются средствами индивидуальной защиты (СИЗ)?',
    options: [
      'Ограждения, вентиляция',
      'Каска, защитные очки, спецодежда, респиратор',
      'Аптечка и огнетушитель',
      'Знаки безопасности'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. СИЗ — это средства, надеваемые на тело или его части для защиты от воздействия вредных факторов (каска, очки, респиратор, спецодежда). ❌ Неверно: ограждения и вентиляция — коллективные средства, аптечка — медицинское имущество.'
  },
  {
    id: 'q38',
    text: 'В каком случае работник может отказаться от выполнения работы?',
    options: [
      'При усталости',
      'Если работа угрожает его жизни и здоровью',
      'При нежелании работать сверхурочно',
      'Если не выдали СИЗ, но работа не опасна'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Отказ от работы допустим в случае возникновения опасности для жизни и здоровья работника вследствие нарушения требований охраны труда. ❌ Неверно: капризы и усталость не являются законным основанием для отказа.'
  },
  {
    id: 'q39',
    text: 'Что обязано сделать должностное лицо при выявлении микротравмы у работника?',
    options: [
      'Отправить домой',
      'Зарегистрировать микроповреждение и рассмотреть обстоятельства',
      'Выдать премию',
      'Оштрафовать'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Микроповреждения (ссадины, ушибы) подлежат регистрации и рассмотрению. Это помогает выявить опасные факторы до того, как произойдет серьезный несчастный случай. ❌ Неверно: замалчивание микротравм — прямая дорога к тяжелым последствиям.'
  },
  {
    id: 'q40',
    text: 'Что необходимо сделать при обнаружении пострадавшего с признаками клинической смерти?',
    options: [
      'Уложить на бок',
      'Начать сердечно-легочную реанимацию и вызвать скорую',
      'Дать таблетку',
      'Ждать приезда врачей'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. При отсутствии сознания и дыхания необходимо немедленно начать сердечно-легочную реанимацию (30 нажатий на грудину + 2 вдоха) и вызвать скорую помощь (103/112). ❌ Неверно: бездействие в первые 4-5 минут приводит к необратимым изменениям в мозге.'
  }
];

/* ════════════════════════════════════════════════════════════
   2. КОНФИГУРАЦИЯ И СОСТОЯНИЕ
════════════════════════════════════════════════════════════ */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz72mduUFCnAf5QhPHmnU47ZVpa1nCXqMnWh3ayhlNoUWoPwvmYF4ONYDpzKNs1zvC23g/exec';
const PASS_THRESHOLD = 0.85;
const QUESTIONS_PER_QUIZ = 20;

const state = {
  currentScene: 1,
  consentGiven: false,
  userData: { fullName: '', organization: '', position: '', department: '', birthDate: '', hireDate: '' },
  quizQuestions: [],         // 20 выбранных и перемешанных вопросов
  answers: [],               // ответы пользователя (массивы индексов или одиночные индексы)
  currentQuestionIndex: 0,
  isAnswered: false          // флаг: нажат ли "Ответить" на текущем вопросе
};

/* ════════════════════════════════════════════════════════════
   3. DOM-ССЫЛКИ
════════════════════════════════════════════════════════════ */

const sceneMap = {
  1: document.getElementById('scene-welcome'),
  2: document.getElementById('scene-consent'),
  3: document.getElementById('scene-form'),
  4: document.getElementById('scene-quiz'),
  5: document.getElementById('scene-result')
};

const btnStart       = document.getElementById('btn-start');
const btnConsentCont = document.getElementById('btn-consent-continue');
const btnFormSubmit  = document.getElementById('btn-form-submit');
const btnNext        = document.getElementById('btn-next');
const btnNextLabel   = document.getElementById('btn-next-label');
const btnRetry       = document.getElementById('btn-retry');

const consentCheckbox = document.getElementById('consent-checkbox');

const inputFullname   = document.getElementById('input-fullname');
const inputOrg        = document.getElementById('input-org');
const inputPosition   = document.getElementById('input-position');
const inputDepartment = document.getElementById('input-department');
const inputBirthdate  = document.getElementById('input-birthdate');
const inputHiredate   = document.getElementById('input-hiredate');

const quizCounter      = document.getElementById('quiz-counter');
const progressBarFill  = document.getElementById('progress-bar-fill');
const progressBarTrack = document.getElementById('progress-bar-track');
const questionCard     = document.getElementById('question-card');
const questionNumber   = document.getElementById('question-number');
const questionText     = document.getElementById('question-text');
const optionsList      = document.getElementById('options-list');
const explanationBox   = document.getElementById('explanation-box');

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
   4. УТИЛИТЫ
════════════════════════════════════════════════════════════ */

/**
 * Перемешивание массива (алгоритм Фишера-Йетса)
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Подготовка вопросов для теста:
 * 1. Выбираем 20 случайных вопросов из банка.
 * 2. Перемешиваем варианты ответов и сохраняем originalIndex.
 */
function prepareQuizQuestions() {
  const shuffledBank = shuffleArray(QUESTION_BANK);
  const selected = shuffledBank.slice(0, QUESTIONS_PER_QUIZ);

  return selected.map(q => {
    const correctIndices = Array.isArray(q.correctIndex) ? q.correctIndex : [q.correctIndex];
    
    // Создаем массив вариантов с привязкой к оригинальному индексу
    const optionsWithIndex = q.options.map((text, originalIndex) => ({
      text,
      originalIndex,
      isCorrect: correctIndices.includes(originalIndex)
    }));

    // Перемешиваем варианты
    const shuffledOptions = shuffleArray(optionsWithIndex);

    return {
      ...q,
      shuffledOptions, // Массив { text, originalIndex, isCorrect }
      isMultiple: correctIndices.length > 1
    };
  });
}

/* ════════════════════════════════════════════════════════════
   5. УПРАВЛЕНИЕ СЦЕНАМИ
════════════════════════════════════════════════════════════ */

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
   6. СЦЕНА 2: СОГЛАСИЕ
════════════════════════════════════════════════════════════ */

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

const formFields = [inputFullname, inputOrg, inputPosition, inputDepartment, inputBirthdate, inputHiredate];

function validateForm() {
  const allFilled = formFields.every(f => f.value.trim() !== '');
  btnFormSubmit.disabled = !allFilled;
  btnFormSubmit.setAttribute('aria-disabled', String(!allFilled));
}

formFields.forEach(field => {
  field.addEventListener('input', validateForm);
  field.addEventListener('change', validateForm);
});

function collectFormData() {
  state.userData = {
    fullName: inputFullname.value.trim(),
    organization: inputOrg.value.trim(),
    position: inputPosition.value.trim(),
    department: inputDepartment.value.trim(),
    birthDate: inputBirthdate.value,
    hireDate: inputHiredate.value
  };
}

/* ════════════════════════════════════════════════════════════
   8. СЦЕНА 4: ЛОГИКА ТЕСТА (Обучающий режим)
════════════════════════════════════════════════════════════ */

function startQuiz() {
  state.quizQuestions = prepareQuizQuestions();
  state.answers = new Array(QUESTIONS_PER_QUIZ).fill(null);
  state.currentQuestionIndex = 0;
  renderQuestion(0);
}

/**
 * Отрисовка текущего вопроса
 */
function renderQuestion(index) {
  const q = state.quizQuestions[index];
  const num = index + 1;

  // Сброс режима ответа
  state.isAnswered = false;
  explanationBox.style.display = 'none';
  explanationBox.innerHTML = '';

  // Обновление прогресса
  quizCounter.textContent = `Вопрос ${num} из ${QUESTIONS_PER_QUIZ}`;
  const pct = (index / QUESTIONS_PER_QUIZ) * 100;
  progressBarFill.style.width = pct + '%';
  progressBarTrack.setAttribute('aria-valuenow', String(index));
  questionNumber.textContent = 'Вопрос ' + String(num).padStart(2, '0');
  questionText.textContent = q.text;

  // Рендер вариантов
  optionsList.innerHTML = '';
  const currentAnswer = state.answers[index];

  q.shuffledOptions.forEach((opt, optIdx) => {
    const label = document.createElement('label');
    label.className = 'option-label';
    label.setAttribute('for', `opt-${index}-${optIdx}`);

    const input = document.createElement('input');
    input.type = q.isMultiple ? 'checkbox' : 'radio';
    input.name = `q${index}`;
    input.id = `opt-${index}-${optIdx}`;
    input.value = opt.originalIndex;
    input.className = q.isMultiple ? 'option-checkbox' : 'option-radio';

    if (currentAnswer) {
      if (q.isMultiple && Array.isArray(currentAnswer)) {
        if (currentAnswer.includes(opt.originalIndex)) input.checked = true;
      } else if (currentAnswer === opt.originalIndex) {
        input.checked = true;
      }
    }

    input.addEventListener('change', () => onOptionSelect(index, opt.originalIndex, q.isMultiple));

    const marker = document.createElement('span');
    marker.className = q.isMultiple ? 'option-checkbox-marker' : 'option-marker';
    marker.setAttribute('aria-hidden', 'true');

    const textSpan = document.createElement('span');
    textSpan.className = 'option-text';
    textSpan.textContent = opt.text;

    label.appendChild(input);
    label.appendChild(marker);
    label.appendChild(textSpan);
    optionsList.appendChild(label);
  });

  // Настройка кнопки
  btnNextLabel.textContent = 'Ответить';
  btnNext.disabled = true; // Активируется после выбора
  btnNext.setAttribute('aria-disabled', 'true');
  
  // Если ответ уже был дан ранее (например, при возврате — хотя в этом тесте нельзя вернуться, на всякий случай)
  if (currentAnswer) {
    btnNext.disabled = false;
    btnNext.setAttribute('aria-disabled', 'false');
  }
}

/**
 * Обработка выбора варианта
 */
function onOptionSelect(qIndex, originalIndex, isMultiple) {
  if (state.isAnswered) return; // Блокировка после ответа

  if (isMultiple) {
    let selected = state.answers[qIndex] || [];
    if (selected.includes(originalIndex)) {
      selected = selected.filter(i => i !== originalIndex);
    } else {
      selected.push(originalIndex);
    }
    state.answers[qIndex] = selected.length > 0 ? selected : null;
  } else {
    state.answers[qIndex] = originalIndex;
  }

  // Активация кнопки, если есть хотя бы один выбор
  const hasAnswer = isMultiple 
    ? (state.answers[qIndex] && state.answers[qIndex].length > 0)
    : (state.answers[qIndex] !== null);
  
  btnNext.disabled = !hasAnswer;
  btnNext.setAttribute('aria-disabled', String(!hasAnswer));
}

/**
 * Нажатие на кнопку "Ответить" / "Далее"
 */
function handleNextClick() {
  const qIndex = state.currentQuestionIndex;
  const q = state.quizQuestions[qIndex];

  if (!state.isAnswered) {
    // Фаза 1: Проверка ответа
    state.isAnswered = true;
    
    // Блокировка инпутов и подсветка
    const labels = optionsList.querySelectorAll('.option-label');
    const currentAnswer = state.answers[qIndex];

    labels.forEach(label => {
      const input = label.querySelector('input');
      const originalIndex = parseInt(input.value, 10);
      const isCorrectOption = q.shuffledOptions.find(o => o.originalIndex === originalIndex).isCorrect;

      if (q.isMultiple) {
        const userSelected = Array.isArray(currentAnswer) && currentAnswer.includes(originalIndex);
        if (isCorrectOption) {
          label.classList.add('is-correct');
        } else if (userSelected && !isCorrectOption) {
          label.classList.add('is-incorrect');
        }
      } else {
        const userSelected = currentAnswer === originalIndex;
        if (isCorrectOption) {
          label.classList.add('is-correct');
        } else if (userSelected && !isCorrectOption) {
          label.classList.add('is-incorrect');
        }
      }
      input.disabled = true;
    });

    // Показ объяснения
    explanationBox.innerHTML = `<p>${q.explanation}</p>`;
    explanationBox.style.display = 'block';

    // Смена текста кнопки
    if (qIndex === QUESTIONS_PER_QUIZ - 1) {
      btnNextLabel.textContent = 'Завершить тест';
    } else {
      btnNextLabel.textContent = 'Далее';
    }
    btnNext.disabled = false;
  } else {
    // Фаза 2: Переход к следующему вопросу
    if (qIndex < QUESTIONS_PER_QUIZ - 1) {
      questionCard.classList.add('leaving');
      setTimeout(() => {
        questionCard.classList.remove('leaving');
        state.currentQuestionIndex++;
        renderQuestion(state.currentQuestionIndex);
      }, 250);
    } else {
      showResults();
    }
  }
}

/* ════════════════════════════════════════════════════════════
   9. СЦЕНА 5: РЕЗУЛЬТАТЫ
════════════════════════════════════════════════════════════ */

function calculateResult() {
  let correct = 0;
  state.quizQuestions.forEach((q, idx) => {
    const userAnswer = state.answers[idx];
    const correctIndices = Array.isArray(q.correctIndex) ? q.correctIndex : [q.correctIndex];

    if (q.isMultiple) {
      // Строгое совпадение для множественного выбора
      const userArr = Array.isArray(userAnswer) ? [...userAnswer].sort() : [];
      const correctArr = [...correctIndices].sort();
      if (userArr.length === correctArr.length && userArr.every((val, i) => val === correctArr[i])) {
        correct++;
      }
    } else {
      if (userAnswer === correctIndices[0]) {
        correct++;
      }
    }
  });

  const percent = Math.round((correct / QUESTIONS_PER_QUIZ) * 100);
  const passed = (correct / QUESTIONS_PER_QUIZ) >= PASS_THRESHOLD;
  return { correct, percent, passed };
}

function showResults() {
  const { correct, percent, passed } = calculateResult();
  showScene(5);

  resultIconWrap.textContent = passed ? '🎉' : '😔';
  resultTitle.className = 'result-title ' + (passed ? 'success' : 'failure');
  resultTitle.textContent = passed ? 'Поздравляем! Тест сдан успешно.' : 'Тест не сдан.';
  resultText.textContent = passed
    ? 'Вы успешно прошли итоговый тест по вводному инструктажу. Ваши результаты сохранены в системе.'
    : `Вы ответили правильно на ${correct} из ${QUESTIONS_PER_QUIZ} вопросов. Рекомендуем освежить знания по материалам вводного инструктажа и попробовать ещё раз. У вас обязательно получится!`;

  scoreNumber.textContent = String(correct);
  statCorrect.textContent = `${correct} из ${QUESTIONS_PER_QUIZ}`;
  statPercent.textContent = percent + '%';
  statStatus.textContent = passed ? 'Сдал / Сдала' : 'Не сдан';
  statStatus.className = 'stat-value stat-status ' + (passed ? 'success' : 'failure');

  const offset = 314 - (percent / 100) * 314;
  scoreRingFill.className = 'score-ring-fill ' + (passed ? 'success' : 'failure');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scoreRingFill.style.strokeDashoffset = String(offset);
    });
  });

  progressBarFill.style.width = '100%';
  progressBarTrack.setAttribute('aria-valuenow', String(QUESTIONS_PER_QUIZ));

  submitStatus.textContent = '';
  submitStatus.className = 'submit-status';

  const payload = {
    fullName: state.userData.fullName,
    organization: state.userData.organization,
    position: state.userData.position,
    department: state.userData.department,
    birthDate: state.userData.birthDate,
    hireDate: state.userData.hireDate,
    correctAnswers: correct,
    totalQuestions: QUESTIONS_PER_QUIZ,
    percent: percent,
    passed: passed,
    timestamp: new Date().toISOString()
  };

  sendResultsToGoogleSheets(payload);
}

/* ════════════════════════════════════════════════════════════
   10. ОТПРАВКА В GOOGLE SHEETS
════════════════════════════════════════════════════════════ */

async function sendResultsToGoogleSheets(payload) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_DEPLOYED_APPS_SCRIPT_URL') {
    console.warn('[Quiz] Google Apps Script URL не настроен.');
    submitStatus.textContent = '⚠ URL Google Sheets не настроен (см. README.md)';
    submitStatus.className = 'submit-status error';
    return;
  }

  submitStatus.textContent = '⏳ Сохранение результатов...';
  submitStatus.className = 'submit-status sending';

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('[Quiz] Данные отправлены:', payload);
    submitStatus.textContent = '✅ Результаты сохранены в системе';
    submitStatus.className = 'submit-status sent';
  } catch (error) {
    console.error('[Quiz] Ошибка отправки:', error);
    submitStatus.textContent = '⚠ Не удалось сохранить результаты. Обратитесь к ответственному за ОТ.';
    submitStatus.className = 'submit-status error';
  }
}

/* ════════════════════════════════════════════════════════════
   11. СБРОС И ИНИЦИАЛИЗАЦИЯ
════════════════════════════════════════════════════════════ */

function resetApp() {
  state.consentGiven = false;
  state.userData = { fullName: '', organization: '', position: '', department: '', birthDate: '', hireDate: '' };
  state.quizQuestions = [];
  state.answers = [];
  state.currentQuestionIndex = 0;
  state.isAnswered = false;

  formFields.forEach(f => { f.value = ''; });
  validateForm();

  consentCheckbox.checked = false;
  updateConsentButton();

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

btnNext.addEventListener('click', handleNextClick);
btnRetry.addEventListener('click', resetApp);

document.getElementById('user-form').addEventListener('submit', e => e.preventDefault());

function init() {
  showScene(1);
  updateConsentButton();
  validateForm();
  btnNext.disabled = true;
  btnNext.setAttribute('aria-disabled', 'true');
  console.log('[Quiz] Приложение инициализировано. Банк вопросов:', QUESTION_BANK.length, '| В тесте:', QUESTIONS_PER_QUIZ);
}

document.addEventListener('DOMContentLoaded', init);
