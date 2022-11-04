
let pageNumber;
let imagePerPage = 4;
let button;
const dataWork ={
    async getData(){
        const {gallery,pages} = UI.loadSelectors();
        gallery.innerHTML='';
        const res = await fetch ('/database/db.json');
        const data = await res.json();
        for(let i=(pageNumber*imagePerPage);i<(pageNumber+1)*imagePerPage;i++){
            console.log(data.images[i]);
            let showImage = `
            <div class="card">
                <div class="image">
                    <img src="${data.images[i].image}" alt="">
                </div>
                <div class="description">
                    <h3>${data.images[i].title}</h3>
                    <p>${data.images[i].descrption}</p>
                </div>
            </div>`
            gallery.insertAdjacentHTML('afterbegin', showImage);
        }
    }
}

const UI = {
    loadSelectors(){
        const gallery = document.querySelector('.row');
        const pages = document.querySelector('.pages');
        return {
            gallery,
            pages
        }
    },
  buttonInit(){
        const {gallery, pages} = this.loadSelectors();
        for(let i=0;i<imagePerPage;i++){
            const span = document.createElement("span");
            span.innerHTML = i + 1;
            window.onload = (event) =>{
                pageNumber = 0;
                dataWork.getData();
            };
            span.addEventListener('click', (evt)=>{
                pageNumber = i;
                dataWork.getData();
            })
            pages.append(span);
        }
    },
    windowLoader(){
        
    }
    
}
UI.buttonInit();
UI.windowLoader();