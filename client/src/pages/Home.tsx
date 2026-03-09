/**
 * DC Next — Инструкция по виртуальной карте
 * Design: Clean professional instruction guide
 * Colors: Dark navy header, white cards, orange/amber accents
 * Font: Nunito
 */

import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Send, Info, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const ANDROID_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/111270612/FKpJbzZpjAokhbw5qXRJsG/android_ef3454f9.png";
const IPHONE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/111270612/FKpJbzZpjAokhbw5qXRJsG/iphone_50b804fd.png";
const IDENTIFICATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/111270612/FKpJbzZpjAokhbw5qXRJsG/identification_593b63d5.jpg";
const CARD_ISSUED_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/111270612/FKpJbzZpjAokhbw5qXRJsG/card_issued_28c40cd8.jpg";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-sm font-semibold hover:text-gray-300 transition-colors"
        >
          ✕ Закрыть
        </button>
        <img src={src} alt={alt} className="w-full rounded-xl shadow-2xl" />
        <p className="text-center text-white/70 text-sm mt-3">{alt}</p>
      </div>
    </div>
  );
}

function ClickableImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="cursor-zoom-in rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow max-w-xs mx-auto"
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} className="w-full object-cover" />
        <p className="text-center text-xs text-gray-500 py-2 px-3 bg-gray-50">{caption}</p>
      </div>
      {open && <ImageModal src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}

function InfoBox({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "tip" }) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    tip: "bg-green-50 border-green-200 text-green-800",
  };
  const icons = {
    info: <Info size={16} className="shrink-0 mt-0.5" />,
    warning: <AlertTriangle size={16} className="shrink-0 mt-0.5" />,
    tip: <CheckCircle2 size={16} className="shrink-0 mt-0.5" />,
  };
  return (
    <div className={`flex gap-2.5 rounded-xl border px-4 py-3 text-sm ${styles[type]}`}>
      {icons[type]}
      <div>{children}</div>
    </div>
  );
}

function NumberedList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ol className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 items-start">
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const steps: Step[] = [
  {
    id: 1,
    title: "Установка приложения",
    subtitle: "Google Play / App Store",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          Скачайте приложение <strong>DC Next (Dushanbe City Bank)</strong> из официального магазина приложений:
        </p>
        <BulletList items={[
          "Google Play — для устройств Android",
          "App Store — для устройств iPhone / iPad",
        ]} />
        <InfoBox type="info">
          После установки откройте приложение и дождитесь полной загрузки.
        </InfoBox>
      </div>
    ),
  },
  {
    id: 2,
    title: "Регистрация и вход",
    subtitle: "Авторизация через Telegram",
    content: (
      <div className="space-y-4">
        <NumberedList items={[
          "Откройте приложение DC Next.",
          <span>Нажмите кнопку <strong>«Вход / Регистрация»</strong>.</span>,
          <span>Выберите <strong>«Авторизация через Telegram»</strong>.</span>,
          <span>Код подтверждения придёт в Telegram от <strong>DC Next Bot</strong>.</span>,
        ]} />
        <InfoBox type="warning">
          Убедитесь, что у вас установлен Telegram и вы вошли в свой аккаунт перед началом регистрации.
        </InfoBox>
      </div>
    ),
  },
  {
    id: 3,
    title: "Прохождение идентификации",
    subtitle: "Загрузка фотографий паспорта",
    content: (
      <div className="space-y-5">
        <p className="text-gray-700 text-sm leading-relaxed">
          В приложении откройте раздел <strong>«Пройти идентификацию»</strong> и загрузите фотографии паспорта.
        </p>

        {/* Android */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex gap-3">
            <button className="text-sm font-semibold text-orange-600 border-b-2 border-orange-500 pb-0.5">Android</button>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-500">iPhone (см. ниже)</span>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-600">На Android обычно требуется загрузить три фотографии:</p>
            <BulletList items={["Лицевую сторону паспорта", "Оборотную сторону паспорта", "Селфи с паспортом"]} />
            <ClickableImage src={ANDROID_IMG} alt="Пример идентификации на Android" caption="Пример экрана идентификации на Android" />
            <InfoBox type="warning">
              <strong>Если приложение не принимает фото:</strong>
              <ul className="mt-1 space-y-0.5 list-disc list-inside">
                <li>Попробуйте изменить зум камеры (1x / 2x / 5x)</li>
                <li>Сделайте фото немного ближе или дальше</li>
                <li>Убедитесь, что паспорт полностью помещается в кадр</li>
              </ul>
            </InfoBox>
          </div>
        </div>

        {/* iPhone */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700">iPhone</span>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-600">На iPhone необходимо загрузить две фотографии:</p>
            <BulletList items={["Лицевую сторону паспорта", "Оборотную сторону — селфи с паспортом в руках"]} />
            <ClickableImage src={IPHONE_IMG} alt="Пример идентификации на iPhone" caption="Пример экрана идентификации на iPhone" />
          </div>
        </div>

        <p className="text-sm text-gray-700">
          После загрузки нажмите <strong>«Отправить на идентификацию»</strong>.
        </p>
        <InfoBox type="warning">
          <strong>Требования к фотографиям:</strong> чёткие, без бликов, без обрезанных краёв. Паспорт должен полностью попадать в кадр.
        </InfoBox>
      </div>
    ),
  },
  {
    id: 4,
    title: "Проверка документов",
    subtitle: "Что означают сообщения в Telegram",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          После отправки документов банк начинает проверку. В Telegram от <strong>DC Next Bot</strong> придут служебные сообщения — вот что они означают:
        </p>

        {/* Сообщение 1 */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700">Сообщение 1 — проверка началась</span>
          </div>
          <div className="p-4 space-y-2">
            <div className="bg-gray-100 rounded-lg px-3 py-2 font-mono text-xs text-gray-600 tracking-wider">
              ИДЕНТИФИКАЦИЯ КАРТЫ
            </div>
            <p className="text-sm text-gray-700">
              <strong>Это значит:</strong> идентификация началась. Банк получил ваши документы и приступил к проверке.
            </p>
          </div>
        </div>

        {/* Сообщение 2 */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700">Сообщение 2 — верификация прошла</span>
          </div>
          <div className="p-4 space-y-2">
            <p className="text-sm text-gray-700">
              <strong>Это значит:</strong> верификация прошла успешно. После этого сообщения зайдите в приложение, откройте раздел <strong>«Карты»</strong> и потяните экран вниз для обновления — статус изменится.
            </p>
          </div>
        </div>

        <ClickableImage
          src={IDENTIFICATION_IMG}
          alt="Уведомления об идентификации в Telegram"
          caption="Пример уведомлений в Telegram в процессе идентификации"
        />

        {/* НОВЫЙ БЛОК: важное пояснение */}
        <InfoBox type="warning">
          <strong>Важно!</strong> Как только это сообщение пришло — у вас началась идентификация. Приложение может снова просить пройти идентификацию — <strong>повторно проходить не нужно</strong>. Просто ждите завершения проверки.
        </InfoBox>

        <div className="flex items-start gap-2.5 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
          <Clock size={16} className="shrink-0 mt-0.5 text-gray-400" />
          <span>
            <strong>Время ожидания:</strong> обычно около 30 минут. Однако в зависимости от нагрузки на банк идентификация может затянуться — это нормально, просто подождите и проверьте статус позже.
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Проверка статуса",
    subtitle: "После получения уведомления",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          После того как в Telegram пришло второе сообщение с кодом верификации, проверьте статус в приложении:
        </p>
        <NumberedList items={[
          "Зайдите снова в приложение DC Next.",
          <span>Откройте раздел <strong>«Карты»</strong>.</span>,
          "Потяните экран вниз, чтобы обновить страницу.",
          "После обновления статус изменится, и вы сможете перейти к следующему шагу.",
        ]} />
      </div>
    ),
  },
  {
    id: 6,
    title: "Пополнение счёта",
    subtitle: "Перевод через СБП перед заказом карты",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          Для выпуска виртуальной карты необходимо пополнить баланс. Отправьте перевод через СБП на номер телефона, на который зарегистрирован аккаунт DC Next.
        </p>
        <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-3 text-center">
          <span className="text-orange-700 font-bold text-base">≈ 500 рублей · Перевод через СБП</span>
        </div>
        <p className="text-sm text-gray-600">
          Перевод можно сделать через Т-Банк или любой другой банк РФ, поддерживающий СБП.
        </p>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Как сделать перевод:</p>
          <NumberedList items={[
            "Откройте приложение банка РФ.",
            <span>Перейдите в раздел <strong>«Перевести»</strong>.</span>,
            <span>Выберите перевод <strong>по номеру телефона (СБП)</strong>.</span>,
            "Введите номер телефона, на который зарегистрирован DC Next.",
            <span>Появится банк <strong>«Душанбе Сити»</strong> — выберите его.</span>,
          ]} />
        </div>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700">Если «Душанбе Сити» не отображается:</span>
          </div>
          <div className="p-4">
            <NumberedList items={[
              <span>Нажмите <strong>«Другой банк»</strong>.</span>,
              <span>Перейдите в <strong>«Банки других стран»</strong>.</span>,
              <span>В поиске введите <strong>«душ»</strong>.</span>,
              <span>Выберите <strong>«Душанбе Сити»</strong>.</span>,
            ]} />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Заказ виртуальной карты",
    subtitle: "После поступления средств",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          После того как деньги поступят на счёт, перейдите к заказу карты:
        </p>
        <NumberedList items={[
          <span>Откройте раздел <strong>«Мои карты»</strong>.</span>,
          <span>Нажмите <strong>«Заказать или привязать карту»</strong>.</span>,
          <span>Выберите <strong>«Заказать карту»</strong>.</span>,
        ]} />
      </div>
    ),
  },
  {
    id: 8,
    title: "Выбор карты",
    subtitle: "Visa Virtual",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          В списке доступных карт выберите:
        </p>
        <div className="rounded-xl border-2 border-orange-400 bg-orange-50 p-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-800 text-base">Visa Virtual</p>
            <p className="text-sm text-gray-500">Стоимость выпуска: 50 TJS</p>
          </div>
          <div className="bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-lg">
            Выбрать
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: "Подтверждение оплаты",
    subtitle: "Финальное подтверждение заказа",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          После выбора карты откроется окно оплаты. Внимательно проверьте все данные и нажмите кнопку:
        </p>
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-center">
          <span className="text-green-700 font-bold text-base">«Подтверждаю»</span>
        </div>
        <p className="text-sm text-gray-600 text-center">для завершения заказа.</p>
      </div>
    ),
  },
  {
    id: 10,
    title: "Выпуск карты",
    subtitle: "До 24 часов",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          Виртуальная карта поступает в личный кабинет DC Next в порядке очереди банка.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: "📤", title: "Заказ отправлен", desc: "Ваш запрос на выпуск карты принят банком." },
            { icon: "⚙️", title: "Обработка", desc: "Банк обрабатывает заявку. Регламент — до 24 часов." },
            { icon: "✅", title: "Карта выпущена", desc: "Карта появится в разделе «Мои карты», а в Telegram придёт уведомление." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-gray-200 p-3 text-center">
              <div className="text-2xl mb-1.5">{item.icon}</div>
              <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <ClickableImage
          src={CARD_ISSUED_IMG}
          alt="Уведомление о выпуске карты"
          caption="Пример уведомления в Telegram об успешном выпуске карты"
        />

        <InfoBox type="tip">
          После выпуска карта появится в разделе <strong>«Мои карты»</strong> в приложении DC Next. 🎉
        </InfoBox>
      </div>
    ),
  },
];

export default function Home() {
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([1]));
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (id: number) => {
    setOpenSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (!completedSteps.has(id)) {
          setCompletedSteps((c) => { const n = new Set(c); n.add(id); return n; });
        }
      }
      return next;
    });
  };

  const completedCount = completedSteps.size;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a2744] to-[#0f1e3d] text-white">
        <div className="container py-8 md:py-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white text-lg shadow-lg">
              DC
            </div>
            <div>
              <p className="font-black text-lg leading-tight">DC Next</p>
              <p className="text-xs text-white/60 leading-tight">Dushanbe City Bank</p>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black leading-tight mb-2">
            Регистрация и виртуальная карта
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
            Пошаговая инструкция по регистрации в приложении и получению виртуальной карты Visa Virtual
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="bg-white/10 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
              10 шагов
            </span>
            <span className="bg-white/10 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
              Android & iPhone
            </span>
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              Visa Virtual · 50 TJS
            </span>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Прогресс изучения</span>
            <span className="text-xs font-bold text-gray-700">{completedCount} из {steps.length} шагов</span>
          </div>
          <div className="flex gap-1">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleStep(s.id)}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  completedSteps.has(s.id)
                    ? "bg-orange-500"
                    : openSteps.has(s.id)
                    ? "bg-orange-300"
                    : "bg-gray-200"
                }`}
                title={`Шаг ${s.id}: ${s.title}`}
              />
            ))}
          </div>
          <div className="flex gap-1 mt-1.5">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleStep(s.id)}
                className={`flex-1 text-center text-[10px] font-bold transition-colors ${
                  completedSteps.has(s.id)
                    ? "text-orange-500"
                    : openSteps.has(s.id)
                    ? "text-orange-400"
                    : "text-gray-400"
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <main className="container py-6 space-y-3">
        {steps.map((step) => {
          const isOpen = openSteps.has(step.id);
          const isDone = completedSteps.has(step.id);

          return (
            <div
              key={step.id}
              className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 overflow-hidden ${
                isOpen ? "border-orange-200 shadow-md" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-colors ${
                    isDone
                      ? "bg-orange-500 text-white"
                      : isOpen
                      ? "bg-orange-100 text-orange-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {step.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm leading-tight">{step.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">{step.subtitle}</p>
                </div>
                <div className="shrink-0 text-gray-400">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-100">
                  {step.content}
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* Footer CTA */}
      <footer className="mt-4">
        <div className="container pb-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#1a2744] to-[#0f1e3d] text-white p-6 text-center">
            <h2 className="font-black text-xl mb-1">Остались вопросы?</h2>
            <p className="text-white/60 text-sm mb-5">Свяжитесь с нами любым удобным способом</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+79279371918"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                <Phone size={16} />
                8 927 937 19 18
              </a>
              <a
                href="https://t.me/Bashirov1111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                <Send size={16} />
                @Bashirov1111
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 pb-6">
          © 2026 DC Next · Dushanbe City Bank · Инструкция по виртуальной карте
        </div>
      </footer>
    </div>
  );
}
