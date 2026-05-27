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
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        });
    };

    createNotification({ delay, state })
        .then(value => iziToast.show({
            theme: 'dark',
            // iconUrl: '../img/bi_check2-circle.svg',
            title: 'OK',
            message: `✅ Fulfilled promise in ${value}ms`
,
            position: 'topRight',
            backgroundColor: '#59a10d',
        }))
        .catch(error => iziToast.show({
            theme: 'dark',
            // iconUrl: '../img/bi_x-octagon.svg',
            title: 'Error',
            message: `❌ Rejected promise in ${error}ms`,
            position: 'topRight',
            backgroundColor: '#ef4040',
        }));
});
