/**
 * DC Next — Инструкция по виртуальной карте
 * Цель: максимальная понятность для пользователя
 * - Каждый шаг открывается отдельно
 * - Действия выделены крупно и чётко
 * - Предупреждения заметны
 * - Иконки помогают быстро ориентироваться
 */

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Smartphone,
  UserCheck,
  FileSearch,
  Bell,
  CreditCard,
  ShoppingCart,
  ListChecks,
  BadgeCheck,
  Layers,
  Download,
} from "lucide-react";

const ANDROID_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/111270612/FKpJbzZpjAokhbw5qXRJsG/android_ef3454f9.png";
const IPHONE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/111270612/FKpJbzZpjAokhbw5qXRJsG/iphone_50b804fd.png";
const IDENTIFICATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/111270612/FKpJbzZpjAokhbw5qXRJsG/identification_593b63d5.jpg";
const CARD_ISSUED_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/111270612/FKpJbzZpjAokhbw5qXRJsG/card_issued_28c40cd8.jpg";

/* ─── Модальное окно для изображений ─── */
function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-9 right-0 text-white/80 text-sm font-semibold hover:text-white">
          ✕ Закрыть
        </button>
        <img src={src} alt={alt} className="w-full rounded-2xl shadow-2xl" />
        <p className="text-center text-white/60 text-xs mt-2">{alt}</p>
      </div>
    </div>
  );
}

function ClickableImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="cursor-zoom-in rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-blue-300 transition-colors max-w-sm mx-auto"
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} className="w-full object-cover" />
        <p className="text-center text-xs text-slate-400 py-2 px-3 bg-slate-50">
          🔍 {caption} — нажмите для увеличения
        </p>
      </div>
      {open && <ImageModal src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}

/* ─── Блок «Что нужно сделать» ─── */
function ActionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-blue-50 border-l-4 border-blue-500 px-4 py-3">
      <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Что делать</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/* ─── Блок «Важно» ─── */
function WarnBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-amber-50 border-l-4 border-amber-400 px-4 py-3 flex gap-3">
      <AlertTriangle size={18} className="shrink-0 text-amber-500 mt-0.5" />
      <div className="text-sm text-amber-800 leading-relaxed">{children}</div>
    </div>
  );
}

/* ─── Блок «Готово / Результат» ─── */
function SuccessBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-emerald-50 border-l-4 border-emerald-400 px-4 py-3 flex gap-3">
      <CheckCircle2 size={18} className="shrink-0 text-emerald-500 mt-0.5" />
      <div className="text-sm text-emerald-800 leading-relaxed">{children}</div>
    </div>
  );
}

/* ─── Нумерованный шаг действия ─── */
function ActionStep({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shadow-sm">
        {num}
      </span>
      <span className="text-sm text-slate-700 leading-relaxed pt-0.5">{children}</span>
    </div>
  );
}

/* ─── Иконка шага ─── */
const stepIcons = [Download, UserCheck, FileSearch, Bell, ListChecks, CreditCard, ShoppingCart, Layers, BadgeCheck, Smartphone];

interface StepData {
  id: number;
  title: string;
  subtitle: string;
  duration?: string;
  content: React.ReactNode;
}

const steps: StepData[] = [
  /* ── ШАГ 1 ── */
  {
    id: 1,
    title: "Установка приложения",
    subtitle: "Скачайте DC Next на телефон",
    duration: "2 мин",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          Приложение называется <strong className="text-slate-800">DC Next</strong> (Dushanbe City Bank). Скачайте его из официального магазина.
        </p>
        <ActionBlock>
          <ActionStep num={1}>
            Откройте <strong>Google Play</strong> (Android) или <strong>App Store</strong> (iPhone).
          </ActionStep>
          <ActionStep num={2}>
            В поиске введите <strong>«DC Next»</strong>.
          </ActionStep>
          <ActionStep num={3}>
            Нажмите <strong>«Установить»</strong> и дождитесь загрузки.
          </ActionStep>
          <ActionStep num={4}>
            Откройте приложение и дождитесь полной загрузки экрана.
          </ActionStep>
        </ActionBlock>
      </div>
    ),
  },

  /* ── ШАГ 2 ── */
  {
    id: 2,
    title: "Регистрация и вход",
    subtitle: "Войдите через Telegram",
    duration: "3 мин",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          Для входа потребуется <strong>Telegram</strong> — убедитесь, что он установлен и вы в него вошли.
        </p>
        <ActionBlock>
          <ActionStep num={1}>Откройте приложение DC Next.</ActionStep>
          <ActionStep num={2}>
            Нажмите кнопку <strong>«Вход / Регистрация»</strong>.
          </ActionStep>
          <ActionStep num={3}>
            Выберите <strong>«Авторизация через Telegram»</strong>.
          </ActionStep>
          <ActionStep num={4}>
            В Telegram придёт сообщение от <strong>DC Next Bot</strong> с кодом — введите его в приложение.
          </ActionStep>
        </ActionBlock>
        <WarnBlock>
          Telegram должен быть установлен и открыт <strong>до начала регистрации</strong>. Иначе код не придёт.
        </WarnBlock>
      </div>
    ),
  },

  /* ── ШАГ 3 ── */
  {
    id: 3,
    title: "Прохождение идентификации",
    subtitle: "Сфотографируйте паспорт",
    duration: "5–10 мин",
    content: (
      <div className="space-y-5">
        <p className="text-slate-600 text-sm leading-relaxed">
          Банк должен проверить вашу личность. Для этого нужно загрузить фото паспорта прямо в приложении.
        </p>
        <ActionBlock>
          <ActionStep num={1}>
            В приложении найдите раздел <strong>«Пройти идентификацию»</strong> и нажмите на него.
          </ActionStep>
          <ActionStep num={2}>Сфотографируйте паспорт согласно инструкции ниже.</ActionStep>
          <ActionStep num={3}>
            Нажмите <strong>«Отправить на идентификацию»</strong>.
          </ActionStep>
        </ActionBlock>

        {/* Вкладки Android / iPhone */}
        <div className="space-y-3">
          {/* Android */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center gap-2">
              <span className="text-sm font-bold">📱 Android — 3 фотографии</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {["1️⃣ Лицевая сторона паспорта", "2️⃣ Оборотная сторона паспорта", "3️⃣ Селфи с паспортом"].map((t) => (
                  <div key={t} className="bg-slate-50 rounded-xl p-2 text-slate-600 font-medium leading-snug">
                    {t}
                  </div>
                ))}
              </div>
              <ClickableImage src={ANDROID_IMG} alt="Экран идентификации на Android" caption="Пример экрана на Android" />
            </div>
          </div>

          {/* iPhone */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-700 text-white px-4 py-2.5 flex items-center gap-2">
              <span className="text-sm font-bold">🍎 iPhone — 2 фотографии</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                {["1️⃣ Лицевая сторона паспорта", "2️⃣ Оборотная сторона + селфи с паспортом в руках"].map((t) => (
                  <div key={t} className="bg-slate-50 rounded-xl p-2 text-slate-600 font-medium leading-snug">
                    {t}
                  </div>
                ))}
              </div>
              <ClickableImage src={IPHONE_IMG} alt="Экран идентификации на iPhone" caption="Пример экрана на iPhone" />
            </div>
          </div>
        </div>

        <WarnBlock>
          <strong>Требования к фото:</strong> чёткие, без бликов, без обрезанных краёв. Паспорт должен <strong>полностью помещаться в кадр</strong>.
          <br /><br />
          Если приложение не принимает фото — попробуйте изменить зум камеры (1× / 2× / 5×) или сделайте фото чуть ближе/дальше.
        </WarnBlock>
      </div>
    ),
  },

  /* ── ШАГ 4 ── */
  {
    id: 4,
    title: "Проверка документов",
    subtitle: "Ждите сообщений в Telegram",
    duration: "до 30 мин",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          После отправки фото банк начинает проверку. В Telegram от <strong>DC Next Bot</strong> придут два сообщения.
        </p>

        {/* Сообщение 1 */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 px-4 py-2 flex items-center gap-2 border-b border-slate-200">
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-black flex items-center justify-center">1</span>
            <span className="text-sm font-bold text-slate-700">Первое сообщение — идентификация началась</span>
          </div>
          <div className="p-4 space-y-2">
            <div className="bg-slate-800 text-green-400 font-mono text-xs rounded-xl px-3 py-2 tracking-widest">
              ИДЕНТИФИКАЦИЯ КАРТЫ
            </div>
            <p className="text-sm text-slate-600">
              ✅ Это значит: банк <strong>получил ваши документы</strong> и начал проверку. Больше ничего делать не нужно — просто ждите.
            </p>
          </div>
        </div>

        {/* Сообщение 2 */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 px-4 py-2 flex items-center gap-2 border-b border-slate-200">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center">2</span>
            <span className="text-sm font-bold text-slate-700">Второе сообщение — верификация прошла</span>
          </div>
          <div className="p-4 space-y-2">
            <p className="text-sm text-slate-600">
              ✅ Это значит: проверка <strong>прошла успешно</strong>. Теперь откройте приложение, раздел <strong>«Карты»</strong> и потяните экран вниз для обновления.
            </p>
          </div>
        </div>

        <ClickableImage
          src={IDENTIFICATION_IMG}
          alt="Уведомления в Telegram"
          caption="Пример сообщений от DC Next Bot"
        />

        {/* ВАЖНЫЙ БЛОК — повторная идентификация */}
        <WarnBlock>
          <strong>Приложение снова просит пройти идентификацию?</strong>
          <br />
          Это нормально. Как только первое сообщение пришло в Telegram — идентификация <strong>уже началась</strong>.
          Повторно загружать документы <strong>не нужно</strong>. Просто закройте этот экран и ждите второго сообщения.
        </WarnBlock>

        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">
          <Clock size={16} className="shrink-0 text-slate-400 mt-0.5" />
          <p className="text-sm text-slate-600">
            <strong>Время ожидания:</strong> обычно около 30 минут. В часы пик может занять дольше — это нормально.
          </p>
        </div>
      </div>
    ),
  },

  /* ── ШАГ 5 ── */
  {
    id: 5,
    title: "Проверка статуса",
    subtitle: "Обновите раздел «Карты»",
    duration: "1 мин",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          После того как в Telegram пришло <strong>второе сообщение</strong>, проверьте статус в приложении.
        </p>
        <ActionBlock>
          <ActionStep num={1}>Откройте приложение DC Next.</ActionStep>
          <ActionStep num={2}>
            Перейдите в раздел <strong>«Карты»</strong>.
          </ActionStep>
          <ActionStep num={3}>
            Потяните экран <strong>вниз</strong> — страница обновится.
          </ActionStep>
        </ActionBlock>
        <SuccessBlock>
          После обновления статус изменится — вы готовы к следующему шагу.
        </SuccessBlock>
      </div>
    ),
  },

  /* ── ШАГ 6 ── */
  {
    id: 6,
    title: "Пополнение счёта",
    subtitle: "Переведите деньги через СБП",
    duration: "5 мин",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          Перед заказом карты нужно пополнить баланс. Переведите деньги через <strong>СБП</strong> на номер телефона, привязанный к DC Next.
        </p>

        {/* Сумма */}
        <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 px-5 py-4 text-center">
          <p className="text-xs text-orange-500 font-bold uppercase tracking-widest mb-1">Сумма перевода</p>
          <p className="text-3xl font-black text-orange-600">≈ 500 ₽</p>
          <p className="text-xs text-orange-400 mt-1">Перевод через СБП</p>
        </div>

        <p className="text-xs text-slate-500 text-center">
          Можно через Т-Банк или любой банк РФ с поддержкой СБП
        </p>

        <ActionBlock>
          <ActionStep num={1}>Откройте приложение вашего банка (например, Т-Банк).</ActionStep>
          <ActionStep num={2}>
            Перейдите в раздел <strong>«Перевести»</strong>.
          </ActionStep>
          <ActionStep num={3}>
            Выберите <strong>«По номеру телефона (СБП)»</strong>.
          </ActionStep>
          <ActionStep num={4}>Введите номер телефона, на который зарегистрирован DC Next.</ActionStep>
          <ActionStep num={5}>
            В списке банков выберите <strong>«Душанбе Сити»</strong>.
          </ActionStep>
        </ActionBlock>

        {/* Если не видно банк */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-500" />
            <span className="text-sm font-semibold text-slate-700">Если «Душанбе Сити» не отображается</span>
          </div>
          <div className="p-4 space-y-2">
            <ActionStep num={1}>
              Нажмите <strong>«Другой банк»</strong>.
            </ActionStep>
            <ActionStep num={2}>
              Выберите <strong>«Банки других стран»</strong>.
            </ActionStep>
            <ActionStep num={3}>
              В поиске введите <strong>«душ»</strong>.
            </ActionStep>
            <ActionStep num={4}>
              Выберите <strong>«Душанбе Сити»</strong>.
            </ActionStep>
          </div>
        </div>
      </div>
    ),
  },

  /* ── ШАГ 7 ── */
  {
    id: 7,
    title: "Заказ виртуальной карты",
    subtitle: "После поступления средств",
    duration: "2 мин",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          Как только деньги поступят на счёт — можно заказывать карту.
        </p>
        <ActionBlock>
          <ActionStep num={1}>
            Откройте раздел <strong>«Мои карты»</strong>.
          </ActionStep>
          <ActionStep num={2}>
            Нажмите <strong>«Заказать или привязать карту»</strong>.
          </ActionStep>
          <ActionStep num={3}>
            Выберите <strong>«Заказать карту»</strong>.
          </ActionStep>
        </ActionBlock>
      </div>
    ),
  },

  /* ── ШАГ 8 ── */
  {
    id: 8,
    title: "Выбор карты",
    subtitle: "Выберите Visa Virtual",
    duration: "1 мин",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          В списке доступных карт найдите и выберите:
        </p>
        <div className="rounded-2xl border-2 border-blue-400 bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="font-black text-white text-lg leading-tight">Visa Virtual</p>
            <p className="text-blue-200 text-sm mt-0.5">Стоимость выпуска: <strong className="text-white">50 TJS</strong></p>
          </div>
          <div className="bg-white text-blue-700 text-sm font-black px-4 py-2 rounded-xl shadow">
            Выбрать →
          </div>
        </div>
      </div>
    ),
  },

  /* ── ШАГ 9 ── */
  {
    id: 9,
    title: "Подтверждение оплаты",
    subtitle: "Нажмите «Подтверждаю»",
    duration: "1 мин",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          Откроется окно оплаты. Проверьте данные и подтвердите заказ.
        </p>
        <ActionBlock>
          <ActionStep num={1}>Проверьте сумму и данные карты.</ActionStep>
          <ActionStep num={2}>
            Нажмите кнопку <strong>«Подтверждаю»</strong>.
          </ActionStep>
        </ActionBlock>
        <SuccessBlock>
          Заказ отправлен! Теперь ждите выпуска карты.
        </SuccessBlock>
      </div>
    ),
  },

  /* ── ШАГ 10 ── */
  {
    id: 10,
    title: "Выпуск карты",
    subtitle: "Ожидайте до 24 часов",
    duration: "до 24 ч",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          Карта выпускается в порядке очереди. Обычно это занимает несколько часов.
        </p>

        {/* Статусы */}
        <div className="space-y-2">
          {[
            { icon: "📤", color: "bg-slate-100 border-slate-200", label: "Заказ отправлен", desc: "Банк принял вашу заявку." },
            { icon: "⚙️", color: "bg-blue-50 border-blue-200", label: "Обработка", desc: "Банк обрабатывает заявку. Регламент — до 24 часов." },
            { icon: "✅", color: "bg-emerald-50 border-emerald-200", label: "Карта выпущена", desc: "Карта появится в разделе «Мои карты». В Telegram придёт уведомление." },
          ].map((s) => (
            <div key={s.label} className={`flex items-start gap-3 rounded-2xl border px-4 py-3 ${s.color}`}>
              <span className="text-xl shrink-0">{s.icon}</span>
              <div>
                <p className="font-bold text-slate-800 text-sm">{s.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <ClickableImage
          src={CARD_ISSUED_IMG}
          alt="Уведомление о выпуске карты"
          caption="Пример уведомления в Telegram"
        />

        <SuccessBlock>
          🎉 Карта появится в разделе <strong>«Мои карты»</strong> в приложении DC Next.
        </SuccessBlock>
      </div>
    ),
  },
];

/* ═══════════════════════════════════════════
   ГЛАВНЫЙ КОМПОНЕНТ
═══════════════════════════════════════════ */
export default function Home() {
  const [openStep, setOpenStep] = useState<number | null>(1);
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());

  const toggleStep = (id: number) => {
    if (openStep === id) {
      setOpenStep(null);
    } else {
      setOpenStep(id);
      setDoneSteps((prev) => { const n = new Set(prev); n.add(id); return n; });
    }
  };

  const doneCount = doneSteps.size;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── ШАПКА ── */}
      <header className="bg-[#0f1e3d] text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Логотип */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-orange-900/30">
              DC
            </div>
            <div>
              <p className="font-black text-base leading-tight">DC Next</p>
              <p className="text-xs text-white/50">Dushanbe City Bank</p>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black leading-tight mb-2">
            Как получить виртуальную карту
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Пошаговая инструкция: от установки приложения до получения Visa Virtual
          </p>

          {/* Бейджи */}
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">
              📋 10 шагов
            </span>
            <span className="bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">
              📱 Android & iPhone
            </span>
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              💳 Visa Virtual · 50 TJS
            </span>
          </div>
        </div>
      </header>

      {/* ── ПРОГРЕСС ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Прогресс</span>
            <span className="text-xs font-bold text-slate-600">
              {doneCount === 0 ? "Начните с шага 1" : `${doneCount} из ${steps.length} шагов изучено`}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleStep(s.id)}
                title={`Шаг ${s.id}: ${s.title}`}
                className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${
                  doneSteps.has(s.id)
                    ? "bg-orange-500"
                    : openStep === s.id
                    ? "bg-blue-400"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── ШАГИ ── */}
      <main className="max-w-2xl mx-auto px-4 py-5 space-y-3">
        {steps.map((step) => {
          const isOpen = openStep === step.id;
          const isDone = doneSteps.has(step.id);
          const Icon = stepIcons[step.id - 1];

          return (
            <div
              key={step.id}
              className={`rounded-2xl border bg-white transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-blue-300 shadow-lg shadow-blue-100"
                  : isDone
                  ? "border-orange-200"
                  : "border-slate-200 shadow-sm"
              }`}
            >
              {/* Заголовок шага */}
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                {/* Номер / иконка */}
                <div
                  className={`shrink-0 w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-colors ${
                    isDone
                      ? "bg-orange-500 text-white"
                      : isOpen
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <>
                      <Icon size={16} />
                      <span className="text-[9px] font-black mt-0.5 opacity-70">{step.id}</span>
                    </>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm leading-tight ${isOpen ? "text-blue-700" : "text-slate-800"}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-tight">{step.subtitle}</p>
                </div>

                {/* Время + стрелка */}
                <div className="shrink-0 flex items-center gap-2">
                  {step.duration && (
                    <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                      ⏱ {step.duration}
                    </span>
                  )}
                  <div className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
              </button>

              {/* Контент шага */}
              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                  {step.content}
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* ── ПОДВАЛ ── */}
      <footer className="max-w-2xl mx-auto px-4 pb-10 mt-2">
        <div className="rounded-2xl bg-[#0f1e3d] text-white p-6">
          <h2 className="font-black text-lg mb-1">Остались вопросы?</h2>
          <p className="text-white/50 text-sm mb-5">Свяжитесь с нами любым удобным способом</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+79279371918"
              className="flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-colors"
            >
              <Phone size={16} className="text-orange-400" />
              8 927 937 19 18
            </a>
            <a
              href="https://t.me/Bashirov1111"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-colors"
            >
              <Send size={16} className="text-blue-400" />
              @Bashirov1111
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-5">
          © 2026 DC Next · Dushanbe City Bank · Инструкция по виртуальной карте
        </p>
      </footer>
    </div>
  );
}
