const val = 'demo of unnecessary else after return';

const func = () => {
    if (val === '') {
        return 1;
    } else {
        alert(val);
    }
}

func();
