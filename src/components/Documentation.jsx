import { useState } from "react";
import "../style/Documentation.scss";

const Documentation = () => {
  const [language, setLanguage] = useState("geo");

  return (
    <div id="documentation">
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value={"geo"}>GEO</option>
        <option value={"eng"}>ENG</option>
        <option value={"rus"}>RUS</option>
      </select>

      {language === "geo" && (
        <div className="content">
          <div className="title">
            <h1>დოკუმენტაცია</h1>
          </div>
          <p>
            ეს აპლიკაცია გამოიყენება ეკლესიაში ბიბლიის მუხლების გასაშვებად
            პროექტორზე. მისი გამოყენება ძალიან მარტივია.
          </p>
          <img src="/examples/example1.jpeg" alt="Example"></img>
          <p>
            1. პირველი ირჩევ ენას, რომელ ენაზეც გვინდა რომ დაინახო "preview".{" "}
            <span className="redText">ეს არ ცვლის პროექტორზე გასულ ენას!</span>
          </p>
          <p>
            2. იმის მიხედვით თუ რომელი ენა ავირჩიეთ გამოჩნდება ვერსიები. აირჩევ
            სასურველ ვერსიას.
          </p>
          <img src="/examples/example2.jpeg" alt="Example"></img>
          <p>
            3. შემდეგი ნაბიჯია წიგნის, თავის და მუხლის არჩევა. თუ რამდენიმე
            მუხლის ჩვენება გინდა ერთდროულად "მუხლი (მდე)"-ში ირჩევ თუ სადამდე
            გინდა მუხლები აჩვენოს. შედეგი ავტომატურად გამოჩნდება.
          </p>
          <p>
            ასევე მუხლებს შორის, წინ და უკან ჩქარი გადართვისთვის შეგიძლიათ
            გამოიყენოთ თეთრი ისრები.
          </p>
          <p className="subtitle">ძიება</p>
          <p>
            თუმცა, ზემოთ ნახსენები მეთოდი არის ნელი, რადგან ჯერ წიგნს ირჩევ,
            მერე თავს და ამის გასაუბჯობესებლად არის Search სადაც შეგიძლია ჩაწერო
            პირდაპირ რასაც ეძებ. მაგალითად: მარკ 6:3 ეს იქნება მარკოზის 6:3. ან
            მარკ 6:3-5 იქნება მარკოზის 6:3-5 მუხლები.
          </p>
          <p>
            ასევე Search-ში შეგიძლია ჩაწერო რომელიმე მუხლის მონაკვეთი და იმის
            მიხედვით, თუ რომელი წიგნიც გექნება მონიშნული, გამოჩნდება ყველა მუხლი
            რომლებიც შენს მიერ ჩაწერილ საძიებო სიტყვებს შეიცავს.
          </p>
          <p>
            თუ დავუშვათ ერთ კონკრეტულ წიგნში კი არა, არამედ მთელს ბიბლიაში გსურს
            ძიება, Search-ის მარჯვნივ არის მოსანიშნი Checkbox, მისი მონიშვნის
            მერე ძიება განხორციელდება მთელს ბიბლიაში. თუ მას გამორთავთ, ისევ
            მონიშნულ წიგნში.
          </p>
          <br />
          <hr />
          <br />
          <p className="subtitle">როგორ ვაჩვენო პროექტორზე?</p>
          <p>
            დაბლა, პანელში დაინახავ ღილაკს "Open Present View" დააჭირე და
            გადაგიყვანს ახალ ტაბზე. ეს გვერდი უნდა აჩვენო პროექტორზე. იმისათვის
            რომ ბრაუზერის ზედა მხარე არ გამოჩნდეს თუ ვინდოუსზე ხარ დააჭირე
            F11-ს. <span className="redText">Present View უნდა გახსნათ მხოლოდ ერთხელ!</span>
          </p>
          <br />
          <p>
            იმისთვის რომ სასურველი ტექსტი სასურველ ენაზე გამოჩნეს დაბრუნდი ისევ
            მთავარ გვერდზე, უნდა აირჩიო ენა და შესაბამისი ვერსიები და show
            ღილაკს დააწექი. ასევე შეგიძლია აკონტროლო ფონტის ზომა, ფერი და ფონტი.
          </p>
          <img src="/examples/example3.jpeg" alt="Example"></img>
          <p>ამ განყოფილებაში კი ირჩევთ სასურველ ბექგრაუნდს</p>
          <img src="/examples/example4.jpeg" alt="Example"></img>
          <p>
            ნელ-ნელა რაღაც ინოვაციები დაემატება, მაქამდე კი დამატებით
            შენიშვნებისთვის / იდეებისთვის მომწერეთ{" "}
            <span className="redText">მესენჯერზე</span> /{" "}
            <span className="redText">ტელეგრამზე</span>
          </p>
          <p>ვიდეო ინსტრუქციისთვის შეგიძლიათ გადახვიდეთ YouTube ბმულზე</p>
          <div className="contact">
            <a
              href="https://www.facebook.com/daniel.abulashvili.5"
              target="_blank"
            >
              <p>Messenger</p>
            </a>
            <a href="https://t.me/Daniel170407" target="_blank">
              <p>Telegram</p>
            </a>
            <a href="https://youtu.be/3O34v4cyKt4" target="_blank">
              <p>YouTube</p>
            </a>
          </div>
        </div>
      )}

      {language === "eng" && (
        <div className="content">
          <div className="title">
            <h1>Documentation</h1>
          </div>
          <p>
            This application is used in church to display Bible verses on a
            projector. It is very easy to use.
          </p>
          <img src="/examples/example1.jpeg" alt="Example"></img>
          <p>
            1. First, select the language in which you want to see the
            "preview".{" "}
            <span className="redText">
              This does not change the language on the projector!
            </span>
          </p>
          <p>
            2. Depending on the selected language, versions will appear. Choose
            the desired version.
          </p>
          <img src="/examples/example2.jpeg" alt="Example"></img>
          <p>
            3. The next step is to select the book, chapter, and verse. If you
            want to display several verses at once, choose the range in "verse
            (to)". The result will appear automatically.
          </p>
          <p>
            You can also use the white arrows for quick switching between
            verses, back and forth.
          </p>
          <p className="subtitle">Search</p>
          <p>
            However, the method mentioned above is slow since you have to select
            the book and then the chapter. To improve this, there is a Search
            option where you can directly type what you are looking for. For
            example: Mark 6:3 will be Mark 6:3. Or Mark 6:3-5 will be Mark 6:3-5
            verses.
          </p>
          <p>
            You can also type part of a verse in the Search, and depending on
            the selected book, all verses containing your search words will
            appear.
          </p>
          <p>
            If you want to search the entire Bible, not just a specific book,
            there is a checkbox to the right of the Search. After checking it,
            the search will be conducted across the entire Bible. If you turn it
            off, the search will revert to the selected book.
          </p>
          <br />
          <hr />
          <br />
          <p className="subtitle">How to show on the projector?</p>
          <p>
            In the bottom panel, you will see a button "Open Present View".
            Click it, and it will take you to a new tab. This page should be
            shown on the projector. To hide the browser's top bar, if you are on
            Windows, press F11. <span className="redText">Present View must be opened only once!</span>
          </p>
          <br />
          <p>
            To show the desired text in the desired language, go back to the
            main page, select the language and corresponding versions, and press
            the show button. You can also control the font size, color, and
            font.
          </p>
          <img src="/examples/example3.jpeg" alt="Example"></img>
          <p>In this section, you select the desired background.</p>
          <img src="/examples/example4.jpeg" alt="Example"></img>
          <p>
            Slowly, some innovations will be added. Until then, for additional
            notes/ideas, write to me on Messenger/Telegram.
          </p>
          <p>You can go to YouTube link for video instruction.</p>
          <div className="contact">
            <a
              href="https://www.facebook.com/daniel.abulashvili.5"
              target="_blank"
            >
              <p>Messenger</p>
            </a>
            <a href="https://t.me/Daniel170407" target="_blank">
              <p>Telegram</p>
            </a>
            <a href="https://youtu.be/3O34v4cyKt4" target="_blank">
              <p>YouTube</p>
            </a>
          </div>
        </div>
      )}

      {language === "rus" && (
        <div className="content">
          <div className="title">
            <h1>Документация</h1>
          </div>
          <p>
            Это приложение создано для использования в церкви, чтобы отображать
            стихи из Библии на проекторе. Оно интуитивно и легко в
            использовании.
          </p>
          <img src="/examples/example1.jpeg" alt="Example"></img>
          <p>
            1. Начните с выбора языка, на котором вы хотите видеть
            "предварительный просмотр".{" "}
            <span className="redText">
              Обратите внимание: это не изменяет язык на проекторе!
            </span>
          </p>
          <p>
            2. В зависимости от выбранного языка станут доступны различные
            версии. Выберите ту, которая вам необходима.
          </p>
          <img src="/examples/example2.jpeg" alt="Example"></img>
          <p>
            3. Далее выберите книгу, главу и стих. Если вам нужно отобразить
            несколько стихов одновременно, укажите диапазон в поле "стих (до)".
            Результат отобразится автоматически.
          </p>
          <p>
            Для быстрого переключения между стихами используйте белые стрелки.
          </p>
          <p className="subtitle">Поиск</p>
          <p>
            Стандартный метод поиска может быть медленным, так как требует
            последовательного выбора книги и главы. Для ускорения процесса
            используйте функцию поиска, где вы можете напрямую ввести нужное.
            Например, "От Марк 6:3" или "От Марк 6:3-5" для диапазона стихов.
          </p>
          <p>
            Также можно ввести часть стиха, и система отобразит все
            соответствующие результаты в выбранной книге.
          </p>
          <p>
            Если вы хотите искать по всей Библии, а не только в одной книге,
            отметьте флажок справа от поля поиска. При его отключении поиск
            вернется к выбранной книге.
          </p>
          <br />
          <hr />
          <br />
          <p className="subtitle">Как показывать на проекторе?</p>
          <p>
            На нижней панели нажмите кнопку "Open Present View", чтобы открыть
            новую вкладку. Эта страница будет отображаться на проекторе. Чтобы
            скрыть верхнюю панель браузера в Windows, нажмите F11. <span className="redText">Present View необходимо открывать только один раз!</span>
          </p>
          <br />
          <p>
            Для отображения нужного текста на нужном языке, вернитесь на главную
            страницу, выберите язык и соответствующие версии, затем нажмите
            кнопку показа. Вы также можете настроить размер шрифта, цвет и тип
            шрифта.
          </p>
          <img src="/examples/example3.jpeg" alt="Example"></img>
          <p>В этом разделе можно выбрать нужный фон.</p>
          <img src="/examples/example4.jpeg" alt="Example"></img>
          <p>
            С течением времени будут добавляться новые функции. Для
            дополнительных вопросов или предложений, пожалуйста, свяжитесь со
            мной через Messenger или Telegram.
          </p>
          <p>Для просмотра видеоинструкции перейдите по ссылке на YouTube.</p>
          <div className="contact">
            <a
              href="https://www.facebook.com/daniel.abulashvili.5"
              target="_blank"
            >
              <p>Messenger</p>
            </a>
            <a href="https://t.me/Daniel170407" target="_blank">
              <p>Telegram</p>
            </a>
            <a href="https://youtu.be/3O34v4cyKt4" target="_blank">
              <p>YouTube</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documentation;
