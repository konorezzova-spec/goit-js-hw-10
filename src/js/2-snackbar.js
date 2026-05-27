import iziToast from 'izitoast';
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = form.elements.delay.value;
    const state = form.elements.state.value;

    const createNotification = ({ delay, state }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve(`Fulfilled promise in ${delay}ms`);
                } else {
                    reject(`Rejected promise in ${delay}ms`);
                }
            }, delay);
        });
    };

    createNotification({ delay, state })
        .then(value => iziToast.show({
            theme: 'dark',
            iconUrl: 'img/bi_check2-circle.svg',
            title: 'OK',
            message: value,
            position: 'topRight',
            backgroundColor: '#59a10d',
        }))
        .catch(error => iziToast.show({
            theme: 'dark',
            iconUrl: 'img/bi_x-octagon.svg',
            title: 'Error',
            message: error,
            position: 'topRight',
            backgroundColor: '#ef4040',
        }));
});
