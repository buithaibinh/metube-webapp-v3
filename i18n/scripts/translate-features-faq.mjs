/**
 * Translate features, how_to_use, faq for id, pt, ro, ru, it
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, '../locales')

const blocks = {
  id: {
    features: {
      title: 'Mengapa memilih metube.one?',
      subtitle: 'Fitur Utama',
      description: 'metube.one menyediakan fitur lengkap untuk mengunduh video dari berbagai platform.',
      mp4: {
        title: 'Unduhan MP4 Berkualitas Tinggi',
        description: 'Unduh video MP4 hingga kualitas 1080p untuk pengalaman menonton terbaik.',
      },
      tiktok: {
        title: 'Dukungan TikTok',
        description: 'Unduh video TikTok tanpa logo atau watermark, dengan kualitas tinggi.',
      },
      free: {
        title: 'Sepenuhnya Gratis',
        description: 'Gunakan semua fitur tanpa biaya. Tanpa batas unduhan.',
      },
      platforms: {
        title: 'Banyak Platform',
        description: 'Mendukung YouTube, TikTok, Facebook, Instagram, Twitter, dan lainnya.',
      },
      fast: {
        title: 'Unduhan Cepat',
        description: 'Proses unduhan cepat tanpa menunggu lama.',
      },
      'no-reg': {
        title: 'Tanpa Registrasi',
        description: 'Langsung pakai tanpa akun atau instalasi software.',
      },
      learn_more: 'Pelajari lebih lanjut',
    },
    how_to_use: {
      title: 'Cara menggunakan metube.one',
      subtitle: 'Cara Pakai',
      description: 'Hanya 3 langkah sederhana untuk mengunduh video dari platform apa pun.',
      step1: {
        title: 'Tempel URL',
        description: 'Salin dan tempel URL video ke kotak input.',
      },
      step2: {
        title: 'Pilih Format',
        description: 'Pilih format dan kualitas video sesuai kebutuhan Anda.',
      },
      step3: {
        title: 'Unduh',
        description: 'Klik tombol unduh dan tunggu hingga proses selesai.',
      },
    },
    faq: {
      title: 'Ada pertanyaan?',
      subtitle: 'Pertanyaan yang Sering Diajukan',
      description: 'Temukan jawaban seputar metube.one.',
      questions: {
        0: {
          question: 'Apakah metube.one gratis?',
          answer: 'Ya, metube.one sepenuhnya gratis tanpa batas unduhan.',
        },
        1: {
          question: 'Platform apa saja yang didukung?',
          answer_intro: 'metube.one mendukung platform populer:',
        },
        2: {
          question: 'Apakah ada batasan kualitas?',
          answer: 'Tidak, Anda dapat mengunduh hingga 1080p tergantung video sumber.',
        },
        3: {
          question: 'Apakah perlu mendaftar akun?',
          answer: 'Tidak, Anda dapat langsung menggunakan metube.one tanpa registrasi.',
        },
        4: {
          question: 'Bisakah mengunduh video berhak cipta?',
          answer: 'Tidak. Kami hanya mendukung video publik yang Anda berhak unduh. Lihat',
        },
      },
    },
  },
  pt: {
    features: {
      title: 'Por que escolher metube.one?',
      subtitle: 'Recursos principais',
      description: 'O metube.one oferece recursos poderosos para baixar vídeos de várias plataformas.',
      mp4: {
        title: 'Downloads MP4 em alta qualidade',
        description: 'Baixe vídeos MP4 em até 1080p para a melhor experiência.',
      },
      tiktok: {
        title: 'Suporte ao TikTok',
        description: 'Baixe vídeos do TikTok sem marca d\'água, em alta qualidade.',
      },
      free: {
        title: 'Totalmente grátis',
        description: 'Use todos os recursos sem pagar. Sem limite de downloads.',
      },
      platforms: {
        title: 'Várias plataformas',
        description: 'Suporte a YouTube, TikTok, Facebook, Instagram, Twitter e mais.',
      },
      fast: {
        title: 'Downloads rápidos',
        description: 'Velocidade alta, sem longas esperas.',
      },
      'no-reg': {
        title: 'Sem cadastro',
        description: 'Use na hora, sem conta ou instalação de software.',
      },
      learn_more: 'Saiba mais',
    },
    how_to_use: {
      title: 'Como usar o metube.one',
      subtitle: 'Como usar',
      description: 'Apenas 3 passos simples para baixar vídeos de qualquer plataforma.',
      step1: {
        title: 'Cole a URL',
        description: 'Copie e cole o link do vídeo na caixa de entrada.',
      },
      step2: {
        title: 'Escolha o formato',
        description: 'Selecione formato e qualidade de acordo com sua necessidade.',
      },
      step3: {
        title: 'Baixar',
        description: 'Clique em baixar e aguarde a conclusão do processo.',
      },
    },
    faq: {
      title: 'Dúvidas?',
      subtitle: 'Perguntas frequentes',
      description: 'Respostas às perguntas mais comuns sobre o metube.one.',
      questions: {
        0: {
          question: 'O metube.one é gratuito?',
          answer: 'Sim, é totalmente gratuito e sem limite de downloads.',
        },
        1: {
          question: 'De quais plataformas posso baixar?',
          answer_intro: 'O metube.one suporta plataformas populares:',
        },
        2: {
          question: 'Há limite de qualidade?',
          answer: 'Não, você pode baixar em até 1080p conforme o vídeo original.',
        },
        3: {
          question: 'Preciso criar uma conta?',
          answer: 'Não, use o metube.one imediatamente sem cadastro.',
        },
        4: {
          question: 'Posso baixar vídeos com direitos autorais?',
          answer: 'Não. Só apoiamos vídeos públicos que você tem direito de baixar. Veja os',
        },
      },
    },
  },
  ro: {
    features: {
      title: 'De ce metube.one?',
      subtitle: 'Funcții cheie',
      description: 'metube.one oferă funcții puternice pentru descărcarea videoclipurilor de pe multiple platforme.',
      mp4: {
        title: 'Descărcări MP4 de calitate',
        description: 'Descărcați videoclipuri MP4 până la 1080p pentru cea mai bună experiență.',
      },
      tiktok: {
        title: 'Suport TikTok',
        description: 'Descărcați videoclipuri TikTok fără filigran, la calitate înaltă.',
      },
      free: {
        title: 'Complet gratuit',
        description: 'Folosiți toate funcțiile fără plată. Fără limite de descărcare.',
      },
      platforms: {
        title: 'Mai multe platforme',
        description: 'YouTube, TikTok, Facebook, Instagram, Twitter și altele.',
      },
      fast: {
        title: 'Descărcări rapide',
        description: 'Viteză mare, fără așteptări lungi.',
      },
      'no-reg': {
        title: 'Fără înregistrare',
        description: 'Utilizați instant, fără cont sau software de instalat.',
      },
      learn_more: 'Află mai mult',
    },
    how_to_use: {
      title: 'Cum se folosește metube.one',
      subtitle: 'Mod de utilizare',
      description: 'Doar 3 pași simpli pentru a descărca videoclipuri de pe orice platformă.',
      step1: {
        title: 'Lipiți URL-ul',
        description: 'Copiați și lipiți linkul videoclipului în câmpul de introducere.',
      },
      step2: {
        title: 'Alegeți formatul',
        description: 'Selectați formatul și calitatea potrivite nevoilor dvs.',
      },
      step3: {
        title: 'Descărcați',
        description: 'Apăsați descărcare și așteptați finalizarea procesului.',
      },
    },
    faq: {
      title: 'Întrebări?',
      subtitle: 'Întrebări frecvente',
      description: 'Răspunsuri la întrebările frecvente despre metube.one.',
      questions: {
        0: {
          question: 'metube.one este gratuit?',
          answer: 'Da, este complet gratuit, fără limite de descărcare.',
        },
        1: {
          question: 'De pe ce platforme pot descărca?',
          answer_intro: 'metube.one acceptă platforme populare:',
        },
        2: {
          question: 'Există limitări de calitate?',
          answer: 'Nu, puteți descărca până la 1080p în funcție de sursă.',
        },
        3: {
          question: 'Trebuie să mă înregistrez?',
          answer: 'Nu, puteți folosi metube.one imediat fără cont.',
        },
        4: {
          question: 'Pot descărca videoclipuri protejate?',
          answer: 'Nu. Acceptăm doar videoclipuri publice pe care aveți dreptul să le descărcați. Consultați',
        },
      },
    },
  },
  ru: {
    features: {
      title: 'Почему metube.one?',
      subtitle: 'Ключевые возможности',
      description: 'metube.one — мощный инструмент для скачивания видео с разных платформ.',
      mp4: {
        title: 'MP4 в высоком качестве',
        description: 'Скачивайте MP4 до 1080p для лучшего просмотра.',
      },
      tiktok: {
        title: 'Поддержка TikTok',
        description: 'Скачивайте TikTok без водяного знака в высоком качестве.',
      },
      free: {
        title: 'Полностью бесплатно',
        description: 'Все функции бесплатны. Без лимитов загрузок.',
      },
      platforms: {
        title: 'Много платформ',
        description: 'YouTube, TikTok, Facebook, Instagram, Twitter и другие.',
      },
      fast: {
        title: 'Быстрая загрузка',
        description: 'Высокая скорость без долгого ожидания.',
      },
      'no-reg': {
        title: 'Без регистрации',
        description: 'Используйте сразу — без аккаунта и установки ПО.',
      },
      learn_more: 'Подробнее',
    },
    how_to_use: {
      title: 'Как пользоваться metube.one',
      subtitle: 'Инструкция',
      description: 'Всего 3 простых шага для скачивания видео с любой платформы.',
      step1: {
        title: 'Вставьте URL',
        description: 'Скопируйте и вставьте ссылку на видео в поле ввода.',
      },
      step2: {
        title: 'Выберите формат',
        description: 'Выберите формат и качество по вашим потребностям.',
      },
      step3: {
        title: 'Скачать',
        description: 'Нажмите кнопку загрузки и дождитесь завершения.',
      },
    },
    faq: {
      title: 'Есть вопросы?',
      subtitle: 'Частые вопросы',
      description: 'Ответы на популярные вопросы о metube.one.',
      questions: {
        0: {
          question: 'metube.one бесплатен?',
          answer: 'Да, полностью бесплатен без ограничений на загрузки.',
        },
        1: {
          question: 'С каких платформ можно скачивать?',
          answer_intro: 'metube.one поддерживает популярные платформы:',
        },
        2: {
          question: 'Есть ли ограничения по качеству?',
          answer: 'Нет, можно скачать до 1080p в зависимости от исходного видео.',
        },
        3: {
          question: 'Нужна ли регистрация?',
          answer: 'Нет, можно пользоваться сразу без аккаунта.',
        },
        4: {
          question: 'Можно ли скачивать защищённый контент?',
          answer: 'Нет. Мы поддерживаем только публичные видео, которые вам разрешено скачивать. См.',
        },
      },
    },
  },
  it: {
    features: {
      title: 'Perché metube.one?',
      subtitle: 'Funzionalità principali',
      description: 'metube.one offre strumenti potenti per scaricare video da più piattaforme.',
      mp4: {
        title: 'Download MP4 di alta qualità',
        description: 'Scarica video MP4 fino a 1080p per la migliore esperienza.',
      },
      tiktok: {
        title: 'Supporto TikTok',
        description: 'Scarica video TikTok senza filigrana, in alta qualità.',
      },
      free: {
        title: 'Completamente gratuito',
        description: 'Tutte le funzioni senza pagare. Nessun limite di download.',
      },
      platforms: {
        title: 'Più piattaforme',
        description: 'YouTube, TikTok, Facebook, Instagram, Twitter e altro.',
      },
      fast: {
        title: 'Download veloci',
        description: 'Alta velocità, senza lunghe attese.',
      },
      'no-reg': {
        title: 'Senza registrazione',
        description: 'Usa subito senza account o software da installare.',
      },
      learn_more: 'Scopri di più',
    },
    how_to_use: {
      title: 'Come usare metube.one',
      subtitle: 'Come funziona',
      description: 'Solo 3 semplici passaggi per scaricare video da qualsiasi piattaforma.',
      step1: {
        title: 'Incolla URL',
        description: 'Copia e incolla il link del video nel campo di input.',
      },
      step2: {
        title: 'Scegli formato',
        description: 'Seleziona formato e qualità in base alle tue esigenze.',
      },
      step3: {
        title: 'Scarica',
        description: 'Clicca scarica e attendi il completamento.',
      },
    },
    faq: {
      title: 'Domande?',
      subtitle: 'FAQ',
      description: 'Risposte alle domande più comuni su metube.one.',
      questions: {
        0: {
          question: 'metube.one è gratuito?',
          answer: 'Sì, completamente gratuito senza limiti di download.',
        },
        1: {
          question: 'Da quali piattaforme posso scaricare?',
          answer_intro: 'metube.one supporta le piattaforme più popolari:',
        },
        2: {
          question: 'Ci sono limiti di qualità?',
          answer: 'No, puoi scaricare fino a 1080p in base al video originale.',
        },
        3: {
          question: 'Devo registrarmi?',
          answer: 'No, puoi usare metube.one subito senza account.',
        },
        4: {
          question: 'Posso scaricare video protetti da copyright?',
          answer: 'No. Supportiamo solo video pubblici che hai diritto di scaricare. Vedi i',
        },
      },
    },
  },
}

// Also patch en + vi for answer_intro
const enPatch = {
  faq: {
    questions: {
      1: { answer_intro: 'metube.one supports popular platforms:' },
      4: { answer: 'No. We only support public videos you have the right to download. See our' },
    },
  },
  legal: { terms_short: 'Terms', policy_short: 'Policy' },
}

const viPatch = {
  faq: {
    questions: {
      1: { answer_intro: 'metube.one hỗ trợ các nền tảng phổ biến:' },
      4: { answer: 'Không. Chúng tôi chỉ hỗ trợ video công khai mà bạn có quyền tải. Xem' },
    },
  },
  legal: { terms_short: 'Điều khoản', policy_short: 'Chính sách' },
}

const legalShort = {
  id: { terms_short: 'Ketentuan', policy_short: 'Privasi' },
  pt: { terms_short: 'Termos', policy_short: 'Privacidade' },
  ro: { terms_short: 'Termeni', policy_short: 'Confidențialitate' },
  ru: { terms_short: 'Условия', policy_short: 'Конфиденциальность' },
  it: { terms_short: 'Termini', policy_short: 'Privacy' },
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key]
      && typeof source[key] === 'object'
      && !Array.isArray(source[key])
      && target[key]
    ) {
      deepMerge(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
}

for (const [code, block] of Object.entries(blocks)) {
  const file = path.join(localesDir, `${code}.json`)
  const locale = JSON.parse(fs.readFileSync(file, 'utf8'))
  deepMerge(locale, block)
  fs.writeFileSync(file, JSON.stringify(locale, null, 2) + '\n')
  console.log('Updated', code)
}

for (const [file, patch] of [
  ['en.json', enPatch],
  ['vi.json', viPatch],
]) {
  const p = path.join(localesDir, file)
  const locale = JSON.parse(fs.readFileSync(p, 'utf8'))
  deepMerge(locale, patch)
  fs.writeFileSync(p, JSON.stringify(locale, null, 2) + '\n')
  console.log('Patched', file)
}

for (const [code, legal] of Object.entries(legalShort)) {
  const file = path.join(localesDir, `${code}.json`)
  const locale = JSON.parse(fs.readFileSync(file, 'utf8'))
  locale.legal = { ...locale.legal, ...legal }
  fs.writeFileSync(file, JSON.stringify(locale, null, 2) + '\n')
}
