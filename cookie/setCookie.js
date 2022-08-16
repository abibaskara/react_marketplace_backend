import Cookies from 'universal-cookie';

const cookies = new Cookies();

const SetCookie = (cookiename, value) => {
    cookies.set(cookiename, value, { path: '/' });
    console.log(cookies.get('refreshToken'));
};


export default SetCookie;