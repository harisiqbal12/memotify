const { hash } = window.location;

// ***elements***
const el = {
	inputName: document.getElementById("input-name"),
	inputMessage: document.getElementById("input-message"),
	submit: document.getElementById("submit"),
	formName: document.querySelector(".name"),
	formMessage: document.querySelector(".message"),
	messageShow: document.querySelector(".message-show"),
	credit: document.querySelector(".credit"),
	displayMessage: document.getElementById("display-message"),
    actualMessage: document.querySelector('.actual-message'),
    sender: document.querySelector('.sender'),
    finalOutput: document.querySelector('.final-output')
};


// ***Functions***

const func = {

    submit() {
        
        const inputNameValue = el.inputName.value;
        const inputMessageValue = el.inputMessage.value;

        if ((!inputMessageValue) && (inputNameValue)) {

            console.log('required message field')
        } else if (inputMessageValue && inputNameValue) {

            func.process();
           

            console.log('both given')
        } else if (!inputNameValue && inputMessageValue) {

            func.process();
            
            console.log('name not given')
        }
        else {
            console.log('required fields')
        }
    },
    process() {
        const inputNameValue = el.inputName.value;
        const inputMessageValue = el.inputMessage.value;
        let inputName;

        inputNameValue == '' ? inputName = 'Anonymous' : inputName = inputNameValue;

        const encryptName = btoa(inputName);
        const encryptMessage = btoa(inputMessageValue);

        func.displayLink(encryptMessage, encryptName);
    },
    displayLink(encrypedMessage, encryptedName) {
        const container = document.querySelector('.container');

        el.formName.classList.add('is-hide');
        el.formMessage.classList.add('is-hide');
        el.submit.classList.add('is-hide');
        container.removeChild(container.lastElementChild);
        el.messageShow.classList.remove("message-show-hide");

        el.displayMessage.value = `${window.location}#${encrypedMessage}%${encryptedName}`;
        el.displayMessage.select();
    },
    preparingLink() {
        let hashes = hash;
        if (hashes) {
            let hashArray = hashes.split('');
            let index1;
            let index2;
            hashArray = hashArray.findIndex((e, index) => {
                e == '#' ? index1 = index : null;
                e == '%' ? index2 = index : null; 
            });

            // change
            let message = hashes.slice(1, index2);

            let name = hashes.slice(index2);
            name = name.replace('%', '');
            // change
            message = atob(message);

            name = atob(name);

            this.displayMessage(name, message);      
        }
    },
    displayMessage(name, message) {
        const container = document.querySelector(".container");
        el.formName.classList.add("is-hide");
		el.formMessage.classList.add("is-hide");
        el.submit.classList.add("is-hide");
        container.removeChild(container.lastElementChild);

        el.finalOutput.classList.remove('is-hide')
        el.actualMessage.innerHTML = `~${message}`;
        el.sender.innerHTML = `~${name}`;

    }
};


// *** Event-Listeners*** 

const ev_List = () => {
    
    return {
        submit() {
            el.submit.addEventListener('click', func.submit)
        }
    }
};


// ***Controller***

const controller = () => {

    func.preparingLink();
    ev_List().submit();
};

controller();

// let check = '#avasgv=%asdasd';

// let check1 = check.replace('#', '');
// console.log(check1);


// let check2 = check.replace('%', '');
// check2 = check2.replace(check1, '')
// console.log(check2)

// let haris = 'haris';

// let haris2 = haris.slice(1, 2);
// haris = haris.replace(haris2, '');
// haris = haris.split('');
