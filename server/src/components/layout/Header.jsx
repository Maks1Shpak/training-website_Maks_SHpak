import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const { handleSearch } = useSearch();

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const onSubmit = event => {
        event.preventDefault();
        if (Boolean(searchInput.trim())) {
            handleSearch(searchInput);
            navigate(`/search?query=${encodeURIComponent(searchInput)}`);
        }
    };

    return (
        <header className='text-center bg-primary text-white'>
            <div className='container-fluid header-container d-flex flex-column flex-lg-row align-items-center justify-content-between'>
                {/* Секція логотипу */}
                <div className='logo-container d-flex align-items-center mb-3 mb-lg-0'>
                    <Link
                        to='/'
                        className='text-white text-decoration-none d-flex align-items-center'
                    >
                        <img
                            src='https://img.freepik.com/free-photo/humpback-whale_181624-2020.jpg?semt=ais_hybrid&w=740'
                            alt='кит'
                            className='site-logo rounded-circle me-2'
                        />
                        <span className='fs-4'>Сайт про китів</span>
                    </Link>
                </div>

                {/* Секція навігації */}
                <nav className='main-nav d-flex flex-column flex-lg-row align-items-center'>
                    {[
                        { path: '/', label: 'Головна' },
                        { path: '/morphology', label: 'Зовнішній вигляд китів' },
                        { path: '/nutrition', label: 'Харчування китів' },
                        { path: '/population', label: 'Ареал китів' },
                        { path: '/photo', label: 'Фотографії китів' },
                        <Link
                            to='/rehabilitation'
                            className={`nav-link text-white px-3 py-2 ${
                                location.pathname === '/rehabilitation'
                                    ? 'active fw-bold border-bottom border-white'
                                    : ''
                            }`}
                        >
                            Реабілітація
                        </Link>,
                    ].map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`nav-link text-white px-3 py-2 ${
                                location.pathname === path
                                    ? 'active fw-bold border-bottom border-white'
                                    : ''
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Секція пошуку */}
                <div className='search-container d-flex align-items-center'>
                    <form onSubmit={onSubmit} className='d-flex'>
                        <input
                            type='search'
                            className='form-control me-2'
                            placeholder='Пошук на сайті...'
                            value={searchInput}
                            onChange={inputEvent => setSearchInput(inputEvent.target.value)}
                        />
                        <button type='submit' className='btn btn-light'>
                            Пошук
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}

export default Header;
