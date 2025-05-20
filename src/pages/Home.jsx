import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="container px-4 py-4">
    <section>
      <h2 className="h2 text-primary">Ласкаво просимо!</h2>
      <p>Вітаємо на сайті про китів! Дізнайтеся більше про їхню морфологію, харчування та популяцію, відвідавши відповідні розділи.</p>
      
      <h3 className="h3 text-primary mt-4">Розділи сайту:</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/morphology" className="text-primary text-decoration-none">Зовнішній вигляд</Link> - Опис зовнішності та особливостей будови китів
        </li>
        <li className="list-group-item">
          <Link to="/nutrition" className="text-prrimary text-decoration-none">Харчування</Link> - Що їдять кити та їх раціон
        </li>
        <li className="list-group-item">
          <Link to="/population" className="text-primary text-decoration-none">Ареал</Link> - Де живуть кити світі
        </li>
        <li className="list-group-item">
          <Link to="/photo" className="text-primary text-decoration-none">Фотогалерея</Link> - Колекція фотографій китів
        </li>
         <li className="list-group-item">
          <Link to="/rehabilitation" className="text-primary text-decoration-none">Реабілітація</Link> - Сторінка про реабілітацію китів
        </li>
      </ul>
    </section>
  </main>
  );
}

export default Home;