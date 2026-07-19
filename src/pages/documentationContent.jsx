/* eslint-disable react-refresh/only-export-components */
const Red = ({ children }) => <span className="font-bold text-[#ff4444]">{children}</span>;

/**
 * Documentation texts per language. Each entry: page title, YouTube video url,
 * and an ordered list of content blocks rendered by DocumentationPage.
 */
export const DOCUMENTATION = {
  geo: {
    title: 'დოკუმენტაცია',
    youtube: 'https://youtu.be/3O34v4cyKt4',
    blocks: [
      {
        type: 'p',
        content:
          'ეს აპლიკაცია გამოიყენება ეკლესიაში ბიბლიის მუხლების გასაშვებად პროექტორზე. მისი გამოყენება ძალიან მარტივია.',
      },
      { type: 'img', src: '/examples/example1.jpeg' },
      {
        type: 'p',
        content: (
          <>
            1. პირველი ირჩევ ენას, რომელ ენაზეც გვინდა რომ დაინახო &quot;preview&quot;.{' '}
            <Red>ეს არ ცვლის პროექტორზე გასულ ენას!</Red>
          </>
        ),
      },
      {
        type: 'p',
        content:
          '2. იმის მიხედვით თუ რომელი ენა ავირჩიეთ გამოჩნდება ვერსიები. აირჩევ სასურველ ვერსიას.',
      },
      { type: 'img', src: '/examples/example2.jpeg' },
      {
        type: 'p',
        content:
          '3. შემდეგი ნაბიჯია წიგნის, თავის და მუხლის არჩევა. თუ რამდენიმე მუხლის ჩვენება გინდა ერთდროულად "მუხლი (მდე)"-ში ირჩევ თუ სადამდე გინდა მუხლები აჩვენოს. შედეგი ავტომატურად გამოჩნდება.',
      },
      {
        type: 'p',
        content:
          'ასევე მუხლებს შორის, წინ და უკან ჩქარი გადართვისთვის შეგიძლიათ გამოიყენოთ თეთრი ისრები.',
      },
      { type: 'subtitle', content: 'ძიება' },
      {
        type: 'p',
        content:
          'თუმცა, ზემოთ ნახსენები მეთოდი არის ნელი, რადგან ჯერ წიგნს ირჩევ, მერე თავს და ამის გასაუბჯობესებლად არის Search სადაც შეგიძლია ჩაწერო პირდაპირ რასაც ეძებ. მაგალითად: მარკ 6:3 ეს იქნება მარკოზის 6:3. ან მარკ 6:3-5 იქნება მარკოზის 6:3-5 მუხლები.',
      },
      {
        type: 'p',
        content:
          'ასევე Search-ში შეგიძლია ჩაწერო რომელიმე მუხლის მონაკვეთი და იმის მიხედვით, თუ რომელი წიგნიც გექნება მონიშნული, გამოჩნდება ყველა მუხლი რომლებიც შენს მიერ ჩაწერილ საძიებო სიტყვებს შეიცავს.',
      },
      {
        type: 'p',
        content:
          'თუ დავუშვათ ერთ კონკრეტულ წიგნში კი არა, არამედ მთელს ბიბლიაში გსურს ძიება, Search-ის მარჯვნივ არის მოსანიშნი Checkbox, მისი მონიშვნის მერე ძიება განხორციელდება მთელს ბიბლიაში. თუ მას გამორთავთ, ისევ მონიშნულ წიგნში.',
      },
      { type: 'divider' },
      { type: 'subtitle', content: 'როგორ ვაჩვენო პროექტორზე?' },
      {
        type: 'p',
        content: (
          <>
            დაბლა, პანელში დაინახავ ღილაკს &quot;Open Present View&quot; დააჭირე და გადაგიყვანს ახალ
            ტაბზე. ეს გვერდი უნდა აჩვენო პროექტორზე. იმისათვის რომ ბრაუზერის ზედა მხარე არ გამოჩნდეს
            თუ ვინდოუსზე ხარ დააჭირე F11-ს.{' '}
            <Red>Present View უნდა გახსნათ მხოლოდ ერთხელ!</Red>
          </>
        ),
      },
      {
        type: 'p',
        content:
          'იმისთვის რომ სასურველი ტექსტი სასურველ ენაზე გამოჩნეს დაბრუნდი ისევ მთავარ გვერდზე, უნდა აირჩიო ენა და შესაბამისი ვერსიები და show ღილაკს დააწექი. ასევე შეგიძლია აკონტროლო ფონტის ზომა, ფერი და ფონტი.',
      },
      { type: 'img', src: '/examples/example3.jpeg' },
      { type: 'p', content: 'ამ განყოფილებაში კი ირჩევთ სასურველ ბექგრაუნდს' },
      { type: 'img', src: '/examples/example4.jpeg' },
      {
        type: 'p',
        content: (
          <>
            ნელ-ნელა რაღაც ინოვაციები დაემატება, მაქამდე კი დამატებით შენიშვნებისთვის /
            იდეებისთვის მომწერეთ <Red>მესენჯერზე</Red> / <Red>ტელეგრამზე</Red>
          </>
        ),
      },
      { type: 'p', content: 'ვიდეო ინსტრუქციისთვის შეგიძლიათ გადახვიდეთ YouTube ბმულზე' },
    ],
  },

  eng: {
    title: 'Documentation',
    youtube: 'https://youtu.be/m0mi9xZS9Hs',
    blocks: [
      {
        type: 'p',
        content:
          'This application is used in church to display Bible verses on a projector. It is very easy to use.',
      },
      { type: 'img', src: '/examples/example1.jpeg' },
      {
        type: 'p',
        content: (
          <>
            1. First, select the language in which you want to see the &quot;preview&quot;.{' '}
            <Red>This does not change the language on the projector!</Red>
          </>
        ),
      },
      {
        type: 'p',
        content:
          '2. Depending on the selected language, versions will appear. Choose the desired version.',
      },
      { type: 'img', src: '/examples/example2.jpeg' },
      {
        type: 'p',
        content:
          '3. The next step is to select the book, chapter, and verse. If you want to display several verses at once, choose the range in "verse (to)". The result will appear automatically.',
      },
      {
        type: 'p',
        content:
          'You can also use the white arrows for quick switching between verses, back and forth.',
      },
      { type: 'subtitle', content: 'Search' },
      {
        type: 'p',
        content:
          'However, the method mentioned above is slow since you have to select the book and then the chapter. To improve this, there is a Search option where you can directly type what you are looking for. For example: Mark 6:3 will be Mark 6:3. Or Mark 6:3-5 will be Mark 6:3-5 verses.',
      },
      {
        type: 'p',
        content:
          'You can also type part of a verse in the Search, and depending on the selected book, all verses containing your search words will appear.',
      },
      {
        type: 'p',
        content:
          'If you want to search the entire Bible, not just a specific book, there is a checkbox to the right of the Search. After checking it, the search will be conducted across the entire Bible. If you turn it off, the search will revert to the selected book.',
      },
      { type: 'divider' },
      { type: 'subtitle', content: 'How to show on the projector?' },
      {
        type: 'p',
        content: (
          <>
            In the bottom panel, you will see a button &quot;Open Present View&quot;. Click it, and
            it will take you to a new tab. This page should be shown on the projector. To hide the
            browser&apos;s top bar, if you are on Windows, press F11.{' '}
            <Red>Present View must be opened only once!</Red>
          </>
        ),
      },
      {
        type: 'p',
        content:
          'To show the desired text in the desired language, go back to the main page, select the language and corresponding versions, and press the show button. You can also control the font size, color, and font.',
      },
      { type: 'img', src: '/examples/example3.jpeg' },
      { type: 'p', content: 'In this section, you select the desired background.' },
      { type: 'img', src: '/examples/example4.jpeg' },
      {
        type: 'p',
        content:
          'Slowly, some innovations will be added. Until then, for additional notes/ideas, write to me on Messenger/Telegram.',
      },
      { type: 'p', content: 'You can go to YouTube link for video instruction.' },
    ],
  },

  rus: {
    title: 'Документация',
    youtube: 'https://youtu.be/McG8s4D3aH8',
    blocks: [
      {
        type: 'p',
        content:
          'Это приложение создано для использования в церкви, чтобы отображать стихи из Библии на проекторе. Оно интуитивно и легко в использовании.',
      },
      { type: 'img', src: '/examples/example1.jpeg' },
      {
        type: 'p',
        content: (
          <>
            1. Начните с выбора языка, на котором вы хотите видеть &quot;предварительный
            просмотр&quot;. <Red>Обратите внимание: это не изменяет язык на проекторе!</Red>
          </>
        ),
      },
      {
        type: 'p',
        content:
          '2. В зависимости от выбранного языка станут доступны различные версии. Выберите ту, которая вам необходима.',
      },
      { type: 'img', src: '/examples/example2.jpeg' },
      {
        type: 'p',
        content:
          '3. Далее выберите книгу, главу и стих. Если вам нужно отобразить несколько стихов одновременно, укажите диапазон в поле "стих (до)". Результат отобразится автоматически.',
      },
      {
        type: 'p',
        content: 'Для быстрого переключения между стихами используйте белые стрелки.',
      },
      { type: 'subtitle', content: 'Поиск' },
      {
        type: 'p',
        content:
          'Стандартный метод поиска может быть медленным, так как требует последовательного выбора книги и главы. Для ускорения процесса используйте функцию поиска, где вы можете напрямую ввести нужное. Например, "От Марк 6:3" или "От Марк 6:3-5" для диапазона стихов.',
      },
      {
        type: 'p',
        content:
          'Также можно ввести часть стиха, и система отобразит все соответствующие результаты в выбранной книге.',
      },
      {
        type: 'p',
        content:
          'Если вы хотите искать по всей Библии, а не только в одной книге, отметьте флажок справа от поля поиска. При его отключении поиск вернется к выбранной книге.',
      },
      { type: 'divider' },
      { type: 'subtitle', content: 'Как показывать на проекторе?' },
      {
        type: 'p',
        content: (
          <>
            На нижней панели нажмите кнопку &quot;Open Present View&quot;, чтобы открыть новую
            вкладку. Эта страница будет отображаться на проекторе. Чтобы скрыть верхнюю панель
            браузера в Windows, нажмите F11.{' '}
            <Red>Present View необходимо открывать только один раз!</Red>
          </>
        ),
      },
      {
        type: 'p',
        content:
          'Для отображения нужного текста на нужном языке, вернитесь на главную страницу, выберите язык и соответствующие версии, затем нажмите кнопку показа. Вы также можете настроить размер шрифта, цвет и тип шрифта.',
      },
      { type: 'img', src: '/examples/example3.jpeg' },
      { type: 'p', content: 'В этом разделе можно выбрать нужный фон.' },
      { type: 'img', src: '/examples/example4.jpeg' },
      {
        type: 'p',
        content:
          'С течением времени будут добавляться новые функции. Для дополнительных вопросов или предложений, пожалуйста, свяжитесь со мной через Messenger или Telegram.',
      },
      { type: 'p', content: 'Для просмотра видеоинструкции перейдите по ссылке на YouTube.' },
    ],
  },
};
