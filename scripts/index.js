const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
    if(user) {
        // ACCOUND INFO
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div><h5>Logged in as ${user.email}</h5></div>
            <div><h5>Bio: ${doc.data().bio}</h5></div>
            `;
            accountDetails.innerHTML = html;
        })

        if(user.uid === '7r5lRVLMd4VmDmZspRw4fadKS0h1'){
             const special = document.querySelector('#special');
            special.style.display = 'block';
        };

        // TOOGLE UI ELEMENTS
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else{
        // HIDE ACCOUNT INFO
        accountDetails.innerHTML = '';
        // TOOGLE UI ELEMENTS
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

//SET UP GUIDES
const setUpGuides = (data, user) =>{
     guideList.innerHTML = '';
    if(data.length){
        data.forEach(doc => {
            const guide = doc.data();
            let li = document.createElement('li');
            let header = document.createElement('div');
            let content = document.createElement('div');
            let cross = document.createElement('div')
            header.classList.add('collapsible-header', 'grey', 'lighten-4');
            header.textContent = guide.title;
            header.style.display = "flex";
            li.style.fontSize = "20px";
            header.style.justifyContent = "space-between"
            content.classList.add('collapsible-body', 'white')
            content.textContent = guide.content;
            cross.textContent = '| X |';
            cross.style.cursor = 'pointer';
            cross.style.display = 'none';
            cross.classList.add('cross');
            if(user.uid === '7r5lRVLMd4VmDmZspRw4fadKS0h1'){
                cross.style.display = "block";
            }
            header.setAttribute('data-id', doc.id);
            header.appendChild(cross);
            li.appendChild(header);
            li.appendChild(content);

            guideList.appendChild(li)

            // KNOW IF X BUTTON WAS CLICKED AND ACT ACCORDINGLY

        cross.addEventListener('click', (e) => {
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('guides').doc(id).delete();
        })

        });

    }else{
        guideList.innerHTML = '<h4 class="center-align">Login in to view data</h4>'
    }


}
// How to initialize modal on MATERIALIZE
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});