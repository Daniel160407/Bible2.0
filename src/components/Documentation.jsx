import { useState, useEffect } from 'react';
import '../style/Documentation.scss';

const Documentation = () => {
    const [language, setLanguage] = useState('geo');

    return (
        <div id='documentation'>
            <select onChange={(e) => setLanguage(e.target.value)}>
                <option value={'geo'}>GEO</option>
                <option value={'eng'}>ENG</option>
                <option value={'rus'}>RUS</option>
            </select>
            {language === 'geo' && (
                <div className='content'>
                    <div className='title'>
                        <h1>დოკუმენტაცია</h1>
                    </div>
                    <p>ეს აპლიკაცია გამოიყენება ეკლესიაში ბიბლიის მუხლების გასაშვებად პროექტორზე. მისი გამოყენება ძალიან მარტივია.</p>
                    <img src='/examples/example1.jpeg' alt='Example'></img>
                    <p>1. პირველი ირჩევ ენას, რომელ ენაზეც გვინდა რომ დაინახო "preview". <span className='redText'>ეს არ ცვლის პროექტორზე გასულ ენას!</span></p>
                    <p>2. იმის მიხედვით თუ რომელი ენა ავირჩიეთ გამოჩნდება ვერსიები. აირჩევ სასურველ ვერსიას.</p>
                    <img src='/examples/example2.jpeg' alt='Example'></img>
                    <p>3. შემდეგი ნაბიჯია წიგნის, თავის და მუხლის არჩევა. თუ რამდენიმე მუხლის ჩვენება გინდა ერთდროულად "მუხლი (მდე)"-ში ირჩევ თუ სადამდე გინდა მუხლები აჩვენოს. შედეგი ავტომატურად გამოჩნდება.</p>
                    <br/>
                    <hr/>
                    <br/>
                    <p className='subtitle'>როგორ ვაჩვენო პროექტორზე?</p>
                    <p>დაბლა, პანელში დაინახავ ღილაკს "Open Present View" დააჭირე და გადაგიყვანს ახალ ტაბზე. ეს გვერდი უნდა აჩვენო პროექტორზე. იმისათვის რომ ბრაუზერის ზედა მხარე არ გამოჩნდეს თუ ვინდოუსზე ხარ დააჭირე F11-ს ან დაბლითა მარჯვენა კუთხეში აქვს გადიდების იკონი.</p>
                    <br/>
                    <p>იმისთვის რომ სასურველი ტექსტი სასურველ ენაზე გამოჩნეს დაბრუნდი ისევ მთავარ გვერდზე, უნდა აირჩიო ენა და შესაბამისი ვერსიები და show ღილაკს დააწექი. ასევე შეგიძლია აკონტროლო ფონტის ზომა, ფერი და ფონტი.</p>
                    <img src='/examples/example3.jpeg' alt='Example'></img>
                    <p>ამ განყოფილებაში კი ირჩევთ სასურველ ბექგრაუნდს</p>
                    <img src='/examples/example4.jpeg' alt='Example'></img>
                    <p>დამატებით შენიშვნებისთვის / იდეებისთვის მომწერეთ მესენჯერზე / ტელეგრამზე</p>
                    <p>ვიდეო ინსტრუქციისთვის შეგიძლიათ გადახვიდეთ YouTube ბმულზე</p>
                    <div className='contact'>
                        <a href='https://www.facebook.com/daniel.abulashvili.5' target='_blank'><p>Messenger</p></a>
                        <a href='https://t.me/Daniel170407' target='_blank'><p>Telegram</p></a>
                        <a href='https://youtu.be/D4BGCJaUspk' target='_blank'><p>YouTube</p></a>
                    </div>
                </div>
            )}
            {language === 'eng' && (
                <div className='content'>
                    <div className='title'>
                        <h1>Documentation</h1>
                    </div>
                    <p>This application is used in church to display Bible verses on a projector. It is very easy to use.</p>
                    <img src='/examples/example1.jpeg' alt='Example'></img>
                    <p>1. First, select the language in which you want to see the "preview". <span className='redText'>This does not change the language on the projector!</span></p>
                    <p>2. Depending on the selected language, versions will appear. Choose the desired version.</p>
                    <img src='/examples/example2.jpeg' alt='Example'></img>
                    <p>3. The next step is to select the book, chapter, and verse. If you want to display several verses at once, choose the range in "verse (to)". The result will appear automatically.</p>
                    <br/>
                    <hr/>
                    <br/>
                    <p className='subtitle'>How to show on the projector?</p>
                    <p>In the bottom panel, you will see a button "Open Present View". Click it and it will take you to a new tab. This page should be shown on the projector. To hide the browser's top bar, if you are on Windows, press F11 or use the maximize icon in the bottom right corner.</p>
                    <br/>
                    <p>To show the desired text in the desired language, go back to the main page, select the language and corresponding versions, and press the show button. You can also control the font size, color and font.</p>
                    <img src='/examples/example3.jpeg' alt='Example'></img>
                    <p>In this section you choose the desired background</p>
                    <img src='/examples/example4.jpeg' alt='Example'></img>
                    <p>For additional notes / ideas, write to me on Messenger / Telegram</p>
                    <div className='contact'>
                        <a href='https://www.facebook.com/daniel.abulashvili.5' target='_blank'><p>Messenger</p></a>
                        <a href='https://t.me/Daniel170407' target='_blank'><p>Telegram</p></a>
                    </div>
                </div>
            )}
            {language === 'rus' && (
                <div className='content'>
                    <div className='title'>
                        <h1>Документация</h1>
                    </div>
                    <p>Это приложение используется в церкви для отображения стихов из Библии на проекторе. Им очень легко пользоваться.</p>
                    <img src='/examples/example1.jpeg' alt='Example'></img>
                    <p>1. Сначала выберите язык, на котором вы хотите видеть "предварительный просмотр". <span className='redText'>Это не изменяет язык на проекторе!</span></p>
                    <p>2. В зависимости от выбранного языка появятся версии. Выберите нужную версию.</p>
                    <img src='/examples/example2.jpeg' alt='Example'></img>
                    <p>3. Следующий шаг - выбрать книгу, главу и стих. Если вы хотите отобразить несколько стихов сразу, выберите диапазон в "стих (до)". Результат появится автоматически.</p>
                    <br/>
                    <hr/>
                    <br/>
                    <p className='subtitle'>Как показать на проекторе?</p>
                    <p>Внизу, в панеле вы увидите кнопку "Open Present View". Нажмите на нее, и она откроется в новой вкладке. Эта страница должна быть показана на проекторе. Чтобы скрыть верхнюю панель браузера, если вы на Windows, нажмите F11 или используйте значок увеличения в правом нижнем углу.</p>
                    <br/>
                    <p>Чтобы показать нужный текст на нужном языке, вернитесь на главную страницу, выберите язык и соответствующие версии, и нажмите кнопку show. Вы также можете контролировать размер шрифта, цвет и фонт.</p>
                    <img src='/examples/example3.jpeg' alt='Example'></img>
                    <p>В этом разделе вы выбираете желаемый фон</p>
                    <img src='/examples/example4.jpeg' alt='Example'></img>
                    <p>Для дополнительных замечаний/идей пишите мне в Messenger/Telegram.</p>
                    <div className='contact'>
                        <a href='https://www.facebook.com/daniel.abulashvili.5' target='_blank'><p>Messenger</p></a>
                        <a href='https://t.me/Daniel170407' target='_blank'><p>Telegram</p></a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Documentation;
