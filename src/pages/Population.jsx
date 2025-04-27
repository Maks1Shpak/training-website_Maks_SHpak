import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Population() {
  return (
    <main className="container px-4 py-4">
      <div className="row">
        <aside className="col-md-3">
          <nav className="sticky-top pt-3" aria-label="Зміст сторінки">
            <h2 className="h4">Зміст</h2>
            <ul className="nav flex-column">
              <a href="#continentsList" className="nav-link" data-bs-toggle="collapse">Континенти</a>
              <a href="#subcontinentsList" className="nav-link" data-bs-toggle="collapse">Субконтиненти</a>
              <a href="#countriesList" className="nav-link" data-bs-toggle="collapse">Країни</a>
              <a href="#introducedList" className="nav-link" data-bs-toggle="collapse">Регіони</a>
              <a href="#biogeographicList" className="nav-link" data-bs-toggle="collapse">Біогеографічні зони</a>
              <a href="#biomesList" className="nav-link" data-bs-toggle="collapse">Океани</a>
            </ul>
          </nav>
        </aside>

        <article className="col-md-9">
          <h2 className="h2 text-primary mb-4">Ареал поширення зайців</h2>
          
          <section id="continents" className="mt-4">
            <h3>
              <button className="btn btn-primary w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#continentsList" 
                      aria-expanded="false" 
                      aria-controls="continentsList">
                Континенти
              </button>
            </h3>
            <div className="collapse" id="continentsList">
              <ul className="list-group mb-3">
                <li class="list-group-item">Африка</li>
                <li class="list-group-item">Південна Америка</li>
                <li class="list-group-item">Австралія і Океанія</li>
                <li class="list-group-item">Північна Америка</li>
                <li class="list-group-item">Азія</li>
                <li class="list-group-item">Європа</li>
                <li class="list-group-item">Антарктида</li>
              </ul>
            </div>
          </section>

          <section id="subcontinents" className="mt-4">
            <h3>
              <button className="btn btn-primary w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#subcontinentsList" 
                      aria-expanded="false" 
                      aria-controls="subcontinentsList">
                Субконтиненти
              </button>
            </h3>
            <div className="collapse" id="subcontinentsList">
              <ul className="list-group mb-3">
                <li class="list-group-item">Субсахарська Африка</li>
                <li class="list-group-item">Карибські острови</li>
                <li class="list-group-item">Південна Азія</li>
                <li class="list-group-item">Східна та західна азія</li>
                <li class="list-group-item">Центральна Америка</li>
                <li class="list-group-item">Північна Африка</li>
              </ul>
            </div>
          </section>

          <section id="countries" className="mt-4">
            <h3>
              <button className="btn btn-primary w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#countriesList" 
                      aria-expanded="false" 
                      aria-controls="countriesList">
                Країни
              </button>
            </h3>
            <div className="collapse" id="countriesList">
              <ul className="list-group mb-3 list-columns">
                <li class="list-group-item">Ангола</li>
                <li class="list-group-item">Аргентина</li>
                <li class="list-group-item">Австралія</li>
                <li class="list-group-item">Багамські острови</li>
                <li class="list-group-item">Бангладеш</li>
                <li class="list-group-item">Бенін</li>
                <li class="list-group-item">Бразилія</li>
                <li class="list-group-item">Камерун</li>
                <li class="list-group-item">Канада</li>
                <li class="list-group-item">Кабо-Верде</li>
                <li class="list-group-item">Чилі</li>
                <li class="list-group-item">КНР</li>
                <li class="list-group-item">Колумбія</li>
                <li class="list-group-item">Коморські острови</li>
                <li class="list-group-item">Коста-Рика</li>
                <li class="list-group-item">Еквадор</li>
                <li class="list-group-item">Сальвадор</li>
                <li class="list-group-item">Еритрея</li>
                <li class="list-group-item">Франція</li>
                <li class="list-group-item">Габон</li>
                <li class="list-group-item">Гана</li>
                <li class="list-group-item">Греція</li>
                <li class="list-group-item">Гренада</li>
                <li class="list-group-item">Гватемала</li>
                <li class="list-group-item">Ісландія</li>
                <li class="list-group-item">Індія</li>
                <li class="list-group-item">Індонезія</li>
                <li class="list-group-item">Іран</li>
                <li class="list-group-item">Ірак</li>
                <li class="list-group-item">Ірландія</li>
                <li class="list-group-item">Японія</li>
                <li class="list-group-item">Кенія</li>
                <li class="list-group-item">Магадаскар</li>
                <li class="list-group-item">Маврикій</li>
                <li class="list-group-item">Мексика</li>
                <li class="list-group-item">Марокко</li>
                <li class="list-group-item">Мозамбік</li>
                <li class="list-group-item">і ще близько 20 країн</li>
              </ul>
            </div>
          </section>

          <section id="introduced" className="mt-4">
            <h3>
              <button className="btn btn-primary w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#introducedList" 
                      aria-expanded="false" 
                      aria-controls="introducedList">
                Регіони
              </button>
            </h3>
            <div className="collapse" id="introducedList">
              <ul className="list-group mb-3">
                <li class="list-group-item">Гренландія</li>
                <li class="list-group-item">Камчатський півострів</li>
              </ul>
            </div>
          </section>

          <section id="biogeographic" className="mt-4">
            <h3>
              <button className="btn btn-primary w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#biogeographicList" 
                      aria-expanded="false" 
                      aria-controls="biogeographicList">
                Біогеографічні зони
              </button>
            </h3>
            <div className="collapse" id="biogeographicList">
              <ul className="list-group mb-3">
                <li class="list-group-item">Антарктична екозона</li>
                <li class="list-group-item">Неотропіка</li>
                <li class="list-group-item">Палеарктика</li>
                <li class="list-group-item">Неарктика</li>
                <li class="list-group-item">Нотогея</li>
                <li class="list-group-item">Океанійська екозона</li>
                <li class="list-group-item">Індомалайя</li>
                <li class="list-group-item">Афротропіка</li>
              </ul>
            </div>
          </section>

          <section id="biomes" className="mt-4">
            <h3>
              <button className="btn btn-primary w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#biomesList" 
                      aria-expanded="false" 
                      aria-controls="biomesList">
                Океани
              </button>
            </h3>
            <div className="collapse" id="biomesList">
              <ul className="list-group">
                <li class="list-group-item">Тихий океан</li>
                <li class="list-group-item">Атлантичний океан</li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}

export default Population;