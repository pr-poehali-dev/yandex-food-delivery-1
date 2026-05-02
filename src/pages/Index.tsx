import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/80ecdf06-e59d-49d3-92d2-81ea00467bd6/files/fe7714ea-0b9b-4b35-9c22-d8ce3b2a0c18.jpg";

const TICKER_ITEMS = [
  "🚀 Зарабатывай до 120 000 ₽/мес",
  "⚡ Гибкий график",
  "🎯 Бонусы каждую неделю",
  "🛵 Поддержка 24/7",
  "💰 Выплаты ежедневно",
  "🏆 Топ-курьеры получают премии",
  "🚀 Зарабатывай до 120 000 ₽/мес",
  "⚡ Гибкий график",
  "🎯 Бонусы каждую неделю",
  "🛵 Поддержка 24/7",
  "💰 Выплаты ежедневно",
  "🏆 Топ-курьеры получают премии",
];

const BENEFITS = [
  { icon: "Clock", title: "Гибкий график", desc: "Работай когда хочешь — утром, вечером или в выходные. Никто не контролирует твоё время." },
  { icon: "Banknote", title: "Ежедневные выплаты", desc: "Деньги на карте уже на следующий день. Никаких ожиданий до конца месяца." },
  { icon: "MapPin", title: "Работа рядом с домом", desc: "Выбирай удобную зону доставки в своём районе города." },
  { icon: "Zap", title: "Быстрый старт", desc: "От регистрации до первого заказа — всего 1 день. Минимум документов." },
  { icon: "Gift", title: "Бонусы и акции", desc: "Еженедельные бонусы за выполнение планов и специальные акции для активных курьеров." },
  { icon: "Shield", title: "Страховка", desc: "Полное страховое покрытие во время работы. Твоя безопасность — наш приоритет." },
];

const REQUIREMENTS = [
  { emoji: "🎂", text: "Возраст от 18 лет" },
  { emoji: "📱", text: "Смартфон на Android или iOS" },
  { emoji: "🛵", text: "Велосипед, самокат или мотоцикл" },
  { emoji: "📋", text: "Паспорт гражданина РФ" },
  { emoji: "💪", text: "Желание зарабатывать" },
  { emoji: "🏃", text: "Физическая активность" },
];

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function SectionReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(35px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Calculator() {
  const [hours, setHours] = useState(6);
  const [days, setDays] = useState(5);
  const [zone, setZone] = useState<"center" | "middle" | "suburb">("middle");

  const zoneRate = { center: 320, middle: 260, suburb: 200 };
  const ordersPerHour = 2.5;
  const baseEarn = Math.round(hours * ordersPerHour * zoneRate[zone] * days * 4.3);
  const bonusEarn = Math.round(baseEarn * 0.15);
  const total = baseEarn + bonusEarn;

  const hoursProgress = ((hours - 2) / (12 - 2)) * 100;
  const daysProgress = ((days - 1) / (7 - 1)) * 100;

  return (
    <div className="bg-brand-card rounded-2xl p-6 md:p-8 border border-white/10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="slider-track">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-white/60 font-golos">Часов в день</span>
              <span className="font-oswald text-brand-orange text-lg font-semibold">{hours} ч</span>
            </div>
            <input
              type="range" min={2} max={12} step={1} value={hours}
              style={{ "--progress": `${hoursProgress}%` } as React.CSSProperties}
              onChange={e => setHours(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/30 mt-1">
              <span>2 ч</span><span>12 ч</span>
            </div>
          </div>

          <div className="slider-track">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-white/60 font-golos">Дней в неделю</span>
              <span className="font-oswald text-brand-orange text-lg font-semibold">{days} дн</span>
            </div>
            <input
              type="range" min={1} max={7} step={1} value={days}
              style={{ "--progress": `${daysProgress}%` } as React.CSSProperties}
              onChange={e => setDays(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/30 mt-1">
              <span>1 день</span><span>7 дней</span>
            </div>
          </div>

          <div>
            <span className="text-sm text-white/60 mb-3 block font-golos">Район доставки</span>
            <div className="grid grid-cols-3 gap-2">
              {([["center", "Центр", "320₽"], ["middle", "Средний", "260₽"], ["suburb", "Пригород", "200₽"]] as const).map(([key, label, rate]) => (
                <button
                  key={key}
                  onClick={() => setZone(key)}
                  className={`py-2 px-3 rounded-xl text-sm font-golos font-medium transition-all duration-200 ${
                    zone === key
                      ? "bg-brand-orange text-white shadow-lg"
                      : "bg-brand-surface text-white/60 hover:bg-white/10"
                  }`}
                >
                  <div>{label}</div>
                  <div className="text-xs opacity-75">{rate}/заказ</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-brand-surface rounded-2xl p-6 text-center border border-white/5">
            <p className="text-white/50 text-sm mb-1 font-golos">Потенциальный заработок</p>
            <div className="font-oswald text-5xl font-bold gradient-text mb-1">
              {total.toLocaleString("ru-RU")} ₽
            </div>
            <p className="text-white/40 text-xs mb-5 font-golos">в месяц</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Базовый заработок</span>
                <span className="text-white">{baseEarn.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Бонусы (+15%)</span>
                <span className="text-brand-yellow">+{bonusEarn.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-semibold">
                <span>Итого</span>
                <span className="text-brand-orange">{total.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>
          </div>
          <p className="text-white/30 text-xs text-center mt-3 font-golos">* Расчёт приблизительный, реальный доход может отличаться</p>
        </div>
      </div>
    </div>
  );
}

const TRANSPORT_OPTIONS = [
  { value: "bicycle", label: "Велосипед", emoji: "🚲" },
  { value: "scooter", label: "Самокат", emoji: "🛴" },
  { value: "moped", label: "Мопед", emoji: "🛵" },
  { value: "car", label: "Автомобиль", emoji: "🚗" },
  { value: "foot", label: "Пешком", emoji: "🚶" },
];

const ZONE_OPTIONS = [
  { value: "center", label: "Центр", desc: "Высокий спрос" },
  { value: "middle", label: "Средний район", desc: "Стабильный поток" },
  { value: "suburb", label: "Пригород", desc: "Меньше конкуренции" },
];

const SCHEDULE_OPTIONS = [
  { value: "morning", label: "Утро", time: "7:00–13:00", emoji: "🌅" },
  { value: "day", label: "День", time: "13:00–19:00", emoji: "☀️" },
  { value: "evening", label: "Вечер", time: "19:00–01:00", emoji: "🌆" },
  { value: "night", label: "Ночь", time: "01:00–07:00", emoji: "🌙" },
];

type RegistrationData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  birthYear: string;
  transport: string;
  zone: string;
  schedule: string[];
  hoursPerWeek: string;
  hasPassport: boolean;
  agreeTerms: boolean;
};

const STEPS = [
  { label: "О себе", icon: "User" },
  { label: "Работа", icon: "Briefcase" },
  { label: "Документы", icon: "FileCheck" },
];

function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<RegistrationData>({
    name: "", phone: "", email: "", city: "", birthYear: "",
    transport: "", zone: "", schedule: [], hoursPerWeek: "20",
    hasPassport: false, agreeTerms: false,
  });

  const goNext = () => {
    setAnimDir("forward");
    setAnimating(true);
    setTimeout(() => { setStep(s => s + 1); setAnimating(false); }, 250);
  };
  const goBack = () => {
    setAnimDir("back");
    setAnimating(true);
    setTimeout(() => { setStep(s => s - 1); setAnimating(false); }, 250);
  };

  const toggleSchedule = (val: string) => {
    setData(d => ({
      ...d,
      schedule: d.schedule.includes(val) ? d.schedule.filter(s => s !== val) : [...d.schedule, val],
    }));
  };

  const inputClass = "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-brand-orange transition-colors text-sm";
  const labelClass = "text-white/55 text-xs mb-1.5 block font-golos uppercase tracking-wide";

  const canProceedStep0 = data.name.trim() && data.phone.trim() && data.city.trim();
  const canProceedStep1 = data.transport && data.zone && data.schedule.length > 0;
  const canProceedStep2 = data.hasPassport && data.agreeTerms;

  const slideStyle: React.CSSProperties = {
    opacity: animating ? 0 : 1,
    transform: animating
      ? `translateX(${animDir === "forward" ? "30px" : "-30px"})`
      : "translateX(0)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="relative inline-flex mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-orange to-brand-yellow flex items-center justify-center animate-glow-pulse">
            <Icon name="CheckCircle" size={44} className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-sm">🎉</div>
        </div>
        <h3 className="font-oswald text-3xl font-bold text-white mb-2">Регистрация завершена!</h3>
        <p className="text-white/55 mb-6 text-sm leading-relaxed max-w-sm mx-auto">
          Привет, <span className="text-brand-orange font-semibold">{data.name}</span>! Твоя заявка принята.<br />
          Мы позвоним на <span className="text-white">{data.phone}</span> в течение 60 минут.
        </p>
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
          {[
            { label: "Транспорт", val: TRANSPORT_OPTIONS.find(t => t.value === data.transport)?.emoji || "—" },
            { label: "Район", val: ZONE_OPTIONS.find(z => z.value === data.zone)?.label.split(" ")[0] || "—" },
            { label: "Смен", val: data.schedule.length + " вида" },
          ].map(item => (
            <div key={item.label} className="bg-brand-surface rounded-xl p-3 border border-white/5">
              <div className="text-xl mb-1">{item.val}</div>
              <div className="text-white/40 text-xs">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 rounded-full px-5 py-2 text-brand-orange text-sm">
          <Icon name="Clock" size={14} />
          Ожидай звонка — мы уже готовим твой профиль
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Step indicators */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                i < step ? "bg-brand-orange border-brand-orange" :
                i === step ? "border-brand-orange bg-brand-orange/15" :
                "border-white/15 bg-transparent"
              }`}>
                {i < step
                  ? <Icon name="Check" size={16} className="text-white" />
                  : <Icon name={s.icon as "User"} size={16} className={i === step ? "text-brand-orange" : "text-white/30"} />
                }
              </div>
              <span className={`text-xs mt-1 font-golos transition-colors ${i === step ? "text-brand-orange" : i < step ? "text-white/50" : "text-white/20"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px mx-2 mb-4 transition-all duration-500" style={{
                background: i < step
                  ? "linear-gradient(90deg, #FF6B00, #FF6B00)"
                  : "rgba(255,255,255,0.1)"
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full mb-7 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow transition-all duration-500"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div style={slideStyle}>
        {/* STEP 0: Personal */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Полное имя *</label>
              <input type="text" className={inputClass} placeholder="Иван Петров"
                value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Телефон *</label>
                <input type="tel" className={inputClass} placeholder="+7 (999) 000-00-00"
                  value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Год рождения</label>
                <input type="number" className={inputClass} placeholder="2000"
                  min={1950} max={2007}
                  value={data.birthYear} onChange={e => setData({ ...data, birthYear: e.target.value })} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" className={inputClass} placeholder="ivan@mail.ru"
                value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Город *</label>
              <input type="text" className={inputClass} placeholder="Москва"
                value={data.city} onChange={e => setData({ ...data, city: e.target.value })} />
            </div>
          </div>
        )}

        {/* STEP 1: Work preferences */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Транспорт *</label>
              <div className="grid grid-cols-5 gap-2">
                {TRANSPORT_OPTIONS.map(t => (
                  <button
                    key={t.value} type="button"
                    onClick={() => setData({ ...data, transport: t.value })}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                      data.transport === t.value
                        ? "border-brand-orange bg-brand-orange/15 scale-105"
                        : "border-white/10 bg-[#1a1a1a] hover:border-white/25"
                    }`}
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    <span className={`text-xs font-golos ${data.transport === t.value ? "text-brand-orange" : "text-white/50"}`}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Предпочтительная зона *</label>
              <div className="space-y-2">
                {ZONE_OPTIONS.map(z => (
                  <button
                    key={z.value} type="button"
                    onClick={() => setData({ ...data, zone: z.value })}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                      data.zone === z.value
                        ? "border-brand-orange bg-brand-orange/10"
                        : "border-white/10 bg-[#1a1a1a] hover:border-white/20"
                    }`}
                  >
                    <span className={`font-medium text-sm ${data.zone === z.value ? "text-white" : "text-white/70"}`}>{z.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/35 text-xs">{z.desc}</span>
                      {data.zone === z.value && <Icon name="Check" size={14} className="text-brand-orange" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Удобное время работы * (можно несколько)</label>
              <div className="grid grid-cols-2 gap-2">
                {SCHEDULE_OPTIONS.map(s => (
                  <button
                    key={s.value} type="button"
                    onClick={() => toggleSchedule(s.value)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                      data.schedule.includes(s.value)
                        ? "border-brand-orange bg-brand-orange/10"
                        : "border-white/10 bg-[#1a1a1a] hover:border-white/20"
                    }`}
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <div className="text-left">
                      <div className={`text-sm font-medium ${data.schedule.includes(s.value) ? "text-white" : "text-white/60"}`}>{s.label}</div>
                      <div className="text-xs text-white/30">{s.time}</div>
                    </div>
                    {data.schedule.includes(s.value) && <Icon name="Check" size={13} className="text-brand-orange ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Documents & agreement */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5">
              <h4 className="font-oswald text-base font-semibold text-white mb-3 flex items-center gap-2">
                <Icon name="FileText" size={16} className="text-brand-orange" />
                Необходимые документы
              </h4>
              <ul className="space-y-2">
                {[
                  { doc: "Паспорт РФ", required: true },
                  { doc: "ИНН (при наличии)", required: false },
                  { doc: "Банковская карта для выплат", required: true },
                  { doc: "Права (для мопеда/авто)", required: false },
                ].map(item => (
                  <li key={item.doc} className="flex items-center gap-2 text-sm text-white/60">
                    <Icon name={item.required ? "Circle" : "CircleDashed"} size={12}
                      className={item.required ? "text-brand-orange" : "text-white/25"} />
                    {item.doc}
                    {item.required && <span className="text-brand-orange text-xs ml-auto">обязательно</span>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-brand-orange/10 to-transparent border border-brand-orange/20 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <Icon name="Clock" size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm mb-1">Что происходит после подачи?</p>
                  <p className="text-white/50 text-xs leading-relaxed">Менеджер позвонит в течение 60 минут, проверит документы онлайн и назначит удобное время для старта. Всё быстро!</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => setData({ ...data, hasPassport: !data.hasPassport })}
                  className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    data.hasPassport ? "border-brand-orange bg-brand-orange" : "border-white/20 group-hover:border-white/40"
                  }`}
                >
                  {data.hasPassport && <Icon name="Check" size={11} className="text-white" />}
                </div>
                <span className="text-white/60 text-sm leading-relaxed">
                  У меня есть паспорт гражданина РФ и мне исполнилось 18 лет
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => setData({ ...data, agreeTerms: !data.agreeTerms })}
                  className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    data.agreeTerms ? "border-brand-orange bg-brand-orange" : "border-white/20 group-hover:border-white/40"
                  }`}
                >
                  {data.agreeTerms && <Icon name="Check" size={11} className="text-white" />}
                </div>
                <span className="text-white/60 text-sm leading-relaxed">
                  Согласен с <span className="text-brand-orange underline cursor-pointer">условиями работы</span> и <span className="text-brand-orange underline cursor-pointer">политикой конфиденциальности</span>
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-7">
        {step > 0 && (
          <button type="button" onClick={goBack}
            className="flex-1 py-3.5 rounded-xl border border-white/15 text-white/60 hover:border-white/30 hover:text-white transition-all duration-200 font-oswald tracking-wide text-sm flex items-center justify-center gap-2">
            <Icon name="ChevronLeft" size={16} />
            Назад
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={goNext}
            disabled={step === 0 ? !canProceedStep0 : !canProceedStep1}
            className="flex-1 btn-primary py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none">
            Продолжить
            <Icon name="ChevronRight" size={16} />
          </button>
        ) : (
          <button type="button" onClick={() => canProceedStep2 && setSubmitted(true)}
            disabled={!canProceedStep2}
            className="flex-1 btn-primary py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none">
            Отправить заявку
            <Icon name="Rocket" size={16} />
          </button>
        )}
      </div>

      <p className="text-white/20 text-xs text-center mt-3 font-golos">
        Шаг {step + 1} из {STEPS.length} · Данные защищены и не передаются третьим лицам
      </p>
    </div>
  );
}

export default function Index() {

  return (
    <div className="min-h-screen bg-brand-dark font-golos overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="font-oswald text-xl font-bold">
            <span className="text-white">ЯНДЕКС</span>
            <span className="text-brand-orange"> ЕДА</span>
          </div>
          <a href="#apply" className="btn-primary px-5 py-2 rounded-xl text-sm hidden md:block">
            Стать курьером
          </a>
        </div>
      </nav>

      {/* TICKER */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-brand-orange py-2 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="font-oswald font-semibold text-white text-sm mx-6 flex-shrink-0">{item}</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden noise-bg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />

        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-brand-yellow/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 rounded-full px-4 py-1.5 mb-6"
              style={{ animation: "fade-in 0.5s ease-out forwards" }}
            >
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-brand-orange text-sm font-medium">Набор курьеров открыт</span>
            </div>

            <h1
              className="font-oswald text-5xl md:text-7xl font-bold leading-tight mb-6"
              style={{ animation: "slide-up 0.6s ease-out 0.1s both" }}
            >
              <span className="text-white">ЗАРАБАТЫВАЙ</span><br />
              <span className="gradient-text">ДО 120 000 ₽</span><br />
              <span className="text-white">В МЕСЯЦ</span>
            </h1>

            <p
              className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed"
              style={{ animation: "slide-up 0.6s ease-out 0.2s both" }}
            >
              Стань курьером Яндекс Еды — работай в своём ритме,<br className="hidden md:block" />
              получай деньги ежедневно и наслаждайся свободой.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "slide-up 0.6s ease-out 0.3s both" }}
            >
              <a href="#apply" className="btn-primary px-8 py-4 rounded-2xl text-base inline-flex items-center gap-2 animate-glow-pulse">
                Начать зарабатывать
                <Icon name="ArrowRight" size={18} />
              </a>
              <a href="#calculator" className="px-8 py-4 rounded-2xl text-base border border-white/20 text-white hover:border-brand-orange hover:text-brand-orange transition-all duration-200 inline-flex items-center gap-2">
                <Icon name="Calculator" size={18} />
                Рассчитать доход
              </a>
            </div>

            <div
              className="flex flex-wrap gap-6 mt-10"
              style={{ animation: "slide-up 0.6s ease-out 0.4s both" }}
            >
              {[["3 000+", "Курьеров уже с нами"], ["24 ч", "Среднее время старта"], ["4.9★", "Рейтинг приложения"]].map(([val, label]) => (
                <div key={val}>
                  <div className="font-oswald text-2xl font-bold text-brand-orange">{val}</div>
                  <div className="text-white/50 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal className="text-center mb-14">
            <p className="text-brand-orange font-oswald tracking-widest text-sm uppercase mb-2">Почему мы</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white">
              ПРЕИМУЩЕСТВА<br /><span className="gradient-text">РАБОТЫ С НАМИ</span>
            </h2>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <SectionReveal key={b.title} delay={i * 80}>
                <div className="bg-brand-card border border-white/5 rounded-2xl p-6 card-glow h-full transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/15 flex items-center justify-center mb-4">
                    <Icon name={b.icon as "Clock"} size={22} className="text-brand-orange" />
                  </div>
                  <h3 className="font-oswald text-xl font-semibold text-white mb-2">{b.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-20 px-4 bg-brand-card/40">
        <div className="max-w-6xl mx-auto">
          <SectionReveal className="text-center mb-12">
            <p className="text-brand-orange font-oswald tracking-widest text-sm uppercase mb-2">Считай сам</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white">
              КАЛЬКУЛЯТОР<br /><span className="gradient-text">ЗАРАБОТКА</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Двигай ползунки и узнай, сколько ты сможешь заработать в зависимости от своего графика
            </p>
          </SectionReveal>
          <SectionReveal delay={150}>
            <Calculator />
          </SectionReveal>
        </div>
      </section>

      {/* EARNINGS HIGHLIGHT */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { val: "от 700 ₽", label: "За смену (4 часа)", icon: "Clock" },
              { val: "+15%", label: "Бонус за план недели", icon: "TrendingUp" },
              { val: "ежедн.", label: "Выплаты на карту", icon: "CreditCard" },
            ].map((item, i) => (
              <SectionReveal key={item.label} delay={i * 100}>
                <div className="bg-gradient-to-br from-brand-orange/20 to-brand-yellow/5 border border-brand-orange/30 rounded-2xl p-6 text-center">
                  <Icon name={item.icon as "Clock"} size={28} className="text-brand-orange mx-auto mb-3" />
                  <div className="font-oswald text-3xl font-bold text-white mb-1">{item.val}</div>
                  <div className="text-white/55 text-sm">{item.label}</div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="py-20 px-4 bg-brand-card/40">
        <div className="max-w-6xl mx-auto">
          <SectionReveal className="text-center mb-12">
            <p className="text-brand-orange font-oswald tracking-widest text-sm uppercase mb-2">Кто подходит</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white">
              ТРЕБОВАНИЯ<br /><span className="gradient-text">К КАНДИДАТАМ</span>
            </h2>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {REQUIREMENTS.map((req, i) => (
              <SectionReveal key={req.text} delay={i * 80}>
                <div className="flex items-center gap-4 bg-brand-card border border-white/5 rounded-2xl p-5 card-glow">
                  <div className="text-3xl flex-shrink-0">{req.emoji}</div>
                  <span className="text-white font-medium text-base">{req.text}</span>
                  <Icon name="Check" size={18} className="text-brand-orange ml-auto flex-shrink-0" />
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={200} className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-surface rounded-2xl px-6 py-4 border border-white/10">
              <Icon name="Info" size={18} className="text-brand-yellow" />
              <span className="text-white/70 text-sm">Опыт работы курьером не нужен — всему научим!</span>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal className="text-center mb-14">
            <p className="text-brand-orange font-oswald tracking-widest text-sm uppercase mb-2">Просто</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white">
              КАК НАЧАТЬ<br /><span className="gradient-text">ЗА 3 ШАГА</span>
            </h2>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Оставь заявку", desc: "Заполни форму ниже — наш менеджер свяжется с тобой в течение часа", icon: "ClipboardList" },
              { step: "02", title: "Пройди регистрацию", desc: "Минимум документов, быстрая проверка. Весь процесс занимает не более 1 дня", icon: "UserCheck" },
              { step: "03", title: "Начни зарабатывать", desc: "Получи первый заказ и деньги уже в первый рабочий день!", icon: "Rocket" },
            ].map((item, i) => (
              <SectionReveal key={item.step} delay={i * 120}>
                <div className="relative bg-brand-card border border-white/5 rounded-2xl p-6 card-glow">
                  <div className="font-oswald text-6xl font-bold text-white/5 absolute top-4 right-6 leading-none">{item.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/15 flex items-center justify-center mb-4 relative z-10">
                    <Icon name={item.icon as "Rocket"} size={22} className="text-brand-orange" />
                  </div>
                  <h3 className="font-oswald text-xl font-semibold text-white mb-2 relative z-10">{item.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed relative z-10">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-orange via-orange-500 to-brand-yellow p-8 md:p-12 text-center">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)"
              }} />
              <div className="relative z-10">
                <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
                  ГОТОВ НАЧАТЬ?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Тысячи курьеров уже зарабатывают с Яндекс Едой. Присоединяйся сейчас!
                </p>
                <a href="#apply" className="inline-flex items-center gap-2 bg-white text-brand-orange font-oswald font-bold text-lg px-10 py-4 rounded-2xl hover:bg-white/90 transition-all duration-200 hover:-translate-y-1 uppercase tracking-wide">
                  Оставить заявку
                  <Icon name="ArrowRight" size={20} />
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="apply" className="py-20 px-4 bg-brand-card/40">
        <div className="max-w-2xl mx-auto">
          <SectionReveal className="text-center mb-10">
            <p className="text-brand-orange font-oswald tracking-widest text-sm uppercase mb-2">Саморегистрация</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-3">
              СТАНЬ<br /><span className="gradient-text">КУРЬЕРОМ</span>
            </h2>
            <p className="text-white/50">Три простых шага — и ты в команде</p>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="bg-brand-card border border-white/5 rounded-2xl p-6 md:p-8">
              <RegistrationForm />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-oswald text-lg font-bold">
            <span className="text-white">ЯНДЕКС</span>
            <span className="text-brand-orange"> ЕДА</span>
          </div>
          <nav className="flex gap-6 text-sm text-white/40">
            <a href="#benefits" className="hover:text-white/70 transition-colors">Преимущества</a>
            <a href="#calculator" className="hover:text-white/70 transition-colors">Калькулятор</a>
            <a href="#requirements" className="hover:text-white/70 transition-colors">Требования</a>
            <a href="#apply" className="hover:text-white/70 transition-colors">Заявка</a>
          </nav>
          <p className="text-white/25 text-xs">© 2026 Яндекс Еда. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}