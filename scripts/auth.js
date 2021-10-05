// LISTEN FOR AUTH STATUS CHANGES
auth.onAuthStateChanged(user => {
    if(user){
        // GET DATA ONLY WHEN USER LOGGED IN
        db.collection('guides').onSnapshot(snapshot => {
            setUpGuides(snapshot.docs, user);
            setupUI(user);

        }, err => {
            console.log(err.message);
        })
    } else{
        setUpGuides([]);
        setupUI();
    }
})

// CREATE NEW GUIDE
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        // CLOSE THE MODAL AND CLEAR THE FORM
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
})

// SIGNUP
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get USER INFO
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // SIGN UP THE USER 
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        }) 
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }, err => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        
        console.log(err.message)
        errSignup = document.querySelector('#signup-error');
        errSignup.style.display = "block";
    })
})

// LOGOUT METHOD
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {

    auth.signOut();
})

// LOGIN
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // GET USER INFO!!!
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    window.onerror = function(msg, url, line){
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();

        errModal = document.querySelector('#modal-error');
        errModal.style.display = "block";
    }

    auth.signInWithEmailAndPassword(email, password).then((cred) => {

        //close the login modal and reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})




// cross.addEventListener('click', (e) => {
//     e.stopPropagation();
//     let id = e.target.parentElement.getAttribute('data-id');
//     db.collection('cafes').doc(id).delete();
// })