function create(fn){
    let ret = false;
    return ({ next, complate, error}) => {
        function nextFn(...args) {
            if( ret) {
                return;
            }
            next(...args);
        }

        function complateFn(...args){
            complate(...args);
            ret = true;
        }

        function errorFn(...args) {
            error(...args);
        }

        fn({
            next: nextFn,
            complate: complateFn,
            error: errorFn,
        })

        return () => (ret = true);
    }
}

let observerable = create(observer => {
    setTimeout(() => {
        observer.next(1);
    }, 1000);
    observer.next(2);
    observer.complate(3);
});
console.log("create:", observerable);

const subject = {
    next: value => {
        console.log(value);
    },
    complate: console.log,
    error: console.log
};

let unsubscribe = observerable(subject);
console.log("unsubscribe:", unsubscribe);
