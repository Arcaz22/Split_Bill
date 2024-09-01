import { Link } from 'react-router-dom';
import logo from '../../assets/react.svg';

export const HeaderLogo = () => {
    return (
        <Link to="/" className="hidden lg:flex">
            <div className='flex items-center'>
                <img src={logo} alt='logo' width={28} height={28} />
                <h1 className='text-2xl font-bold text-white ml-2'>Babon</h1>
            </div>
        </Link>
    );
};

